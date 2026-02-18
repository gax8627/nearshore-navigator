
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const LOGS_FILE = '/Users/gax8627/Downloads/logs-10628686-1771366904978.csv';
const OUTPUT_FILE = path.join(process.cwd(), 'segmented_leads/high_intent_clickers.json');

async function main() {
  console.log('🔍 Segmenting Clickers from Log File...');

  if (!fs.existsSync(LOGS_FILE)) {
    console.error(`❌ Logs file not found: ${LOGS_FILE}`);
    return;
  }

  const content = fs.readFileSync(LOGS_FILE, 'utf-8');
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });

  // Unique clickers with counts
  const clickerCounts = new Map<string, number>();
  
  (records as any[]).forEach(record => {
    if (record.st_text === 'Clicked') {
      const email = record.email.toLowerCase();
      clickerCounts.set(email, (clickerCounts.get(email) || 0) + 1);
    }
  });

  console.log(`Found ${clickerCounts.size} unique clickers.`);

  // In a real scenario, we'd cross-reference with Calendly API.
  // For now, we'll export the clickers prioritized by click count.
  const prioritizedClickers = Array.from(clickerCounts.entries())
    .map(([email, count]) => ({ email, clickCount: count }))
    .sort((a, b) => b.clickCount - a.clickCount);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(prioritizedClickers, null, 2));
  console.log(`✅ Exported ${prioritizedClickers.length} leads to ${OUTPUT_FILE}`);
  
  console.log('\nTop Intent Leads:');
  prioritizedClickers.slice(0, 5).forEach(c => console.log(` - ${c.email} (${c.clickCount} clicks)`));
}

main().catch(console.error);
