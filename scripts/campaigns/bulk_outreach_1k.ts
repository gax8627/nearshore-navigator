/**
 * Bulk Outreach 1k - Manufacturing ICP
 * 
 * Targets 1,000 fresh leads from machine shop and medical device CSVs.
 * Uses the high-performing tariff-angle pitch (54% open rate).
 * 
 * Run preview:  npx tsx scripts/campaigns/bulk_outreach_1k.ts --dry-run
 * Run for real: npx tsx scripts/campaigns/bulk_outreach_1k.ts
 */

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import dotenv from 'dotenv';

const CSV_DIR = path.join(process.cwd(), 'segmented_leads');
const SENT_LOG_PATH = path.join(CSV_DIR, 'sent_1k_batch_march3.json');
const PREVIOUS_SENT_LOG = path.join(CSV_DIR, 'sent_manufacturing_outreach.json');
const CLICKERS_LOG = path.join(CSV_DIR, 'monday_clickers.json');
const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_LIMIT = 1000;

// ─── Environment Setup ────────────────────────────────────────────────────────
const envPath = path.join(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

async function main() {
  const { brevo } = await import('../../lib/brevo');
  const { hasEmailBudget, incrementEmailUsage, getEmailBudget } = await import('../../lib/email-usage-tracker');

  console.log('\n🚀 Bulk 1k Manufacturing Outreach Campaign');
  console.log(DRY_RUN ? '  [DRY RUN — no emails will be sent]\n' : '  [LIVE — emails will be sent via Brevo]\n');

  if (!DRY_RUN && !process.env.BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not set.');
    process.exit(1);
  }

  if (!DRY_RUN && !hasEmailBudget()) {
    const b = getEmailBudget();
    console.error(`❌ Monthly email budget reached (${b.current}/${b.limit}). Aborting.`);
    process.exit(1);
  }

  // ─── Load Sent Logs (Dedupe) ────────────────────────────────────────────────
  const sentSet = new Set<string>();
  [SENT_LOG_PATH, PREVIOUS_SENT_LOG].forEach(p => {
    if (fs.existsSync(p)) {
      try {
        const arr = JSON.parse(fs.readFileSync(p, 'utf-8'));
        arr.forEach((e: string) => sentSet.add(e.toLowerCase().trim()));
      } catch {}
    }
  });

  if (fs.existsSync(CLICKERS_LOG)) {
    try {
      const clickers = JSON.parse(fs.readFileSync(CLICKERS_LOG, 'utf-8'));
      clickers.forEach((c: any) => sentSet.add(c.email.toLowerCase().trim()));
    } catch {}
  }

  // ─── Target CSVs ────────────────────────────────────────────────────────────
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
    'Medical-equipment-manufacturer-Houston-TX-Companies.csv',
    'Medical-equipment-manufacturer-Los-Angeles-CA-Companies.csv',
    'Medical-equipment-manufacturer-San-Jose-CA-Companies.csv',
    'Medical-equipment-manufacturer-Dallas-TX-Companies.csv',
    'manufacturing_new_batch.csv',
    'medical_new_batch.csv',
  ];

  // ─── Load Leads ─────────────────────────────────────────────────────────────
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
        const email = (get('Contact Email') || get('Email') || get('Business Email')).toLowerCase().trim();
        const firstName = get('Contact First Name') || get('First Name') || get('FirstName') || '';
        const company = get('Business') || get('Company') || get('Account Name') || '';
        const city = get('City') || get('Location') || 'your area';

        if (!email || !email.includes('@') || sentSet.has(email) || seenInCurrentRun.has(email)) continue;
        
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

  console.log(`📋 Total unique fresh leads found: ${leads.length}`);

  if (leads.length === 0) {
    console.log('✨ No new leads to send to! All processed or already in logs.');
    process.exit(0);
  }

  // ─── Send Loop ──────────────────────────────────────────────────────────────
  let sentCount = 0;
  const newlySent: string[] = [];

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const { subject, html } = buildEmail(lead.firstName, lead.company, lead.city);

    if (DRY_RUN) {
      if (i < 5) console.log(`[DRY RUN] Would send to: ${lead.email} | ${lead.company}`);
      sentCount++;
    } else {
      try {
        await brevo.sendEmail({
          to: [{ email: lead.email, name: lead.firstName }],
          subject,
          htmlContent: html,
        });
        incrementEmailUsage(1);
        newlySent.push(lead.email);
        sentCount++;
        
        if (sentCount % 10 === 0) {
          console.log(`  ✅ Progress: ${sentCount}/${leads.length} sent...`);
          // Periodic save to avoid data loss on crash
          fs.writeFileSync(SENT_LOG_PATH, JSON.stringify(newlySent, null, 2));
        }

        // Rate limit: 800ms between calls to be safe with Brevo
        await new Promise(r => setTimeout(r, 800));
      } catch (e: any) {
        console.error(`  ❌ Failed for ${lead.email}: ${e.message}`);
      }
    }
  }

  if (!DRY_RUN) {
    fs.writeFileSync(SENT_LOG_PATH, JSON.stringify(newlySent, null, 2));
    console.log(`\n✅ Campaign complete. Total sent: ${sentCount}`);
  } else {
    console.log(`\n✅ Dry run complete. ${sentCount} potential leads identified.`);
  }
}

function buildEmail(firstName: string, company: string, city: string): { subject: string; html: string } {
  const subject = `${company} — Mexico manufacturing shortlist?`;
  const primaryGreen = "#10B981";
  const darkDeep = "#020617";
  const glassBg = "#0F172A";
  const glassBorder = "#1E293B";
  const textMuted = "#94A3B8";
  const signatureBanner = "https://nearshorenavigator.com/images/denisse-banner.jpg";

  const content = `
    <p>Hi ${firstName},</p>
    <p>I work with mid-market manufacturers in **${city}** who are evaluating Mexico to offset the new tariff exposure — specifically the 2025 25–145% rates on Chinese components and sub-assemblies.</p>
    <p>Baja California is worth a look: **20 minutes from San Diego**, USMCA duty-free, and machine shops / CM partners with AS9100 and ISO 13485 already certified.</p>
    <p>Would it be useful if I put together a **shortlist of 3 vetted Baja partners** specific to what **${company}** manufactures? No call needed — I can send it over as a PDF so you have something concrete to compare against your current setup.</p>
    <p>Just reply "yes" to this email and I'll put it together this week.</p>
  `;

  const formattedContent = content.replace(/\*\*(.*?)\*\*/g, `<strong style="color: #ffffff; border-bottom: 2px solid ${primaryGreen};">$1</strong>`);

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
                  ${formattedContent}
                </div>
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 80px;">
                  <tr>
                    <td align="center" bgcolor="${primaryGreen}" style="border-radius: 16px;">
                      <a href="mailto:denisse@nearshorenavigator.com?subject=Mexico%20partner%20shortlist%20for%20our%20review" style="display: block; padding: 22px 48px; font-family: sans-serif; text-decoration: none; color: #000000; font-weight: 800; font-size: 16px; text-transform: uppercase;">
                        Reply "Yes" To Receive The PDF Shortlist
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
