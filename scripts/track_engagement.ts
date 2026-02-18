
import fs from 'fs';
import path from 'path';
import { brevo } from '../lib/brevo';

// Load env
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

const HISTORY_DAYS = 30; // Look back 30 days
const ENGAGEMENT_FILE = path.join(process.cwd(), 'scripts/engagement_data.json');

async function main() {
  console.log('📊 Fetching email engagement data from Brevo...');

  // Calculate start date
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - HISTORY_DAYS);
  const startDateStr = startDate.toISOString().split('T')[0];
  
  console.log(`Checking events since ${startDateStr}...`);

  // Load existing engagement data
  let engagementData: Record<string, any> = {};
  if (fs.existsSync(ENGAGEMENT_FILE)) {
    engagementData = JSON.parse(fs.readFileSync(ENGAGEMENT_FILE, 'utf-8'));
  }

  const endDateStr = new Date().toISOString().split('T')[0];

  // 1. Fetch OPENS
  console.log('   Fetching OPENS...');
  // @ts-ignore
  const opens = await brevo.getEmailEvents({
    startDate: startDateStr,
    endDate: endDateStr,
    event: 'opened',
    limit: 500 
  });

  processEvents(opens.events || [], 'opened', engagementData);

  // 2. Fetch CLICKS
  console.log('   Fetching CLICKS...');
  // @ts-ignore
  const clicks = await brevo.getEmailEvents({
    startDate: startDateStr,
    endDate: endDateStr,
    event: 'clicks',
    limit: 500
  });

  processEvents(clicks.events || [], 'clicked', engagementData);

  // Save updated data
  fs.writeFileSync(ENGAGEMENT_FILE, JSON.stringify(engagementData, null, 2));
  
  // Summary
  const openedCount = Object.values(engagementData).filter((e: any) => e.status === 'opened' || e.status === 'clicked').length;
  console.log(`✅ Engagement data updated. Total unique engaged contacts: ${openedCount}`);
}

function processEvents(events: any[], type: 'opened' | 'clicked', data: Record<string, any>) {
  console.log(`   Processing ${events.length} ${type} events...`);
  
  for (const event of events) {
    const email = event.email;
    if (!email) continue;

    const existing = data[email] || { status: 'sent', history: [] };
    
    // Upgrade status if more engaged
    if (type === 'clicked') {
        existing.status = 'clicked';
    } else if (type === 'opened' && existing.status !== 'clicked') {
        existing.status = 'opened';
    }

    existing.last_interaction = event.date;
    existing.history.push({
        type,
        date: event.date,
        subject: event.subject,
        messageId: event.messageId
    });

    // Dedupe history
    const uniqueHistory = [];
    const seen = new Set();
    for (const h of existing.history.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())) {
        const key = `${h.type}-${h.date}`;
        if (!seen.has(key)) {
            seen.add(key);
            uniqueHistory.push(h);
        }
    }
    existing.history = uniqueHistory;

    data[email] = existing;
  }
}

main().catch(console.error);
