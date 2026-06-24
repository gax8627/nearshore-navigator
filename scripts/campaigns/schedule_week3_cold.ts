/**
 * Week 3 Cold Campaign Blast — USMCA Outreach
 *
 * Target: 200–300 fresh, unsent contacts from tier lists (Aerospace, Medical, Electronics, Automotive, General)
 * Scheduled: Monday, June 29, 2026 at 8:30 AM PDT
 *
 * Run dry:  npx tsx scripts/campaigns/schedule_week3_cold.ts --dry-run
 * Run live: npx tsx scripts/campaigns/schedule_week3_cold.ts
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { parse } from 'csv-parse/sync';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const DRY_RUN = process.argv.includes('--dry-run');
const SCHEDULED_AT = '2026-06-29T08:30:00-07:00'; // Monday, June 29 at 8:30am PDT
const LIMIT_PER_NICHE = 60; // Max 60 leads per niche to keep batch size to ~300 max

// Email Templates with reply-based CTAs
const TEMPLATES: Record<string, { subject: string; body: string; cta: string; ctaUrl: string }> = {
  General: {
    subject: 'Question about {{contact.COMPANY}} and the USMCA review',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>The USMCA joint review starts July 1st. The likely outcome: tighter North American content rules and new scrutiny on Chinese-origin components in manufactured goods.</p>
<p>Most manufacturers haven't run the math on what tighter Rules of Origin mean for their cost model — especially if their supply chain includes Chinese sub-assemblies routed through third countries.</p>
<p>We help US manufacturers establish USMCA-qualified Baja California production before rule changes take effect. 20 minutes from San Diego, duty-free.</p>
<p>Would a shortlist of 3 vetted Baja manufacturing partners be useful for {{contact.COMPANY}}? Just reply "yes."</p>`,
    cta: 'Reply Yes',
    ctaUrl: 'mailto:denisse@nearshorenavigator.com?subject=Yes%20-%20Baja%20Manufacturing%20Partner%20Shortlist',
  },
  Electronics: {
    subject: '{{contact.COMPANY}} — Chinese components and the USMCA review',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>The USMCA review launching July 1 is targeting exactly what most electronics manufacturers rely on: Chinese-origin PCBs, chips, and modules assembled in Mexico or routed through third countries.</p>
<p>New proposed rules would exclude Chinese-origin components from North American content calculations entirely — changing the landed-cost math significantly for anyone still sourcing from China.</p>
<p>We've placed electronics manufacturers in Baja California SMT facilities that qualify under current and proposed rules. 20 min from San Diego, USMCA-clean.</p>
<p>Would a shortlist of 3 vetted Baja electronics assembly partners be useful for {{contact.COMPANY}}? Just reply "yes."</p>`,
    cta: 'Reply Yes',
    ctaUrl: 'mailto:denisse@nearshorenavigator.com?subject=Yes%20-%20Baja%20Electronics%20Partner%20Shortlist',
  },
  Aerospace: {
    subject: '{{contact.COMPANY}} — USMCA supply chain exposure before July?',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>The July 1 USMCA review is bringing increased CBP audit activity on aerospace and defense component imports — particularly sub-assemblies with non-North American inputs.</p>
<p>AS9100-certified contract manufacturers in Baja California are positioned as a USMCA-qualifying alternative: 20 minutes from the San Diego border, with ITAR-compatible facility options and existing prime supplier relationships.</p>
<p>Would a shortlist of 3 vetted Baja aerospace manufacturing partners be useful for {{contact.COMPANY}}? Just reply "yes."</p>`,
    cta: 'Reply Yes',
    ctaUrl: 'mailto:denisse@nearshorenavigator.com?subject=Yes%20-%20Baja%20Aerospace%20Partner%20Shortlist',
  },
  Medical: {
    subject: '{{contact.COMPANY}} — ISO 13485 Baja partners before the USMCA review?',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>With the USMCA joint review starting July 1, CBP is increasing scrutiny on medical device imports — specifically Chinese-origin components in sub-assemblies.</p>
<p>Baja California hosts one of the largest medical device manufacturing clusters in the world: ISO 13485 and FDA-registered facilities within 30 minutes of the US border, fully USMCA-qualifying.</p>
<p>I can put together a shortlist of 3 vetted partners matched to {{contact.COMPANY}}'s production profile. Just reply "yes" — no call needed, I'll send the PDF.</p>`,
    cta: 'Reply Yes for the PDF',
    ctaUrl: 'mailto:denisse@nearshorenavigator.com?subject=Yes%20-%20Medical%20Device%20Partner%20Shortlist',
  },
  Automotive: {
    subject: 'USMCA auto content rules tightening — where is {{contact.COMPANY}} on RVC?',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>The July USMCA review is expected to push Regional Value Content (RVC) thresholds higher for auto parts — and introduce mandatory third-party verification replacing self-certification.</p>
<p>Manufacturers still relying on Asian sub-assemblies face the most exposure. USMCA-qualified production in Baja California eliminates the risk and cuts landed cost vs. the current tariff structure.</p>
<p>Would a shortlist of 3 vetted Baja stamping/machining/sub-assembly partners be useful for {{contact.COMPANY}}? Just reply "yes."</p>`,
    cta: 'Reply Yes',
    ctaUrl: 'mailto:denisse@nearshorenavigator.com?subject=Yes%20-%20Auto%20Parts%20Shortlist',
  },
};

function wrapHtml(body: string, ctaText: string, ctaUrl: string): string {
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

<!-- CTA -->
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:48px;">
<tr><td align="center" bgcolor="${green}" style="border-radius:16px;">
<a href="${ctaUrl}" style="display:block;padding:22px 48px;text-decoration:none;color:#000;font-weight:800;font-family:sans-serif;font-size:15px;text-transform:uppercase;letter-spacing:1px;">
${ctaText}
</a></td></tr></table>

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

function getNiche(industry: string): string {
  const ind = (industry || '').toLowerCase();
  if (ind.includes('aerospace') || ind.includes('defense')) return 'Aerospace';
  if (ind.includes('medical') || ind.includes('pharma') || ind.includes('biotech')) return 'Medical';
  if (ind.includes('electronics')) return 'Electronics';
  if (ind.includes('automotive')) return 'Automotive';
  return 'General';
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  console.log(`\n🚀 USMCA Week 3 Campaign Blast — June 29 2026 8:30 AM PDT`);
  console.log(DRY_RUN ? '  [DRY RUN]' : '  [LIVE RUN — scheduling campaigns in Brevo]');

  if (!DRY_RUN && !process.env.BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not set in .env.local');
    process.exit(1);
  }

  // 1. Load suppression list
  const suppressPath = path.join(process.cwd(), 'data/full_suppression_list.csv');
  const suppressed = new Set<string>();
  if (fs.existsSync(suppressPath)) {
    const rows = parse(fs.readFileSync(suppressPath, 'utf-8'), { columns: true, skip_empty_lines: true });
    rows.forEach((r: any) => {
      const email = (r.email || '').toLowerCase().trim();
      if (email) suppressed.add(email);
    });
  }

  // Load specific previous sent history logs to prevent duplicate outreach:
  const sentFiles = [
    path.join(process.cwd(), 'scripts/sent_june15_usmca_week1.json'),
    path.join(process.cwd(), 'scripts/sent_june22_blast_497.json'),
    path.join(process.cwd(), 'scripts/sent_june29_usmca_week2.json')
  ];

  const alreadySent = new Set<string>();
  for (const f of sentFiles) {
    if (fs.existsSync(f)) {
      try {
        const data = JSON.parse(fs.readFileSync(f, 'utf-8'));
        if (Array.isArray(data)) {
          data.forEach((e: any) => {
            const email = typeof e === 'string' ? e : e.email;
            if (email) alreadySent.add(email.toLowerCase().trim());
          });
        }
      } catch (err: any) {
        console.error(`Error reading sent file ${f}:`, err.message);
      }
    } else {
      console.warn(`Warning: Sent history file not found: ${f}`);
    }
  }

  // Load the master bad emails list from scratch/bad_emails.json
  const badEmailsPath = path.join(process.cwd(), 'scratch/bad_emails.json');
  if (fs.existsSync(badEmailsPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(badEmailsPath, 'utf-8'));
      if (Array.isArray(data)) {
        data.forEach((email: string) => {
          if (email) alreadySent.add(email.toLowerCase().trim());
        });
      }
    } catch (err: any) {
      console.error(`Error reading bad_emails.json:`, err.message);
    }
  } else {
    console.warn(`Warning: bad_emails.json not found: ${badEmailsPath}`);
  }

  console.log(`🧹 Suppression: ${suppressed.size} | Already sent (incl. bad emails): ${alreadySent.size}`);

  // 2. Retrieve fresh, unsent leads from the lead sources:
  // - segmented_leads/feb17/tier1_med_device.json
  // - segmented_leads/feb17/tier2_manufacturing.json
  const tier1Path = path.join(process.cwd(), 'segmented_leads/feb17/tier1_med_device.json');
  const tier2Path = path.join(process.cwd(), 'segmented_leads/feb17/tier2_manufacturing.json');
  const freshContacts: any[] = [];

  for (const [fpath, source] of [[tier1Path, 'tier1'], [tier2Path, 'tier2']]) {
    if (!fs.existsSync(fpath as string)) {
      console.warn(`Warning: Lead source file not found: ${fpath}`);
      continue;
    }
    const data = JSON.parse(fs.readFileSync(fpath as string, 'utf-8'));
    data.forEach((l: any) => {
      const email = (l.email || '').toLowerCase().trim();
      if (!email || suppressed.has(email) || alreadySent.has(email)) return;
      if (!l.firstName || !l.company || l.firstName === 'there' || l.company === 'your company') return;
      freshContacts.push({
        email,
        firstName: l.firstName,
        company: l.company,
        industry: l.industry || '',
        source,
      });
    });
  }

  console.log(`📋 Fresh unsent contacts loaded: ${freshContacts.length}`);

  // 3. Group these leads by their industry niche and cap at LIMIT_PER_NICHE
  const pools: Record<string, any[]> = { Aerospace: [], Medical: [], Electronics: [], Automotive: [], General: [] };
  const seen = new Set<string>();

  freshContacts.forEach(l => {
    if (seen.has(l.email)) return;
    const niche = getNiche(l.industry);
    if (pools[niche].length >= LIMIT_PER_NICHE) return;
    seen.add(l.email);
    pools[niche].push(l);
  });

  // Summary
  console.log('\n📊 Segment breakdown:');
  let grandTotal = 0;
  for (const niche of Object.keys(pools)) {
    console.log(`  ${niche}: ${pools[niche].length} contacts`);
    grandTotal += pools[niche].length;
  }
  console.log(`\n💎 Grand total to schedule: ${grandTotal} contacts`);

  if (grandTotal === 0) {
    console.log('ℹ️ No new fresh contacts found. Exiting.');
    process.exit(0);
  }

  if (DRY_RUN) {
    console.log('\n--- DRY RUN SAMPLES ---');
    for (const niche of Object.keys(pools)) {
      if (!pools[niche].length) continue;
      const tmpl = TEMPLATES[niche];
      console.log(`\n[${niche}] List: USMCA-Week3-${niche}-Jun29`);
      console.log(`  Subject: ${tmpl.subject}`);
      console.log(`  Sample contact: ${pools[niche][0].email} | ${pools[niche][0].firstName} | ${pools[niche][0].company} | ${pools[niche][0].industry}`);
    }
    console.log('\n✅ Dry run complete. Run without --dry-run to schedule.');
    return;
  }

  // LIVE scheduling in Brevo
  const { brevo } = await import('../../lib/brevo');
  const sentLog: string[] = [];

  for (const niche of Object.keys(pools)) {
    const leads = pools[niche];
    if (!leads.length) continue;

    const listName = `USMCA-Week3-${niche}-Jun29`;
    const tmpl = TEMPLATES[niche];
    const html = wrapHtml(tmpl.body, tmpl.cta, tmpl.ctaUrl);

    console.log(`\n[${niche}] Creating list "${listName}" with ${leads.length} contacts...`);

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

    // Import contacts sequentially with a 150ms sleep delay between calls to avoid rate-limiting
    console.log(`  📥 Importing ${leads.length} contacts sequentially...`);
    let importCount = 0;
    for (const l of leads) {
      try {
        await brevo.createContact({
          email: l.email,
          attributes: { FIRSTNAME: l.firstName, COMPANY: l.company, INDUSTRY: l.industry },
          listIds: [listId],
          updateEnabled: true,
        });
        importCount++;
        if (importCount % 10 === 0 || importCount === leads.length) {
          console.log(`    Imported ${importCount}/${leads.length}...`);
        }
      } catch (err: any) {
        console.error(`    ❌ Failed to import contact ${l.email}:`, err.message);
      }
      await sleep(150);
    }
    console.log(`  ✅ ${importCount} contacts imported`);

    const campRes = await brevo.createCampaign({
      name: listName,
      subject: tmpl.subject,
      htmlContent: html,
      listIds: [listId],
      scheduledAt: SCHEDULED_AT,
      sender: { name: 'Denisse Martinez', email: 'nearshore.navigator@gmail.com' },
    });
    console.log(`  ✅ Campaign scheduled for ${SCHEDULED_AT} (ID: ${campRes.id})`);

    leads.forEach(l => sentLog.push(l.email));
  }

  // Save sent log
  const logPath = path.join(process.cwd(), 'scripts/sent_june29_usmca_week3.json');
  fs.writeFileSync(logPath, JSON.stringify(sentLog, null, 2));
  console.log(`\n💾 Sent log saved: ${logPath} (${sentLog.length} emails)`);
  console.log(`\n✅ Done! ${grandTotal} cold emails scheduled for Monday, June 29, 2026 at 8:30 AM PDT`);
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
