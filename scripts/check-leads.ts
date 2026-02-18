
import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';
import { eq, count } from 'drizzle-orm';

async function check() {
  const result = await db.select({ count: count() }).from(leads).where(eq(leads.source, 'migration_script'));
  console.log(`Current leads with source='migration_script': ${result[0].count}`);
  process.exit(0);
}

check().catch(console.error);
