
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

// --- CONFIGURATION ---
const INPUT_FILE = './all_leads_raw.csv';
const OUTPUT_DIR = './segmented_leads';

const TIER_1_INDUSTRIES = [
    'Medical Devices', 'Biotechnology', 'Hospital & Health Care', 'Hospitals & Physicians Clinics',
    'Aviation & Aerospace', 'Defense & Space', 
    'Mechanical or Industrial Engineering', 'Industrial Automation',
    'Electrical/Electronic Manufacturing', 'Semiconductors',
    'Research & Development', 'Transportation', 'Logistics & Supply Chain'
];

const TIER_2_INDUSTRIES = [
    'Automotive', 'Transportation/Trucking/Railroad',
    'Consumer Electronics', 'Consumer Goods',
    'Plastics', 'Packaging and Containers',
    'Building Materials', 'Construction', 'Commercial & Residential Construction',
    'Wholesale', 'Import and Export', 'Business Services'
];

const DECISION_MAKER_TITLES = [
    'VP', 'Vice President', 'Director', 'Head of', 'Chief', 'C-Level', 
    'President', 'Founder', 'Owner', 'Manager', 'CEO', 'Partner'
];

const TIER_1_KEYWORDS = ['Supply Chain', 'Operations', 'Manufacturing', 'Plant', 'Engineering', 'Producción', 'Calidad'];

// --- HELPERS ---

function ensureDir(dir) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

function normalizeKey(key) {
    return key ? key.trim().toLowerCase() : '';
}

function classifyLead(lead) {
    // Helper to get value case-insensitively
    const getValue = (keySnippet) => {
        const key = Object.keys(lead).find(k => normalizeKey(k).includes(normalizeKey(keySnippet)));
        return key ? lead[key] : '';
    };

    const industry = getValue('Industry') || '';
    const title = getValue('Title') || getValue('Job Title') || '';
    const employeesStr = getValue('Employees') || '0';
    const employees = parseInt(employeesStr.replace(/[^0-9]/g, '') || '0');
    
    // Normalize logic
    const isDecisionMaker = DECISION_MAKER_TITLES.some(t => title.toLowerCase().includes(t.toLowerCase()));
    
    if (!isDecisionMaker) return null; 

    // Robust Include Check
    const checkIndustry = (list) => list.some(i => industry.toLowerCase().includes(i.toLowerCase()));

    const isTier1Industry = checkIndustry(TIER_1_INDUSTRIES);
    const isTier2Industry = checkIndustry(TIER_2_INDUSTRIES);
    
    // Logic Refinement:
    
    // Tier 1: Core Target Industries + Decision Maker (Size 10+)
    // We removed the strict "keyword" requirement for C-Level in these industries because a CEO of a Med Device co is a perfect target.
    if (isTier1Industry && employees >= 10) {
        return 'Tier 1';
    }

    // Tier 2: Secondary Industries + Decision Maker (Size 10+)
    if (isTier2Industry && employees >= 10) {
        return 'Tier 2';
    }

    // Tier 3: Any Relevant Industry < 10 employees OR Unmapped Industries with High-Value Titles
    if ((isTier1Industry || isTier2Industry) && employees < 10) {
         return 'Tier 3';
    }
    
    // Catch-all for other decision makers in potential adjacent industries
    // if (employees >= 50) return 'Tier 3';

    return null;
}

// --- MAIN ---

try {
    const fileContent = fs.readFileSync(INPUT_FILE, 'utf8');
    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        relax_quotes: true,
        trim: true
    });

    console.log(`Total records read: ${records.length}`);

    const segments = {
        'Tier 1': [],
        'Tier 2': [],
        'Tier 3': []
    };
    
    // Debug Check
    let t1Count = 0;
    
    records.forEach(record => {
        const tier = classifyLead(record);
        if (tier) {
            segments[tier].push(record);
        }
    });

    ensureDir(OUTPUT_DIR);

    // Write outputs
    for (const [tier, data] of Object.entries(segments)) {
        if (data.length > 0) {
            const outputString = stringify(data, { header: true });
            const filename = `segmented_leads_${tier.replace(' ', '_').toLowerCase()}.csv`;
            fs.writeFileSync(path.join(OUTPUT_DIR, filename), outputString);
            console.log(`Wrote ${data.length} records to ${filename}`);
        } else {
             console.log(`No records found for ${tier}`);
        }
    }

} catch (err) {
    console.error('Error processing leads:', err);
}
