import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { parse } from 'csv-parse/sync';

dotenv.config({ path: '/Users/gax8627/nearshore-navigator/.env.local' });

const DRY_RUN = process.argv.includes('--dry-run');
const SCHEDULED_AT = '2026-07-06T08:30:00-07:00'; // Monday, July 6 at 8:30 AM PDT

const TEMPLATES: Record<string, { subject: string; body: string; cta: string; ctaUrl: string }> = {
  General: {
    subject: 'USMCA joint review update: no automatic renewal',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>Following up on my last note. With the joint review starting yesterday, the U.S. officially declined to automatically renew the USMCA agreement for another 16-year term.</p>
<p>While the agreement remains in place for now, this triggers mandatory annual reviews. For manufacturers, this introduces a decade of supply chain uncertainty, particularly around regional value content (RVC).</p>
<p>Let's map out your exposure before audits ramp up. Worth a 15-minute call?</p>`,
    cta: 'Book 15-Min USMCA Audit',
    ctaUrl: 'https://calendly.com/denisse-nearshorenavigator/30min?utm_source=brevo&utm_medium=email&utm_campaign=usmca_week3_day7_general',
  },
  Electronics: {
    subject: 'USMCA update: Chinese component scrutiny under annual review',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>Following up on my last note. Yesterday, the U.S. declined to automatically extend the USMCA, triggering annual reviews.</p>
<p>This puts a direct target on non-regional content, specifically Chinese PCBs and modules routed through third countries.</p>
<p>Let's look at how this impacts {{contact.COMPANY}}'s electronic component logistics and landed cost. Worth a quick call?</p>`,
    cta: 'Book 15-Min Cost Assessment',
    ctaUrl: 'https://calendly.com/denisse-nearshorenavigator/30min?utm_source=brevo&utm_medium=email&utm_campaign=usmca_week3_day7_electronics',
  },
  Automotive: {
    subject: 'USMCA auto rules under annual review: RVC exposure',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>Following up. Yesterday, the U.S. declined to renew the USMCA for a 16-year term, moving to a system of annual reviews.</p>
<p>This means automotive rules of origin and content requirements will be negotiated and tightened year by year.</p>
<p>Worth a quick call to check where {{contact.COMPANY}} stands on RVC compliance?</p>`,
    cta: 'Book RVC Compliance Check',
    ctaUrl: 'https://calendly.com/denisse-nearshorenavigator/30min?utm_source=brevo&utm_medium=email&utm_campaign=usmca_week3_day7_automotive',
  },
  Medical: {
    subject: 'USMCA update: ISO 13485 supply chains and annual review risk',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>Following up. Yesterday's USMCA review ended with the U.S. declining automatic extension, moving to annual reviews.</p>
<p>This increases CBP audit risk for medical device components with non-North American origins.</p>
<p>I can walk you through how our FDA-registered Cleanroom partners in Baja California qualify under the new annual review framework. Worth a quick call?</p>`,
    cta: 'Book 15-Min Shortlist Review',
    ctaUrl: 'https://calendly.com/denisse-nearshorenavigator/30min?utm_source=brevo&utm_medium=email&utm_campaign=usmca_week3_day7_medical',
  }
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
Nearshore Navigator</td>
</tr></table>

<!-- Body -->
<div style="font-family:sans-serif;font-size:17px;line-height:1.8;color:${muted};margin-bottom:48px;">
${body}
</div>

<!-- CTA (Direct Calendly Booking with UTM parameters) -->
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:48px;">
<tr><td align="center" bgcolor="${green}" style="border-radius:16px;">
<a href="${ctaUrl}" style="display:block;padding:22px 48px;text-decoration:none;color:#000;font-weight:800;font-family:sans-serif;font-size:15px;text-transform:uppercase;letter-spacing:1px;text-align:center;">
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

function findLeadLocally(email: string): { firstName: string; company: string; industry: string } | null {
  const leadsDir = '/Users/gax8627/nearshore-navigator/segmented_leads';
  const allFiles = (dir: string): string[] => {
    let results: string[] = [];
    if (!fs.existsSync(dir)) return results;
    fs.readdirSync(dir).forEach(file => {
      const p = path.join(dir, file);
      if (fs.statSync(p).isDirectory()) results = results.concat(allFiles(p));
      else if (file.endsWith('.csv') || file.endsWith('.json')) results.push(p);
    });
    return results;
  };
  
  const files = allFiles(leadsDir);
  for (const file of files) {
    try {
      if (file.endsWith('.json')) {
        const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
        const found = data.find((l: any) => (l.email || '').toLowerCase().trim() === email.toLowerCase().trim());
        if (found) {
          return {
            firstName: found.firstName || 'there',
            company: found.company || 'your company',
            industry: found.industry || ''
          };
        }
      }
    } catch {}
  }
  return null;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  console.log(`\n🚀 Week 3 Day 7 Follow-up (USMCA Fallout) Campaign Scheduler`);
  console.log(DRY_RUN ? '  [DRY RUN]' : '  [LIVE RUN — scheduling campaigns in Brevo]');

  const sentPath = '/Users/gax8627/nearshore-navigator/scripts/sent_june29_usmca_week3.json';
  if (!fs.existsSync(sentPath)) {
    console.error(`❌ Sent log not found: ${sentPath}`);
    process.exit(1);
  }

  const sentEmails = JSON.parse(fs.readFileSync(sentPath, 'utf-8')) as string[];

  // Load suppression lists (bounces + unsubscribed/replied)
  const fullSuppressionPath = '/Users/gax8627/nearshore-navigator/data/full_suppression_list.csv';
  const suppressed = new Set<string>();
  if (fs.existsSync(fullSuppressionPath)) {
    const raw = fs.readFileSync(fullSuppressionPath, 'utf-8');
    const rows = parse(raw, { columns: true, skip_empty_lines: true });
    rows.forEach((r: any) => suppressed.add((r.email || '').toLowerCase().trim()));
  }

  const targets = sentEmails.filter(email => !suppressed.has(email.toLowerCase().trim()));
  console.log(`🎯 Targets after filtering bounces/suppressions: ${targets.length}`);

  if (targets.length === 0) {
    console.log('ℹ️ No target contacts left for follow-up.');
    process.exit(0);
  }

  const targetsEnriched: any[] = [];
  for (const email of targets) {
    const localLead = findLeadLocally(email);
    targetsEnriched.push({
      email,
      firstName: localLead?.firstName || 'there',
      company: localLead?.company || 'your company',
      industry: localLead?.industry || ''
    });
  }

  const pools: Record<string, any[]> = { Aerospace: [], Medical: [], Electronics: [], Automotive: [], General: [] };
  targetsEnriched.forEach(t => {
    const niche = getNiche(t.industry);
    pools[niche].push(t);
  });

  if (DRY_RUN) {
    console.log('\n--- DRY RUN SAMPLES ---');
    for (const niche of Object.keys(pools)) {
      if (!pools[niche].length) continue;
      const tmpl = TEMPLATES[niche] || TEMPLATES.General;
      console.log(`\n[${niche}] Subject: ${tmpl.subject}`);
      console.log(`  CTA: ${tmpl.cta} -> ${tmpl.ctaUrl}`);
      console.log(`  Sample: ${pools[niche][0].email} | Name: ${pools[niche][0].firstName}`);
    }
    return;
  }

  const { brevo } = await import('/Users/gax8627/nearshore-navigator/lib/brevo');

  for (const niche of Object.keys(pools)) {
    const leads = pools[niche];
    if (!leads.length) continue;

    const listName = `USMCA-Week3-Day7-Nurture-${niche}-Jul06`;
    const tmpl = TEMPLATES[niche] || TEMPLATES.General;
    const html = wrapHtml(tmpl.body, tmpl.cta, tmpl.ctaUrl);

    console.log(`\n[${niche}] Creating follow-up list "${listName}" with ${leads.length} contacts...`);
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
  }

  console.log(`\n🎉 Day 7 follow-up campaigns scheduled!`);
}

main().catch(console.error);
