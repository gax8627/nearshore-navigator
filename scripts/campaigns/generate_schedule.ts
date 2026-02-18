
import fs from 'fs';
import path from 'path';

// Configuration
const DAILY_LIMIT = 215;
const START_SKIP_COUNT = 450; // Safety buffer (script stopped at ~411)
const START_DATE_STR = '2026-02-20'; // Friday

// File Paths
const HIGH_INTENT_FILE = path.join(process.cwd(), 'segmented_leads/high_intent_clickers.json');
const ENGAGEMENT_FILE = path.join(process.cwd(), 'scripts/engagement_data.json');
const TIER2_FILE = path.join(process.cwd(), 'segmented_leads/feb17/tier2_manufacturing.json');
const OUTPUT_FILE = path.join(process.cwd(), 'data/campaign_schedule.json');

function getNextBusinessDay(startDate: Date, daysToAdd: number): string {
  const d = new Date(startDate);
  let added = 0;
  while (added < daysToAdd) {
    d.setDate(d.getDate() + 1);
    // 0 = Sunday, 6 = Saturday (UTC)
    if (d.getUTCDay() !== 0 && d.getUTCDay() !== 6) {
      added++;
    }
  }
  return d.toISOString().split('T')[0];
}

async function main() {
  console.log('📅 Generating Campaign Schedule...');

  // 1. Load Data
  const clickers = fs.existsSync(HIGH_INTENT_FILE) ? JSON.parse(fs.readFileSync(HIGH_INTENT_FILE, 'utf-8')) : [];
  const tier2 = fs.existsSync(TIER2_FILE) ? JSON.parse(fs.readFileSync(TIER2_FILE, 'utf-8')) : [];
  
  // 2. Identify Segments (Exact logic from feb18.ts)
  const queue: any[] = [];
  const processedEmails = new Set<string>();

  // Priority 1: Clickers
  clickers.forEach((c: any) => {
    if (!processedEmails.has(c.email)) {
      queue.push({ ...c, priority: 1, type: 'clicker' });
      processedEmails.add(c.email);
    }
  });

  // Priority 3: Cold Tier 2 (Openers logic was skipped in feb18.ts or just merged)
  // In feb18.ts: "Lookup Map for Openers... Let's just add Tier 2 Cold leads for now"
  tier2.forEach((lead: any) => {
    if (!processedEmails.has(lead.email)) {
      queue.push({ ...lead, priority: 3, type: 'cold' });
      processedEmails.add(lead.email);
    }
  });

  console.log(`✅ Total Queue: ${queue.length} leads.`);
  console.log(`⚠️  Skipping first ${START_SKIP_COUNT} (already scheduled).`);

  const remainingQueue = queue.slice(START_SKIP_COUNT);
  console.log(`👉 Remaining to Schedule: ${remainingQueue.length} leads.`);

  const schedule: Record<string, any[]> = {};
  const startDate = new Date(START_DATE_STR);
  
  // Adjust start date to be "Day 0" for getNextBusinessDay logic?
  // getNextBusinessDay(startDate, 0) should return startDate if valid.
  // Actually, getNextBusinessDay adds days. 
  // We want the first batch on START_DATE.
  // So loop i=0
  
  let batchIndex = 0;
  let currentBatch: any[] = [];
  let dayOffset = 0;

  for (let i = 0; i < remainingQueue.length; i++) {
    currentBatch.push(remainingQueue[i]);

    if (currentBatch.length >= DAILY_LIMIT || i === remainingQueue.length - 1) {
      // Find date
      // We want Day 0 = START_DATE (Feb 20)
      // Day 1 = Feb 23 (Mon)
      // Day 2 = Feb 24 (Tue)
      
      // My getNextBusinessDay logic:
      // if daysToAdd = 0, it returns startDate + 0? No, checking logic.
      // Logic: while (added < daysToAdd) { d.setDate(...) ... }
      // If daysToAdd = 0, loop doesn't run. Returns startDate.
      // So dayOffset 0 is correct.
      
      const dateStr = getNextBusinessDay(startDate, dayOffset);
      schedule[dateStr] = currentBatch;
      console.log(`   [${dateStr}] Scheduled ${currentBatch.length} leads.`);
      
      currentBatch = [];
      dayOffset++;
    }
  }

  // Ensure data dir exists
  if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
    fs.mkdirSync(path.join(process.cwd(), 'data'));
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(schedule, null, 2));
  console.log(`✅ Schedule saved to ${OUTPUT_FILE}`);
}

main();
