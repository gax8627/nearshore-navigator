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
const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_LIMIT = 50; // Per run — increase carefully

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
function buildEmail(firstName: string, company: string, city: string): { subject: string; html: string } {
  const primaryGreen = '#10B981';
  const darkBg = '#020617';
  const cardBg = '#0F172A';
  const border = '#1E293B';
  const textMuted = '#94A3B8';

  const subject = `${company} — Mexico manufacturing shortlist?`;

  const bodyText = `
    <p>Hi ${firstName},</p>
    <p>I work with mid-market manufacturers in <strong style="color:#fff">${city}</strong> who are evaluating Mexico to offset the new tariff exposure — specifically the 2025 25–145% rates on Chinese components and sub-assemblies.</p>
    <p>Baja California is worth a look: <strong style="color:#fff">20 minutes from San Diego</strong>, USMCA duty-free, and machine shops / CM partners with AS9100 and ISO 13485 already certified. We've helped companies go from evaluation to live production in 90 days using a shelter arrangement.</p>
    <p>Would it be useful if I put together a <strong style="color:#fff">shortlist of 3 vetted Baja partners</strong> specific to what <strong style="color:#fff">${company}</strong> manufactures? No call needed — I can send it over as a PDF so you have something concrete to compare against your current setup.</p>
    <p>Just reply "yes" or "send it" and I'll put it together this week.</p>
  `;

  const html = `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkBg}" style="background-color:${darkBg};table-layout:fixed;">
      <tr><td align="center" style="padding:60px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;border-radius:32px;overflow:hidden;border:1px solid ${border};" bgcolor="${cardBg}">
          <tr><td height="4" bgcolor="${primaryGreen}" style="background-color:${primaryGreen};"></td></tr>
          <tr><td style="padding:48px 48px;">
            <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom:40px;">
              <tr>
                <td width="38" valign="middle">
                  <table border="0" cellpadding="0" cellspacing="0" bgcolor="${primaryGreen}" style="border-radius:10px;width:38px;height:38px;">
                    <tr><td align="center" style="color:#000;font-family:sans-serif;font-weight:900;font-size:20px;line-height:38px;">N</td></tr>
                  </table>
                </td>
                <td style="padding-left:14px;font-family:Helvetica,sans-serif;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;text-transform:uppercase;">
                  Nearshore <span style="color:${primaryGreen};">Navigator</span>
                </td>
              </tr>
            </table>
            <div style="font-family:'Inter',Helvetica,sans-serif;font-size:16px;line-height:1.8;color:${textMuted};margin-bottom:48px;">
              ${bodyText}
            </div>
            <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom:48px;">
              <tr>
                <td align="center" bgcolor="${primaryGreen}" style="border-radius:14px;">
                  <a href="https://calendly.com/denisse-nearshorenavigator/30min" style="display:block;padding:18px 40px;font-family:Helvetica,sans-serif;text-decoration:none;color:#000;font-weight:800;font-size:15px;text-transform:uppercase;letter-spacing:1px;">
                    Or Book a 15-Min Call →
                  </a>
                </td>
              </tr>
            </table>
            <div style="font-family:Helvetica,sans-serif;font-size:13px;color:#475569;border-top:1px solid ${border};padding-top:24px;">
              <strong style="color:#94a3b8;">Denisse Martinez</strong><br/>
              Marketing Director &amp; Advisor | Nearshore Navigator<br/>
              <a href="https://nearshorenavigator.com" style="color:${primaryGreen};text-decoration:none;">nearshorenavigator.com</a>
            </div>
          </td></tr>
        </table>
      </td></tr>
    </table>
  `;

  return { subject, html };
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

        if (!email || !email.includes('@') || seen.has(email)) continue;
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
