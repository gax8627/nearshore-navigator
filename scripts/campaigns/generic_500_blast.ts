/**
 * Generic 500 Blast — Niche-Aware Outreach
 * 
 * Sends 500 emails NOW across all niches with industry-specific personalization.
 * Uses the premium emerald glassmorphism design + Denisse banner signature.
 * 
 * Run:  npx tsx scripts/campaigns/generic_500_blast.ts
 * Dry:  npx tsx scripts/campaigns/generic_500_blast.ts --dry-run
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_LIMIT = 500;
const SENT_LOG = path.join(process.cwd(), 'segmented_leads/sent_generic_500.json');

// ─── Sent Log ─────────────────────────────────────────────────────────────────
function loadSentLog(): Set<string> {
  // Combine ALL sent logs for global dedup
  const logs = [
    SENT_LOG,
    path.join(process.cwd(), 'segmented_leads/sent_manufacturing_outreach.json'),
    path.join(process.cwd(), 'segmented_leads/sent_1k_batch_march3.json'),
  ];
  const set = new Set<string>();
  for (const f of logs) {
    if (fs.existsSync(f)) {
      try {
        JSON.parse(fs.readFileSync(f, 'utf-8')).forEach((e: string) => set.add(e.toLowerCase().trim()));
      } catch {}
    }
  }
  return set;
}

function saveSentLog(emails: string[]) {
  const existing = loadSentLog();
  emails.forEach(e => existing.add(e));
  fs.writeFileSync(SENT_LOG, JSON.stringify(Array.from(existing), null, 2));
}

// ─── Niche-Specific Copy ──────────────────────────────────────────────────────
function getNicheCopy(industry: string, firstName: string, company: string): { subject: string; body: string } {
  const ind = industry.toLowerCase();

  if (ind.includes('aerospace') || ind.includes('defense')) {
    return {
      subject: `${company} — USMCA-compliant aerospace partners in Baja?`,
      body: `
        <p>Hi ${firstName},</p>
        <p>With the 2026 USMCA review tightening Rules of Origin requirements for defense and aerospace components, many manufacturers are re-evaluating their supply chain.</p>
        <p>We've helped AS9100-certified shops in Baja California support U.S. aerospace primes — <strong>20 minutes from San Diego, USMCA duty-free</strong>, with full ITAR-compliant facility options.</p>
        <p>Would it be useful if I sent over a <strong>shortlist of 3 vetted Baja partners</strong> with relevant aerospace certifications for ${company}?</p>
        <p>Just reply "yes" and I'll put it together this week.</p>
      `
    };
  }

  if (ind.includes('medical') || ind.includes('pharma') || ind.includes('biotech')) {
    return {
      subject: `${company} — ISO 13485 contract manufacturers in Mexico?`,
      body: `
        <p>Hi ${firstName},</p>
        <p>If ${company} is evaluating nearshore options for medical device or pharmaceutical manufacturing, Baja California has become a serious alternative — <strong>ISO 13485 and FDA-registered</strong> facilities within a 30-minute drive of the U.S. border.</p>
        <p>We work with med-tech companies looking to reduce lead times and tariff exposure while maintaining full regulatory compliance.</p>
        <p>Would a <strong>shortlist of 3 vetted partners</strong> with relevant clean-room and quality certifications be useful?</p>
        <p>Just reply "yes" — no call needed, I'll send the PDF.</p>
      `
    };
  }

  if (ind.includes('electronics')) {
    return {
      subject: `${company} — nearshore electronics assembly in Baja?`,
      body: `
        <p>Hi ${firstName},</p>
        <p>With the 25–145% tariffs on Chinese electronics components now in full effect, several U.S. electronics manufacturers are moving sub-assembly work to <strong>Baja California</strong> — USMCA duty-free, same-day logistics to the West Coast.</p>
        <p>We've built a network of certified contract manufacturers with SMT lines, box-build capability, and ISO 9001 / IPC standards already in place.</p>
        <p>Would a <strong>shortlist of 3 vetted partners</strong> for ${company} be helpful? I can send it as a PDF — no call required.</p>
        <p>Just reply "yes."</p>
      `
    };
  }

  if (ind.includes('automotive')) {
    return {
      subject: `${company} — USMCA-compliant auto parts partners?`,
      body: `
        <p>Hi ${firstName},</p>
        <p>The new USMCA auto content thresholds are creating real pressure on parts suppliers still sourcing from Asia. Several of your peers are pivoting stamping, machining, and sub-assembly work to <strong>Northern Mexico</strong> — same IATF 16949 standards, fraction of the landed cost.</p>
        <p>Would it be useful if I put together a <strong>shortlist of 3 vetted Baja/Sonora partners</strong> specific to what ${company} manufactures?</p>
        <p>Just reply "yes" and I'll send the comparison PDF this week.</p>
      `
    };
  }

  // Default: General Manufacturing / Industrial Machinery
  return {
    subject: `${company} — Mexico manufacturing shortlist?`,
    body: `
      <p>Hi ${firstName},</p>
      <p>I work with mid-market manufacturers who are evaluating Mexico to offset the new tariff exposure — specifically the 2025 25–145% rates on Chinese components and sub-assemblies.</p>
      <p>Baja California is worth a look: <strong>20 minutes from San Diego</strong>, USMCA duty-free, and machine shops with AS9100 and ISO 13485 already certified. We've helped companies go from evaluation to live production in 90 days.</p>
      <p>Would it be useful if I put together a <strong>shortlist of 3 vetted Baja partners</strong> specific to what ${company} manufactures?</p>
      <p>Just reply "yes" — I'll send the PDF, no call needed.</p>
    `
  };
}

// ─── Premium Email Design ─────────────────────────────────────────────────────
function wrapHtml(content: string) {
  const primaryGreen = "#10B981";
  const darkDeep = "#020617";
  const glassBg = "#0F172A";
  const glassBorder = "#1E293B";
  const textMuted = "#94A3B8";
  const signatureBanner = "https://nearshorenavigator.com/images/denisse-banner.jpg?v=MAY20";

  const formattedContent = content.replace(/\*\*(.*?)\*\*/g, `<strong style="color: #ffffff; border-bottom: 2px solid ${primaryGreen};">$1</strong>`);

  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkDeep}" style="background-color: ${darkDeep}; table-layout: fixed;">
      <tr>
        <td align="center" style="padding: 60px 10px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; border-radius: 32px; overflow: hidden; border: 1px solid ${glassBorder};" bgcolor="${glassBg}">
            <tr>
              <td height="12" bgcolor="${primaryGreen}" style="background: linear-gradient(90deg, ${primaryGreen} 0%, ${primaryGreen} 40%, #ffffff 50%, ${primaryGreen} 60%, ${primaryGreen} 100%); background-size: 200% 100%;">
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
                    <td style="padding-left: 16px; font-family: sans-serif; font-size: 22px; font-weight: 700; color: #ffffff; text-transform: uppercase;">
                      Nearshore <span style="color: ${primaryGreen};">Navigator</span>
                    </td>
                  </tr>
                </table>
                <div style="font-family: sans-serif; font-size: 17px; line-height: 1.8; color: ${textMuted}; margin-bottom: 56px;">
                  ${formattedContent}
                </div>
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 56px;">
                  <tr>
                    <td align="center" bgcolor="${primaryGreen}" style="border-radius: 16px;">
                      <a href="mailto:denisse@nearshorenavigator.com?subject=Mexico%20partner%20shortlist%20request" style="display: block; padding: 22px 48px; font-family: sans-serif; text-decoration: none; color: #000000; font-weight: 800; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
                        Reply "Yes" To Get The PDF
                      </a>
                    </td>
                  </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center">
                      <img src="${signatureBanner}" width="544" style="display: block; width: 100%; height: auto; border-radius: 16px; border: 0;" alt="Denisse Martinez — Lead Advisor" />
                    </td>
                  </tr>
                </table>
                <div style="margin-top: 48px; text-align: center; font-family: sans-serif; font-size: 11px; color: #475569; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">
                  Industrial Expansion &bull; 2026 Strategic Hub &bull; <a href="mailto:denisse@nearshorenavigator.com?subject=Unsubscribe" style="color: #475569; text-decoration: none;">Unsubscribe</a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const { brevo } = await import('../../lib/brevo');
  const { hasEmailBudget, incrementEmailUsage, getEmailBudget } = await import('../../lib/email-usage-tracker');

  console.log('\n🚀 Generic 500 Blast — Niche-Aware Outreach');
  console.log(DRY_RUN ? '  [DRY RUN — no emails will be sent]\n' : '  [LIVE — sending via Brevo NOW]\n');

  if (!DRY_RUN && !process.env.BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not set.'); process.exit(1);
  }

  if (!DRY_RUN && !hasEmailBudget()) {
    const b = getEmailBudget();
    console.error(`❌ Budget reached (${b.current}/${b.limit}).`); process.exit(1);
  }

  // Load ALL leads
  const tier1 = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'segmented_leads/feb17/tier1_med_device.json'), 'utf-8'));
  const tier2 = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'segmented_leads/feb17/tier2_manufacturing.json'), 'utf-8'));

  const sentLog = loadSentLog();
  const seen = new Set<string>();
  const leads: any[] = [];

  // Shuffle for diversity across niches
  const allLeads = [...tier1, ...tier2].sort(() => Math.random() - 0.5);

  for (const l of allLeads) {
    if (leads.length >= BATCH_LIMIT) break;
    const email = l.email?.toLowerCase().trim();
    if (!email || !email.includes('@') || sentLog.has(email) || seen.has(email)) continue;
    if (!l.firstName) continue;
    seen.add(email);
    leads.push(l);
  }

  // Stats
  const nicheCounts: Record<string, number> = {};
  leads.forEach(l => { nicheCounts[l.industry] = (nicheCounts[l.industry] || 0) + 1; });

  console.log(`📋 Selected ${leads.length} fresh leads:`);
  Object.entries(nicheCounts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`   ${v} — ${k}`));
  console.log('');

  // Send
  let sent = 0, failed = 0;
  const newlySent: string[] = [];

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const { subject, body } = getNicheCopy(lead.industry || 'Manufacturing', lead.firstName, lead.company);
    const html = wrapHtml(body);

    if (DRY_RUN) {
      if (i < 5) console.log(`[DRY] ${lead.email} | ${lead.company} | ${lead.industry}`);
      sent++;
    } else {
      try {
        await brevo.sendEmail({
          to: [{ email: lead.email, name: lead.firstName }],
          subject,
          htmlContent: html,
        });
        incrementEmailUsage(1);
        newlySent.push(lead.email);
        sent++;

        if (sent % 25 === 0) {
          console.log(`  ✅ ${sent}/${leads.length} sent...`);
          saveSentLog(newlySent); // periodic save
        }

        // Rate limit: 800ms to stay safe with Brevo
        await new Promise(r => setTimeout(r, 800));
      } catch (e: any) {
        console.error(`  ❌ [${i + 1}] ${lead.email}: ${e.message}`);
        failed++;
      }
    }
  }

  // Final save
  if (!DRY_RUN) {
    saveSentLog(newlySent);
    console.log(`\n✅ BLAST COMPLETE. Sent: ${sent} | Failed: ${failed}`);
    console.log(`📊 Budget: ${getEmailBudget().current}/${getEmailBudget().limit} used this month.`);
  } else {
    console.log(`\n✅ Dry run complete. ${sent} emails previewed.`);
  }
}

main().catch(console.error);
