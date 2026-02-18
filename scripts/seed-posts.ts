/**
 * Seed script: Migrate hardcoded BLOG_POSTS → Postgres `posts` table
 * Run: npx tsx scripts/seed-posts.ts
 */

import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from '@/lib/db/schema';

const db = drizzle(sql, { schema });

const SEED_POSTS: schema.NewPost[] = [
  {
    slug: 'nearshoring-in-tijuana-guide-for-us-companies',
    title: 'Nearshoring in Baja California: A Guide for US Companies',
    excerpt: "Everything you need to know about setting up operations in Mexico's manufacturing hub.",
    content: `<p>Baja California has arguably become the most critical manufacturing hub in North America for companies looking to decouple from Asia. With its strategic proximity to California, a shared time zone, and a deeply integrated cross-border culture, it offers advantages that few other regions can match.</p>
<h2>Why Baja California?</h2>
<p>The region is home to established clusters in Medical Devices, Aerospace, and Electronics. Major players like Medtronic, Honeywell, and Samsung have massive operations here.</p>
<h2>The Workforce Advantage</h2>
<p>With a young, technical workforce and numerous universities producing thousands of engineers annually, Baja California provides the human capital necessary for complex manufacturing.</p>`,
    category: 'Strategy Guide',
    imageUrl: '/images/warehouse.jpg',
    tags: JSON.stringify(['Guide', 'Strategy']),
    readTime: '6 min read',
    published: true,
  },
  {
    slug: 'tijuana-vs-asia-manufacturing-cost-comparison',
    title: 'Baja California vs Asia: Manufacturing Cost Comparison',
    excerpt: 'Analyze the total landed cost benefits of manufacturing in Baja California versus traditional Asian hubs.',
    content: `<p>When calculating Total Landed Cost (TLC), Mexico often wins out over Asian competitors due to lower logistics costs, zero tariffs under USMCA, and faster lead times.</p>
<h2>Logistics Savings</h2>
<p>Container shipping from China has become unpredictable and expensive. Trucking from Tijuana to Los Angeles takes mere hours.</p>`,
    category: 'Cost Analysis',
    imageUrl: '/images/factory-worker.jpg',
    tags: JSON.stringify(['Cost Analysis', 'Economics']),
    readTime: '5 min read',
    published: true,
  },
  {
    slug: 'how-shelter-services-work-in-tijuana',
    title: 'How Shelter Services Work in Baja California',
    excerpt: 'Understanding the shelter model: the fastest, lowest-risk way to start manufacturing in Mexico.',
    content: `<p>A Shelter Service Provider acts as your legal entity in Mexico, handling all administrative burdens while you focus on production. This allows you to start operations in as little as 90 days.</p>
<h2>Key Benefits</h2>
<ul><li>Faster startup time</li><li>Reduced liability</li><li>Immediate VAT certification</li></ul>`,
    category: 'Shelter Services',
    imageUrl: '/images/consulting.jpg',
    tags: JSON.stringify(['Shelter', 'Legal']),
    readTime: '4 min read',
    published: true,
  },
  {
    slug: 'industrial-parks-in-tijuana-map-and-overview',
    title: 'Industrial Parks Map Overview 2026',
    excerpt: 'A deep dive into the top industrial zones: Otay, El Florido, and Pacifico.',
    content: `<p>Tijuana has over 70 industrial parks. Choosing the right one depends on your labor needs, logistics requirements, and budget.</p>
<h2>Otay Mesa</h2>
<p>Adjacent to the border crossing, ideal for high-volume logistics.</p>
<h2>El Florido</h2>
<p>Large land reserves, home to massive campuses for Samsung and Coca-Cola.</p>`,
    category: 'Real Estate',
    imageUrl: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=800',
    tags: JSON.stringify(['Real Estate', 'Maps']),
    readTime: '5 min read',
    published: true,
  },
  {
    slug: 'mexico-2025-nearshoring-boom-usmca-review',
    title: "The $6B Investment: Mexico's 2025 Nearshoring Boom",
    excerpt: 'Why 2025 is the most critical year for industrial expansion and the upcoming 2026 USMCA review.',
    content: `<p>Investment in industrial parks across Mexico is projected to reach US $6 billion in 2025. This surge is driven by global companies de-risking from Asia and the strategic necessity of the North American market.</p>
<h2>The 2026 USMCA Horizon</h2>
<p>With the required review of the T-MEC (USMCA) agreement approaching in 2026, companies are moving now to solidify their presence in the North American manufacturing hub.</p>
<h2>Infrastructure Evolution</h2>
<p>Growth focuses on energy-efficient parks and expanded logistics capabilities in cities like Tijuana and Monterrey.</p>`,
    category: 'Industry News',
    imageUrl: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&q=80&w=800',
    tags: JSON.stringify(['Market Report', 'Investment']),
    readTime: '5 min read',
    published: true,
  },
];

async function seed() {
  console.log('🌱 Seeding posts...');

  for (const post of SEED_POSTS) {
    try {
      await db.insert(schema.posts).values(post).onConflictDoNothing({ target: schema.posts.slug });
      console.log(`  ✓ ${post.title}`);
    } catch (err: any) {
      console.error(`  ✗ ${post.title}: ${err.message}`);
    }
  }

  console.log('✅ Seed complete');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
