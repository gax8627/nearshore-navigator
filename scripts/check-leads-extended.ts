import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { db } from '../lib/db';
import { leads } from '../lib/db/schema';
import { not, eq, and } from 'drizzle-orm';

async function check() {
  try {
    console.log('🔍 Querying leads in active or warm status in the database...');
    
    // Select all leads that are not 'new' or 'archived'
    const results = await db.select()
      .from(leads)
      .where(
        and(
          not(eq(leads.status, 'new')),
          not(eq(leads.status, 'archived'))
        )
      );

    console.log(`Found ${results.length} active/contacted leads:`);
    results.forEach(lead => {
      console.log(` - Email: ${lead.email} | Name: ${lead.name} | Status: ${lead.status} | Tags: ${lead.tags} | Company: ${lead.company}`);
    });
  } catch (error: any) {
    console.error('Error querying database:', error.message);
  } finally {
    process.exit(0);
  }
}

check();
