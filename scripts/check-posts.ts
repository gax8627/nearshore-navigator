
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';

async function check() {
  try {
    const all = await db.select().from(posts).limit(5);
    console.log(`✅ Posts table accessible. Found ${all.length} posts.`);
    all.forEach(p => console.log(` - ${p.title} (${p.slug})`));
  } catch (e: any) {
    console.error("❌ Failed to query posts table:", e.message);
    if (e.message.includes("relation \"posts\" does not exist")) {
        console.error("   -> Table missing. Run migrations.");
    }
  }
  process.exit(0);
}

check();
