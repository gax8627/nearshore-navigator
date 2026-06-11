import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { db } from '../lib/db';
import { leads } from '../lib/db/schema';
import { eq, inArray } from 'drizzle-orm';

// Setup file paths
const SEGMENTED_DIR = path.join(process.cwd(), 'segmented_leads');
const INPUT_FILES = [
  'segmented_leads_tier_1.csv',
  'segmented_leads_tier_2.csv',
  'segmented_leads_tier_3.csv',
  'manufacturing_new_batch.csv',
  'medical_new_batch.csv'
];

interface LeadInfo {
  leadId: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  title: string;
  industry: string;
  phone: string;
  employees: string;
  sales: string;
  sourceFile: string;
}

function matchesKeyword(text: string, kw: string): boolean {
  const cleanKw = kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(`\\b${cleanKw}\\b`, 'i');
  return regex.test(text);
}

// ICP Classification function
function classifyLead(lead: LeadInfo): { isICP: boolean; isMedical: boolean; reason: string } {
  const company = (lead.company || '').trim();
  const industry = (lead.industry || '').trim();
  const title = (lead.title || '').trim();
  const email = (lead.email || '').trim().toLowerCase();

  const companyLower = company.toLowerCase();
  const industryLower = industry.toLowerCase();
  const titleLower = title.toLowerCase();

  // 1. Specific EXCLUSIONS by Company / Email Domain
  const excludeCompanies = [
    'inovio', 'rayzebio', 'hr prime', 'hrprimellc', 'ceatus media', 'chemdiv', 'chemveda life sciences',
    'chromacode', 'compass dermatopathology', 'compassdermpath', 'eag laboratories', 'eurofins',
    'element biosciences', 'elembio', 'ems university', 'eone diagnomics', 'epigenic therapeutics',
    'escient pharmaceuticals', 'family matters in-home care', 'genie healthcare', 'genomic life',
    'gerber goldschmidt', 'green tree home care', 'iambic therapeutics', 'integrated dna technologies',
    'interpreta', 'kate therapeutics', 'kinnate biopharma', 'lineage cell', 'link revenue', 'lorian health',
    'mcalister institute', 'mission healthcare', 'nightingale home care', 'pacific research network',
    'pardes biosciences', 'petdx', 'prometheus biosciences', 'prosciento', 'psycare', 'referral agency',
    'san diego home caregivers', 'sanford consortium', 'sanford-burnham', 'scripps research', 'scripps health',
    'st paul', 'statrad', 'sullivanluallin', 'sunbio', 'therapeutics inc', 'turnstone biologics',
    'twist bioscience', 'viacyte', 'viracta therapeutics', 'viridos', 'wellquest living', 'aperturetx',
    'nanoimaging services', 'mainsaver', 'marqueestaffing', 'morrison wealth', 'proven recruiting',
    'target', 'home depot', 'williams-sonoma', 'the ups store', 'fedex office', 'costco', 'united rentals',
    'mechanics bank', '911 restoration', 'matrix medical devices', 'medical service company', 'medical ndi',
    'buckeye medical supply', 'solara medical', 'monitor medical', 'mission medical'
  ];

  for (const c of excludeCompanies) {
    if (companyLower.includes(c) || email.includes(c)) {
      return { isICP: false, isMedical: false, reason: `Exclude company/email match: ${c}` };
    }
  }

  // 2. Specific INCLUSIONS by Company Name (known high-quality medical device hardware manufacturers)
  const medicalDeviceCompanies = [
    'marlen manufacturing', 'neuronoff', 'norman noble', 'numotion', 'thommen medical', 
    'applied home healthcare equipment', 'vantedge medical', 'vave health', 'visby medical', 
    'x-scan imaging', 'xoft', 'boston scientific', 'cepheid', 'ceribell', 'cordica medical', 
    'elekta medical', 'hologic', 'medtronic', 'shockwave medical', 'stryker', 'zoll circulation', 
    'micro medical devices', 'osseus fusion systems', 'blink device company', 'bodypoint', 'tasso', 
    'uptake medical', 'aj medical manufacturing', 'biotex', 'merit medical', 'arthrex', 
    'alcon manufacturing', 'baxter healthcare', 'hanger clinic', 'hyperbaric modular systems'
  ];

  for (const c of medicalDeviceCompanies) {
    if (companyLower.includes(c)) {
      return { isICP: true, isMedical: true, reason: `Medical device company match: ${c}` };
    }
  }

  // 3. Generic EXCLUSIONS by Keyword in Industry or Company Name
  const excludeKeywords = [
    'senior care', 'senior living', 'assisted living', 'home care', 'homecare', 'caregivers', 'hospice', 
    'home health', 'home healthcare', 'in-home care', 'elder care', 'senior home care', 'senior home', 
    'seniors', 'elderly', 'nursing home', 'clinic', 'clinics', 'hospital', 'hospitals', 'medical clinic', 
    'physicians clinics', 'medical center', 'medical group', 'health system', 'medical association', 
    'physician', 'clinical trial', 'clinical trials', 'clinical research', 'clinical labs', 'medical labs', 
    'ambulance', 'emergency medical', 'medical services', 'medical transport', 'pharmacy',
    'it services', 'it consulting', 'software', 'software-only', 'digital transformation',
    'creative agency', 'marketing agency', 'marketing', 'advertising', 'branding', 'pr agency', 'public relations',
    'recruiting', 'recruitment', 'staffing', 'labor pool', 'headhunter',
    'consulting', 'consultant', 'consultants', 'advisory', 'advisors', 'wealth management', 'asset management',
    'financial advisory', 'cpa', 'accounting', 'bookkeeping', 'legal', 'law', 'attorney', 'attorneys',
    'trucking', 'freight', 'logistics', 'shipping', 'transportation',
    'supermarket', 'retail', 'construction', 'builders', 'remodeling', 'contractor', 'contractors', 
    'restoration', 'realty', 'real estate', 'property management', 'landscaping', 'cleaning', 'janitorial', 
    'office trailers', 'security', 'patrol', 'catering', 'laundry', 'plumbing supply', 'rental'
  ];

  for (const kw of excludeKeywords) {
    if (industryLower.includes(kw) || companyLower.includes(kw)) {
      return { isICP: false, isMedical: false, reason: `Exclude keyword match: ${kw}` };
    }
  }

  // 4. Generic EXCLUSIONS by Title
  const excludeTitles = [
    'doctor', 'physician', 'nurse', 'therapist', 'caregiver', 'recruiter', 'marketing', 'sales', 'accountant',
    'lawyer', 'attorney', 'consultant', 'advisor', 'auditor', 'broker'
  ];
  for (const t of excludeTitles) {
    if (titleLower.includes(t)) {
      return { isICP: false, isMedical: false, reason: `Exclude title match: ${t}` };
    }
  }

  // 5. General INCLUSIONS by Medical Device Keywords (Physical Hardware/Device Manufacturers)
  const medicalDeviceKeywords = [
    'medical device', 'medical hardware', 'medical instrument', 'medical implants', 'implants', 
    'orthopedics', 'prosthetics', 'ultrasound', 'radiotherapy', 'brachytherapy', 'lithotripsy', 
    'catheter', 'stent', 'wheelchair', 'mobility equipment', 'surgical instruments', 'surgical devices', 
    'cardiovascular devices', 'biomedical hardware', 'resuscitation device'
  ];
  for (const kw of medicalDeviceKeywords) {
    if (companyLower.includes(kw) || industryLower.includes(kw)) {
      return { isICP: true, isMedical: true, reason: `Medical device keyword match: ${kw}` };
    }
  }

  // 6. General INCLUSIONS by Manufacturer Keywords (Physical Goods Manufacturers, Machine Shops, etc.)
  const manufacturerKeywords = [
    'manufacturing', 'machine', 'machining', 'machinery', 'shop', 'precision', 'cnc', 'milling', 
    'turning', 'stamping', 'assembly', 'aerospace', 'components', 'waterjet', 'edm', 'grinding', 
    'drilling', 'laser', 'tool', 'tools', 'forge', 'foundry', 'casting', 'fabrication', 'fabricators', 
    'metal', 'steel', 'wire', 'hardware', 'die', 'molds', 'molding', 'plastics', 'polymers', 
    'composites', 'gear', 'gears', 'turbines', 'engines', 'motor', 'motorsport', 'motorsports'
  ];

  for (const kw of manufacturerKeywords) {
    if (matchesKeyword(companyLower, kw) || industryLower.includes('manufacturing') || matchesKeyword(industryLower, kw)) {
      return { isICP: true, isMedical: false, reason: `General manufacturer match: ${kw}` };
    }
  }

  if (industryLower === 'manufacturing') {
    return { isICP: true, isMedical: false, reason: `Industry is manufacturing` };
  }

  // If nothing matches, default is exclude (noise)
  return { isICP: false, isMedical: false, reason: 'Default fallback (non-ICP)' };
}

