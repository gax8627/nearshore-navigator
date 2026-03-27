/**
 * 8AM Cold Outreach — Tijuana/Manufacturing Focus
 *
 * KEY FEATURES:
 * ✅ Focused entirely on General Manufacturing / Tijuana vs Shenzhen
 * ✅ Cycles through 3 copy variants (Data Hook, Shortlist Hook, Nurture Hook)
 * ✅ Includes the Calendly link as a secondary CTA
 *
 * Run preview:  npx tsx scripts/campaigns/schedule_8am_outreach.ts --dry-run
 * Run for real: npx tsx scripts/campaigns/schedule_8am_outreach.ts
 */

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import dotenv from 'dotenv';
import { brevo } from '../../lib/brevo';
import { incrementEmailUsage, hasEmailBudget } from '../../lib/email-usage-tracker';

const CSV_DIR = path.join(process.cwd(), 'segmented_leads');

const PREVIOUS_SENT_LOGS = [
  path.join(CSV_DIR, 'sent_1k_batch_march3.json'),
  path.join(CSV_DIR, 'sent_manufacturing_outreach.json'),
  path.join(process.cwd(), 'scripts/processed_leads.json'),
  path.join(process.cwd(), 'scripts/sent_march5_outreach.json'),
  path.join(process.cwd(), 'scripts/sent_march9_outreach.json'),
  path.join(process.cwd(), 'scripts/sent_march10_outreach.json'),
  path.join(process.cwd(), 'scripts/sent_march23_outreach.json'),
  path.join(process.cwd(), 'scripts/sent_march24_outreach_pt1.json'),
  path.join(process.cwd(), 'scripts/sent_march24_outreach_pt2.json'),
  path.join(process.cwd(), 'scripts/sent_march25_outreach.json'),
];

const SENT_LOG_PATH = path.join(process.cwd(), 'scripts/sent_march26_outreach.json');

const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_LIMIT = 500; // March 25 batch

// Schedule for 8:00 AM PST = 15:00 UTC (during PDT)
const now = new Date();
const scheduleTime = new Date();
scheduleTime.setUTCHours(15, 0, 0, 0); // 15:00 UTC is exactly 8:00 AM PDT
if (scheduleTime <= now) {
    // Already past 8 AM today (e.g. 1 PM), so schedule for tomorrow
    scheduleTime.setDate(scheduleTime.getDate() + 1); 
}
const SCHEDULED_AT = scheduleTime.toISOString();

