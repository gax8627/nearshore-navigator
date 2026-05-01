import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { brevo } from '../lib/brevo';

// Manually load .env.local if it exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf-8');
  envConfig.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim().replace(/^"|"$/g, '');
    }
  });
}

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
const GOOGLE_GENERATIVE_AI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!TAVILY_API_KEY || !GOOGLE_GENERATIVE_AI_API_KEY) {
  console.error('FATAL: Missing TAVILY_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY in .env.local');
  process.exit(1);
}

const BATCH_SIZE = 500; // Increased to 500 for the 8am blast
const DELAY_SEC = 60; // Increased to 60s to stay within Free Tier daily limits
const MIN_RELEVANCE = 65; // Raised from 50 — only contact verified manufacturing ICP

// The "Wow Factor" Bulletproof 2025 Template
function wrapHtml(content: string, ctaText: string, ctaUrl: string) {
  const primaryGreen = "#10B981"; // Emerald-500
  const darkDeep = "#020617"; // Slate-950
  const glassBg = "#0F172A"; // Slate-900 
  const glassBorder = "#1E293B"; // Slate-800
  const textMuted = "#94A3B8"; // Slate-400
  
  const liquidGif = "https://nearshorenavigator.com/images/liquid-top.gif"; 
  const signatureBanner = "https://nearshorenavigator.com/images/denisse-martinez.jpg?v=2026";

  // Lightest possible markdown to inline HTML conversion
  const formattedContent = content.replace(/\*\*(.*?)\*\*/g, `<strong style="color: #ffffff; border-bottom: 2px solid ${primaryGreen};">$1</strong>`);

  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkDeep}" style="background-color: ${darkDeep}; table-layout: fixed;">
      <tr>
        <td align="center" style="padding: 60px 10px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; border-radius: 32px; overflow: hidden; border: 1px solid ${glassBorder};" bgcolor="${glassBg}">
            <tr>
              <td height="12" bgcolor="${primaryGreen}" style="background: linear-gradient(90deg, ${primaryGreen} 0%, ${primaryGreen} 40%, #ffffff 50%, ${primaryGreen} 60%, ${primaryGreen} 100%); background-size: 200% 100%; animation: scan 3s linear infinite;">
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
                <div style="font-family: 'Inter', Helvetica, sans-serif; font-size: 17px; line-height: 1.8; color: ${textMuted}; margin-bottom: 56px;">
                  ${formattedContent}
                </div>
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 80px;">
                  <tr>
                    <td align="center" bgcolor="${primaryGreen}" style="border-radius: 16px; box-shadow: 0 15px 40px ${primaryGreen}40;">
                      <a href="${ctaUrl}" style="display: block; padding: 22px 48px; font-family: Helvetica, sans-serif; text-decoration: none; color: #000000; font-weight: 800; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
                        ${ctaText}
                      </a>
                    </td>
                  </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-radius: 24px; overflow: hidden;">
                  <tr>
                    <td>
                      <img src="${signatureBanner}" width="544" style="display: block; width: 100%; height: auto; border: 1px solid ${primaryGreen}30; border-radius: 24px;" alt="Denisse Gastelum - Lead Advisor" />
                    </td>
                  </tr>
                </table>
                <div style="margin-top: 48px; text-align: center; font-family: Helvetica, sans-serif; font-size: 11px; color: #475569; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">
                  Industrial Expansion &bull; 2026 Strategic Hub
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

