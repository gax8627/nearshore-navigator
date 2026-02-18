
import fs from 'fs';
import path from 'path';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { brevo } from '../lib/brevo';

// Manually load .env.local
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

const PROCESSED_LEADS = path.join(process.cwd(), 'scripts/processed_leads.json');
const ENGAGEMENT_DATA = path.join(process.cwd(), 'scripts/engagement_data.json');
const FOLLOWUP_HISTORY = path.join(process.cwd(), 'scripts/followup_history.json');

const BATCH_SIZE = 20; // Smaller batch for follow-ups
const DELAY_SEC = 60; 

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('🚀 Starting Follow-up Campaign Generation...');

  // 1. Load Data
  const processedIds: string[] = JSON.parse(fs.readFileSync(PROCESSED_LEADS, 'utf-8') || '[]');
  const engagement: Record<string, any> = JSON.parse(fs.readFileSync(ENGAGEMENT_DATA, 'utf-8') || '{}');
  const followupHistory: string[] = fs.existsSync(FOLLOWUP_HISTORY) ? JSON.parse(fs.readFileSync(FOLLOWUP_HISTORY, 'utf-8')) : [];

  // Used to map IDs back to emails/names (we need a source of truth for lead details)
  // We'll have to read from the original CSV to get names/companies for these IDs
  const csvPath = path.join(process.cwd(), 'segmented_leads/segmented_leads_tier_1.csv');
  const { parse } = require('csv-parse/sync');
  const records = parse(fs.readFileSync(csvPath, 'utf-8'), { columns: true, skip_empty_lines: true });

  // Map logic
  interface Lead {
    'Lead Id': string;
    'Email': string;
    'First Name': string;
    'Last Name': string;
    'Company': string;
    [key: string]: any;
  }

  const leadMap = new Map<string, Lead>(records.map((r: any) => [r['Lead Id'], r]));

  // 2. Identify Candidates (Processed but not Followed Up)
  const candidates = processedIds
    .filter(id => !followupHistory.includes(id))
    .map(id => leadMap.get(id))
    .filter((lead): lead is Lead => !!(lead && lead['Email']));

  console.log(`Found ${candidates.length} candidates for follow-up.`);

  // 3. Process Batch
  const batch = candidates.slice(0, BATCH_SIZE);
  
  for (let i = 0; i < batch.length; i++) {
    const lead = batch[i];
    const email = lead['Email'];
    const behavior = engagement[email] || { status: 'sent', history: [] };
    const isOpened = behavior.status === 'opened' || behavior.status === 'clicked';
    
    console.log(`[${i + 1}/${batch.length}] Processing ${lead['First Name']} ${lead['Last Name']} (${lead['Company']}) - Status: ${behavior.status.toUpperCase()}`);

    try {
      // 4. Generate Follow-up Content
      const prompt = isOpened 
        ? `
          CONTEXT: The lead OPENED our previous email about Nearshore Logistics but didn't reply.
          GOAL: Gentle, value-add follow-up. 
          STRATEGY: "I noticed you might be researching solutions..." or "Wanted to bubble this up...". 
          OFFER: Share a specific insight about manufacturing in Tijuana.
          TONE: Helpful, not pushy.
        ` 
        : `
          CONTEXT: The lead DID NOT OPEN our previous email.
          GOAL: Try a different angle.
          STRATEGY: Short, punchy. "Did you see my note?" is too aggressive. Try "Logistics question" or "Manufacturing capacity".
          TONE: Curious, professional.
        `;

        const { object } = await generateObject({
            model: google('gemini-2.0-flash-lite-001'),
            schema: z.object({
              subject: z.string(),
              htmlBody: z.string(),
            }),
            prompt: `
              LEAD: ${lead['First Name']} at ${lead['Company']}
              PREVIOUS STATUS: ${behavior.status}
              
              ${prompt}
              
              REQUIREMENTS:
              - Sender: Denisse Martinez, Nearshore Navigator.
              - Include this Calendly link: https://calendly.com/denisse-nearshorenavigator/30min
              - Keep it under 100 words.
            `
          });

      // 5. Send (or Log for Dry Run)
      if (process.argv.includes('--dry-run')) {
        console.log(`   [DRY RUN] Subject: ${object.subject}`);
        console.log(`   [DRY RUN] Body Preview: ${object.htmlBody.substring(0, 100)}...`);
      } else {
         await brevo.sendEmail({
          to: [{ email: lead['Email'], name: `${lead['First Name']} ${lead['Last Name']}` }],
          subject: object.subject,
          htmlContent: object.htmlBody,
        });
        
        // Update History
        followupHistory.push(lead['Lead Id']);
        fs.writeFileSync(FOLLOWUP_HISTORY, JSON.stringify(followupHistory, null, 2));
        console.log(`   ✅ Sent follow-up.`);
      }

    } catch (e: any) {
      console.error(`   ❌ Failed: ${e.message}`);
    }

    if (i < batch.length - 1) await sleep(DELAY_SEC * 1000);
  }
}

main().catch(console.error);
