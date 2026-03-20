/**
 * March 18th Fresh Outreach — 500 New Leads
 *
 * Sources: JSON lead pools (tier2_manufacturing + tier1_med_device)
 * These are untapped — CSV pools are exhausted after 3,149 sends.
 *
 * Sales-Automator Skill Applied:
 * ✅ Lead with value, not features
 * ✅ Personalize using company + city research
 * ✅ Short, scannable, conversational
 * ✅ One clear CTA: reply "yes" for PDF shortlist
 * ✅ A/B subject line test (curiosity vs. specific)
 *
 * NEW COPY: Tariff-immunity angle (timely March 2026 hook)
 *
 * Run preview:  npx tsx scripts/campaigns/schedule_march18_outreach.ts --dry-run
 * Run for real: npx tsx scripts/campaigns/schedule_march18_outreach.ts
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { brevo } from '../../lib/brevo';

const CSV_DIR = path.join(process.cwd(), 'segmented_leads');
const SENT_LOG_PATH = path.join(process.cwd(), 'scripts/sent_march18_outreach.json');

const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_LIMIT = 500;

// Schedule for tomorrow 10:15 AM MT (17:15 UTC, post-DST MT=UTC-6 in March)
const SCHEDULED_AT = '2026-03-19T17:15:00.000Z';

const envPath = path.join(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

// ─── All Previous Sent Logs (Comprehensive Dedupe) ──────────────────────────
const PREVIOUS_SENT_LOGS = [
  path.join(CSV_DIR, 'sent_1k_batch_march3.json'),
  path.join(CSV_DIR, 'sent_manufacturing_outreach.json'),
  path.join(CSV_DIR, 'monday_clickers.json'),
  path.join(process.cwd(), 'scripts/processed_leads.json'),
  path.join(process.cwd(), 'scripts/sent_march5_outreach.json'),
  path.join(process.cwd(), 'scripts/sent_march6_outreach.json'),
  path.join(process.cwd(), 'scripts/sent_march6_nurture.json'),
  path.join(process.cwd(), 'scripts/sent_march9_outreach.json'),
  path.join(process.cwd(), 'scripts/sent_march9_nurture.json'),
  path.join(process.cwd(), 'scripts/sent_march10_outreach.json'),
  path.join(process.cwd(), 'scripts/sent_march18_nurture.json'),
];

async function main() {
  console.log('\n🚀 March 18th Fresh Outreach — 500 New Leads (10:15 AM MT / 17:15 UTC)');
  console.log(DRY_RUN ? '  [DRY RUN — no emails will be sent]\n' : '  [LIVE — emails will be scheduled via Brevo]\n');

  if (!DRY_RUN && !process.env.BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not set.');
    process.exit(1);
  }

  // ─── 1. Build Dedupe Set ──────────────────────────────────────────────────
  const sentSet = new Set<string>();

  // Engagement data
  const engagementPath = path.join(process.cwd(), 'scripts/engagement_data.json');
  if (fs.existsSync(engagementPath)) {
    const engagement = JSON.parse(fs.readFileSync(engagementPath, 'utf-8'));
    Object.keys(engagement).forEach(email => sentSet.add(email.toLowerCase().trim()));
  }

  for (const logPath of PREVIOUS_SENT_LOGS) {
    if (!fs.existsSync(logPath)) continue;
    try {
      const data = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
      if (Array.isArray(data)) {
        data.forEach(item => {
          if (typeof item === 'string') sentSet.add(item.toLowerCase().trim());
          else if (item?.email) sentSet.add(item.email.toLowerCase().trim());
        });
      } else if (typeof data === 'object') {
        Object.keys(data).forEach(k => sentSet.add(k.toLowerCase().trim()));
      }
    } catch {
      console.warn(`  ⚠️  Could not parse ${path.basename(logPath)}`);
    }
  }

  console.log(`🚫 Excluding ${sentSet.size} previously contacted emails`);

  // ─── 2. Load JSON Lead Sources ────────────────────────────────────────────
  const JSON_LEAD_SOURCES = [
    path.join(CSV_DIR, 'feb17', 'tier2_manufacturing.json'), // 8,230 fresh manufacturing leads — best vertical fit
  ];

  const leads: Array<{ email: string; firstName: string; company: string; city: string; tier: string }> = [];
  const seenInCurrentRun = new Set<string>();

  for (const jsonPath of JSON_LEAD_SOURCES) {
    if (leads.length >= BATCH_LIMIT) break;
    if (!fs.existsSync(jsonPath)) {
      console.warn(`  ⚠️  ${path.basename(jsonPath)} not found, skipping`);
      continue;
    }

    const tierLabel = jsonPath.includes('tier1') ? 'med_device' : 'manufacturing';

    try {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      const records: any[] = Array.isArray(data) ? data : Object.values(data);

      for (const r of records) {
        if (leads.length >= BATCH_LIMIT) break;
        const email = (
          r.email || r.Email || r.business_email || r['Contact Email'] || ''
        ).toLowerCase().trim();
        if (!email || !email.includes('@')) continue;
        const domain = email.split('@')[1];
        if (!domain || !domain.includes('.') || domain.length < 4) continue;
        if (sentSet.has(email) || seenInCurrentRun.has(email)) continue;

        const firstName = r.firstName || r.first_name || r['First Name'] || r['Contact First Name'] || '';
        const company = r.company || r.Company || r.Business || r['Account Name'] || '';
        const city = r.city || r.City || r.Location || 'your area';

        seenInCurrentRun.add(email);
        leads.push({
          email,
          firstName: firstName || company?.split(' ')[0] || 'there',
          company: company || '',
          city,
          tier: tierLabel,
        });
      }

      console.log(`  📂 ${path.basename(jsonPath)}: added ${leads.filter(l => l.tier === tierLabel).length} leads`);
    } catch (e: any) {
      console.warn(`  ⚠️  Could not parse ${path.basename(jsonPath)}: ${e.message}`);
    }
  }

  console.log(`📋 Total unique fresh leads: ${leads.length} (Target: ${BATCH_LIMIT})`);

  if (leads.length === 0) {
    console.log('✨ No new leads to send to — all contacts already reached.');
    process.exit(0);
  }

  // ─── 3. Schedule Emails ───────────────────────────────────────────────────
  let sentCount = 0;
  const existingSent: string[] = fs.existsSync(SENT_LOG_PATH)
    ? JSON.parse(fs.readFileSync(SENT_LOG_PATH, 'utf-8') || '[]')
    : [];

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];

    // A/B subject line: Format A (tariff-immunity) vs Format B (peer pressure)
    const useFormatA = i % 2 === 0;
    const subject = useFormatA
      ? 'Your competitors are already in Baja — here\'s the shortlist'  // Format A — peer pressure
      : `${lead.company || 'Your company'} + Mexico manufacturing = 0% tariffs?`; // Format B — personalized + tariff angle

    const html = buildEmail(lead.firstName, lead.company, lead.city);

    if (DRY_RUN) {
      if (i < 5) {
        console.log(`[DRY RUN] → ${lead.email} | ${lead.company} | ${lead.tier}`);
        console.log(`           Subject: ${subject}`);
      }
      if (i === 5) console.log('  ... (showing first 5 only)');
      sentCount++;
    } else {
      try {
        await brevo.sendEmail({
          to: [{ email: lead.email, name: lead.firstName }],
          subject,
          htmlContent: html,
          scheduledAt: SCHEDULED_AT,
        });

        existingSent.push(lead.email);
        sentCount++;

        if (sentCount % 50 === 0) {
          console.log(`  ⏳ Scheduled ${sentCount} / ${leads.length}...`);
          fs.writeFileSync(SENT_LOG_PATH, JSON.stringify(existingSent, null, 2));
        }

        // 800ms delay — Brevo rate-limit safeguard
        await new Promise(r => setTimeout(r, 800));
      } catch (e: any) {
        console.error(`  ❌ Failed for ${lead.email}: ${e.message}`);
      }
    }
  }

  // ─── 4. Save Log ─────────────────────────────────────────────────────────
  if (!DRY_RUN) {
    fs.writeFileSync(SENT_LOG_PATH, JSON.stringify(existingSent, null, 2));
    console.log(`\n✅ Done! ${sentCount} emails queued for Mar 19 @ 10:15AM MT.`);
    console.log(`   Log saved → ${SENT_LOG_PATH}`);
  } else {
    console.log(`\n✅ Dry run complete.`);
    console.log(`   ${sentCount} emails would be scheduled for ${SCHEDULED_AT}`);
    console.log(`   Format A (peer pressure): ~${Math.ceil(sentCount / 2)} emails`);
    console.log(`   Format B (tariff + company): ~${Math.floor(sentCount / 2)} emails`);
    console.log(`   Med Device leads: ${leads.filter(l => l.tier === 'med_device').length}`);
    console.log(`   Manufacturing leads: ${leads.filter(l => l.tier === 'manufacturing').length}`);
  }
}

// ─── Email Builder (Sales-Automator: value-led, tariff-immunity hook) ────────
function buildEmail(firstName: string, company: string, city: string): string {
  const primaryGreen = '#10B981';
  const darkDeep = '#020617';
  const glassBg = '#0F172A';
  const glassBorder = '#1E293B';
  const textMuted = '#94A3B8';
  const signatureBanner = 'https://nearshorenavigator.com/images/denisse-banner.jpg';
  const calendlyLink = 'https://calendly.com/denisse-nearshorenavigator/30min?month=2026-03&date=2026-03-24';

  // NEW HOOK: Tariff-immunity + March 2026 timeliness
  const content = `
    <p>Hi ${firstName},</p>
    <p>Quick question — has ${company || 'your team'} looked at <strong>Mexico manufacturing</strong> as a tariff hedge yet?</p>
    <p>3 things our clients in <strong>${city}</strong> keep telling us they didn't expect:</p>
    <ol style="color: ${textMuted}; line-height: 2.2;">
      <li><strong>Zero tariffs</strong> on goods manufactured in Mexico under USMCA — even with the 2026 renegotiation noise</li>
      <li>A <strong>2-hour drive</strong> from most Southwest US logistics hubs — closer than most domestic options</li>
      <li>Partners already operating at <strong>ISO 13485 / AS9100 / IATF 16949</strong> standards (not building up to them)</li>
    </ol>
    <p>We put together a shortlist of <strong>3 vetted Baja California contract manufacturers</strong> matched to your product category. No cost, no commitment — just a concrete benchmark.</p>
    <p>Reply <strong>"yes"</strong> and I'll send it as a PDF this week.</p>
  `;

  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkDeep}" style="background-color: ${darkDeep}; table-layout: fixed;">
      <tr>
        <td align="center" style="padding: 60px 10px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; border-radius: 32px; overflow: hidden; border: 1px solid ${glassBorder};" bgcolor="${glassBg}">
            <tr><td height="12" bgcolor="${primaryGreen}"></td></tr>
            <tr>
              <td style="padding: 56px 48px;">
                <!-- Logo -->
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
                <!-- Body -->
                <div style="font-family: sans-serif; font-size: 17px; line-height: 1.8; color: ${textMuted}; margin-bottom: 56px;">
                  ${content}
                </div>
                <!-- PRIMARY CTA -->
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;" width="100%">
                  <tr>
                    <td align="center" bgcolor="${primaryGreen}" style="border-radius: 16px;">
                      <a href="mailto:denisse@nearshorenavigator.com?subject=Baja%20partner%20shortlist%20for%20${encodeURIComponent(company)}" style="display: block; padding: 22px 48px; font-family: sans-serif; text-decoration: none; color: #000000; font-weight: 800; font-size: 16px; text-transform: uppercase;">
                        Reply "Yes" — Get The PDF Shortlist
                      </a>
                    </td>
                  </tr>
                </table>
                <!-- SECONDARY CTA: Calendly -->
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 80px;" width="100%">
                  <tr>
                    <td align="center" style="border-radius: 16px; border: 2px solid ${primaryGreen};">
                      <a href="${calendlyLink}" style="display: block; padding: 18px 48px; font-family: sans-serif; text-decoration: none; color: ${primaryGreen}; font-weight: 700; font-size: 14px; text-transform: uppercase;">
                        Or Book a 15-Min Discovery Call →
                      </a>
                    </td>
                  </tr>
                </table>
                <!-- Signature Banner -->
                <img src="${signatureBanner}" width="544" style="display: block; width: 100%; height: auto; border: 1px solid ${primaryGreen}30; border-radius: 24px;" alt="Denisse Martinez — Nearshore Navigator" />
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

main().catch(console.error);
