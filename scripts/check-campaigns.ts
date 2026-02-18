
import { db } from '@/lib/db';
import { campaigns } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

async function check() {
  const result = await db.select().from(campaigns);
  console.log(`Total Campaigns: ${result.length}`);
  result.forEach(c => console.log(` - ${c.name} (${c.status})`));
  process.exit(0);
}

check().catch(console.error);