function getNext8AM(timezoneArg: string = 'America/Los_Angeles'): string {
  try {
    const now = new Date();
    const target = new Date(now);
    target.setHours(8, 0, 0, 0);
    
    // If it's already past 8 AM today, schedule for tomorrow
    if (target.getTime() <= now.getTime()) {
      target.setDate(target.getDate() + 1);
    }
    
    return target.toISOString();
  } catch (e) {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(16, 0, 0, 0);
    return d.toISOString();
  }
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function research(query: string) {
  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query,
        search_depth: 'advanced',
        include_images: false,
        include_answer: true,
      }),
    });
    return await response.json();
  } catch (e) {
    console.error(`Research error: ${e}`);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting Direct Outreach Campaign (Strict Throttling)...');
  console.log('⏳ Pre-campaign cool-down (60s)...');
  await sleep(60000);
  
  const filePath = path.join(process.cwd(), 'segmented_leads/segmented_leads_tier_1.csv');
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });

  const leads = records.slice(0, BATCH_SIZE).map((r: any) => ({
    id: r['Lead Id'],
    first: r['First Name'],
    last: r['Last Name'],
    name: `${r['First Name']} ${r['Last Name']}`,
    company: r['Company'],
    email: r['Email'],
    website: r['Website']
  })).filter((l: any) => l.name && l.company && l.email);

  console.log(`Found ${leads.length} leads. Processing with 3-minute delay...\n`);

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    console.log(`[${i + 1}/${leads.length}] 👤 Lead: ${lead.name} (${lead.company})`);

    try {
      // 1. Research (Tavily)
      console.log(`   🔍 Researching...`);
      const researchData = await research(`${lead.company} manufacturing operations, supply chain, production, OR contract manufacturing. What industry do they serve?`);
      const context = JSON.stringify(researchData?.results || []);

      // 2. Single AI Call (Verification + Email)
      console.log(`   🤖 AI Processing (Single Call, Enhanced Recovery)...`);
      
      let retryCount = 0;
      let lastResult: any = null;
      
      while (retryCount < 5) {
        try {
          const { object } = await generateObject({
            model: google('gemini-2.0-flash-lite-001'),
            maxRetries: 0,
            schema: z.object({
              relevance: z.number(),
              timezone: z.string().optional(),
              email: z.object({
                subject: z.string(),
                htmlBody: z.string(),
              }).optional()
            }),
            prompt: `
              CONTEXT: ${context}
              LEAD: ${lead.name} at ${lead.company}
              
              ABOUT NEARSHORE NAVIGATOR:
              - We help mid-market US manufacturers ($10M-$200M revenue) expand production to Baja California, Mexico.
              - Services: Contract Manufacturing partner matching, Industrial Real Estate site selection, Shelter services setup, 3PL/Distribution.
              - Value Prop: USMCA duty-free, 20 min from San Diego, 30-50% cost savings vs US, same timezone.
              - Target buyer: VP Operations, Supply Chain Director, COO, or Plant Manager at industrial manufacturers.

              TASK:
              1. Determine relevance (0-100). Score HIGH (75+) ONLY IF the company manufactures physical goods specifically in 
                 AEROSPACE or INDUSTRIAL MACHINERY. 
                 Score LOW (<40) if the company is: MEDICAL DEVICES, ELECTRONICS, SEMICONDUCTORS, AUTOMOTIVE, biotech/pharma, SaaS, healthcare services, 
                 financial services, consulting, consumer apparel, or any other business type.
              2. If relevance >= 65, draft a warm, human cold email from Denisse Martinez following this exact cadence:
                 - Paragraph 1 (The Hook): A tactical observation about their specific company/supply chain and how current Asian tariffs or component duties are squeezing margins in their specific sub-sector.
                 - Paragraph 2 (The Proof): Mention that we recently helped a similar US manufacturer relocate assembly to a shelter in Mexico, eliminating inbound duties via USMCA and locking in sub-$8/hr labor rates.
                 - Paragraph 3 (The CTA): A low-friction ask ("Worth a brief chat to see if moving some SKU lines makes mathematical sense for your operational roadmap?")
              3. MUST NOT SOUND AUTOMATED. Do not use generic greetings like "I hope this email finds you well."
              4. DO NOT WRITE A SIGNATURE. (It will be handled by the HTML template).
              5. Do not include a CTA link in the body, it is handled automatically below the text.
              6. Subject line: Write a highly customized, 3-5 word subject line referencing their supply chain or assembly.
            `
          });
          lastResult = object;
          break;
        } catch (err: any) {
          const errMsg = err?.message?.toLowerCase() || '';
          if (errMsg.includes('quota') || errMsg.includes('429') || errMsg.includes('resource_exhausted')) {
            console.log(`   ⏳ Quota hit. Waiting 6 minutes for "Deep Recovery" (Attempt ${retryCount + 1}/5)...`);
            await sleep(360000); // 6 minutes
            retryCount++;
          } else {
            throw err;
          }
        }
      }

      if (!lastResult || lastResult.relevance < MIN_RELEVANCE || !lastResult.email) {
        console.log(`   ⚠️ Skipped (Relevance: ${lastResult?.relevance || 'N/A'} — below ${MIN_RELEVANCE} threshold or not manufacturing ICP).`);
      } else {
        // 3. Brevo
        console.log(`   📤 Syncing to Brevo...`);
        await brevo.createContact({
          email: lead.email,
          attributes: {
            FNAME: lead.first,
            LNAME: lead.last,
            COMPANY: lead.company,
          },
          updateEnabled: true
        });

        const scheduledAt = getNext8AM(lastResult.timezone ?? 'America/Los_Angeles');
        const formattedHtml = wrapHtml(
          lastResult.email.htmlBody, 
          "Schedule your call with Denisse", 
          "https://calendly.com/denisse-nearshorenavigator/30min"
        );

        // Calculate a 500 email throttle boundary logic
        // But send exactly the scheduled limits
        await brevo.sendEmail({
          sender: { email: 'denisse@nearshorenavigator.com', name: 'Denisse Martinez' },
          to: [{ email: lead.email, name: lead.name }],
          subject: lastResult.email.subject,
          htmlContent: formattedHtml,
          scheduledAt
        });

        console.log(`   ✅ Success! Email scheduled for ${scheduledAt}`);
      }

    } catch (error: any) {
      console.error(`   ❌ Failed: ${error?.message || error}`);
    }

    if (i < leads.length - 1) {
      console.log(`   ⏳ Cooling down for ${DELAY_SEC}s...\n`);
      await sleep(DELAY_SEC * 1000);
    }
  }

  console.log('\n🏁 Complete.');
}

main().catch(console.error);
