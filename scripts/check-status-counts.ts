import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { db } from '../lib/db';
import { leads } from '../lib/db/schema';
import { sql } from 'drizzle-orm';

async function main() {
  try {
    console.log('🔍 Grouping leads by status in database...');
    const result = await db.select({
      status: leads.status,
      count: sql<number>`count(*)`
    })
    .from(leads)
    .groupBy(leads.status);

    console.log('\nStatus Breakdown:');
    result.forEach(row => {
      console.log(` - ${row.status}: ${row.count} leads`);
    });

    console.log('\n🔍 Grouping leads by tags (sample of non-queued/non-new)...');
    const activeLeads = await db.select()
      .from(leads)
      .where(sql`status NOT IN ('new', 'queued', 'archived')`)
      .limit(10);
      
    activeLeads.forEach(l => {
      console.log(`Email: ${l.email} | Status: ${l.status} | Tags: ${l.tags}`);
    });

  } catch (err: any) {
    console.error('Error:', err.message);
  } finally {
    process.exit(0);
  }
}

main();
