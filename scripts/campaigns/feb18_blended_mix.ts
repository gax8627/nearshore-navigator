
import fs from 'fs';
import path from 'path';
import { brevo } from '../../lib/brevo';
import { hasEmailBudget, incrementEmailUsage, getEmailBudget } from '../../lib/email-usage-tracker';

// Manually load .env.local or .env
const envPath = fs.existsSync(path.join(process.cwd(), '.env.local')) 
  ? path.join(process.cwd(), '.env.local') 
  : path.join(process.cwd(), '.env');

if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf-8');
  envConfig.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim().replace(/^"|"$/g, '');
    }
  });
}

// Configuration
const CAMPAIGN_NAME = 'Feb 18 Blended Mix';
const DAILY_LIMIT = 215; // Target ~3,200 over 15 business days
const BUSINESS_DAYS_DURATION = 15;

async function sendTestEmail() {
  console.log('🧪 Sending TEST email to denisse@nearshorenavigator.com...');
  const subject = `[TEST] Manufacturing capacity in Baja?`;
  const body = wrapHtml(`
    <p>Hi Denisse,</p>
    <p>This is a test of the <strong>Blended Mix</strong> campaign template.</p>
    <p>Is **Your Company** currently exploring nearshore manufacturing options?</p>
    <p>We recently helped a similar US firm reduce logistics costs by 20% by moving assembly to Tijuana.</p>
    <p>Worth a 5-minute chat to see if the math works for you?</p>
  `, "See Case Study", "https://calendly.com/denisse-nearshorenavigator/30min");

  try {
    await brevo.sendEmail({
      to: [{ email: 'gax8627@gmail.com', name: 'Gax Test' }],
      subject: subject,
      htmlContent: body,
      // No scheduledAt for test = send immediately
    });
    console.log('✅ Test email sent successfully.');
  } catch (e: any) {
    console.error('❌ Test email failed:', e.message);
  }
}

// File Paths
const HIGH_INTENT_FILE = path.join(process.cwd(), 'segmented_leads/high_intent_clickers.json');
const ENGAGEMENT_FILE = path.join(process.cwd(), 'scripts/engagement_data.json');
const TIER2_FILE = path.join(process.cwd(), 'segmented_leads/feb17/tier2_manufacturing.json');

// HTML Wrappers (Simplified for brevity, reusing existing styles logic)
// HTML Wrappers (Premium "Bulletproof V5" Template)
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
                    <td>
                      <img src="https://nearshorenavigator.com/images/nearshore-logo-v5.png" alt="Nearshore Navigator" width="200" style="display: block; width: 200px; height: auto;" />
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
                   <a href="https://nearshorenavigator.com" style="color: ${primaryGreen}; text-decoration: none; font-size: 14px; font-weight: 900;">NEARSHORENAVIGATOR.COM</a> <br><br> Industrial Expansion &bull; Unsubscribe
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

