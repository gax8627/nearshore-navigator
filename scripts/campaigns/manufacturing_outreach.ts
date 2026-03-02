/**
 * Manufacturing ICP Follow-up Campaign
 * 
 * Targets the machine shop + medical equipment manufacturer CSVs in segmented_leads/
 * — these are your real ICP and have NOT been emailed under the new prompt.
 * 
 * The email is a direct, tariff-angle pitch with a reply-first CTA (lower friction than Calendly).
 * 
 * Run preview:  BREVO_API_KEY=xxx npx tsx scripts/campaigns/manufacturing_outreach.ts --dry-run
 * Run for real: BREVO_API_KEY=xxx npx tsx scripts/campaigns/manufacturing_outreach.ts
 */

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { brevo } from '../../lib/brevo';
import { hasEmailBudget, incrementEmailUsage, getEmailBudget } from '../../lib/email-usage-tracker';

const CSV_DIR = path.join(process.cwd(), 'segmented_leads');
const SENT_LOG_PATH = path.join(CSV_DIR, 'sent_manufacturing_outreach.json');
const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_LIMIT = 50; // Per run — increase carefully

// ─── Sent Log Handlers ────────────────────────────────────────────────────────
function loadSentLog(): Set<string> {
  if (fs.existsSync(SENT_LOG_PATH)) {
    try {
      const arr = JSON.parse(fs.readFileSync(SENT_LOG_PATH, 'utf-8'));
      return new Set(arr);
    } catch {
      return new Set();
    }
  }
  return new Set();
}

function appendToSentLog(email: string) {
  const sent = loadSentLog();
  sent.add(email);
  fs.writeFileSync(SENT_LOG_PATH, JSON.stringify(Array.from(sent), null, 2));
}

// ─── Target CSVs (your real manufacturing ICP) ───────────────────────────────
// Machine shops: CA, AZ, TX — within truck distance of Tijuana
// Medical device manufacturers: CA, TX, OH, WA, MI
const TARGET_FILES = [
  'Machine-shop-San-Diego-CA-Companies.csv',   // Strongest ICP — closest to border
  'Machine-shop-Irvine-CA-Companies.csv',
  'Machine-shop-Los-Angeles-CA-Companies.csv',
  'Machine-shop-Orange-CA-Companies.csv',
  'Machine-shop-Riverside-CA-Companies.csv',
  'Machine-shop-Phoenix-AZ-Companies.csv',
  'Machine-shop-Mesa-AZ-Companies.csv',
  'Machine-shop-Tucson-AZ-Companies.csv',
  'Medical-equipment-manufacturer-Los-Angeles-CA-Companies.csv',
  'Medical-equipment-manufacturer-San-Jose-CA-Companies.csv',
  'manufacturing_new_batch.csv',
  'medical_new_batch.csv',
];

