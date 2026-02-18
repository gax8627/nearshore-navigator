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

  // Keywords to INCLUDE (Biotech, Pharma, Manufacturing, Devices)
  const includeKeywords = [
    'Biotech', 'Bio', 'Pharma', 'Therapeutics', 'Genomics', 'Laboratories', 
    'Devices', 'Medical Device', 'Research', 'Sciences', 'Health Care Technology',
    'Manufacturing', 'Life Sciences', 'Diagnostics'
  ];

  // Keywords to EXCLUDE (Home Care, Senior Living, Service Providers)
  const excludeKeywords = [
    'Home Care', 'Senior Living', 'Familycare', 'Hospice', 'Home Health', 
    'Placement', 'Referral', 'Caregivers', 'Assistance', 'Social Services',
    'Non-profit', 'Staffing', 'Recruiting'
  ];

  const unprocessed = records.filter((r: any) => !processedIds.includes(r['Lead Id']));
  
  const manufacturingLeads = unprocessed.filter((r: any) => {
    const industry = (r['Industry'] || '').toLowerCase();
    const company = (r['Company'] || '').toLowerCase();
    
    // Check exclusions first
    const isExcluded = excludeKeywords.some(k => 
      industry.includes(k.toLowerCase()) || company.includes(k.toLowerCase())
    );
    if (isExcluded) return false;

    // Check inclusions
    const isIncluded = includeKeywords.some(k => 
      industry.includes(k.toLowerCase()) || company.includes(k.toLowerCase())
    );
    
    return isIncluded;
  });

  console.log(`Found ${manufacturingLeads.length} remaining manufacturing leads.`);

  const nextBatch = manufacturingLeads.map((r: any) => ({
    id: r['Lead Id'],
    name: `${r['First Name']} ${r['Last Name']}`,
    company: r['Company'],
    email: r['Email'],
    industry: r['Industry']
  }));

  console.log(JSON.stringify(nextBatch, null, 2));
}

main();