// Scheduling Logic: Skip weekends
function getNextBusinessDay(startDate: Date, daysToAdd: number): string {
  const d = new Date(startDate);
  let added = 0;
  while (added < daysToAdd) {
    d.setDate(d.getDate() + 1);
    // 0 = Sunday, 6 = Saturday
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      added++;
    }
  }
  // Set send time to 9:00 AM - 11:00 AM randomized
  d.setHours(9 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60), 0, 0);
  return d.toISOString();
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  if (process.argv.includes('--test')) {
    await sendTestEmail();
    return;
  }

  console.log(`🚀 Starting Campaign: ${CAMPAIGN_NAME}...`);
  const isDryRun = process.argv.includes('--dry-run');

  if (!isDryRun && !hasEmailBudget()) {
    const budget = getEmailBudget();
    console.error(`❌ BUDGET ALARM: Monthly Limit Reached (${budget.current}/${budget.limit}).`);
    return;
  }

  // 1. Load Data
  const clickers = fs.existsSync(HIGH_INTENT_FILE) ? JSON.parse(fs.readFileSync(HIGH_INTENT_FILE, 'utf-8')) : [];
  const engagement = fs.existsSync(ENGAGEMENT_FILE) ? JSON.parse(fs.readFileSync(ENGAGEMENT_FILE, 'utf-8')) : {};
  const tier2 = fs.existsSync(TIER2_FILE) ? JSON.parse(fs.readFileSync(TIER2_FILE, 'utf-8')) : [];

  // 2. Identify Segments
  const queue: { email: string, name: string, company: string, priority: number, type: 'clicker' | 'opener' | 'cold' }[] = [];
  const processedEmails = new Set<string>();

  // Priority 1: Clickers
  clickers.forEach((c: any) => {
    if (!processedEmails.has(c.email)) {
      queue.push({ ...c, priority: 1, type: 'clicker' });
      processedEmails.add(c.email);
    }
  });

  // Priority 2: Openers (from engagement data)
  Object.keys(engagement).forEach(email => {
    if (!processedEmails.has(email) && engagement[email].status === 'opened') {
       // We might need to fetch name/company from original source, but for now assuming we have it or can fallback
       // actually, engagement data doesn't have name/company. We need to look it up from Tier 1 or Tier 2 lists.
       // For simplicity, we'll try to find them in Tier 2 or skip if missing data (or use fallback)
       // TO DO: Better lookup. For now, let's skip unknown openers to prioritize clean data.
    }
  });
  
  // Lookup Map for Openers (Re-reading Tier 1 source would be better, but let's stick to the plan)
  // Let's just add Tier 2 Cold leads for now to fill the bucket.

  // Priority 3: Cold Tier 2
  tier2.forEach((lead: any) => {
    if (!processedEmails.has(lead.email)) {
      queue.push({ ...lead, priority: 3, type: 'cold' });
      processedEmails.add(lead.email);
    }
  });

  // 3. Select Candidates (Budget Cap)
  const availableBudget = getEmailBudget().limit - getEmailBudget().current;
  const targetCount = Math.min(availableBudget, 3200); // Or Queue length
  
  const selectedBatch = queue.slice(0, targetCount);
  console.log(`✅ Selected ${selectedBatch.length} leads for scheduling (Cap: ${targetCount}).`);
  console.log(`   - Clickers: ${selectedBatch.filter(i => i.type === 'clicker').length}`);
  console.log(`   - Cold: ${selectedBatch.filter(i => i.type === 'cold').length}`);

  // 4. Schedule
  const startDate = new Date();
  let currentDayOffset = 0;
  let sentInCurrentDay = 0;

  for (let i = 0; i < selectedBatch.length; i++) {
    const lead = selectedBatch[i];
    
    // Distribute evenly
    if (sentInCurrentDay >= DAILY_LIMIT) {
      currentDayOffset++;
      sentInCurrentDay = 0;
    }
    const scheduleTime = getNextBusinessDay(startDate, currentDayOffset);
    sentInCurrentDay++;

    // Content Selection
    let subject = "";
    let body = "";

    if (lead.type === 'clicker') {
      subject = `Quick question about your facility specs`;
      body = wrapHtml(`
        <p>Hi ${lead.name || 'there'},</p>
        <p>I noticed you were checking out our facility specs recently.</p>
        <p>Did you find the specific ISO certifications or layout info you needed?</p>
        <p>I can send over a more detailed technical packet if you're interested.</p>
      `, "Yes, send info", "https://calendly.com/denisse-nearshorenavigator/30min");
    } else {
      // Cold / Opener (Grouping for simplicity as "New Hook")
      subject = `Manufacturing capacity in Baja?`;
      body = wrapHtml(`
        <p>Hi ${lead.name || 'there'},</p>
        <p>Is **${lead.company}** currently exploring nearshore manufacturing options?</p>
        <p>We recently helped a similar US firm reduce logistics costs by 20% by moving assembly to Tijuana.</p>
        <p>Worth a 5-minute chat to see if the math works for you?</p>
      `, "See Case Study", "https://calendly.com/denisse-nearshorenavigator/30min");
    }

    if (isDryRun) {
      console.log(`[DRY RUN] ${i+1}. To: ${lead.email} | Date: ${scheduleTime} | Type: ${lead.type}`);
    } else {
       try {
         await brevo.sendEmail({
            to: [{ email: lead.email, name: lead.name }],
            subject: subject,
            htmlContent: body,
            scheduledAt: scheduleTime
         });
         incrementEmailUsage(1);
         if (i % 10 === 0) console.log(`[${i+1}/${selectedBatch.length}] Scheduled for ${scheduleTime}`);
         await sleep(100); // Rate limit protection
       } catch (e: any) {
         console.error(`❌ Failed ${lead.email}: ${e.message}`);
       }
    }
  }
}

main().catch(console.error);
