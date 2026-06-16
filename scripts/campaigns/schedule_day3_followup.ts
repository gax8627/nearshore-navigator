/**
 * Day 3 Follow-Up — USMCA Week 1
 *
 * Target: Contacts who opened the June 15 campaign but did not click/reply
 * Scheduled: Monday, June 22, 2026 at 8:00 AM PDT
 *
 * Run dry:  npx tsx scripts/campaigns/schedule_day3_followup.ts --dry-run
 * Run live: npx tsx scripts/campaigns/schedule_day3_followup.ts
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { parse } from 'csv-parse/sync';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const DRY_RUN = process.argv.includes('--dry-run');
const SCHEDULED_AT = '2026-06-22T08:00:00-07:00'; // Monday, June 22 at 8am PDT

// ── Email Templates (Short did-you-see-my-note follow-ups) ───────────────────

const TEMPLATES: Record<string, { subject: string; body: string }> = {
  General: {
    subject: 'Quick follow — {{contact.COMPANY}} and July USMCA rules',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>Just wanted to quickly follow up on my note from Monday about the July 1st USMCA review and Baja California manufacturing.</p>
<p>Did you see my last email? Worth a quick 15-minute call to check your Rules of Origin exposure?</p>`,
  },
  Electronics: {
    subject: 'Quick follow — {{contact.COMPANY}} and July USMCA rules',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>Just wanted to follow up on my note about the July 1st USMCA review and proposed exclusion of Chinese components from North American content.</p>
<p>Did you see my last email? Worth a quick call to check how it affects {{contact.COMPANY}}'s cost model?</p>`,
  },
  Aerospace: {
    subject: 'Quick follow — {{contact.COMPANY}} and July USMCA rules',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>Just wanted to follow up on my note about the July 1st USMCA review and AS9100-certified contract manufacturing in Baja California.</p>
<p>Did you see my last email? Worth a quick 15-minute call to run through partner options for {{contact.COMPANY}}?</p>`,
  },
  Medical: {
    subject: 'Quick follow — {{contact.COMPANY}} and July USMCA rules',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>Just wanted to follow up on my note about the July 1st USMCA review and ISO 13485 medical device manufacturing in Baja.</p>
<p>Did you see my last email? I can still send over that shortlist of 3 vetted partners for {{contact.COMPANY}} if you'd like.</p>`,
  },
  Automotive: {
    subject: 'Quick follow — {{contact.COMPANY}} and July USMCA rules',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>Just wanted to follow up on my note about the July 1st USMCA review and auto content rules tightening.</p>
<p>Did you see my last email? Worth a quick call to see if a shortlist of vetted Baja partners would be useful?</p>`,
  },
};

// ── HTML Wrapper (matches brand identity) ────────────────────────────────────

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
           !lk.includes('agent') && 
           !lk.includes('user') && 
           !lk.includes('member') && 
           !lk.includes('staff') && 
           !lk.includes('assignee');
  });

  if (emailKeys.length > 0) {
    emailKeys.forEach(k => {
      const val = item[k];
      if (typeof val === 'string' && val.includes('@')) {
        emails.push(val.trim().toLowerCase());
      }
    });
  } else {
    keys.forEach(k => {
      const lk = k.toLowerCase();
      if (!lk.includes('owner') && 
          !lk.includes('rep') && 
          !lk.includes('agent') && 
          !lk.includes('user') && 
          !lk.includes('member') && 
          !lk.includes('staff') && 
          !lk.includes('assignee')) {
        const val = item[k];
        if (typeof val === 'string' && val.includes('@')) {
          emails.push(val.trim().toLowerCase());
        }
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
  console.log(`\n🚀 USMCA Week 1 Day 3 Follow-up Campaign Scheduler`);
  console.log(DRY_RUN ? '  [DRY RUN]' : '  [LIVE RUN — scheduling campaigns in Brevo]');

  if (!DRY_RUN && !process.env.BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not set in .env.local');
    process.exit(1);
  }

  const { brevo } = await import('../../lib/brevo');

  // 1. Fetch openers
  console.log('🔍 Fetching contacts who opened the campaign (from June 15 onwards)...');
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
    console.log('ℹ️ No openers found. Nothing to follow up on. Exiting.');
    process.exit(0);
  }

  // 2. Load suppression list
  const suppressPath = path.join(process.cwd(), 'data/full_suppression_list.csv');
  const suppressed = new Set<string>();
  if (fs.existsSync(suppressPath)) {
    const rows = parse(fs.readFileSync(suppressPath, 'utf-8'), { columns: true, skip_empty_lines: true });
    rows.forEach((r: any) => suppressed.add((r.email || '').toLowerCase().trim()));
  }

  // Filter out suppressed and check if they clicked/replied (clicks are also suppressable for follow-ups)
  const clickEvents = await brevo.getEmailEvents({
    startDate: '2026-06-15',
    endDate: todayStr,
    event: 'clicks',
    limit: 100
  });
  const clickers = new Set<string>();
  if (clickEvents && clickEvents.events) {
    clickEvents.events.forEach((e: any) => clickers.add(e.email.toLowerCase().trim()));
  }

  const targetEmails = Array.from(uniqueOpeners).filter(email => {
    if (suppressed.has(email)) return false;
    if (clickers.has(email)) return false; // Don't bump clickers with a standard "did you see my note" follow-up
    return true;
  });

  console.log(`🎯 Targets after filtering suppressions/clickers: ${targetEmails.length}`);

  if (targetEmails.length === 0) {
    console.log('ℹ️ No target contacts left for follow-up. Exiting.');
    process.exit(0);
  }

  // 3. Fetch contact attributes from Brevo / Local Fallback for enrichment
  console.log('✨ Enriching target contacts (Brevo API + Local Fallback)...');
  const targetsEnriched: any[] = [];
  for (const email of targetEmails) {
    let firstName = 'there';
    let company = 'your company';
    let industry = '';
    let enriched = false;

    // A. Try local CSV/JSON lookup first for high reliability on raw names
    const localLead = findLeadLocally(email);
    if (localLead) {
      firstName = localLead.firstName;
      company = localLead.company;
      industry = localLead.industry;
      enriched = true;
    }

    // B. Try Brevo Contact API as fallback or to supplement
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
        enriched = true;
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

    const listName = `USMCA-Week1-Day3-FollowUp-${niche}-Jun22`;
    const tmpl = TEMPLATES[niche];
    const html = wrapHtml(tmpl.body);

    console.log(`\n[${niche}] Creating follow-up list "${listName}" with ${leads.length} contacts...`);

    // Create or reuse list
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

    // Import contacts
    await Promise.all(leads.map(l => brevo.createContact({
      email: l.email,
      attributes: { FIRSTNAME: l.firstName, COMPANY: l.company, INDUSTRY: l.industry },
      listIds: [listId],
      updateEnabled: true,
    })));
    console.log(`  ✅ ${leads.length} contacts imported into follow-up list`);

    // Schedule campaign
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

  console.log(`\n✅ Done! ${grandTotal} follow-up emails scheduled for Monday, June 22, 2026 at 8:00 AM PDT`);
}

main().catch(e => {
  console.error('❌ Error executing schedule_day3_followup:', e.message);
  process.exit(1);
});
