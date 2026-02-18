
import * as xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

// "Segmentation Agent" Logic
// Goal: Slice the 45k Master List into high-value, actionable segments that fit the budget.

const LEADS_FILE = "/Users/gax8627/Downloads/leads/Leads_2026_02_17.xlsx";
const OUTPUT_DIR = path.join(process.cwd(), 'segmented_leads/feb17');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function segmentLeads() {
  console.log('🔍 Segmentation Agent: Analyzing 45k Master List...');
  
  const workbook = xlsx.readFile(LEADS_FILE);
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 }) as string[][];

  // Indices
  const I = {
    EMAIL: 8,
    INDUSTRY: 13,
    COUNTRY: 26,
    OPTOUT: 28,
    STATUS: 30, // ID/Status
    NM: 5,
    COMPANY: 4
  };

  const segments = {
    tier1_med_device: [] as any[],
    tier2_manufacturing: [] as any[],
    tier3_general: [] as any[],
    skipped_optout: 0,
    skipped_non_us: 0
  };

  // Industries for Tier 1 (High Margin, Specific Pain Points)
  const TIER1_INDUSTRIES = [
    'Medical Devices & Equipment', 
    'Pharmaceuticals', 
    'Biotechnology'
  ];

  // Industries for Tier 2 (Volume, Cost Focused)
  const TIER2_INDUSTRIES = [
    'Manufacturing',
    'Industrial Machinery & Equipment',
    'Automotive Parts',
    'Electronics',
    'Aerospace & Defense'
  ];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const email = row[I.EMAIL];
    const country = (row[I.COUNTRY] || "").trim();
    const industry = (row[I.INDUSTRY] || "").trim();
    const optOut = row[I.OPTOUT];

    if (!email || !email.includes('@')) continue;

    if (optOut === 'true') {
        segments.skipped_optout++;
        continue;
    }

    // Strict Geo-Targeting: US Only for inaugural high-intent campaigns
    if (country !== 'United States' && country !== 'USA') {
        segments.skipped_non_us++;
        continue;
    }

    const lead = {
        email: email,
        firstName: row[I.NM] || 'there',
        company: row[I.COMPANY] || 'your company',
        industry: industry,
        status: row[I.STATUS]
    };

    if (TIER1_INDUSTRIES.includes(industry)) {
        segments.tier1_med_device.push(lead);
    } else if (TIER2_INDUSTRIES.includes(industry)) {
        segments.tier2_manufacturing.push(lead);
    } else {
        segments.tier3_general.push(lead);
    }
  }

  // Save Segments
  fs.writeFileSync(path.join(OUTPUT_DIR, 'tier1_med_device.json'), JSON.stringify(segments.tier1_med_device, null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'tier2_manufacturing.json'), JSON.stringify(segments.tier2_manufacturing, null, 2));

  console.log('\n✅ Segmentation Complete.');
  console.log('-----------------------------------------');
  console.log(`Tier 1: Med Device/Pharma (High Priority) : ${segments.tier1_med_device.length} leads`);
  console.log(`Tier 2: Manufacturing/Auto (Volume)       : ${segments.tier2_manufacturing.length} leads`);
  console.log(`Tier 3: Others (Backlog)                  : ${segments.tier3_general.length} leads`);
  console.log('-----------------------------------------');
  console.log(`Skipped (Non-US): ${segments.skipped_non_us}`);
  console.log(`Skipped (Opt-Out): ${segments.skipped_optout}`);
  console.log(`\n📂 Files saved to: ${OUTPUT_DIR}`);
}

segmentLeads();
