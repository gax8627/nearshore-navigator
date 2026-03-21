import { inngest } from '@/lib/inngest/client';
import { db } from '@/lib/db';
import { posts, socialDrafts } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const generateSocialContent = inngest.createFunction(
  { id: 'generate-social-content', retries: 3 },
  { event: 'post.published' }, // Trigger when a blog post is published
  async ({ event, step }) => {
    const { postId } = event.data;

    const generatePosts = await step.run('generate-linkedin-drafts', async () => {
      const post = await db.query.posts.findFirst({
        where: eq(posts.id, postId)
      });

      if (!post) {
        throw new Error(`Post ${postId} not found`);
      }

      try {
        const { text } = await generateText({
          model: google('gemini-2.0-flash'),
          system: `You are an expert B2B social media manager specializing in nearshore manufacturing content.
Based on the blog post provided, write 3 distinct, highly engaging LinkedIn text-only posts.
Each post should highlight a different angle of the article (business value, cost data, strategic insight).
Return ONLY a valid JSON object with a "posts" array of 3 strings. No markdown, no extra text.`,
          prompt: `Title: ${post.title}\n\nContent: ${post.content.substring(0, 3000)}...`,
        });

        let drafts: string[] = [];
        try {
          // Strip any markdown code fences if Gemini adds them
          const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
          const parsed = JSON.parse(cleaned);
          drafts = parsed.posts || parsed;
        } catch (e) {
          console.error('Failed to parse Gemini JSON response for social content:', e);
          // Fallback: split by double newline if JSON fails
          drafts = text.split('\n\n').filter(Boolean).slice(0, 3);
        }

        return drafts;
      } catch (error) {
        console.error('Social content generation failed:', error);
        return [];
      }
    });

    await step.run('save-drafts-to-db', async () => {
      if (generatePosts.length > 0) {
        await db.insert(socialDrafts).values(
          generatePosts.map((d: string) => ({
            postId,
            content: d,
            status: 'pending'
          }))
        );
      }
    });

    return { success: true, draftsGenerated: generatePosts.length };
  }
);
