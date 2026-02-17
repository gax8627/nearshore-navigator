
import fs from 'fs';
import path from 'path';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { brevo } from '../../lib/brevo';
import { parse } from 'csv-parse/sync';
import { scoreLead } from '../../lib/lead-scoring';
import { hasEmailBudget, incrementEmailUsage, getEmailBudget } from '../../lib/email-usage-tracker';

const CLICKERS_FILE = path.join(process.cwd(), 'segmented_leads/high_intent_clickers.json');
const CSV_DIR = path.join(process.cwd(), 'segmented_leads');

// Helper to get next Monday at 9 AM
function getNextMonday() {
  const d = new Date();
  d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7)); // Next Monday
  d.setHours(9, 0, 0, 0); // 9 AM
  
  // If today is Monday and it's past 9am, move to next week
  if (d.getTime() < Date.now()) {
    d.setDate(d.getDate() + 7);
  }
  return d.toISOString();
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface ServiceTemplate {
  subject: string;
  body: (firstName: string, company: string) => string;
}

/**
 * Design Agent: Premium HTML Wrapper
 * Implements the "Green & Glass" visual system from the website.
 * Tokens accurately mapped from HomeClient.tsx and tailwind.config.ts.
 */
/**
 * redesignV5: The "Wow Factor" Bulletproof 2025
 * Includes passive motion (GIFs) and the premium Attachment 2 banner signature.
 */
function wrapHtml(content: string, ctaText: string, ctaUrl: string) {
  const primaryGreen = "#10B981"; // Emerald-500
  const darkDeep = "#020617"; // Slate-950
  const glassBg = "#0F172A"; // Slate-900 
  const glassBorder = "#1E293B"; // Slate-800
  const textMuted = "#94A3B8"; // Slate-400
  
  // Public Assets - These must be hosted on the website's public images folder
  const liquidGif = "https://nearshorenavigator.com/images/liquid-top.gif"; 
  const signatureBanner = "https://nearshorenavigator.com/images/denisse-banner.jpg";

  // Format bold text for robust rendering
  const formattedContent = content.replace(/\*\*(.*?)\*\*/g, `<strong style="color: #ffffff; border-bottom: 2px solid ${primaryGreen};">$1</strong>`);

  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkDeep}" style="background-color: ${darkDeep}; table-layout: fixed;">
      <tr>
        <td align="center" style="padding: 60px 10px;">
          <!-- Main Card Shell -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; border-radius: 32px; overflow: hidden; border: 1px solid ${glassBorder};" bgcolor="${glassBg}">
            <!-- Passive Motion: Liquid Accent top GIF -->
            <!-- Passive Motion: Liquid Accent top (CSS Gradient + Animation Fallback) -->
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
                  Industrial Expansion &bull; 2025 Strategic Hub
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

const TEMPLATES: Record<string, ServiceTemplate> = {
  manufacturing: {
    subject: "Mexico partner shortlist for {company}?",
    body: (firstName, company) => wrapHtml(`
      <p>Hi ${firstName},</p>
      <p>I noticed you were researching some of our nearshore manufacturing options in Mexico recently.</p>
      <p>Rather than jumping on a call, would it be helpful if I sent over a **shortlist of 3 vetted partners** specifically for **${company}**?</p>
      <p>I can include their current CNC/assembly capacities and typical lead times so you can compare them against your current setup without any commitment.</p>
      <p>If you're interested, just click below to schedule a time or simply reply to this email.</p>
    `, "Schedule Strategy Session", "https://calendly.com/denisse-nearshorenavigator/30min")
  },
  biotech: {
    subject: "Nearshore support for {company}'s pipeline?",
    body: (firstName, company) => wrapHtml(`
      <p>Hi ${firstName},</p>
      <p>I saw you were looking into nearshore operational support for **${company}**.</p>
      <p>I'm putting together a shortlist of Mexico-based teams that specialize in biotech logistics and clean-room assembly. Would you like me to send that over so you can review their ISO certifications and capabilities?</p>
      <p>No need for a call yet—just thought this might be useful for your 2026 planning.</p>
    `, "Book 15min Strategy Session", "https://calendly.com/denisse-nearshorenavigator/30min")
  }
};

