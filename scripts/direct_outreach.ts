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
      const researchData = await research(`Analyze ${lead.company}. industry, products, and news.`);
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
              - Focus: Nearshore Logistics/Operations (Mexico/LATAM).
              - Value Prop: Higher efficiency, same timezone as US, bilingual staff.
              - Services: Headhunting, 3PL matching, operational setup.

              TASK:
              1. Determine relevance (0-100) for Nearshore logistics.
              2. Draft a warm, human cold email from Denisse Martinez.
              3. DO NOT BE CREEPY. Show you understand their company's supply chain or scale needs.
              4. Include signature: Denisse Gastelum, Lead Advisor | Nearshore Navigator.
              5. Include Calendly link placeholder.
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

      if (!lastResult || lastResult.relevance < 50 || !lastResult.email) {
        console.log(`   ⚠️ Skipped (Relevance: ${lastResult?.relevance || 'N/A'}).`);
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
