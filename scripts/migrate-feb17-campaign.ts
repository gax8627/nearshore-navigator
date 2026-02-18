
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db';
import { leads, campaigns } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const SEGMENT_DIR = path.join(process.cwd(), 'segmented_leads/feb17');

async function migrate() {
  console.log('🚀 Starting Migration: Feb 17 Campaign Data -> Postgres');

  // 1. Migrate Leads (Tier 1)
  const tier1Path = path.join(SEGMENT_DIR, 'tier1_med_device.json');
  if (fs.existsSync(tier1Path)) {
    const rawLeads = JSON.parse(fs.readFileSync(tier1Path, 'utf-8'));
    console.log(`Found ${rawLeads.length} leads in Tier 1 Med Device...`);

    let newCount = 0;
    for (const lead of rawLeads) {
        // Check if exists
        const existing = await db.select().from(leads).where(eq(leads.email, lead.email));
        if (existing.length === 0) {
            await db.insert(leads).values({
                name: lead.firstName || 'Unknown',
                email: lead.email,
                company: lead.company || 'Unknown',
                category: 'Med Device', // Mapping Tier 1 to Category
                tags: JSON.stringify(['feb17_campaign', 'tier1', 'med_device']),
                status: 'new',
                source: 'migration_script'
            });
            newCount++;
        }
    }
    console.log(`✅ Imported ${newCount} new leads from Tier 1.`);
  }

  // 2. Create Campaign Record
  const campaignName = "Feb 17 Med Device Outreach";
  const existingCampaign = await db.select().from(campaigns).where(eq(campaigns.name, campaignName));
  
  if (existingCampaign.length === 0) {
      await db.insert(campaigns).values({
          name: campaignName,
          subject: "Nearshore support for your pipeline?",
          content: "Legacy script content... [View in Codebase]",
          status: 'sent', // Mark as sent since script already ran/is running
          segment: 'Med Device',
          template: 'liquid_glass',
          stats: JSON.stringify({ sent: 0, opened: 0, clicked: 0, note: "Tracked in Brevo" })
      });
      console.log(`✅ Created Campaign record: "${campaignName}"`);
  } else {
      console.log(`ℹ️ Campaign "${campaignName}" already exists.`);
  }

  console.log('🎉 Migration Complete. check /admin/leads');
  process.exit(0);
}

migrate().catch(e => {
    console.error(e);
    process.exit(1);
});
