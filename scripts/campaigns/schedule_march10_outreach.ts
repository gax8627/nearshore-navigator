/**
 * March 10th Cold Outreach — 1,000 Fresh Leads
 *
 * KEY CHANGES vs March 9:
 * ✅ BATCH_LIMIT bumped to 1,000
 * ✅ Scheduled for 10:00 AM MT (17:00 UTC)
 * ✅ Dedupes against all previous sent logs (march3 → march9) + engagement_data
 * ✅ Adds Medical-Aerospace-Baja + feb17/ JSON datasets as new lead sources
 * ✅ New copy variant: supply-chain resilience angle (3rd hook, avoids fatigue)
 * ✅ A/B subject line test continues: Format A curiosity vs Format B personalized
 *
 * Run preview:  npx tsx scripts/campaigns/schedule_march10_outreach.ts --dry-run
 * Run for real: npx tsx scripts/campaigns/schedule_march10_outreach.ts
 */

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import dotenv from 'dotenv';
import { brevo } from '../../lib/brevo';
import { incrementEmailUsage, hasEmailBudget } from '../../lib/email-usage-tracker';

const CSV_DIR = path.join(process.cwd(), 'segmented_leads');
const SENT_LOG_PATH = path.join(process.cwd(), 'scripts/sent_march10_outreach.json');

// ─── All Previous Sent Logs (Comprehensive Dedupe) ───────────────────────────
const PREVIOUS_SENT_LOGS = [
  // March 3 original batch
  path.join(CSV_DIR, 'sent_1k_batch_march3.json'),
  // Early manufacturing outreach
  path.join(CSV_DIR, 'sent_manufacturing_outreach.json'),
  // Monday clicker segments
  path.join(CSV_DIR, 'monday_clickers.json'),
  // CRM-processed leads
  path.join(process.cwd(), 'scripts/processed_leads.json'),
  // March 5–9 campaigns
  path.join(process.cwd(), 'scripts/sent_march5_outreach.json'),
  path.join(process.cwd(), 'scripts/sent_march6_outreach.json'),
  path.join(process.cwd(), 'scripts/sent_march6_nurture.json'),
  path.join(process.cwd(), 'scripts/sent_march9_outreach.json'),
  path.join(process.cwd(), 'scripts/sent_march9_nurture.json'),
];

const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_LIMIT = 1000;

// 10:00 AM Mountain Time = 17:00 UTC (MT is UTC-7 in March, before DST)
const SCHEDULED_AT = '2026-03-10T17:00:00.000Z';

