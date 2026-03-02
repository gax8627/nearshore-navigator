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

const BATCH_SIZE = 50;
const DELAY_SEC = 180; // 3 minutes to be absolutely safe with Free Tier per-minute/per-day limits
const MIN_RELEVANCE = 65; // Raised from 50 — only contact verified manufacturing ICP

function getNext8AM(timezoneArg: string = 'America/Los_Angeles'): string {
  try {
    const timezone = timezoneArg || 'America/Los_Angeles';
    const now = new Date();
    // Simple 8AM tomorrow for script
    const target = new Date(now);
    target.setDate(target.getDate() + 1);
    target.setHours(8, 0, 0, 0); 
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
              1. Determine relevance (0-100). Score HIGH (70+) ONLY IF the company manufactures physical goods
                 (electronics, medical devices, aerospace, automotive, furniture, precision parts, consumer goods, etc.)
                 and could plausibly benefit from nearshoring to Mexico.
                 Score LOW (<40) if the company is: biotech/pharma (drug development), SaaS, healthcare services,
                 financial services, consulting, or any non-manufacturing business.
              2. If relevance >= 65, draft a warm, human cold email from Denisse Martinez.
              3. The email should reference something SPECIFIC about their company or supply chain - do NOT be generic.
              4. Focus the value prop on: tariff savings, USMCA duty-free status, Baja California proximity to their
                 US distribution, or labor cost reduction - pick what fits them best.
              5. Include signature: Denisse Martinez, Marketing Director & Advisor | Nearshore Navigator | nearshorenavigator.com.
              6. Include Calendly booking link placeholder: [CALENDLY_LINK].
              7. Subject line should be specific to their company - never generic.
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
        await brevo.sendEmail({
          to: [{ email: lead.email, name: lead.name }],
          subject: lastResult.email.subject,
          htmlContent: lastResult.email.htmlBody,
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
