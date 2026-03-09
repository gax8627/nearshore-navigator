/**
 * March 9th Cold Outreach — 250 Fresh Leads
 * 
 * AUDIT RECOMMENDATIONS APPLIED:
 * ✅ Calendly CTA added as secondary action
 * ✅ Using Format B (Personalized) as primary subject line (Winner from March 6th)
 * ✅ Improved email copy with tariff urgency hook
 * 
 * Run preview:  npx tsx scripts/campaigns/schedule_march9_outreach.ts --dry-run
 * Run for real: npx tsx scripts/campaigns/schedule_march9_outreach.ts
 */

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import dotenv from 'dotenv';
import { brevo } from '../../lib/brevo';
import { incrementEmailUsage, hasEmailBudget } from '../../lib/email-usage-tracker';

const CSV_DIR = path.join(process.cwd(), 'segmented_leads');
const SENT_LOG_PATH = path.join(process.cwd(), 'scripts/sent_march9_outreach.json');

// All previous sent logs for deduplication
const PREVIOUS_SENT_LOGS = [
    path.join(CSV_DIR, 'sent_1k_batch_march3.json'),
    path.join(CSV_DIR, 'sent_manufacturing_outreach.json'),
    path.join(CSV_DIR, 'monday_clickers.json'),
    path.join(process.cwd(), 'scripts/processed_leads.json'),
    path.join(process.cwd(), 'scripts/sent_march5_outreach.json'),
    path.join(process.cwd(), 'scripts/sent_march6_outreach.json'),
    path.join(process.cwd(), 'scripts/sent_march6_nurture.json'),
];

const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_LIMIT = 250;
const SCHEDULED_AT = "2026-03-09T15:00:00.000Z"; // March 9, 8:00 AM PST

const envPath = path.join(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

async function main() {
  console.log('\n🚀 March 9th Cold Outreach — 250 New Leads (8 AM PST)');
  console.log(DRY_RUN ? '  [DRY RUN — no emails will be sent]\n' : '  [LIVE — emails will be scheduled via Brevo]\n');

  if (!DRY_RUN && !process.env.BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not set.');
    process.exit(1);
  }

  // 1. Load All Previous Sent Logs (Dedupe)
  const sentSet = new Set<string>();
  
  // Also load engagement data to avoid re-emailing engaged contacts (they go to nurture track)
  const engagementPath = path.join(process.cwd(), 'scripts/engagement_data.json');
  if (fs.existsSync(engagementPath)) {
    const engagement = JSON.parse(fs.readFileSync(engagementPath, 'utf-8'));
    Object.keys(engagement).forEach(email => sentSet.add(email.toLowerCase().trim()));
  }

  for (const logPath of PREVIOUS_SENT_LOGS) {
    if (fs.existsSync(logPath)) {
      try {
        const content = fs.readFileSync(logPath, 'utf-8');
        const data = JSON.parse(content);
        if (Array.isArray(data)) {
          data.forEach(item => {
            if (typeof item === 'string') sentSet.add(item.toLowerCase().trim());
            else if (item.email) sentSet.add(item.email.toLowerCase().trim());
          });
        } else if (typeof data === 'object') {
          Object.keys(data).forEach(k => sentSet.add(k.toLowerCase().trim()));
        }
      } catch (e) {
        console.warn(`Could not parse ${logPath}`);
      }
    }
  }

  console.log(`🚫 Excluding ${sentSet.size} previously contacted emails (including engaged contacts for nurture track)`);

  // 2. Target CSVs
  const TARGET_FILES = [
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
    'Medical-equipment-manufacturer-Houston-TX-Companies.csv',
    'Medical-equipment-manufacturer-Los-Angeles-CA-Companies.csv',
    'Medical-equipment-manufacturer-San-Jose-CA-Companies.csv',
    'Medical-equipment-manufacturer-Dallas-TX-Companies.csv',
    'Medical-equipment-manufacturer-Cleveland-OH-Companies.csv',
    'Medical-equipment-manufacturer-Detroit-MI-Companies.csv',
    'Medical-equipment-manufacturer-Seattle-WA-Companies.csv',
    'manufacturing_new_batch.csv',
    'medical_new_batch.csv',
    'segmented_leads_tier_1.csv',
    'segmented_leads_tier_2.csv',
    'segmented_leads_tier_3.csv',
    ...fs.readdirSync(CSV_DIR).filter(f => f.startsWith('Leads_') && f.endsWith('.csv')),
  ];

  const leads: any[] = [];
  const seenInCurrentRun = new Set<string>();

  for (const file of TARGET_FILES) {
    const filePath = path.join(CSV_DIR, file);
    if (!fs.existsSync(filePath)) continue;

    try {
      const rawContent = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '').replace(/^ï»¿/, '');
      const rows = parse(rawContent, { columns: true, skip_empty_lines: true, trim: true }) as any[];

      for (const r of rows) {
        const get = (key: string) => r[key] || r['\uFEFF' + key] || '';
        const email = (get('Contact Email') || get('Email') || get('Business Email') || get('Lead Email')).toLowerCase().trim();
        const firstName = get('Contact First Name') || get('First Name') || get('FirstName') || '';
        const company = get('Business') || get('Company') || get('Account Name') || '';
        const city = get('City') || get('Location') || 'your area';

        if (!email || !email.includes('@') || sentSet.has(email) || seenInCurrentRun.has(email)) continue;
        
        const domain = email.split('@')[1];
        if (!domain || !domain.includes('.') || domain.length < 4) continue;

        seenInCurrentRun.add(email);
        const resolvedFirstName = firstName || company.split(' ')[0] || 'there';
        
        leads.push({ email, firstName: resolvedFirstName, company, city });
        if (leads.length >= BATCH_LIMIT) break;
      }
    } catch (e) {
      console.warn(`  ⚠️  Error parsing ${file}`);
    }
    if (leads.length >= BATCH_LIMIT) break;
  }

  console.log(`📋 Total unique fresh leads found: ${leads.length} (Targeting: ${BATCH_LIMIT})`);

  if (leads.length === 0) {
    console.log('✨ No new leads to send to!');
    process.exit(0);
  }

  let sentCount = 0;
  const newlySent: string[] = [];
  const existingSent = fs.existsSync(SENT_LOG_PATH) ? JSON.parse(fs.readFileSync(SENT_LOG_PATH, 'utf-8') || '[]') : [];

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    // Subject B (Personalized) was the better performing subject
    const subject = `${lead.company} — Mexico manufacturing shortlist?`;
    const html = buildEmail(lead.firstName, lead.company, lead.city);

    if (DRY_RUN) {
      if (i < 5) console.log(`[DRY RUN] Would schedule to: ${lead.email} | ${lead.company} | Subject: ${subject}`);
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
        newlySent.push(lead.email);
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
    console.log(`\n✅ Scheduling complete! ${sentCount} new cold emails queued for Mar 9 @ 8AM PT.`);
  } else {
    console.log(`\n✅ Dry run complete. ${sentCount} emails would be scheduled.`);
  }
}

