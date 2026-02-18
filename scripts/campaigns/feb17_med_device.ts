
import fs from 'fs';
import path from 'path';
import { brevo } from '../../lib/brevo';
import { scoreLead } from '../../lib/lead-scoring';
import { hasEmailBudget, incrementEmailUsage, getEmailBudget } from '../../lib/email-usage-tracker';

const SEGMENT_FILE = path.join(process.cwd(), 'segmented_leads/feb17/tier1_med_device.json');

/**
 * Design Agent: Premium "Bulletproof V5" Template
 * Adapted for Cold Outreach (First Touch)
 */
function wrapHtml(content: string, ctaText: string, ctaUrl: string) {
  const primaryGreen = "#10B981"; // Emerald-500
  const darkDeep = "#020617"; // Slate-950
  const glassBg = "#0F172A"; // Slate-900 
  const glassBorder = "#1E293B"; // Slate-800
  const textMuted = "#94A3B8"; // Slate-400
  
  // Public Assets
  const signatureBanner = "https://nearshorenavigator.com/images/denisse-banner.jpg";

  // Format bold text
  const formattedContent = content.replace(/\*\*(.*?)\*\*/g, `<strong style="color: #ffffff; border-bottom: 2px solid ${primaryGreen};">$1</strong>`);

  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkDeep}" style="background-color: ${darkDeep}; table-layout: fixed;">
      <tr>
        <td align="center" style="padding: 60px 10px;">
          <!-- Main Card Shell -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; border-radius: 32px; overflow: hidden; border: 1px solid ${glassBorder};" bgcolor="${glassBg}">
            <!-- Passive Motion: Liquid Accent top (CSS Gradient) -->
            <tr>
              <td height="12" bgcolor="${primaryGreen}" style="background: linear-gradient(90deg, ${primaryGreen} 0%, ${primaryGreen} 40%, #ffffff 50%, ${primaryGreen} 60%, ${primaryGreen} 100%); background-size: 200% 100%; animation: scan 3s linear infinite;">
                <!-- Fallback for clients stripping CSS -->
                <div style="height: 12px; width: 100%; background-color: ${primaryGreen}; opacity: 0; display: none;">&nbsp;</div>
                <style>
                  @keyframes scan {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                  }
                </style>
              </td>
            </tr>
            
            <tr>
              <td style="padding: 56px 48px;">
                <!-- Header / Brand -->
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 48px;">
                  <tr>
                    <td width="42" valign="middle">
                      <table border="0" cellpadding="0" cellspacing="0" bgcolor="${primaryGreen}" style="border-radius: 12px; width: 42px; height: 42px;">
                        <tr>
                          <td align="center" style="color: #000; font-family: sans-serif; font-weight: 900; font-size: 24px; line-height: 42px;">N</td>
                        </tr>
                      </table>
                    </td>
                    <td style="padding-left: 16px; font-family: 'Space Grotesk', Helvetica, sans-serif; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -1px; text-transform: uppercase;">
                      Nearshore <span style="color: ${primaryGreen};">Navigator</span>
                    </td>
                  </tr>
                </table>

                <!-- Body Text -->
                <div style="font-family: 'Inter', Helvetica, sans-serif; font-size: 17px; line-height: 1.8; color: ${textMuted}; margin-bottom: 56px;">
                  ${formattedContent}
                </div>

                <!-- 2025 High-Intensity CTA -->
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 80px;">
                  <tr>
                    <td align="center" bgcolor="${primaryGreen}" style="border-radius: 16px; box-shadow: 0 15px 40px ${primaryGreen}40;">
                      <a href="${ctaUrl}" style="display: block; padding: 22px 48px; font-family: Helvetica, sans-serif; text-decoration: none; color: #000000; font-weight: 800; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
                        ${ctaText}
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- Premium Banner Signature (Attachment 2) -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius: 24px; overflow: hidden;">
                  <tr>
                    <td>
                      <img src="${signatureBanner}" width="544" style="display: block; width: 100%; height: auto; border: 1px solid ${primaryGreen}30; border-radius: 24px;" alt="Denisse Gastelum - Lead Advisor" />
                    </td>
                  </tr>
                </table>

                <!-- Bottom Footer -->
                <div style="margin-top: 48px; text-align: center; font-family: Helvetica, sans-serif; font-size: 11px; color: #475569; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">
                  Industrial Expansion &bull; 2025 Strategic Hub &bull; Unsubscribe
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