const envPath = path.join(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

async function main() {
  console.log('\n🚀 8AM Cold Outreach — Tijuana / Baja Focus (8 AM PST)');
  console.log(DRY_RUN ? '  [DRY RUN — no emails will be sent]\n' : '  [LIVE — emails will be scheduled via Brevo]\n');

  if (!DRY_RUN && !process.env.BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not set.');
    process.exit(1);
  }

  // 1. Dedupe Set
  const sentSet = new Set<string>();
  for (const logPath of PREVIOUS_SENT_LOGS) {
    if (!fs.existsSync(logPath)) continue;
    try {
      const data = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
      if (Array.isArray(data)) {
        data.forEach(item => {
          if (typeof item === 'string') sentSet.add(item.toLowerCase().trim());
          else if (item?.email) sentSet.add(item.email.toLowerCase().trim());
        });
      }
    } catch {}
  }

  // 2. Load and Filter Leads
  const allFiles = fs.readdirSync(CSV_DIR).filter(f => f.endsWith('.csv'));
  const feb17Dir = path.join(CSV_DIR, 'feb17');
  const jsonFiles = fs.existsSync(feb17Dir) ? fs.readdirSync(feb17Dir).filter(f => f.endsWith('.json')) : [];
  
  const leads: Array<{ email: string; firstName: string; company: string; city: string }> = [];
  const seenInCurrentRun = new Set<string>();

  const ICP_INDUSTRIES = [
    'manufacturing', 'aerospace', 'machining', 'industrial', 'automotive', 
    'defense', 'medical devices', 'robotics', 'electronics', 'consumer goods',
    'semiconductor', 'supply chain', 'logistics', 'plastic', 'metal', 'tooling',
    'assembly', 'production', 'distribution', 'warehouse', 'transportation',
    'energy', 'oil & gas', 'construction', 'engineering', 'heavy equipment',
    'machinery', 'packaging', 'biotech', 'life sciences', 'automation',
    'business services', 'software', 'information technology', 'consulting'
  ];

  const TRUSTED_TITLES = [
    'ceo', 'owner', 'president', 'founder', 'managing director', 'principal', 
    'partner', 'vp', 'vice president', 'director of operations', 'chief executive'
  ];

  let totalRejectedBySent = 0;
  let totalRejectedByFilter = 0;

  // Process CSVs
  for (const file of allFiles) {
    if (leads.length >= BATCH_LIMIT) break;
    const filePath = path.join(CSV_DIR, file);
    try {
      const rawContent = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '').replace(/^ï»¿/, '');
      const rows = parse(rawContent, { columns: true, skip_empty_lines: true, trim: true, relax_column_count: true }) as any[];

      for (const r of rows) {
        if (leads.length >= BATCH_LIMIT) break;
        
        const get = (key: string) => (r[key] || r['\uFEFF' + key] || '').toString().trim();
        const email = (get('Contact Email') || get('Email') || get('Business Email') || get('Email Address') || '').toLowerCase();
        const firstName = get('Contact First Name') || get('First Name') || '';
        const company = get('Business') || get('Company') || '';
        const city = get('City') || get('Location') || 'your area';
        const industry = (get('Industry') || '').toLowerCase();
        const title = (get('Title') || get('Contact Title') || get('Job Title') || get('Role') || '').toLowerCase();

        processLead({ email, firstName, company, city, industry, title, sourceFile: file });
      }
    } catch (e) {}
  }

  // Process JSONs
  for (const file of jsonFiles) {
    if (leads.length >= BATCH_LIMIT) break;
    const filePath = path.join(feb17Dir, file);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      if (Array.isArray(data)) {
        for (const item of data) {
          if (leads.length >= BATCH_LIMIT) break;
          processLead({
            email: item.email || '',
            firstName: item.firstName || '',
            company: item.company || '',
            city: item.city || 'your area',
            industry: item.industry || '',
            title: item.title || '',
            sourceFile: file
          });
        }
      }
    } catch (e) {}
  }

  function processLead(l: { email: string; firstName: string; company: string; city: string; industry: string; title: string, sourceFile: string }) {
    const { email, firstName, company, city, industry, title, sourceFile } = l;
    if (!email || !email.includes('@')) return;
    
    if (sentSet.has(email) || seenInCurrentRun.has(email)) {
      totalRejectedBySent++;
      return;
    }
    
    // --- FILTERS ---
    const isICP = ICP_INDUSTRIES.some(icp => industry.includes(icp));
    const isHighValueTitle = TRUSTED_TITLES.some(white => title.includes(white));
    const isSegmentedSource = sourceFile.startsWith('Leads_') || sourceFile.includes('segmented') || sourceFile.includes('Machine-shop') || sourceFile.includes('manufacturing');
    
    // TRUSTED SOURCE OVERRIDE: If it comes from a segmented/manufacturing file, we trust it more
    if (!isSegmentedSource && !isICP && !isHighValueTitle) {
      totalRejectedByFilter++;
      return;
    }
    
    // BLOCKED LIST (regardless of source)
    const BAD_INDUSTRIES = ['hospital', 'clinic', 'dentist', 'restaurant', 'hotel', 'travel', 'broadcasting', 'retail'];
    if (BAD_INDUSTRIES.some(bad => industry.includes(bad))) {
      totalRejectedByFilter++;
      return;
    }

    const first = firstName || company.split(' ')[0] || 'there';
    if (first.toLowerCase() === 'there' || first.trim() === '') return;

    if (email.startsWith('info@') || email.startsWith('sales@') || email.startsWith('admin@') || email.startsWith('support@') || email.startsWith('contact@')) {
       return;
    }
    
    if (email.includes('@target.com') || email.includes('@homedepot.com') || email.includes('@fedex.com') || email.includes('@theupsstore.com') || email.includes('@staples.com')) {
       return;
    }
    
    seenInCurrentRun.add(email);
    leads.push({ email, firstName: first, company, city });
  }

  console.log(`📋 Sourced ${leads.length} fresh leads (Target: ${BATCH_LIMIT})`);
  console.log(`🔍 Stats: ${totalRejectedBySent} already sent, ${totalRejectedByFilter} filtered by industry/relevance.`);

  // 3. Schedule Emails (Rotating Variants)
  let sentCount = 0;
  const existingSent: string[] = fs.existsSync(SENT_LOG_PATH)
    ? JSON.parse(fs.readFileSync(SENT_LOG_PATH, 'utf-8') || '[]')
    : [];

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    
    // Cycle variants 0, 1, 2
    const variantIndex = i % 3;
    let subject = "";
    let html = "";
    
    if (variantIndex === 0) {
       subject = "Tijuana vs Shenzhen manufacturing costs (2026 data)";
       html = buildEmail(lead.firstName, lead.company, lead.city, 0);
    } else if (variantIndex === 1) {
       subject = `Baja CA supply chain shortlist for ${lead.company}?`;
       html = buildEmail(lead.firstName, lead.company, lead.city, 1);
    } else {
       subject = `The 3 factories our clients keep choosing in Baja`;
       html = buildEmail(lead.firstName, lead.company, lead.city, 2);
    }

    if (DRY_RUN) {
      if (i < 3) {
        console.log(`[DRY RUN] → ${lead.email} | Variant ${variantIndex}: ${subject}`);
      }
      sentCount++;
    } else {
      try {
        if (!hasEmailBudget()) break;
        await brevo.sendEmail({
           to: [{ email: lead.email, name: lead.firstName }],
           subject,
           htmlContent: html,
           scheduledAt: SCHEDULED_AT,
        });
        incrementEmailUsage(1);
        existingSent.push(lead.email);
        sentCount++;
        await new Promise(r => setTimeout(r, 800)); // Brevo limit
      } catch (error: any) {
        console.log(`  ❌ Failed for ${lead.email}: ${error.message}`);
      }
    }
  }

  if (!DRY_RUN) {
    fs.writeFileSync(SENT_LOG_PATH, JSON.stringify(existingSent, null, 2));
    console.log(`\n✅ ${sentCount} emails scheduled for ${SCHEDULED_AT}.`);
  } else {
    console.log(`\n✅ Dry run complete. ${sentCount} emails would be scheduled for ${SCHEDULED_AT}`);
  }
}

