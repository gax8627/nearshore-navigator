
import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';
import { eq, ilike } from 'drizzle-orm';

async function main() {
  const email = 'kenm@norco-inc.com'; 
  console.log(`🔍 Searching for lead: ${email}...`);

  const found = await db.select().from(leads).where(ilike(leads.email, email));

  if (found.length === 0) {
    console.log('❌ Lead not found.');
  } else {
    const lead = found[0];
    console.log(`✅ Found: ${lead.name} (${lead.company}) - Current Status: ${lead.status}`);
    
    await db.update(leads)
      .set({ status: 'unsubscribed' }) // Using 'unsubscribed' status
      .where(eq(leads.id, lead.id));
      
    console.log(`🚫 Updated status to 'unsubscribed'.`);
  }
  process.exit(0);
}

main().catch(console.error);
