import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { db } from '../lib/db';
import { leads } from '../lib/db/schema';
import { eq, ne, sql } from 'drizzle-orm';

async function main() {
  try {
    const contactedLeads = await db.select()
      .from(leads)
      .where(eq(leads.status, 'contacted'))
      .orderBy(leads.createdAt);

    console.log(`🔍 Found ${contactedLeads.length} leads with status 'contacted':`);
    contactedLeads.forEach(l => {
      console.log(` - Email: ${l.email} | Company: ${l.company} | Tags: ${l.tags} | CreatedAt: ${l.createdAt}`);
    });
  } catch (err: any) {
    console.error('Error:', err.message);
  } finally {
    process.exit(0);
  }
}

main();