const envPath = path.join(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

async function main() {
  console.log('\n🚀 March 10th Cold Outreach — 1,000 Fresh Leads (10 AM MT / 17:00 UTC)');
  console.log(DRY_RUN ? '  [DRY RUN — no emails will be sent]\n' : '  [LIVE — emails will be scheduled via Brevo]\n');

  if (!DRY_RUN && !process.env.BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not set.');
    process.exit(1);
  }

  // ─── 1. Build Dedupe Set ──────────────────────────────────────────────────
  const sentSet = new Set<string>();

  // Engagement data covers all tracked contacts (opened, clicked, replied)
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

  // ─── 2. Target CSV Files ──────────────────────────────────────────────────
  const TARGET_CSV_FILES = [
    // Machine shops — Southwest + Texas
    'Machine-shop-Phoenix-AZ-Companies.csv',
    'Machine-shop-Austin-TX-Companies.csv',
    'Machine-shop-San-Diego-CA-Companies.csv',
    'Machine-shop-Irvine-CA-Companies.csv',
    'Machine-shop-Los-Angeles-CA-Companies.csv',
    'Machine-shop-Orange-CA-Companies.csv',
    'Machine-shop-Riverside-CA-Companies.csv',
    'Machine-shop-Mesa-AZ-Companies.csv',
    'Machine-shop-Tucson-AZ-Companies.csv',
    'Machine-shop-El-Paso-TX-Companies.csv',
    '1Machine-shop-El-Paso-TX-Companies.csv', // duplicate file with different name prefix
    // Medical equipment manufacturers
    'Medical-equipment-manufacturer-Houston-TX-Companies.csv',
    'Medical-equipment-manufacturer-Los-Angeles-CA-Companies.csv',
    'Medical-equipment-manufacturer-San-Jose-CA-Companies.csv',
    'Medical-equipment-manufacturer-Dallas-TX-Companies.csv',
    'Medical-equipment-manufacturer-Cleveland-OH-Companies.csv',
    'Medical-equipment-manufacturer-Detroit-MI-Companies.csv',
    'Medical-equipment-manufacturer-Seattle-WA-Companies.csv',
    // Segmented batches
    'manufacturing_new_batch.csv',
    'medical_new_batch.csv',
    'segmented_leads_tier_1.csv',
    'segmented_leads_tier_2.csv',
    'segmented_leads_tier_3.csv',
    // Generic timestamp-named batches
    ...fs.readdirSync(CSV_DIR).filter(f => f.startsWith('Leads_') && f.endsWith('.csv')),
  ];

  const leads: Array<{ email: string; firstName: string; company: string; city: string }> = [];
  const seenInCurrentRun = new Set<string>();

  // ── 2a. Load CSV sources ──────────────────────────────────────────────────
  for (const file of TARGET_CSV_FILES) {
    if (leads.length >= BATCH_LIMIT) break;
    const filePath = path.join(CSV_DIR, file);
    if (!fs.existsSync(filePath)) continue;

    try {
      const rawContent = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '').replace(/^ï»¿/, '');
      const rows = parse(rawContent, { columns: true, skip_empty_lines: true, trim: true }) as any[];

      for (const r of rows) {
        if (leads.length >= BATCH_LIMIT) break;
        const get = (key: string) => r[key] || r['\uFEFF' + key] || '';
        const email = (
          get('Contact Email') || get('Email') || get('Business Email') || get('Lead Email')
        ).toLowerCase().trim();
        const firstName = get('Contact First Name') || get('First Name') || get('FirstName') || '';
        const company = get('Business') || get('Company') || get('Account Name') || '';
        const city = get('City') || get('Location') || 'your area';

        if (!email || !email.includes('@')) continue;
        const domain = email.split('@')[1];
        if (!domain || !domain.includes('.') || domain.length < 4) continue;
        if (sentSet.has(email) || seenInCurrentRun.has(email)) continue;

        seenInCurrentRun.add(email);
        leads.push({ email, firstName: firstName || company.split(' ')[0] || 'there', company, city });
      }
    } catch {
      console.warn(`  ⚠️  Error parsing ${file}`);
    }
  }

  // ── 2b. Load JSON lead sources (Medical-Aerospace-Baja + feb17 tiers) ─────
  const JSON_LEAD_SOURCES = [
    path.join(CSV_DIR, 'Medical-Aerospace-Baja'),
    path.join(CSV_DIR, 'feb17', 'tier1_med_device.json'),
    path.join(CSV_DIR, 'feb17', 'tier2_manufacturing.json'),
  ];

  for (const jsonPath of JSON_LEAD_SOURCES) {
    if (leads.length >= BATCH_LIMIT) break;
    if (!fs.existsSync(jsonPath)) continue;

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
        leads.push({ email, firstName: firstName || company.split(' ')[0] || 'there', company, city });
      }
    } catch {
      console.warn(`  ⚠️  Could not parse ${path.basename(jsonPath)}`);
    }
  }

  console.log(`📋 Total unique fresh leads found: ${leads.length} (Targeting: ${BATCH_LIMIT})`);

  if (leads.length === 0) {
    console.log('✨ No new leads to send to — all contacts already reached.');
    process.exit(0);
  }

  if (leads.length < BATCH_LIMIT) {
    console.warn(`⚠️  Only ${leads.length} fresh leads available (target was ${BATCH_LIMIT}). Sending all available.`);
  }

  // ─── 3. Schedule Emails ───────────────────────────────────────────────────
  let sentCount = 0;
  const existingSent: string[] = fs.existsSync(SENT_LOG_PATH)
    ? JSON.parse(fs.readFileSync(SENT_LOG_PATH, 'utf-8') || '[]')
    : [];

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];

    // A/B subject line: Format A (curiosity) vs Format B (personalized company name)
    const useFormatA = i % 2 === 0;
    const subject = useFormatA
      ? 'Mexico manufacturing option for your supply chain?'       // Format A — curiosity hook
      : `${lead.company} — Baja California supply chain shortlist?`; // Format B — personalized

    const html = buildEmail(lead.firstName, lead.company, lead.city);

    if (DRY_RUN) {
      if (i < 5) {
        console.log(`[DRY RUN] → ${lead.email} | ${lead.company} | ${lead.city}`);
        console.log(`           Subject: ${subject}`);
      }
      if (i === 5) console.log('  ... (showing first 5 only)');
      sentCount++;
    } else {
      try {
        if (!hasEmailBudget()) {
          console.error('❌ Monthly email budget exhausted — stopping early.');
          break;
        }

        await brevo.sendEmail({
          to: [{ email: lead.email, name: lead.firstName }],
          subject,
          htmlContent: html,
          scheduledAt: SCHEDULED_AT,
        });

        incrementEmailUsage(1);
        existingSent.push(lead.email);
        sentCount++;

        if (sentCount % 50 === 0) {
          console.log(`  ⏳ Scheduled ${sentCount} / ${leads.length}...`);
          fs.writeFileSync(SENT_LOG_PATH, JSON.stringify(existingSent, null, 2));
        }

        // 800ms delay — Brevo rate-limit safeguard (same as march9)
        await new Promise(r => setTimeout(r, 800));
      } catch (e: any) {
        console.error(`  ❌ Failed for ${lead.email}: ${e.message}`);
      }
    }
  }

  // ─── 4. Save Log ─────────────────────────────────────────────────────────
  if (!DRY_RUN) {
    fs.writeFileSync(SENT_LOG_PATH, JSON.stringify(existingSent, null, 2));
    console.log(`\n✅ Done! ${sentCount} emails queued for Mar 10 @ 10AM MT (17:00 UTC).`);
    console.log(`   Log saved → ${SENT_LOG_PATH}`);
  } else {
    console.log(`\n✅ Dry run complete.`);
    console.log(`   ${sentCount} emails would be scheduled for ${SCHEDULED_AT}`);
    console.log(`   Format A (curiosity): ~${Math.ceil(sentCount / 2)} emails`);
    console.log(`   Format B (personalized): ~${Math.floor(sentCount / 2)} emails`);
  }
}

