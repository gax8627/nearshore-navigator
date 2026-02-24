import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

// Manually load .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf-8');
  envConfig.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim().replace(/^"|"$/g, '');
    }
  });
}

async function checkTags() {
  const results = await db.select({ 
    tags: leads.tags,
    count: sql<number>`count(*)`
  })
  .from(leads)
  .where(eq(leads.status, 'new'))
  .groupBy(leads.tags)
  .orderBy(sql`count(*) desc`)
  .limit(20);

  console.log('Top tags for NEW leads:');
  results.forEach(r => console.log(` - ${r.tags}: ${r.count}`));
  process.exit(0);
}

checkTags().catch(console.error);