// ─── Email Template ───────────────────────────────────────────────────────────
function wrapHtml(content: string) {
  const primaryGreen = "#10B981";
  const darkDeep = "#020617";
  const glassBg = "#0F172A";
  const glassBorder = "#1E293B";
  const textMuted = "#94A3B8";
  
  const signatureBanner = "https://nearshorenavigator.com/images/denisse-banner.jpg";
  const formattedContent = content.replace(/\*\*(.*?)\*\*/g, `<strong style="color: #ffffff; border-bottom: 2px solid ${primaryGreen};">$1</strong>`);

  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkDeep}" style="background-color: ${darkDeep}; table-layout: fixed;">
      <tr>
        <td align="center" style="padding: 60px 10px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; border-radius: 32px; overflow: hidden; border: 1px solid ${glassBorder};" bgcolor="${glassBg}">
            <tr>
              <td height="12" bgcolor="${primaryGreen}" style="background: linear-gradient(90deg, ${primaryGreen} 0%, ${primaryGreen} 40%, #ffffff 50%, ${primaryGreen} 60%, ${primaryGreen} 100%); background-size: 200% 100%; animation: scan 3s linear infinite;">
                <div style="height: 12px; width: 100%; background-color: ${primaryGreen}; opacity: 0; display: none;">&nbsp;</div>
                <style>
                  @keyframes scan { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
                </style>
              </td>
            </tr>
            <tr>
              <td style="padding: 56px 48px;">
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 48px;">
                  <tr>
                    <td width="42" valign="middle">
                      <table border="0" cellpadding="0" cellspacing="0" bgcolor="${primaryGreen}" style="border-radius: 12px; width: 42px; height: 42px;">
                        <tr><td align="center" style="color: #000; font-family: sans-serif; font-weight: 900; font-size: 24px; line-height: 42px;">N</td></tr>
                      </table>
                    </td>
                    <td style="padding-left: 16px; font-family: 'Space Grotesk', Helvetica, sans-serif; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -1px; text-transform: uppercase;">
                      Nearshore <span style="color: ${primaryGreen};">Navigator</span>
                    </td>
                  </tr>
                </table>
                <div style="font-family: 'Inter', Helvetica, sans-serif; font-size: 17px; line-height: 1.8; color: ${textMuted}; margin-bottom: 56px;">
                  ${formattedContent}
                </div>
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 80px;">
                  <tr>
                    <td align="center" bgcolor="${primaryGreen}" style="border-radius: 16px; box-shadow: 0 15px 40px ${primaryGreen}40;">
                      <a href="mailto:denisse@nearshorenavigator.com?subject=Mexico%20partner%20shortlist%20for%20our%20review" style="display: block; padding: 22px 48px; font-family: Helvetica, sans-serif; text-decoration: none; color: #000000; font-weight: 800; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
                        Reply "Yes" To Receive The PDF Shortlist
                      </a>
                    </td>
                  </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius: 24px; overflow: hidden;">
                  <tr>
                    <td>
                      <img src="${signatureBanner}" width="544" style="display: block; width: 100%; height: auto; border: 1px solid ${primaryGreen}30; border-radius: 24px;" alt="Denisse Martinez - Marketing Director & Advisor" />
                    </td>
                  </tr>
                </table>
                <div style="margin-top: 48px; text-align: center; font-family: Helvetica, sans-serif; font-size: 11px; color: #475569; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">
                  Industrial Expansion &bull; 2026 Strategic Hub
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

function buildEmail(firstName: string, company: string, city: string): { subject: string; html: string } {
  const subject = `${company} — Mexico manufacturing shortlist?`;

  const bodyText = `
    <p>Hi ${firstName},</p>
    <p>I work with mid-market manufacturers in **${city}** who are evaluating Mexico to offset the new tariff exposure — specifically the 2025 25–145% rates on Chinese components and sub-assemblies.</p>
    <p>Baja California is worth a look: **20 minutes from San Diego**, USMCA duty-free, and machine shops / CM partners with AS9100 and ISO 13485 already certified. We've helped companies go from evaluation to live production in 90 days using a shelter arrangement.</p>
    <p>Would it be useful if I put together a **shortlist of 3 vetted Baja partners** specific to what **${company}** manufactures? No call needed — I can send it over as a PDF so you have something concrete to compare against your current setup.</p>
    <p>Just reply "yes" to this email and I'll put it together this week.</p>
  `;

  return { subject, html: wrapHtml(bodyText) };
}

// ─── CSV Parsing ──────────────────────────────────────────────────────────────
interface Lead {
  email: string;
  firstName: string;
  company: string;
  city: string;
  description: string;
}

function loadLeadsFromCSVs(): Lead[] {
  const sentLog = loadSentLog();
  const leads: Lead[] = [];
  const seen = new Set<string>();

  for (const file of TARGET_FILES) {
    const filePath = path.join(CSV_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️  Not found (skipping): ${file}`);
      continue;
    }

    try {
      // Strip BOM if present (appears as ï»¿ when UTF-8 is read without BOM stripping)
      const rawContent = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '').replace(/^ï»¿/, '');
      const rows = parse(rawContent, { columns: true, skip_empty_lines: true, trim: true }) as any[];

      for (const r of rows) {
        const get = (key: string) => r[key] || r['\uFEFF' + key] || '';
        const email = (get('Contact Email') || get('Email')).toLowerCase().trim();
        const firstName = get('Contact First Name') || get('First Name') || get('FirstName') || '';
        const company = get('Business') || get('Company') || get('Account Name') || '';
        const city = get('City') || get('Location') || 'your area';
        const description = get('Description') || '';

        if (!email || !email.includes('@') || seen.has(email) || sentLog.has(email)) continue;
        seen.add(email);
        // If no contact first name, use first word of company as personalization
        const resolvedFirstName = firstName || company.split(' ')[0] || 'there';
        leads.push({ email, firstName: resolvedFirstName, company, city, description });
      }
    } catch {
      console.log(`  ⚠️  Parse error (skipping): ${file}`);
    }
  }

  return leads;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🏭 Manufacturing ICP Outreach Campaign');
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

  const allLeads = loadLeadsFromCSVs();
  const batch = allLeads.slice(0, BATCH_LIMIT);

  console.log(`📋 Total ICP leads loaded: ${allLeads.length}`);
  console.log(`📤 Sending this batch: ${batch.length} (limit: ${BATCH_LIMIT})\n`);

  let sent = 0, skipped = 0;

  for (let i = 0; i < batch.length; i++) {
    const lead = batch[i];
    const { subject, html } = buildEmail(lead.firstName, lead.company, lead.city);

    if (DRY_RUN) {
      console.log(`[${i + 1}] To: ${lead.email} | ${lead.company} (${lead.city})`);
      console.log(`    Subject: ${subject}`);
    } else {
      try {
        await brevo.sendEmail({
          to: [{ email: lead.email, name: lead.firstName }],
          subject,
          htmlContent: html,
        });
        incrementEmailUsage(1);
        appendToSentLog(lead.email);
        console.log(`[${i + 1}/${batch.length}] ✅ Sent → ${lead.email} (${lead.company})`);
        sent++;
        // Rate limit: 1 email per second to avoid Brevo throttling
        await new Promise(r => setTimeout(r, 1000));
      } catch (e: any) {
        console.log(`[${i + 1}/${batch.length}] ❌ Failed → ${lead.email}: ${e.message}`);
        skipped++;
      }
    }
  }

  if (!DRY_RUN) {
    console.log(`\n✅ Campaign complete. Sent: ${sent} | Failed: ${skipped}`);
    console.log(`📊 Remaining in batch: ${allLeads.length - batch.length} leads waiting.`);
    console.log(`💡 Run again to send the next ${BATCH_LIMIT}.`);
  } else {
    console.log(`\n✅ Dry run complete. ${batch.length} emails previewed.`);
    console.log('   Run without --dry-run to send.');
  }
}

main().catch(console.error);
