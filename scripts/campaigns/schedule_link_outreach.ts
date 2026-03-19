import dotenv from 'dotenv';
import path from 'path';
import { brevo } from '../../lib/brevo';

const envPath = path.join(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

// The B2B Link Prospects
const TARGETS = [
  { email: "editor@industryweek.com", firstName: "Editorial Team", company: "IndustryWeek" },
  { email: "pitch@supplychainbrain.com", firstName: "Content Director", company: "SupplyChainBrain" },
  { email: "press@globaltrademag.com", firstName: "Editor", company: "GlobalTradeMag" },
  { email: "contact@americanindustrialmagazine.com", firstName: "Media Team", company: "AmericanIndustrialMagazine" },
  { email: "news@supplychain247.com", firstName: "Editor", company: "SupplyChain247" }
];

// Schedule for tomorrow
const SCHEDULED_AT = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

async function scheduleLinkOutreach() {
  console.log('--- Sales Automator: Scheduling Link Outreach Campaign (Native lib/brevo) ---');
  
  if (!process.env.BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not set in .env.local.');
    process.exit(1);
  }

  let sentCount = 0;

  for (const lead of TARGETS) {
    const html = `
      <p>Hi ${lead.firstName},</p>
      
      <p>Denisse here from Nearshore Navigator. We are currently publicizing a comprehensive 2026 data-driven guide detailing how Section 301 tariffs are accelerating the Mexico nearshoring pivot.</p>
      
      <p>We specifically mapped the landed cost differential between US, Shenzhen, and Tijuana operations under current USMCA frameworks. We thought this data would be highly relevant to the ${lead.company} supply chain readership.</p>

      <p>We'd love to offer an exclusive quote or targeted guest contribution for your next piece on global logistics. We’d also be happy to cross-link.</p>
      
      <p>You can see the raw analysis here: <a href="https://nearshorenavigator.com/en/insights/2026-tariffs-baja-california-supply-chain">2026 Tariffs & Supply Chain Impact</a>.</p>
      
      <p>Let me know if you are open to collaborating. I'm available for a 10-minute sync next Tuesday.</p>
      
      <p>Best,<br>
      <strong>Denisse Martinez</strong><br>
      Principal Advisor, Nearshore Navigator</p>
    `;

    try {
      await brevo.sendEmail({
        to: [{ email: lead.email, name: lead.firstName }],
        subject: `Collaboration Idea: 2026 Tariffs & ${lead.company} Readership`,
        htmlContent: html,
        scheduledAt: SCHEDULED_AT,
      });

      sentCount++;
      console.log(`  ✅ Scheduled outreach to ${lead.email}`);
      
      // 800ms delay to respect Brevo transactional rate limits
      await new Promise(r => setTimeout(r, 800)); 
    } catch (e: any) {
      console.error(`  ❌ Failed for ${lead.email}: ${e.message}`);
    }
  }
  
  console.log(`\n✅ Done! ${sentCount} B2B link-building emails queued for dispatch.`);
}

scheduleLinkOutreach().catch(console.error);
