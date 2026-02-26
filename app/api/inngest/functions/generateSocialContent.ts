import { inngest } from '@/lib/inngest/client';
import { db } from '@/lib/db';
import { posts, socialDrafts } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import OpenAI from 'openai';

export const generateSocialContent = inngest.createFunction(
  { id: 'generate-social-content', retries: 3 },
  { event: 'post.published' }, // Trigger this when a blog post is published
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
        const openai = new OpenAI();
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: 'You are an expert B2B social media manager. Based on the following blog post content, write 3 distinct, highly engaging LinkedIn text-only posts. Each post should highlight a different angle of the article. Provide the output as a JSON array of strings.',
            },
            {
              role: 'user',
              content: `Title: ${post.title}\n\nContent: ${post.content.substring(0, 3000)}...`, // Limit content
            },
          ],
          model: 'gpt-4o-mini',
          response_format: { type: "json_object" }
        });
        
        let drafts = [];
        try {
            const parsed = JSON.parse(completion.choices[0].message.content || '{"posts":[]}');
            drafts = parsed.posts || parsed;
        } catch (e) {
            console.error("Failed to parse JSON");
        }

        return drafts;
      } catch (error) {
        console.error('Generation failed:', error);
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
