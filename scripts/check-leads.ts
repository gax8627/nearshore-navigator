import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';

async function main() {
  const allLeads = await db.select().from(leads);
  console.log(`Total Leads in DB: ${allLeads.length}`);
  if (allLeads.length > 0) {
    console.log('Sample Lead:', allLeads[0]);
  }
}

main().catch(console.error).then(() => process.exit(0));