// Optimized send time (Next morning or Monday)
function getOptimalSendTime() {
  const d = new Date();
  const day = d.getDay(); 
  if (day === 5 || day === 6 || day === 0) {
     d.setDate(d.getDate() + ((1 + 7 - day) % 7));
  } else {
     d.setDate(d.getDate() + 1);
  }
  d.setHours(9, 0, 0, 0); 
  return d.toISOString();
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('🚀 Executing Campaign: Feb 17 Med Device & Pharma (Cold Outreach)...');
  
  const isDryRun = process.argv.includes('--dry-run');

  if (!isDryRun && !hasEmailBudget()) {
    const budget = getEmailBudget();
    console.error(`❌ BUDGET ALARM: Monthly Limit Reached (${budget.current}/${budget.limit}). Sending blocked.`);
    return;
  }

  // Load Segmented JSON
  if (!fs.existsSync(SEGMENT_FILE)) {
      console.error(`❌ Segment file not found: ${SEGMENT_FILE}`);
      console.error('   -> Please run "npx tsx scripts/segment_feb17_leads.ts" first.');
      return;
  }

  console.log(`Reading ${SEGMENT_FILE}...`);
  const targets = JSON.parse(fs.readFileSync(SEGMENT_FILE, 'utf-8'));

  console.log(`✅ Loaded ${targets.length} Tier 1 Targets (Med Device/Pharma).`);
  
  // FULL SEND: Processing all targets
  const batch = targets;
  const scheduledTime = getOptimalSendTime();

  for (let i = 0; i < batch.length; i++) {
    const t = batch[i];
    
    // Cold Outreach Template
    const subject = `Nearshore support for ${t.company}'s pipeline?`;
    const bodyHtml = wrapHtml(`
      <p>Hi ${t.firstName},</p>
      <p>If you’re evaluating contract manufacturing or supplier alternatives closer to the U.S., I’d like to offer a free, no-obligation consultation to map realistic options in Mexico.</p>
      
      <p>In a 20–30 minute call, we can cover:</p>
      <ul style="padding-left: 20px; list-style-position: inside;">
        <li>What you manufacture + key requirements (quality, certifications, volumes)</li>
        <li>The best-fit regions in Mexico for your product and logistics</li>
        <li>Typical timelines, costs, and common risks (and how to avoid them)</li>
        <li>Next steps to shortlist capable contract manufacturers</li>
      </ul>

      <p>If it’s helpful, reply with “Mexico” and a couple of times that work this week, and I’ll send a calendar invite.</p>
    `, "Book Strategy Call Now", "https://calendly.com/denisse-nearshorenavigator/30min");

    console.log(`[${i+1}/${batch.length}] To: ${t.email} (${t.company}) | Ind: ${t.industry}`);

    if (isDryRun) {
        if (i < 3) console.log(`   Preview Subject: ${subject}`);
    } else {
        try {
             await brevo.sendEmail({
                to: [{ email: t.email, name: t.firstName }],
                subject: subject,
                htmlContent: bodyHtml,
                scheduledAt: scheduledTime
            });
            incrementEmailUsage(1);
            console.log(`   ✅ Scheduled.`);
            await sleep(200);
        } catch (e: any) {
            console.error(`   ❌ Failed: ${e.message}`);
        }
    }
  }
}

main().catch(console.error);
