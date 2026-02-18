
import { db } from '@/lib/db';
import { campaigns, leads } from '@/lib/db/schema';
import { eq, like } from 'drizzle-orm';

async function main() {
  console.log('🔧 Updating Campaign Focus -> Contract Manufacturing...');

  // 1. Update Campaign Name
  await db.update(campaigns)
    .set({ 
        name: 'Feb 17 - Contract Manufacturing',
        segment: 'Contract Mfg' 
    })
    .where(like(campaigns.name, 'Feb 17%'));
  
  console.log('✅ Campaign renamed.');

  // 2. Update Leads Category
  // We identify them by the 'migration_script' source or the old category
  await db.update(leads)
    .set({ category: 'Contract Mfg' })
    .where(eq(leads.category, 'Med Device'));

  console.log('✅ Leads category updated to "Contract Mfg".');
  process.exit(0);
}

main().catch(console.error);
