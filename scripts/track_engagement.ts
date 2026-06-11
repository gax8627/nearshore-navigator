
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

async function main() {
  // Load env FIRST
  const envPath = path.join(process.cwd(), '.env.local');
  dotenv.config({ path: envPath });

  const { brevo } = await import('../lib/brevo');
  
  const HISTORY_DAYS = 30; // Look back 30 days
  const ENGAGEMENT_FILE = path.join(process.cwd(), 'scripts/engagement_data.json');

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

    // Dedupe history & Filter bot clicks (60s window)
    const uniqueHistory = [];
    const seenExact = new Set();
    const lastTimeType: Record<string, number> = {};
    
    const sortedHistory = existing.history.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    for (const h of sortedHistory) {
        const exactKey = `${h.type}-${h.date}`;
        if (seenExact.has(exactKey)) continue;
        seenExact.add(exactKey);

        const time = new Date(h.date).getTime();
        const lastTime = lastTimeType[h.type] || 0;
        
        // If the event of the SAME type happened within 60 seconds, ignore it (bot click/open)
        if (time - lastTime > 60000) {
            uniqueHistory.push(h);
            lastTimeType[h.type] = time;
        }
    }
    
    existing.history = uniqueHistory.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    data[email] = existing;
  }
}

main().catch(console.error);
