import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { db } from '../lib/db';
import { leads } from '../lib/db/schema';
import { eq, sql } from 'drizzle-orm';

async function main() {
  try {
    const result = await db.select({
      tags: leads.tags,
      count: sql<number>`count(*)`
    })
    .from(leads)
    .where(eq(leads.status, 'queued'))
    .groupBy(leads.tags);

    console.log('🔍 Grouped queued leads in database by tags:');
    result.forEach(row => {
      console.log(` - Tags: ${row.tags} | Count: ${row.count}`);
    });

    const samples = await db.select()
      .from(leads)
      .where(eq(leads.status, 'queued'))
      .limit(5);
    
    console.log('\n🔍 Sample of queued leads:');
    samples.forEach(l => {
      console.log(` - Email: ${l.email} | Niche/Industry: ${l.industry} | Tags: ${l.tags}`);
    });
  } catch (err: any) {
    console.error('Error:', err.message);
  } finally {
    process.exit(0);
  }
}

main();