function buildEmail(firstName: string, company: string, city: string): string {
  const primaryGreen = "#10B981";
  const darkDeep = "#020617";
  const glassBg = "#0F172A";
  const glassBorder = "#1E293B";
  const textMuted = "#94A3B8";
  const signatureBanner = "https://nearshorenavigator.com/images/denisse-banner.jpg";
  const calendlyLink = "https://calendly.com/denisse-nearshorenavigator/30min";

  const content = `
    <p>Hi ${firstName},</p>
    <p>I work with mid-market manufacturers in <strong>${city}</strong> who are evaluating Mexico to offset the new tariff exposure — specifically the 2025 25–145% rates on Chinese components and sub-assemblies.</p>
    <p>Baja California is worth a look: <strong>20 minutes from San Diego</strong>, USMCA duty-free, and machine shops / CM partners with AS9100 and ISO 13485 already certified.</p>
    <p>Would it be useful if I put together a <strong>shortlist of 3 vetted Baja partners</strong> specific to what <strong>${company}</strong> manufactures? No call needed — I can send it over as a PDF so you have something concrete to compare against your current setup.</p>
    <p>Just reply "yes" to this email and I'll put it together this week.</p>
  `;

  return `
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
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;" width="100%">
                  <tr>
                    <td align="center" bgcolor="${primaryGreen}" style="border-radius: 16px;">
                      <a href="mailto:denisse@nearshorenavigator.com?subject=Mexico%20partner%20shortlist%20for%20our%20review" style="display: block; padding: 22px 48px; font-family: sans-serif; text-decoration: none; color: #000000; font-weight: 800; font-size: 16px; text-transform: uppercase;">
                        Reply "Yes" To Receive The PDF Shortlist
                      </a>
                    </td>
                  </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 80px;" width="100%">
                  <tr>
                    <td align="center" style="border-radius: 16px; border: 2px solid ${primaryGreen};">
                      <a href="${calendlyLink}" style="display: block; padding: 18px 48px; font-family: sans-serif; text-decoration: none; color: ${primaryGreen}; font-weight: 700; font-size: 14px; text-transform: uppercase;">
                        Or Book a 15-Min Discovery Call →
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
}

main().catch(console.error);
