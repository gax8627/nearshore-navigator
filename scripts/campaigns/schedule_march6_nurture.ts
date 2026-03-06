/**
 * March 6th Warm Nurture — 250 Engaged Leads
 * 
 * AUDIT RECOMMENDATIONS APPLIED:
 * ✅ Separate nurture track for 780 engaged contacts
 * ✅ Case study content instead of cold pitch
 * ✅ Calendly CTA for direct booking
 * ✅ Different content for clickers vs openers
 * 
 * Run preview:  npx tsx scripts/campaigns/schedule_march6_nurture.ts --dry-run
 * Run for real: npx tsx scripts/campaigns/schedule_march6_nurture.ts
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { brevo } from '../../lib/brevo';
import { incrementEmailUsage, hasEmailBudget } from '../../lib/email-usage-tracker';

const envPath = path.join(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

const ENGAGEMENT_PATH = path.join(process.cwd(), 'scripts/engagement_data.json');
const SENT_LOG_PATH = path.join(process.cwd(), 'scripts/sent_march6_nurture.json');
const MARCH5_OUTREACH = path.join(process.cwd(), 'scripts/sent_march5_outreach.json');
const MARCH6_OUTREACH = path.join(process.cwd(), 'scripts/sent_march6_outreach.json');

const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_LIMIT = 250;
const SCHEDULED_AT = "2026-03-06T17:00:00.000Z"; // March 6, 9:00 AM PST

async function main() {
  console.log('\n🎯 March 6th Warm Nurture — 250 Engaged Leads (9 AM PST)');
  console.log(DRY_RUN ? '  [DRY RUN — no emails will be sent]\n' : '  [LIVE — emails will be scheduled via Brevo]\n');

  if (!DRY_RUN && !process.env.BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not set.');
    process.exit(1);
  }

  // 1. Load Engagement Data
  const engagement: Record<string, any> = JSON.parse(fs.readFileSync(ENGAGEMENT_PATH, 'utf-8'));
  
  // 2. Exclude anyone already being sent cold outreach today
  const excludeSet = new Set<string>();
  for (const logPath of [MARCH5_OUTREACH, MARCH6_OUTREACH]) {
    if (fs.existsSync(logPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
        if (Array.isArray(data)) data.forEach(e => excludeSet.add(typeof e === 'string' ? e.toLowerCase() : ''));
      } catch {}
    }
  }
  // Exclude anyone already nurtured today
  if (fs.existsSync(SENT_LOG_PATH)) {
    try {
      const data = JSON.parse(fs.readFileSync(SENT_LOG_PATH, 'utf-8'));
      if (Array.isArray(data)) data.forEach(e => excludeSet.add(typeof e === 'string' ? e.toLowerCase() : ''));
    } catch {}
  }

  // 3. Segment Engaged Leads
  const clickers: { email: string; events: number; lastSubject: string }[] = [];
  const openers: { email: string; events: number; lastSubject: string }[] = [];

  for (const [email, data] of Object.entries(engagement) as [string, any][]) {
    if (excludeSet.has(email.toLowerCase())) continue;
    
    const lastSubject = data.history?.[0]?.subject || '';
    const eventCount = data.history?.length || 0;

    if (data.status === 'clicked') {
      clickers.push({ email, events: eventCount, lastSubject });
    } else if (data.status === 'opened') {
      openers.push({ email, events: eventCount, lastSubject });
    }
  }

  // Sort by engagement depth (most engaged first)
  clickers.sort((a, b) => b.events - a.events);
  openers.sort((a, b) => b.events - a.events);

  console.log(`📊 Engagement Pool:`);
  console.log(`   Clickers: ${clickers.length} (high intent)`);
  console.log(`   Openers:  ${openers.length} (warm)`);

  // 4. Build the batch — prioritize clickers, then openers
  const batch = [
    ...clickers.slice(0, Math.min(150, clickers.length)),
    ...openers.slice(0, Math.min(BATCH_LIMIT - Math.min(150, clickers.length), openers.length))
  ].slice(0, BATCH_LIMIT);

  console.log(`📋 Nurture batch: ${batch.length} leads (${batch.filter(b => clickers.includes(b)).length} clickers, ${batch.filter(b => openers.includes(b)).length} openers)\n`);

  if (batch.length === 0) {
    console.log('✨ No engaged leads to nurture!');
    process.exit(0);
  }

  let sentCount = 0;
  const sentEmails: string[] = fs.existsSync(SENT_LOG_PATH) ? JSON.parse(fs.readFileSync(SENT_LOG_PATH, 'utf-8') || '[]') : [];

  for (let i = 0; i < batch.length; i++) {
    const lead = batch[i];
    const isClicker = clickers.some(c => c.email === lead.email);
    const { subject, html } = buildNurtureEmail(lead.email, isClicker);

    if (DRY_RUN) {
      if (i < 5) console.log(`[DRY RUN] ${isClicker ? '🔥 CLICKER' : '👀 OPENER'} | ${lead.email} | Events: ${lead.events} | Subject: ${subject}`);
      sentCount++;
    } else {
      try {
        if (!hasEmailBudget()) {
          console.error('❌ Monthly email budget exhausted!');
          break;
        }

        await brevo.sendEmail({
          to: [{ email: lead.email }],
          subject,
          htmlContent: html,
          scheduledAt: SCHEDULED_AT
        });
        
        incrementEmailUsage(1);
        sentEmails.push(lead.email);
        sentCount++;
        
        if (sentCount % 25 === 0) {
          console.log(`  ⏳ Scheduled ${sentCount} nurture emails so far...`);
          fs.writeFileSync(SENT_LOG_PATH, JSON.stringify(sentEmails, null, 2));
        }

        await new Promise(r => setTimeout(r, 800));
      } catch (e: any) {
        console.error(`  ❌ Failed for ${lead.email}: ${e.message}`);
      }
    }
  }

  if (!DRY_RUN) {
    fs.writeFileSync(SENT_LOG_PATH, JSON.stringify(sentEmails, null, 2));
    console.log(`\n✅ Nurture scheduling complete! ${sentCount} emails queued for Mar 6 @ 9AM PT.`);
  } else {
    console.log(`\n✅ Dry run complete. ${sentCount} nurture emails would be scheduled.`);
  }
}

function buildNurtureEmail(email: string, isClicker: boolean): { subject: string; html: string } {
  // Different content for clickers (high intent) vs openers (warm)
  const subject = isClicker
    ? `The 3 factories our clients keep choosing in Baja`
    : `Quick case study: 42% cost reduction in 90 days`;

  const primaryGreen = "#10B981";
  const darkDeep = "#020617";
  const glassBg = "#0F172A";
  const glassBorder = "#1E293B";
  const textMuted = "#94A3B8";
  const signatureBanner = "https://nearshorenavigator.com/images/denisse-banner.jpg";
  const calendlyLink = "https://calendly.com/denisse-nearshorenavigator/30min";

  const clickerContent = `
    <p>Hi there,</p>
    <p>I noticed you've been researching nearshore manufacturing — and I wanted to share something concrete instead of another generic pitch.</p>
    <p>We recently placed <strong>three US manufacturers</strong> with certified partners in Baja California. Here's what they all had in common:</p>
    <ul style="color: ${textMuted}; line-height: 2;">
      <li>🏭 <strong>ISO 13485 / AS9100 certified</strong> — no quality compromises</li>
      <li>📦 <strong>Same-day truck delivery</strong> to San Diego / LA distribution</li>
      <li>💰 <strong>38–52% fully-burdened labor savings</strong> vs. domestic</li>
      <li>🛡️ <strong>USMCA duty-free</strong> — 0% tariff on finished goods to US</li>
    </ul>
    <p>I can share the <strong>anonymized case study PDF</strong> with actual cost breakdowns — or if you'd prefer, let's jump on a quick 15-minute call and I'll walk you through the numbers live.</p>
  `;

  const openerContent = `
    <p>Hi there,</p>
    <p>Quick case study I thought might be relevant:</p>
    <p>A <strong>San Diego-based medical device company</strong> was paying $28/hr fully burdened for assembly labor. We matched them with an ISO 13485-certified facility in Tijuana — <strong>20 minutes from their HQ</strong>.</p>
    <p><strong>Result:</strong> $16.20/hr fully burdened. That's a <strong>42% cost reduction</strong> with zero quality compromise. They were producing within 90 days using a shelter service (no Mexican legal entity needed).</p>
    <p>If you're evaluating something similar, I'd be happy to share the full breakdown or put together a shortlist of partners specific to your product.</p>
  `;

  const content = isClicker ? clickerContent : openerContent;

  const html = `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkDeep}" style="background-color: ${darkDeep}; table-layout: fixed;">
      <tr>
        <td align="center" style="padding: 60px 10px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; border-radius: 32px; overflow: hidden; border: 1px solid ${glassBorder};" bgcolor="${glassBg}">
            <tr><td height="12" bgcolor="${primaryGreen}"></td></tr>
            <tr>
              <td style="padding: 56px 48px;">
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 48px;">
                  <tr>
                    <td width="42" valign="middle">
                      <table border="0" cellpadding="0" cellspacing="0" bgcolor="${primaryGreen}" style="border-radius: 12px; width: 42px; height: 42px;">
                        <tr><td align="center" style="color: #000; font-family: sans-serif; font-weight: 900; font-size: 24px; line-height: 42px;">N</td></tr>
                      </table>
                    </td>
                    <td style="padding-left: 16px; font-family: sans-serif; font-size: 22px; font-weight: 700; color: #ffffff; text-transform: uppercase;">
                      Nearshore <span style="color: ${primaryGreen};">Navigator</span>
                    </td>
                  </tr>
                </table>
                <div style="font-family: sans-serif; font-size: 17px; line-height: 1.8; color: ${textMuted}; margin-bottom: 56px;">
                  ${content}
                </div>
                <!-- PRIMARY CTA: Book a Call (Calendly) -->
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;" width="100%">
                  <tr>
                    <td align="center" bgcolor="${primaryGreen}" style="border-radius: 16px;">
                      <a href="${calendlyLink}" style="display: block; padding: 22px 48px; font-family: sans-serif; text-decoration: none; color: #000000; font-weight: 800; font-size: 16px; text-transform: uppercase;">
                        Book a 15-Min Discovery Call
                      </a>
                    </td>
                  </tr>
                </table>
                <!-- SECONDARY CTA: Reply for PDF -->
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 80px;" width="100%">
                  <tr>
                    <td align="center" style="border-radius: 16px; border: 2px solid ${primaryGreen};">
                      <a href="mailto:denisse@nearshorenavigator.com?subject=Send%20me%20the%20case%20study%20PDF" style="display: block; padding: 18px 48px; font-family: sans-serif; text-decoration: none; color: ${primaryGreen}; font-weight: 700; font-size: 14px; text-transform: uppercase;">
                        Or Reply For The Case Study PDF →
                      </a>
                    </td>
                  </tr>
                </table>
                <img src="${signatureBanner}" width="544" style="display: block; width: 100%; height: auto; border: 1px solid ${primaryGreen}30; border-radius: 24px;" alt="Denisse Martinez" />
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  return { subject, html };
}

main().catch(console.error);
