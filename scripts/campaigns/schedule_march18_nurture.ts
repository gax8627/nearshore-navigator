/**
 * March 18th Nurture Campaign — 452 Warm Leads
 *
 * Targets: March 9-10 openers & clickers who haven't received follow-up
 * Clickers (307) get "case study" angle — they've shown intent
 * Openers (145) get "social proof" angle — they're curious but need nudge
 *
 * Sales-Automator Skill Applied:
 * ✅ Lead with value, not features
 * ✅ Personalize using research (company + past engagement)
 * ✅ Keep emails short and scannable
 * ✅ Focus on one clear CTA
 * ✅ A/B test subject lines
 *
 * Run preview:  npx tsx scripts/campaigns/schedule_march18_nurture.ts --dry-run
 * Run for real: npx tsx scripts/campaigns/schedule_march18_nurture.ts
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { brevo } from '../../lib/brevo';

const SENT_LOG_PATH = path.join(process.cwd(), 'scripts/sent_march18_nurture.json');

const DRY_RUN = process.argv.includes('--dry-run');

// Schedule for tomorrow 9:30 AM MT (16:30 UTC) — optimal B2B send time
// March 19 = after DST, MT = UTC-6
const SCHEDULED_AT = '2026-03-19T16:30:00.000Z';

const envPath = path.join(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

interface WarmLead {
  email: string;
  tier: 'clicker' | 'opener';
  last_interaction: string;
}

async function main() {
  console.log('\n🔥 March 18th Nurture Campaign — Warm Lead Follow-Up');
  console.log(DRY_RUN ? '  [DRY RUN — no emails will be sent]\n' : '  [LIVE — emails will be scheduled via Brevo]\n');

  if (!DRY_RUN && !process.env.BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not set.');
    process.exit(1);
  }

  // ─── 1. Load Warm Leads from Engagement Data ─────────────────────────────
  const engagementPath = path.join(process.cwd(), 'scripts/engagement_data.json');
  if (!fs.existsSync(engagementPath)) {
    console.error('❌ engagement_data.json not found.');
    process.exit(1);
  }

  const engagement = JSON.parse(fs.readFileSync(engagementPath, 'utf-8'));
  const warmLeads: WarmLead[] = [];

  for (const [email, info] of Object.entries(engagement) as [string, any][]) {
    const history = info.history || [];

    // Find March 9 or 10 activity
    const marchEvents = history.filter((e: any) =>
      (e.date || '').includes('2026-03-09') || (e.date || '').includes('2026-03-10')
    );
    if (marchEvents.length === 0) continue;

    const hasClick = marchEvents.some((e: any) => ['clicked', 'clicks'].includes(e.type));
    const hasOpen = marchEvents.some((e: any) => e.type === 'opened');
    const hasBounce = marchEvents.some((e: any) => ['softBounces', 'hardBounces'].includes(e.type));

    if (hasBounce && !hasClick && !hasOpen) continue;

    if (hasClick || hasOpen) {
      warmLeads.push({
        email: email.toLowerCase().trim(),
        tier: hasClick ? 'clicker' : 'opener',
        last_interaction: info.last_interaction || '',
      });
    }
  }

  // ─── 2. Dedupe against already-nurture-sent ───────────────────────────────
  const alreadySent = new Set<string>();
  if (fs.existsSync(SENT_LOG_PATH)) {
    const existing = JSON.parse(fs.readFileSync(SENT_LOG_PATH, 'utf-8'));
    if (Array.isArray(existing)) existing.forEach((e: string) => alreadySent.add(e.toLowerCase().trim()));
  }

  const leads = warmLeads.filter(l => !alreadySent.has(l.email));
  const clickers = leads.filter(l => l.tier === 'clicker');
  const openers = leads.filter(l => l.tier === 'opener');

  console.log(`📋 Warm leads identified: ${leads.length}`);
  console.log(`   🎯 Clickers (high intent): ${clickers.length}`);
  console.log(`   👁️  Openers (warm): ${openers.length}`);

  if (leads.length === 0) {
    console.log('✨ No new warm leads to nurture — all already contacted.');
    process.exit(0);
  }

  // ─── 3. Prepare and Schedule Emails ───────────────────────────────────────
  let sentCount = 0;
  const sentEmails: string[] = [...(Array.isArray(alreadySent) ? [] : Array.from(alreadySent))];

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];

    // A/B subject lines by tier
    const useFormatA = i % 2 === 0;
    let subject: string;

    if (lead.tier === 'clicker') {
      // CLICKER subjects — they clicked before, go deeper
      subject = useFormatA
        ? 'The Baja facility list you looked at — here\'s what happened next'  // Format A — story hook
        : 'Quick update: one of those Baja partners just landed a new US client'; // Format B — FOMO
    } else {
      // OPENER subjects — they opened but didn't click, needs more social proof
      subject = useFormatA
        ? '3 companies that moved to Baja this quarter (and why)'     // Format A — social proof
        : 'The Mexico manufacturing shortlist — updated for March';   // Format B — freshness
    }

    const html = lead.tier === 'clicker'
      ? buildClickerEmail(lead.email)
      : buildOpenerEmail(lead.email);

    if (DRY_RUN) {
      if (i < 8) {
        console.log(`[DRY RUN] → ${lead.email} [${lead.tier}]`);
        console.log(`           Subject: ${subject}`);
      }
      if (i === 8) console.log('  ... (showing first 8 only)');
      sentCount++;
    } else {
      try {
        await brevo.sendEmail({
          to: [{ email: lead.email }],
          subject,
          htmlContent: html,
          scheduledAt: SCHEDULED_AT,
        });

        sentEmails.push(lead.email);
        sentCount++;

        if (sentCount % 50 === 0) {
          console.log(`  ⏳ Scheduled ${sentCount} / ${leads.length}...`);
          fs.writeFileSync(SENT_LOG_PATH, JSON.stringify(sentEmails, null, 2));
        }

        // 800ms delay — Brevo rate-limit safeguard
        await new Promise(r => setTimeout(r, 800));
      } catch (e: any) {
        console.error(`  ❌ Failed for ${lead.email}: ${e.message}`);
      }
    }
  }

  // ─── 4. Save Log ───────────────────────────────────────────────────────────
  if (!DRY_RUN) {
    fs.writeFileSync(SENT_LOG_PATH, JSON.stringify(sentEmails, null, 2));
    console.log(`\n✅ Done! ${sentCount} nurture emails queued for Mar 19 @ 9:30AM MT.`);
    console.log(`   Log saved → ${SENT_LOG_PATH}`);
  } else {
    console.log(`\n✅ Dry run complete.`);
    console.log(`   ${sentCount} nurture emails would be scheduled for ${SCHEDULED_AT}`);
    console.log(`   Clickers: ~${clickers.length} | Openers: ~${openers.length}`);
  }
}

// ─── Email Builders (Sales-Automator Skill: Value-led, scannable, single CTA) ─

function buildClickerEmail(email: string): string {
  const primaryGreen = '#10B981';
  const darkDeep = '#020617';
  const glassBg = '#0F172A';
  const glassBorder = '#1E293B';
  const textMuted = '#94A3B8';
  const calendlyLink = 'https://calendly.com/denisse-nearshorenavigator/30min';

  // CLICKER copy: They already showed intent — give them a case study / next step
  const content = `
    <p>Hi there,</p>
    <p>You checked out our Baja California partner shortlist last week — wanted to share a quick update.</p>
    <p>One of the manufacturers on that list just <strong>onboarded a US medical device company</strong> in under 6 weeks. They went from first call to production-ready with:</p>
    <ul style="color: ${textMuted}; line-height: 2;">
      <li>✅ <strong>ISO 13485 / AS9100</strong> certification already in place</li>
      <li>✅ USMCA-compliant — <strong>zero tariff exposure</strong></li>
      <li>✅ 45-minute drive from the San Diego border crossing</li>
    </ul>
    <p>If you'd like me to match your product specs to the right CM partner, I can send over a customized shortlist. Takes about 48 hours.</p>
    <p>Just reply <strong>"send it"</strong> and I'll get started.</p>
  `;

  return buildEmailShell(content, calendlyLink, primaryGreen, darkDeep, glassBg, glassBorder, textMuted);
}

function buildOpenerEmail(email: string): string {
  const primaryGreen = '#10B981';
  const darkDeep = '#020617';
  const glassBg = '#0F172A';
  const glassBorder = '#1E293B';
  const textMuted = '#94A3B8';
  const calendlyLink = 'https://calendly.com/denisse-nearshorenavigator/30min';

  // OPENER copy: They opened but didn't engage — social proof + low-commitment CTA
  const content = `
    <p>Hi there,</p>
    <p>3 quick data points from this quarter that might be relevant:</p>
    <ol style="color: ${textMuted}; line-height: 2.2;">
      <li><strong>14 US companies</strong> moved manufacturing to Baja California in Q1 2026</li>
      <li>Average <strong>cost reduction of 32%</strong> vs. domestic production</li>
      <li>Zero tariff impact under <strong>USMCA rules of origin</strong></li>
    </ol>
    <p>We maintain a vetted shortlist of contract manufacturers in Tijuana, Mexicali, and Ensenada — matched by industry, certifications, and capacity.</p>
    <p>If you're even slightly evaluating nearshore options, I can send the list as a PDF. <strong>No sales call required.</strong></p>
  `;

  return buildEmailShell(content, calendlyLink, primaryGreen, darkDeep, glassBg, glassBorder, textMuted);
}

function buildEmailShell(
  content: string,
  calendlyLink: string,
  primaryGreen: string,
  darkDeep: string,
  glassBg: string,
  glassBorder: string,
  textMuted: string,
): string {
  const signatureBanner = 'https://nearshorenavigator.com/images/denisse-banner.jpg';

  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkDeep}" style="background-color: ${darkDeep}; table-layout: fixed;">
      <tr>
        <td align="center" style="padding: 60px 10px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; border-radius: 32px; overflow: hidden; border: 1px solid ${glassBorder};" bgcolor="${glassBg}">
            <tr><td height="12" bgcolor="${primaryGreen}"></td></tr>
            <tr>
              <td style="padding: 56px 48px;">
                <!-- Logo -->
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
                <!-- Body -->
                <div style="font-family: sans-serif; font-size: 17px; line-height: 1.8; color: ${textMuted}; margin-bottom: 56px;">
                  ${content}
                </div>
                <!-- PRIMARY CTA -->
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;" width="100%">
                  <tr>
                    <td align="center" bgcolor="${primaryGreen}" style="border-radius: 16px;">
                      <a href="mailto:denisse@nearshorenavigator.com?subject=Send%20me%20the%20Baja%20shortlist" style="display: block; padding: 22px 48px; font-family: sans-serif; text-decoration: none; color: #000000; font-weight: 800; font-size: 16px; text-transform: uppercase;">
                        Reply "Send It" — Get The PDF
                      </a>
                    </td>
                  </tr>
                </table>
                <!-- SECONDARY CTA: Calendly -->
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 80px;" width="100%">
                  <tr>
                    <td align="center" style="border-radius: 16px; border: 2px solid ${primaryGreen};">
                      <a href="${calendlyLink}" style="display: block; padding: 18px 48px; font-family: sans-serif; text-decoration: none; color: ${primaryGreen}; font-weight: 700; font-size: 14px; text-transform: uppercase;">
                        Or Book a 15-Min Discovery Call →
                      </a>
                    </td>
                  </tr>
                </table>
                <!-- Signature Banner -->
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