// ─── Email Builder ────────────────────────────────────────────────────────────
function buildEmail(firstName: string, company: string, city: string): string {
  const primaryGreen = '#10B981';
  const darkDeep = '#020617';
  const glassBg = '#0F172A';
  const glassBorder = '#1E293B';
  const textMuted = '#94A3B8';
  const signatureBanner = 'https://nearshorenavigator.com/images/denisse-banner.jpg';
  const calendlyLink = 'https://calendly.com/denisse-nearshorenavigator/30min';

  // NEW COPY VARIANT: Supply-chain resilience angle (3rd hook — avoids tariff fatigue)
  const content = `
    <p>Hi ${firstName},</p>
    <p>With supply chains being re-evaluated across <strong>${city}</strong>, I wanted to reach out directly.</p>
    <p>A number of manufacturers are quietly moving parts of their production to <strong>Baja California</strong> — not just for cost, but for supply chain resilience: <strong>USMCA-compliant</strong>, within a 2-hour drive of most Southwest US logistics hubs, and with certified partners already operating at AS9100 / ISO 13485 standards.</p>
    <p>I put together a shortlist process for companies like <strong>${company}</strong> — 3 vetted Baja CM partners matched to your product category and volume. No cost, no commitment, just something concrete to benchmark against.</p>
    <p>If that's useful, just reply <strong>"yes"</strong> and I'll send it over as a PDF this week.</p>
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
                <!-- PRIMARY CTA: Reply Yes -->
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;" width="100%">
                  <tr>
                    <td align="center" bgcolor="${primaryGreen}" style="border-radius: 16px;">
                      <a href="mailto:denisse@nearshorenavigator.com?subject=Baja%20partner%20shortlist%20for%20${encodeURIComponent(company)}" style="display: block; padding: 22px 48px; font-family: sans-serif; text-decoration: none; color: #000000; font-weight: 800; font-size: 16px; text-transform: uppercase;">
                        Reply "Yes" To Receive The PDF Shortlist
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
