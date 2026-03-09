/**
 * March 9th Warm Nurture — 250 Engaged Leads
 * 
 * AUDIT RECOMMENDATIONS APPLIED:
 * ✅ Separate nurture track for 780+ engaged contacts
 * ✅ "Soft Nurture" (Cost Breakdown) for Mar 6 Clickers 
 * ✅ Case study content for previous openers
 * ✅ Calendly CTA for direct booking
 * 
 * Run preview:  npx tsx scripts/campaigns/schedule_march9_nurture.ts --dry-run
 * Run for real: npx tsx scripts/campaigns/schedule_march9_nurture.ts
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { brevo } from '../../lib/brevo';
import { incrementEmailUsage, hasEmailBudget } from '../../lib/email-usage-tracker';

const BATCH_LIMIT = 250;
const SCHEDULED_AT = "2026-03-09T15:00:00.000Z"; // March 9, 8:00 AM PST
const SENT_LOG_PATH = path.join(process.cwd(), 'scripts/sent_march9_nurture.json');

const DRY_RUN = process.argv.includes('--dry-run');

const envPath = path.join(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

async function main() {
  console.log('\n🔥 March 9th Warm Nurture — 250 Engaged Leads (8 AM PST)');
  console.log(DRY_RUN ? '  [DRY RUN — no emails will be sent]\n' : '  [LIVE — emails will be scheduled via Brevo]\n');

  if (!DRY_RUN && !process.env.BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not set.');
    process.exit(1);
  }

  // 1. Load Engagement Data
  const engagementPath = path.join(process.cwd(), 'scripts/engagement_data.json');
  if (!fs.existsSync(engagementPath)) {
    console.error('❌ Missing scripts/engagement_data.json. Run check-march6-performance.ts first?');
    process.exit(1);
  }

  const engagement = JSON.parse(fs.readFileSync(engagementPath, 'utf-8'));
  
  // 2. Identify Mar 6 Clickers (Soft Nurture) and Previous Openers (Shortlist Nurture)
  // We'll prioritize clickers, then openers. 
  // For the purpose of this script, we'll look at the "last_interaction" and "status"
  
  const clickers: any[] = [];
  const openers: any[] = [];

  Object.entries(engagement).forEach(([email, data]: [string, any]) => {
    const isMar6Clicker = data.status === 'clicked' && data.last_interaction?.includes('2026-03-06');
    
    // Extract metadata from history if available, else use email as placeholder name
    const firstName = email.split('@')[0]; 
    const company = email.split('@')[1]?.split('.')[0].toUpperCase() || 'your company';

    const lead = { email, firstName, company };

    if (isMar6Clicker) {
        clickers.push(lead);
    } else if (data.status === 'opened' || data.status === 'clicked') {
        openers.push(lead);
    }
  });

  console.log(`🎯 Segments identified:`);
  console.log(`   - Mar 6 Clickers: ${clickers.length}`);
  console.log(`   - Previous Engagers (Openers): ${openers.length}`);

  // 3. Assemble the 250 Batch
  const finalBatch: { lead: any, type: 'SOFT' | 'SHORTLIST' }[] = [];
  
  // Prioritize Mar 6 clickers for the new "Soft Nurture" track
  clickers.forEach(l => {
    if (finalBatch.length < BATCH_LIMIT) finalBatch.push({ lead: l, type: 'SOFT' });
  });

  // Fill the rest with general engagers
  openers.forEach(l => {
    // Dedupe against clickers already added
    if (!clickers.find(c => c.email === l.email)) {
        if (finalBatch.length < BATCH_LIMIT) finalBatch.push({ lead: l, type: 'SHORTLIST' });
    }
  });

  console.log(`📋 Total batch size: ${finalBatch.length} (Target: ${BATCH_LIMIT})`);

  if (finalBatch.length === 0) {
    console.log('✨ No engaged leads found!');
    process.exit(0);
  }

  let sentCount = 0;
  const existingSent = fs.existsSync(SENT_LOG_PATH) ? JSON.parse(fs.readFileSync(SENT_LOG_PATH, 'utf-8') || '[]') : [];

  for (let i = 0; i < finalBatch.length; i++) {
    const { lead, type } = finalBatch[i];
    
    let subject, html;
    if (type === 'SOFT') {
        subject = `Just sent this to another client in Baja`;
        html = buildSoftNurture(lead.firstName, lead.company);
    } else {
        subject = `The 3 factories our clients keep choosing in Baja`;
        html = buildShortlistNurture(lead.firstName, lead.company);
    }

    if (DRY_RUN) {
      if (i < 5) console.log(`[DRY RUN] Would schedule (${type}): ${lead.email} | Subject: ${subject}`);
      sentCount++;
    } else {
      try {
        if (!hasEmailBudget()) {
          console.error('❌ Monthly email budget exhausted!');
          break;
        }

        await brevo.sendEmail({
          to: [{ email: lead.email, name: lead.firstName }],
          subject,
          htmlContent: html,
          scheduledAt: SCHEDULED_AT
        });
        
        incrementEmailUsage(1);
        existingSent.push(lead.email);
        sentCount++;
        
        if (sentCount % 25 === 0) {
          console.log(`  ⏳ Scheduled ${sentCount} so far...`);
          fs.writeFileSync(SENT_LOG_PATH, JSON.stringify(existingSent, null, 2));
        }

        await new Promise(r => setTimeout(r, 800)); 
      } catch (e: any) {
        console.error(`  ❌ Failed for ${lead.email}: ${e.message}`);
      }
    }
  }

  if (!DRY_RUN) {
    fs.writeFileSync(SENT_LOG_PATH, JSON.stringify(existingSent, null, 2));
    console.log(`\n✅ Nurture scheduling complete! ${sentCount} engaged emails queued for Mar 9 @ 8AM PT.`);
  } else {
    console.log(`\n✅ Nurture dry run complete. ${sentCount} emails would be scheduled.`);
  }
}

function buildSoftNurture(firstName: string, company: string): string {
  const primaryGreen = "#10B981";
  const darkDeep = "#020617";
  const calendlyLink = "https://calendly.com/denisse-nearshorenavigator/30min";

  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkDeep}">
      <tr>
        <td style="padding: 40px; font-family: sans-serif; font-size: 16px; line-height: 1.6; color: #94A3B8;">
          <p>Hi ${firstName},</p>
          <p>I thought you might find this cost-breakdown useful for <b>${company}</b>. It shows the difference between a shelter-service setup vs. a standalone entity in Baja for medical device assembly.</p>
          <p>Most manufacturers I work with are surprised that the overhead is actually <b>~25% lower</b> on the shelter side because of the shared compliance and payroll infrastructure.</p>
          <p>I've attached the full PDF breakdown here for your review.</p>
          <p>If you have any questions about how these margins would look for your specific headcount, you can grab a few minutes on my calendar below.</p>
          <p><a href="${calendlyLink}" style="color: ${primaryGreen}; font-weight: bold; text-decoration: none;">Book a 15-Min Discovery Call →</a></p>
          <br>
          <p>Best,<br>Denisse</p>
        </td>
      </tr>
    </table>
  `;
}

function buildShortlistNurture(firstName: string, company: string): string {
  const primaryGreen = "#10B981";
  const darkDeep = "#020617";
  const calendlyLink = "https://calendly.com/denisse-nearshorenavigator/30min";

  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkDeep}">
      <tr>
        <td style="padding: 40px; font-family: sans-serif; font-size: 16px; line-height: 1.6; color: #94A3B8;">
          <p>Hi ${firstName},</p>
          <p>Following up on my note about ${company}'s nearshore strategy. Most US medical device companies looking at Baja right now are converging on the same 3 industrial parks/partners because of their existing ISO 13485 certifications.</p>
          <p>I've put together a quick case study on why these 3 specific sites currently have the best labor stability in the region.</p>
          <p>Would you like me to send over the PDF?</p>
          <p>Or, if you're ready to look at specific floor plans, we can jump on a quick call.</p>
          <p><a href="${calendlyLink}" style="color: ${primaryGreen}; font-weight: bold; text-decoration: none;">Book a 15-Min Discovery Call →</a></p>
          <br>
          <p>Best,<br>Denisse</p>
        </td>
      </tr>
    </table>
  `;
}

main().catch(console.error);
