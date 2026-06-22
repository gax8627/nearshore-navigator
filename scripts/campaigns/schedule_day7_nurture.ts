/**
 * Day 7 Nurture Campaign — USMCA Week 1
 *
 * Target: Contacts who opened the initial June 15 campaign (SMTP logs)
 * Scheduled: Monday, June 29, 2026 at 8:00 AM PDT (Week 3 nurture slot)
 *
 * Run dry:  npx tsx scripts/campaigns/schedule_day7_nurture.ts --dry-run
 * Run live: npx tsx scripts/campaigns/schedule_day7_nurture.ts
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { parse } from 'csv-parse/sync';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const DRY_RUN = process.argv.includes('--dry-run');
const SCHEDULED_AT = '2026-06-29T08:00:00-07:00'; // Monday, June 29 at 8am PDT

// ── Nurture Templates (Peer Story + PDF Offer, ~120 words) ───────────────────

const TEMPLATES: Record<string, { subject: string; body: string }> = {
  General: {
    subject: '3 USMCA-qualified Baja facilities for {{contact.COMPANY}}',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>As the July 1st USMCA review approaches, many manufacturing leads I speak with are focused on one core question: how to decouple their supply chain from tariff exposure without losing speed or quality.</p>
<p>Recently, we helped a US industrial machinery supplier relocate their sub-assembly operations to a Class A park in Tijuana. By utilizing a shelter service, they were operational in 90 days, reduced labor overhead by 68%, and eliminated their 25% Section 301 tariff exposure entirely.</p>
<p>I’ve compiled a brief case study detailing their landed cost breakdown and a list of 3 vetted facilities matching {{contact.COMPANY}}'s general profile.</p>
<p>Would you like me to send over the PDF?</p>`,
  },
  Aerospace: {
    subject: 'How aerospace manufacturers are handling the USMCA review',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>With the USMCA review starting July 1, defense and aerospace suppliers are facing increased CBP audits on rules of origin for precision components.</p>
<p>We recently assisted a Tier-1 aerospace supplier in moving their CNC machining and wiring harness assembly to a qualified AS9100 facility in Baja California. They maintained their prime vendor certifications, bypassed CBP delays, and reduced burdened labor costs to $7.84/hour.</p>
<p>I’ve put together a peer case study and a shortlist of 3 vetted, ITAR-compliant facilities matching {{contact.COMPANY}}'s profile.</p>
<p>Would you like me to send you the PDF?</p>`,
  },
  Electronics: {
    subject: 'How 3 electronics OEMs cut landed cost 30%+ in Baja',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>The upcoming USMCA review is focusing heavily on electronics supply chains, specifically Chinese-origin PCBs and surface-mount modules assembled in Mexico.</p>
<p>We recently helped a US consumer electronics brand transition their SMT lines to a contract manufacturer in Tijuana. They achieved a 32% reduction in Total Landed Cost, secured a 100% tariff-free supply chain under USMCA, and kept engineering oversight in the same Pacific timezone.</p>
<p>I’ve written a summary of their transition timeline and mapped out 3 vetted SMT partners matching {{contact.COMPANY}}'s profile.</p>
<p>Would you like me to send you a copy of the PDF?</p>`,
  },
  Medical: {
    subject: '3 ISO 13485 Baja facilities for {{contact.COMPANY}}',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>As the July 1st USMCA joint review nears, medical device manufacturers are auditing their component sourcing to prevent border clearance delays.</p>
<p>Baja California now hosts the largest medical device manufacturing cluster in North America. We recently helped a medical hardware firm partner with an ISO 13485 facility in Tijuana, reducing their assembly overhead by 60% while maintaining strict FDA compliance.</p>
<p>I’ve compiled a case study on their validation process alongside a shortlist of 3 vetted medical device partners matching {{contact.COMPANY}}'s profile.</p>
<p>Would you like me to send over the PDF?</p>`,
  },
  Automotive: {
    subject: 'How auto parts manufacturers are handling USMCA content rules',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>The July USMCA review is bringing stricter Regional Value Content (RVC) thresholds for automotive components, making self-certification a major audit risk.</p>
<p>We recently helped a Tier-2 automotive stamping supplier set up shelter operations in Monterrey. They met the new USMCA content requirements, eliminated tariff risks, and achieved a 40% reduction in logistics lead times compared to their previous overseas facility.</p>
<p>I’ve summarized their cost structure and put together a shortlist of 3 vetted auto-stamping and sub-assembly facilities matching {{contact.COMPANY}}'s profile.</p>
<p>Would you like me to send you a copy?</p>`,
  },
};

// ── HTML Wrapper ─────────────────────────────────────────────────────────────

function wrapHtml(body: string): string {
  const green = '#10B981';
  const dark = '#020617';
  const glass = '#0F172A';
  const border = '#1E293B';
  const muted = '#94A3B8';
  const banner = 'https://nearshorenavigator.com/images/denisse-banner.jpg?v=JUN15';

  return `
<table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${dark}" style="background-color:${dark};table-layout:fixed;">
<tr><td align="center" style="padding:60px 10px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;border-radius:32px;overflow:hidden;border:1px solid ${border};" bgcolor="${glass}">
<tr><td height="12" bgcolor="${green}"></td></tr>
<tr><td style="padding:56px 48px;">

<!-- Logo -->
<table border="0" cellpadding="0" cellspacing="0" style="margin-bottom:48px;">
<tr>
<td width="42" valign="middle">
<table border="0" cellpadding="0" cellspacing="0" bgcolor="${green}" style="border-radius:12px;width:42px;height:42px;">
<tr><td align="center" style="color:#000;font-family:sans-serif;font-weight:900;font-size:24px;line-height:42px;">N</td></tr>
</table></td>
<td style="padding-left:16px;font-family:sans-serif;font-size:22px;font-weight:700;color:#fff;text-transform:uppercase;">
Nearshore <span style="color:${green};">Navigator</span></td>
</tr></table>

<!-- Body -->
<div style="font-family:sans-serif;font-size:17px;line-height:1.8;color:${muted};margin-bottom:48px;">
${body}
</div>

<!-- Signature banner -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td align="center">
<img src="${banner}" width="544" style="display:block;width:100%;height:auto;border-radius:16px;border:0;" alt="Denisse Martinez — Nearshore Navigator" />
</td></tr></table>

<!-- Footer -->
<div style="margin-top:40px;text-align:center;font-family:sans-serif;font-size:11px;color:#475569;letter-spacing:2px;text-transform:uppercase;font-weight:700;">
Nearshore Navigator &bull; Baja California Manufacturing Intelligence &bull;
<a href="mailto:denisse@nearshorenavigator.com?subject=Unsubscribe" style="color:#475569;text-decoration:none;">Unsubscribe</a>
</div>

</td></tr></table>
</td></tr></table>`;
}

function getLeadEmailsFromRecord(item: any): string[] {
  const emails: string[] = [];
  const keys = Object.keys(item);
  const emailKeys = keys.filter(k => {
    const lk = k.toLowerCase();
    return lk.includes('email') && 
           !lk.includes('owner') && 
           !lk.includes('rep') && 
           !lk.includes('agent');
  });

  if (emailKeys.length > 0) {
    emailKeys.forEach(k => {
      const val = item[k];
      if (typeof val === 'string' && val.includes('@')) {
        emails.push(val.trim().toLowerCase());
      }
    });
  }
  return [...new Set(emails)];
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (file.endsWith('.csv') || file.endsWith('.json')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  return arrayOfFiles;
}

function findLeadLocally(email: string): { firstName: string; company: string; industry: string } | null {
  const leadsDir = path.join(process.cwd(), 'segmented_leads');
  const files = getAllFiles(leadsDir);

  for (const file of files) {
    try {
      const ext = path.extname(file);
      if (ext === '.json') {
        const content = JSON.parse(fs.readFileSync(file, 'utf-8'));
        if (Array.isArray(content)) {
          const found = content.find((item: any) => {
            const leadEmails = getLeadEmailsFromRecord(item);
            return leadEmails.includes(email.toLowerCase().trim());
          });
          if (found) {
            return {
              firstName: found.firstName || found.first_name || found.name || 'there',
              company: found.company || found.company_name || 'your company',
              industry: found.industry || found.sector || ''
            };
          }
        }
      } else if (ext === '.csv') {
        const rawContent = fs.readFileSync(file, 'utf-8');
        const records = parse(rawContent, { columns: true, skip_empty_lines: true });
        const found = records.find((item: any) => {
          const leadEmails = getLeadEmailsFromRecord(item);
          return leadEmails.includes(email.toLowerCase().trim());
        });
        if (found) {
          return {
            firstName: found.firstName || found.first_name || found.name || found.Firstname || found.FirstName || 'there',
            company: found.company || found.company_name || found.Company || found.Company_Name || 'your company',
            industry: found.industry || found.sector || found.Industry || found.Sector || ''
          };
        }
      }
    } catch {}
  }
  return null;
}

function getNiche(industry: string): string {
  const ind = (industry || '').toLowerCase();
  if (ind.includes('aerospace') || ind.includes('defense')) return 'Aerospace';
  if (ind.includes('medical') || ind.includes('pharma') || ind.includes('biotech')) return 'Medical';
  if (ind.includes('electronics')) return 'Electronics';
  if (ind.includes('automotive')) return 'Automotive';
  return 'General';
}

async function main() {
  console.log(`\n🚀 USMCA Week 1 Day 7 Nurture Campaign Scheduler`);
  console.log(DRY_RUN ? '  [DRY RUN]' : '  [LIVE RUN — scheduling campaigns in Brevo]');

  if (!DRY_RUN && !process.env.BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not set in .env.local');
    process.exit(1);
  }

  const { brevo } = await import('../../lib/brevo');

  // 1. Fetch openers of the June 15 campaign
  console.log('🔍 Fetching contacts who opened the campaign (since June 15)...');
  const todayStr = new Date().toISOString().split('T')[0];
  const openedEvents = await brevo.getEmailEvents({
    startDate: '2026-06-15',
    endDate: todayStr,
    event: 'opened',
    limit: 100
  });

  const uniqueOpeners = new Set<string>();
  if (openedEvents && openedEvents.events) {
    openedEvents.events.forEach((e: any) => uniqueOpeners.add(e.email.toLowerCase().trim()));
  }

  console.log(`ℹ️ Found ${uniqueOpeners.size} unique openers in Brevo SMTP logs.`);

  if (uniqueOpeners.size === 0) {
    console.log('ℹ️ No openers found. Nothing to nurture. Exiting.');
    process.exit(0);
  }

  // 2. Load suppression list
  const suppressPath = path.join(process.cwd(), 'data/full_suppression_list.csv');
  const suppressed = new Set<string>();
  if (fs.existsSync(suppressPath)) {
    const rows = parse(fs.readFileSync(suppressPath, 'utf-8'), { columns: true, skip_empty_lines: true });
    rows.forEach((r: any) => suppressed.add((r.email || '').toLowerCase().trim()));
  }

  const targetEmails = Array.from(uniqueOpeners).filter(email => !suppressed.has(email));
  console.log(`🎯 Targets after filtering suppressions: ${targetEmails.length}`);

  if (targetEmails.length === 0) {
    console.log('ℹ️ No target contacts left for nurture. Exiting.');
    process.exit(0);
  }

  // 3. Enrich targets
  console.log('✨ Enriching target contacts (Brevo API + Local Fallback)...');
  const targetsEnriched: any[] = [];
  for (const email of targetEmails) {
    let firstName = 'there';
    let company = 'your company';
    let industry = '';
    let enriched = false;

    const localLead = findLeadLocally(email);
    if (localLead) {
      firstName = localLead.firstName;
      company = localLead.company;
      industry = localLead.industry;
      enriched = true;
    }

    try {
      const contact = await brevo.getContact(email);
      if (contact) {
        if (!enriched || firstName === 'there' || firstName === 'Friend') {
          firstName = contact.attributes?.FIRSTNAME || firstName;
        }
        if (!enriched || company === 'your company' || company === '') {
          company = contact.attributes?.COMPANY || company;
        }
        if (!enriched || industry === '') {
          industry = contact.attributes?.INDUSTRY || industry;
        }
      }
    } catch (err: any) {
      console.warn(`  ⚠️ Brevo lookup warning for ${email}: ${err.message}`);
    }

    targetsEnriched.push({ email, firstName, company, industry });
  }

  // 4. Group by Niche
  const pools: Record<string, any[]> = { Aerospace: [], Medical: [], Electronics: [], Automotive: [], General: [] };
  targetsEnriched.forEach(t => {
    const niche = getNiche(t.industry);
    pools[niche].push(t);
  });

  // Summary
  console.log('\n📊 Target breakdown:');
  let grandTotal = 0;
  for (const niche of Object.keys(pools)) {
    console.log(`  ${niche}: ${pools[niche].length} target(s)`);
    grandTotal += pools[niche].length;
  }

  if (DRY_RUN) {
    console.log('\n--- DRY RUN SAMPLES ---');
    for (const niche of Object.keys(pools)) {
      if (!pools[niche].length) continue;
      const tmpl = TEMPLATES[niche];
      console.log(`\n[${niche}] Subject: ${tmpl.subject}`);
      console.log(`  Sample recipient: ${pools[niche][0].email} | Name: ${pools[niche][0].firstName} | Company: ${pools[niche][0].company}`);
    }
    console.log('\n✅ Dry run complete. Run without --dry-run to schedule campaigns.');
    return;
  }

  // 5. Create lists & schedule campaigns in Brevo
  for (const niche of Object.keys(pools)) {
    const leads = pools[niche];
    if (!leads.length) continue;

    const listName = `USMCA-Week1-Day7-Nurture-${niche}-Jun29`;
    const tmpl = TEMPLATES[niche];
    const html = wrapHtml(tmpl.body);

    console.log(`\n[${niche}] Creating nurture list "${listName}" with ${leads.length} contacts...`);

    const existingLists = await brevo.getLists();
    let listId;
    const foundList = existingLists.lists?.find((l: any) => l.name === listName);
    if (foundList) {
      listId = foundList.id;
      console.log(`  ℹ️ List already exists (ID: ${listId}), reusing it`);
    } else {
      const listRes = await brevo.createList(listName);
      listId = listRes.id;
      console.log(`  ✅ List created (ID: ${listId})`);
    }

    await Promise.all(leads.map(l => brevo.createContact({
      email: l.email,
      attributes: { FIRSTNAME: l.firstName, COMPANY: l.company, INDUSTRY: l.industry },
      listIds: [listId],
      updateEnabled: true,
    })));
    console.log(`  ✅ ${leads.length} contacts imported into nurture list`);

    const campRes = await brevo.createCampaign({
      name: listName,
      subject: tmpl.subject,
      htmlContent: html,
      listIds: [listId],
      scheduledAt: SCHEDULED_AT,
      sender: { name: 'Denisse Martinez', email: 'nearshore.navigator@gmail.com' },
    });
    console.log(`  ✅ Campaign scheduled for ${SCHEDULED_AT} (ID: ${campRes.id})`);
  }

  console.log(`\n✅ Done! ${grandTotal} nurture emails scheduled for Monday, June 29, 2026 at 8:00 AM PDT`);
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