function buildEmail(firstName: string, company: string, city: string, variant: number): string {
  const primaryGreen = '#10B981';
  const darkDeep = '#020617';
  const glassBg = '#0F172A';
  const glassBorder = '#1E293B';
  const textMuted = '#94A3B8';
  const calendlyLink = 'https://calendly.com/denisse-nearshorenavigator/30min';
  const signatureBanner = 'https://nearshorenavigator.com/images/denisse-banner.jpg';

  let content = "";
  if (variant === 0) {
     content = `<p>Hi ${firstName},</p>
     <p>With Section 301 tariffs continuing to apply pressure on Asian supply chains, I wanted to reach out regarding your 2026 manufacturing footprint.</p>
     <p>We've recently mapped the fully burdened cost differential between Southern California, Shenzhen, and Tijuana. For contract manufacturing and assembly, Tijuana is currently sitting at <strong>$7.84/hr</strong> fully burdened, with <strong>0% USMCA tariffs</strong> and 1-day trucking to Los Angeles.</p>
     <p>I put together a comprehensive 2026 Master Guide breaking down exactly how companies are executing the 90-day shelter setup in Tijuana to bypass these container costs.</p>
     <p>If you'd like to see the exact cost breakdown and industrial park map, just <strong>reply "yes"</strong> and I'll send the PDF over.</p>`;
  } else if (variant === 1) {
     content = `<p>Hi ${firstName},</p>
     <p>A number of proactive US manufacturers have been reaching out to us recently about quietly moving parts of their production to Baja California for supply chain resilience.</p>
     <p>The appeal is straightforward: it's USMCA-compliant, within a 2-hour drive of most Southwest US logistics hubs, and bypasses the current ocean freight bottlenecks.</p>
     <p>I put together a shortlist process for companies like <strong>${company}</strong> — 3 vetted Baja contract manufacturing partners matched to your product category and volume. No cost, no commitment, just something concrete to benchmark against.</p>
     <p>If that's useful, just <strong>reply "yes"</strong> and I'll send it over as a PDF this week.</p>`;
  } else {
     content = `<p>Hi ${firstName},</p>
     <p>I wanted to follow up with a quick resource. I just shared our latest analysis with another manufacturing exec evaluating their Mexico pivot, and thought <strong>${company}</strong> might find the data relevant.</p>
     <p>We narrowed down the top 3 contract manufacturing and shelter facilities in Tijuana and Mexicali that are currently absorbing the most US demand—specifically focusing on those with the fastest time-to-market.</p>
     <p>Would you like me to share the breakdown so you can keep it on file for your next supply chain review? It's a quick 2-page read.</p>
     <p>If so, just <strong>reply "yes"</strong> and it's yours.</p>`;
  }

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
                <!-- Primary CTA -->
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;" width="100%">
                  <tr>
                    <td align="center" bgcolor="${primaryGreen}" style="border-radius: 16px;">
                      <a href="mailto:denisse@nearshorenavigator.com?subject=Baja%20partner%20info%20for%20${encodeURIComponent(company)}" style="display: block; padding: 22px 48px; font-family: sans-serif; text-decoration: none; color: #000000; font-weight: 800; font-size: 16px; text-transform: uppercase;">
                        Reply "Yes" To Receive The PDF
                      </a>
                    </td>
                  </tr>
                </table>
                <!-- Secondary CTA: Calendly -->
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 80px;" width="100%">
                  <tr>
                    <td align="center" style="border-radius: 16px; border: 2px solid ${primaryGreen};">
                      <a href="${calendlyLink}" style="display: block; padding: 18px 48px; font-family: sans-serif; text-decoration: none; color: ${primaryGreen}; font-weight: 700; font-size: 14px; text-transform: uppercase;">
                        Or Book a 15-Min Discovery Call →
                      </a>
                    </td>
                  </tr>
                </table>
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
