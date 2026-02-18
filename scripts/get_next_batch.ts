import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

async function main() {
  const csvPath = path.join(process.cwd(), 'segmented_leads/segmented_leads_tier_1.csv');
  const processedPath = path.join(process.cwd(), 'scripts/processed_leads.json');
  
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });

  let processedIds: string[] = [];
  if (fs.existsSync(processedPath)) {
    processedIds = JSON.parse(fs.readFileSync(processedPath, 'utf-8'));
  }

  const unprocessed = records.filter((r: any) => !processedIds.includes(r['Lead Id']));
  
  // Strategy: Group by company to ensure we don't spam one company, 
  // but "do them all" implies we might want to eventually contact everyone.
  // For now, let's just retrieve the next batch of unique leads sequentially.
  
  const nextBatch = unprocessed.slice(0, 10).map((r: any) => ({
    id: r['Lead Id'],
    name: `${r['First Name']} ${r['Last Name']}`,
    company: r['Company'],
    email: r['Email']
  }));

  console.log(JSON.stringify(nextBatch, null, 2));
}

main();