async function main() {
  console.log('🏁 Starting Comprehensive Prospect List Audit & Restructuring...');
  
  const allLeads: LeadInfo[] = [];

  // Parse all files
  for (const file of INPUT_FILES) {
    let filePath = path.join(SEGMENTED_DIR, file);
    if (!fs.existsSync(filePath)) {
      // Try archive directory
      const archivePath = path.join(SEGMENTED_DIR, 'archive', file);
      if (fs.existsSync(archivePath)) {
        filePath = archivePath;
      } else {
        console.warn(`⚠️ Warning: file ${file} does not exist in ${SEGMENTED_DIR} or archive/`);
        continue;
      }
    }

    console.log(`📖 Reading ${file}...`);
    const content = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '').replace(/^ï»¿/, '');
    const records = parse(content, { columns: true, skip_empty_lines: true, trim: true, relax_column_count: true });

    for (const r of records as any[]) {
      // Unify schemas
      const leadId = r['Lead Id'] || r['Lead ID'] || r['Email'] || '';
      const firstName = r['First Name'] || r['FirstName'] || '';
      const lastName = r['Last Name'] || r['LastName'] || '';
      const email = (r['Email'] || r['Email Address'] || '').trim();
      const company = r['Company'] || r['Company Name'] || r['Business'] || '';
      const title = r['Title'] || r['Contact Title'] || r['Job Title'] || '';
      const industry = r['Industry'] || '';
      const phone = r['Phone'] || '';
      const employees = r['No. of Employees'] || r['Employees'] || '';
      const sales = r['Annual Sales'] || '';

      if (email && email.includes('@')) {
        allLeads.push({
          leadId,
          firstName,
          lastName,
          email,
          company,
          title,
          industry,
          phone,
          employees,
          sales,
          sourceFile: file
        });
      }
    }
  }

  console.log(`🔍 Total parsed raw lead rows: ${allLeads.length}`);

  // Classify all leads and deduplicate by email
  const classifiedLeads: Record<string, { lead: LeadInfo; classification: ReturnType<typeof classifyLead> }> = {};

  for (const lead of allLeads) {
    const emailKey = lead.email.toLowerCase();
    const currentClassification = classifyLead(lead);

    if (classifiedLeads[emailKey]) {
      // Deduplication precedence:
      // If we already have a classification, keep the one that matches ICP (prioritize medical_device, then manufacturer, then exclude)
      const existing = classifiedLeads[emailKey].classification;
      
      let replace = false;
      if (!existing.isICP && currentClassification.isICP) {
        // Replace non-ICP with ICP
        replace = true;
      } else if (existing.isICP && currentClassification.isICP && !existing.isMedical && currentClassification.isMedical) {
        // Replace general manufacturer with medical device
        replace = true;
      }
      
      if (replace) {
        classifiedLeads[emailKey] = { lead, classification: currentClassification };
      }
    } else {
      classifiedLeads[emailKey] = { lead, classification: currentClassification };
    }
  }

  // Split into three files
  const cleanManufacturersMaster: LeadInfo[] = [];
  const cleanMedicalDevices: LeadInfo[] = [];
  const nonICPLeadsArchived: LeadInfo[] = [];

  const classificationCounts: Record<string, number> = {
    manufacturer: 0,
    medical_device: 0,
    exclude: 0
  };

  const reasonCounts: Record<string, number> = {};

  for (const emailKey in classifiedLeads) {
    const { lead, classification } = classifiedLeads[emailKey];
    
    // Track stats
    const reason = classification.reason;
    reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;

    if (classification.isICP) {
      if (classification.isMedical) {
        cleanMedicalDevices.push(lead);
        classificationCounts.medical_device++;
        // Medical devices are also verified manufacturers, so they are written to master list too
        cleanManufacturersMaster.push(lead);
      } else {
        cleanManufacturersMaster.push(lead);
        classificationCounts.manufacturer++;
      }
    } else {
      nonICPLeadsArchived.push(lead);
      classificationCounts.exclude++;
    }
  }

  console.log('\n📈 Deduplicated Leads Stats:');
  console.log(`- General Manufacturers Kept: ${classificationCounts.manufacturer}`);
  console.log(`- Medical Device Manufacturers Kept: ${classificationCounts.medical_device}`);
  console.log(`- Total Verified Manufacturers Master: ${cleanManufacturersMaster.length}`);
  console.log(`- Non-ICP Leads Archived: ${classificationCounts.exclude}`);
  console.log(`- Total Unique Emails Evaluated: ${Object.keys(classifiedLeads).length}`);

  // Write restructured CSV files
  const headers = ['Lead Id', 'First Name', 'Last Name', 'Email', 'Company', 'Title', 'Industry', 'Phone', 'No. of Employees', 'Annual Sales', 'Source File'];

  const convertToCSVData = (list: LeadInfo[]) => {
    return list.map(l => [
      l.leadId,
      l.firstName,
      l.lastName,
      l.email,
      l.company,
      l.title,
      l.industry,
      l.phone,
      l.employees,
      l.sales,
      l.sourceFile
    ]);
  };

  const masterCSVPath = path.join(SEGMENTED_DIR, 'clean_manufacturers_master.csv');
  const medicalCSVPath = path.join(SEGMENTED_DIR, 'clean_medical_devices.csv');
  const archivedCSVPath = path.join(SEGMENTED_DIR, 'non_icp_leads_archived.csv');

  fs.writeFileSync(masterCSVPath, stringify(convertToCSVData(cleanManufacturersMaster), { header: true, columns: headers }));
  fs.writeFileSync(medicalCSVPath, stringify(convertToCSVData(cleanMedicalDevices), { header: true, columns: headers }));
  fs.writeFileSync(archivedCSVPath, stringify(convertToCSVData(nonICPLeadsArchived), { header: true, columns: headers }));

  console.log('\n💾 Restructured files successfully written:');
  console.log(`- clean_manufacturers_master.csv: ${masterCSVPath}`);
  console.log(`- clean_medical_devices.csv: ${medicalCSVPath}`);
  console.log(`- non_icp_leads_archived.csv: ${archivedCSVPath}`);

  // ─── Database Updates ─────────────────────────────────────────
  console.log('\n🗄️ Starting database updates...');
  
  const archivedEmails = nonICPLeadsArchived.map(l => l.email.toLowerCase().trim()).filter(Boolean);
  console.log(`Preparing to update ${archivedEmails.length} non-ICP emails in the database leads table...`);

  // Log rods@hrprimellc.com state before update
  const rodsEmail = 'rods@hrprimellc.com';
  const rodsBefore = await db.select().from(leads).where(eq(leads.email, rodsEmail));
  console.log(`Rods before update in DB:`, rodsBefore);

  // Perform updates in batches to avoid query size limits
  const BATCH_SIZE = 100;
  let updatedCount = 0;
  
  for (let i = 0; i < archivedEmails.length; i += BATCH_SIZE) {
    const chunk = archivedEmails.slice(i, i + BATCH_SIZE);
    try {
      const result = await db.update(leads)
        .set({
          status: 'archived',
          tags: '["NON_ICP_EXCLUDE"]'
        })
        .where(inArray(leads.email, chunk));
      
      updatedCount += chunk.length;
    } catch (e: any) {
      console.error(`❌ Database update failed for chunk starting at index ${i}:`, e.message);
    }
  }

  console.log(`✅ Completed database batch updates. Estimated leads processed: ${updatedCount}`);

  // Log rods@hrprimellc.com state after update
  const rodsAfter = await db.select().from(leads).where(eq(leads.email, rodsEmail));
  console.log(`Rods after update in DB:`, rodsAfter);

  console.log('\n🎉 List audit and database sync completed successfully.');
  process.exit(0);
}

main().catch(error => {
  console.error('❌ Critical failure in main script:', error);
  process.exit(1);
});
