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

  const processedIds = JSON.parse(fs.readFileSync(processedPath, 'utf-8'));
  
  const zhenLiRecord = records.find((r: any) => r['Last Name'] === 'Li' && r['First Name'] === 'Zhen');
  if (zhenLiRecord) {
    console.log(`Zhen Li ID from CSV: '${zhenLiRecord['Lead Id']}'`);
    console.log(`Is in processedIds? ${processedIds.includes(zhenLiRecord['Lead Id'])}`);
    console.log(`First 5 processedIds: ${JSON.stringify(processedIds.slice(0, 5))}`);
  } else {
    console.log('Zhen Li not found in CSV');
  }
}

main();