function getTemplate(industry: string): ServiceTemplate {
  const normalized = industry.toLowerCase();
  if (normalized.includes('biotech') || normalized.includes('pharma') || normalized.includes('medical') || normalized.includes('r&d')) {
    return TEMPLATES.biotech;
  }
  return TEMPLATES.manufacturing;
}

// Helper to find lead details in CSVs
function findLeadDetails(email: string) {
  const files = fs.readdirSync(CSV_DIR).filter(f => f.endsWith('.csv'));
  for (const file of files) {
    const filePath = path.join(CSV_DIR, file);
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const rows = parse(content, { columns: true, skip_empty_lines: true, trim: true }) as any[];
        const match = rows.find((r: any) => {
            const leadEmail = (r['Email'] || r['Lead Id'] || r['Lead Email'] || '').toLowerCase();
            return leadEmail === email.toLowerCase();
        });

        if (match) {
            return {
                firstName: match['First Name'] || match['FirstName'] || 'there',
                company: match['Company'] || match['Account Name'] || 'your company',
                industry: match['Industry'] || 'manufacturing'
            };
        }
    } catch (e) {
        // Skip malformed CSVs
    }
  }
  return { firstName: 'there', company: 'your company', industry: 'manufacturing' };
}

async function main() {
  console.log('🚀 Executing Outreach Agent: Service-Based Bulk Follow-up...');

  if (!hasEmailBudget()) {
    const budget = getEmailBudget();
    console.error(`❌ BUDGET ALARM: Monthly Limit Reached (${budget.current}/${budget.limit}). Sending blocked.`);
    return;
  }

  if (!fs.existsSync(CLICKERS_FILE)) {
    console.error(`❌ Clickers file not found: ${CLICKERS_FILE}`);
    return;
  }

  const clickers = JSON.parse(fs.readFileSync(CLICKERS_FILE, 'utf-8'));
  const scheduledTime = getNextMonday();

  console.log(`Processing ${clickers.length} clicks from your logs...`);

  const results = [];

  for (let i = 0; i < clickers.length; i++) {
    const { email, clickCount } = clickers[i];
    const details = findLeadDetails(email);
    
    // Skill Integration: Lead Scoring
    const scoring = scoreLead({
        name: details.firstName,
        company: details.company,
        email: email,
        message: `Activity: Clicked Calendly ${clickCount} times`
    });

    const template = getTemplate(details.industry);
    const subject = template.subject.replace('{company}', details.company);
    const htmlBody = template.body(details.firstName, details.company);

    console.log(`[${i+1}/${clickers.length}] To: ${email} | Industry: ${details.industry} | Score: ${scoring.score} (${scoring.category})`);

    if (process.argv.includes('--dry-run')) {
      console.log(`   Subject: ${subject}`);
      console.log(`   Preview: ${htmlBody.substring(0, 150).replace(/\n/g, '')}...`);
    } else {
      try {
        // Only schedule for High/Medium scores if not in a rush
        if (scoring.category !== 'Low' || clickCount > 1) {
            await brevo.sendEmail({
                to: [{ email, name: details.firstName }],
                subject: subject,
                htmlContent: htmlBody,
                scheduledAt: scheduledTime
            });
            incrementEmailUsage(1);
            console.log(`   ✅ Scheduled (Priority ${scoring.category}).`);
        } else {
            console.log(`   ⏩ Skipping (Low priority: ${scoring.reason})`);
        }
      } catch (e: any) {
        console.error(`   ❌ Failed: ${e.message}`);
      }
    }

    if (i < clickers.length - 1) await sleep(500); 
  }
}

main().catch(console.error);
