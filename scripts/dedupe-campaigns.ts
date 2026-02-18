
import { db } from '@/lib/db';
import { campaigns } from '@/lib/db/schema';
import { sql } from 'drizzle-orm';

async function dedupe() {
  console.log('🧹 Cleaning up duplicate campaigns...');
  
  // Find duplicates
  const all = await db.select().from(campaigns);
  const seen = new Set();
  const toDelete = [];

  for (const c of all) {
      const key = c.name;
      if (seen.has(key)) {
          toDelete.push(c.id);
      } else {
          seen.add(key);
      }
  }

  if (toDelete.length > 0) {
      console.log(`Found ${toDelete.length} duplicates. Deleting IDs: ${toDelete.join(', ')}`);
      for (const id of toDelete) {
         await db.delete(campaigns).where(sql`id = ${id}`);
      }
      console.log('✅ Duplicates removed.');
  } else {
      console.log('✨ No duplicates found.');
  }
  process.exit(0);
}

dedupe().catch(console.error);
