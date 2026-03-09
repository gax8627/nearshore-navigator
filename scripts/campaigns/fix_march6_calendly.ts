/**
 * FIX v2: Cancel queued March 6th emails via Brevo scheduled status endpoint
 * 
 * When you send a transactional email with `scheduledAt`, Brevo returns a messageId.
 * Our scripts didn't save those IDs. This script uses a different approach:
 * 
 * 1. Query GET /v3/smtp/statistics/aggregatedReport for today to confirm volume
 * 2. Try the GET /v3/smtp/email/scheduled endpoint (if it exists)
 * 3. If no scheduled endpoint, use the bulk scheduled email listing from SMTP logs
 * 
 * Run: npx tsx scripts/campaigns/fix_march6_calendly.ts
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const envPath = path.join(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

const BREVO_API_KEY = process.env.BREVO_API_KEY as string;
const BASE = 'https://api.brevo.com/v3';

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function brevoFetch(endpoint: string, method = 'GET', body?: any) {
  const opts: RequestInit = {
    method,
    headers: {
      'api-key': BREVO_API_KEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${endpoint}`, opts);
  const text = await res.text();
  return { status: res.status, data: text ? JSON.parse(text) : null };
}

async function main() {
  console.log('\n🔧 FIX v2: Cancel Scheduled March 6th Emails\n');

  if (!BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not set.');
    process.exit(1);
  }

  // Step 1: Check if there's a way to list scheduled emails
  console.log('1️⃣  Testing Brevo endpoints for scheduled email access:\n');

  // Try /smtp/email/scheduled (might not exist)
  const scheduledList = await brevoFetch('/smtp/statistics/reports?days=1');
  console.log(`   /smtp/statistics/reports:  status ${scheduledList.status}`);

  // Try fetching aggregated data for today
  const aggReport = await brevoFetch('/smtp/statistics/aggregatedReport?startDate=2026-03-06&endDate=2026-03-06');
  console.log(`   /smtp/statistics/aggregatedReport: status ${aggReport.status}`);
  if (aggReport.data) {
    console.log(`   → Requests: ${aggReport.data.requests || 0}, Delivered: ${aggReport.data.delivered || 0}`);
    console.log(`   → Full data: ${JSON.stringify(aggReport.data)}`);
  }

  // Step 2: Try to get transactional email logs to find messageIds 
  // Brevo has GET /smtp/email with query params
  console.log('\n2️⃣  Checking transactional SMTP activity logs:\n');
  
  const logData = await brevoFetch('/smtp/statistics/events?limit=10&startDate=2026-03-06&endDate=2026-03-07&sort=desc');
  console.log(`   /smtp/statistics/events: status ${logData.status}`);
  if (logData.data?.events) {
    console.log(`   → Found ${logData.data.events.length} events`);
    for (const evt of logData.data.events.slice(0, 5)) {
      console.log(`      ${evt.event} | ${evt.email} | ${evt.date} | msgId: ${evt.messageId?.substring(0, 30)}...`);
    }
  }

  // Step 3: Check SMTP real-time activity
  console.log('\n3️⃣  Checking real-time transactional email activity:\n');
  const rt = await brevoFetch('/smtp/statistics/realtime?hours=12');
  console.log(`   /smtp/statistics/realtime: status ${rt.status}`);
  if (rt.data) {
    console.log(`   → ${JSON.stringify(rt.data).substring(0, 200)}`);
  }

  // Step 4: Try fetching specific email by recipient to test cancel
  console.log('\n4️⃣  Testing per-recipient email lookup and cancel:\n');
  
  const OUTREACH_LOG = path.join(process.cwd(), 'scripts/sent_march6_outreach.json');
  const NURTURE_LOG = path.join(process.cwd(), 'scripts/sent_march6_nurture.json');
  
  const testEmails: string[] = [];
  if (fs.existsSync(OUTREACH_LOG)) testEmails.push(...JSON.parse(fs.readFileSync(OUTREACH_LOG, 'utf-8')).slice(0, 3));
  if (fs.existsSync(NURTURE_LOG)) testEmails.push(...JSON.parse(fs.readFileSync(NURTURE_LOG, 'utf-8')).slice(0, 3));

  for (const email of testEmails) {
    // Check events for a wider window that includes before schedule time
    const evtRes = await brevoFetch(`/smtp/statistics/events?limit=10&email=${encodeURIComponent(email)}&startDate=2026-03-05&endDate=2026-03-07&sort=desc`);
    console.log(`   ${email}:`);
    if (evtRes.data?.events?.length > 0) {
      for (const e of evtRes.data.events) {
        console.log(`      → ${e.event} at ${e.date} | msgId: ${e.messageId}`);
      }
    } else {
      console.log(`      → No events found yet (email likely still in scheduled queue)`);
    }
    await sleep(300);
  }

  console.log('\n5️⃣  Checking Brevo transactional logs endpoint:\n');
  // Try the /smtp/emails endpoint which might show queued emails
  const logsRes = await brevoFetch('/smtp/emailOnSmtp?limit=10&startDate=2026-03-06');
  console.log(`   /smtp/emailOnSmtp: status ${logsRes.status}`);
  if (logsRes.data) console.log(`   → ${JSON.stringify(logsRes.data).substring(0, 300)}`);

  // Also try GET /transactionalSMS/statistics/events as a naming pattern test
  const txnRes = await brevoFetch('/smtp/log?limit=5');
  console.log(`   /smtp/log: status ${txnRes.status}`);

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('   DIAGNOSTIC COMPLETE');
  console.log('═══════════════════════════════════════════════════════');
}

main().catch(console.error);
