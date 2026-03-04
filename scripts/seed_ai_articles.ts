import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from '@/lib/db/schema';
import { BLOG_POSTS } from '@/app/constants/blog-data';

const db = drizzle(sql, { schema });

async function seed() {
  console.log('🌱 Seeding AI articles into the database...');
  
  // The slugs of the newly created articles
  const newSlugs = [
    'maquiladora-vs-shelter-services-mexico',
    'china-plus-one-strategy-mexico',
    'medical-device-manufacturing-tijuana',
    'aerospace-manufacturing-queretaro-mexico'
  ];

  for (const slug of newSlugs) {
    const post = BLOG_POSTS.find(p => p.slug === slug);
    if (!post) {
      console.warn(`⚠️ Post ${slug} not found in BLOG_POSTS array. Skipping.`);
      continue;
    }

    const dbPost: schema.NewPost = {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: 'Insights',
      imageUrl: post.imageUrl,
      tags: JSON.stringify(post.tags),
      readTime: '6 min read',
      published: true,
      content: post.content || ''
    };

    try {
      await db
        .insert(schema.posts)
        .values(dbPost)
        .onConflictDoUpdate({ 
            target: schema.posts.slug, 
            set: { content: dbPost.content, title: dbPost.title, excerpt: dbPost.excerpt } 
        });
      console.log(`  ✅ "${dbPost.title}"`);
    } catch (err: any) {
      console.error(`  ❌ Failed for ${slug}: ${err.message}`);
    }
  }

  console.log('\n✅ Database seeding complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
