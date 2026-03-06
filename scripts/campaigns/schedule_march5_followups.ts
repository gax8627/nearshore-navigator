/**
 * March 5th Scheduled Followups - 250 Leads
 * 
 * Run preview:  npx tsx scripts/campaigns/schedule_march5_followups.ts --dry-run
 * Run for real: npx tsx scripts/campaigns/schedule_march5_followups.ts
 */

import fs from 'fs';
import path from 'path';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import dotenv from 'dotenv';
import { brevo } from '../../lib/brevo';
import { incrementEmailUsage, hasEmailBudget } from '../../lib/email-usage-tracker';

const envPath = path.join(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

const PROCESSED_LEADS = path.join(process.cwd(), 'scripts/processed_leads.json');
const ENGAGEMENT_DATA = path.join(process.cwd(), 'scripts/engagement_data.json');
const FOLLOWUP_HISTORY = path.join(process.cwd(), 'scripts/followup_history.json');

const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_LIMIT = 250;
const SCHEDULED_AT = "2026-03-05T17:00:00.000Z"; // March 5, 9:00 AM PST

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('\\n🚀 Scheduled 250 Manufacturing Follow-ups (Mar 5, 9 AM PST)');
  console.log(DRY_RUN ? '  [DRY RUN — no emails will be sent]\\n' : '  [LIVE — emails will be scheduled via Brevo]\\n');

  if (!DRY_RUN && !process.env.BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not set.');
    process.exit(1);
  }

  // 1. Load Data
  const processedIds: string[] = JSON.parse(fs.readFileSync(PROCESSED_LEADS, 'utf-8') || '[]');
  const engagement: Record<string, any> = JSON.parse(fs.readFileSync(ENGAGEMENT_DATA, 'utf-8') || '{}');
  const followupHistory: string[] = fs.existsSync(FOLLOWUP_HISTORY) ? JSON.parse(fs.readFileSync(FOLLOWUP_HISTORY, 'utf-8')) : [];

  // Used to map IDs back to emails/names 
  const csvPath1 = path.join(process.cwd(), 'segmented_leads/segmented_leads_tier_1.csv');
  const csvPath2 = path.join(process.cwd(), 'segmented_leads/segmented_leads_tier_2.csv');
  const manualBatch = path.join(process.cwd(), 'scripts/manual_drafts.json');

  let rawLeads: any[] = [];

  try {
      const { parse } = require('csv-parse/sync');
      if (fs.existsSync(csvPath1)) rawLeads = rawLeads.concat(parse(fs.readFileSync(csvPath1, 'utf-8'), { columns: true, skip_empty_lines: true }));
      if (fs.existsSync(csvPath2)) rawLeads = rawLeads.concat(parse(fs.readFileSync(csvPath2, 'utf-8'), { columns: true, skip_empty_lines: true }));
      if (fs.existsSync(manualBatch)) {
          const manual = JSON.parse(fs.readFileSync(manualBatch, 'utf-8'));
          manual.forEach((m: any) => rawLeads.push({
            'Lead Id': m.email,
            'Email': m.email,
            'First Name': m.firstName,
            'Company': m.company
          }));
      }
  } catch (e) {
      console.warn("Could not load all CSV records for mapping");
  }

  const leadMap = new Map<string, any>();
  rawLeads.forEach(r => {
    if (r['Lead Id']) leadMap.set(r['Lead Id'], r);
    if (r['Email']) leadMap.set(r['Email'].toLowerCase().trim(), r); // Fallback map by email
  });

  // 2. Identify Candidates (Processed but not Followed Up)
  const candidates = processedIds
    .filter(id => !followupHistory.includes(id))
    .map(id => leadMap.get(id) || leadMap.get(id.toLowerCase().trim())) // Try treating ID as email
    .filter((lead): lead is any => !!(lead && lead['Email']));

  console.log(`📋 Found ${candidates.length} candidates for follow-up. (Targeting: ${BATCH_LIMIT})`);

  if (candidates.length === 0) {
      console.log('✨ No candidates for follow-up found.');
      process.exit(0);
  }

  // 3. Process Batch
  const batch = candidates.slice(0, BATCH_LIMIT);
  let schedCount = 0;
  
  for (let i = 0; i < batch.length; i++) {
    const lead = batch[i];
    const email = lead['Email'].toLowerCase().trim();
    const behavior = engagement[email] || { status: 'sent', history: [] };
    const isOpened = behavior.status === 'opened' || behavior.status === 'clicked';
    
    console.log(`[${i + 1}/${batch.length}] Processing ${lead['First Name']} (${lead['Company']}) - Status: ${behavior.status.toUpperCase()}`);

    try {
      // 4. Generate Follow-up Content (Retry logic included for AI)
      let aiResponse;
      let retries = 3;
      while (retries > 0) {
        try {
            const prompt = isOpened 
                ? `
                CONTEXT: The lead OPENED our previous email about Nearshore Logistics but didn't reply.
                GOAL: Gentle, value-add follow-up. 
                STRATEGY: "I noticed you might be researching solutions..."
                OFFER: Share a specific insight about manufacturing in Tijuana.
                TONE: Helpful, professional.
                ` 
                : `
                CONTEXT: The lead DID NOT OPEN our previous email.
                GOAL: Try a different angle.
                STRATEGY: Short, punchy. Mention "Logistics question" or "Manufacturing capacity".
                TONE: Curious, professional.
                `;

            aiResponse = await generateObject({
                model: google('gemini-2.5-flash'), // Make sure to use an available model
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
                - Important: Output MUST be plain HTML (no markdown tags). Keep it simple, just <p> tags and text.
                - Keep the email body under 100 words.
                `
            });
            break; // Success
        } catch (genError) {
            retries--;
            if (retries === 0) throw genError;
            console.log("     [AI Retry - Rate Limited... sleeping 10s]");
            await sleep(10000);
        }
      }

      const object = aiResponse!.object;

      // 5. Build Final HTML
      const primaryGreen = "#10B981";
      const htmlContent = `
          <div style="font-family: sans-serif; font-size: 16px; color: #333333;">
              ${object.htmlBody}
              <br><br>
              <p style="font-size: 14px; color: #666666;">
                  Best,<br>
                  <strong>Denisse Martinez</strong><br>
                  <span style="color: ${primaryGreen};">Nearshore Navigator</span>
              </p>
          </div>
      `;

      if (DRY_RUN) {
        if (i < 3) {
            console.log(`   [DRY RUN] Subject: ${object.subject}`);
            console.log(`   [DRY RUN] Body Preview: ${object.htmlBody.substring(0, 100)}...`);
        }
        schedCount++;
      } else {
         await brevo.sendEmail({
            to: [{ email: lead['Email'], name: `${lead['First Name']} ${lead['Last Name'] || ''}`.trim() }],
            subject: object.subject,
            htmlContent: htmlContent,
            scheduledAt: SCHEDULED_AT // Essential for March 5th target
         });
        
         // Update History immediately upon success
         followupHistory.push(lead['Lead Id'] || lead['Email']);
         fs.writeFileSync(FOLLOWUP_HISTORY, JSON.stringify(followupHistory, null, 2));
         schedCount++;
         console.log(`   ✅ Scheduled follow-up for ${SCHEDULED_AT}.`);
      }

    } catch (e: any) {
      console.error(`   ❌ Failed: ${e.message}`);
    }

    if (i < batch.length - 1) await sleep(4500); // Sleep 4.5 sec to respect Gemini 15 RPM limit
  }

  console.log(`\n🎉 Finished processing follow-ups. Total ${DRY_RUN ? 'simulated' : 'scheduled'}: ${schedCount}`);
}

main().catch(console.error);
