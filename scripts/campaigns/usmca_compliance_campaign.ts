import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { parse } from 'csv-parse/sync';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// Helper to recursively locate all JSON/CSV files
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath, arrayOfFiles);
        } else {
            if (file.endsWith('.csv') || file.endsWith('.json')) {
                arrayOfFiles.push(fullPath);
            }
        }
    });
    return arrayOfFiles;
}

// Build a complete lookup map of all contacts in the leads folder
function buildMasterLookup(leadsDir: string): Map<string, { firstName: string; company: string; industry: string }> {
    const lookup = new Map<string, { firstName: string; company: string; industry: string }>();
    const files = getAllFiles(leadsDir);
    
    console.log(`📂 Scanning ${files.length} files under segmented_leads/ to build master lookup registry...`);

    files.forEach(file => {
        // Skip campaign sent logs to prevent self-referential blank details
        if (path.basename(file).startsWith('sent_') || path.basename(file) === 'high_intent_clickers.json') {
            return;
        }

        const ext = path.extname(file);
        try {
            if (ext === '.json') {
                const content = JSON.parse(fs.readFileSync(file, 'utf-8'));
                if (Array.isArray(content)) {
                    content.forEach((item: any) => {
                        const email = item.email || item.Email || item['Email Address'];
                        if (email && typeof email === 'string' && email.includes('@')) {
                            const emailKey = email.toLowerCase().trim();
                            // Only set if not already set or if existing has blanks
                            const existing = lookup.get(emailKey);
                            const firstName = item.firstName || item.name || item['First Name'] || item['First'] || '';
                            const company = item.company || item.Company || item['Company Name'] || item['Organization'] || '';
                            const industry = item.industry || item.Industry || '';
                            
                            if (!existing || (!existing.firstName && firstName) || (!existing.company && company)) {
                                lookup.set(emailKey, {
                                    firstName: String(firstName).trim(),
                                    company: String(company).trim(),
                                    industry: String(industry).trim()
                                });
                            }
                        }
                    });
                }
            } else if (ext === '.csv') {
                const rawContent = fs.readFileSync(file, 'utf-8');
                const records = parse(rawContent, { columns: true, skip_empty_lines: true });
                records.forEach((item: any) => {
                    const email = item.email || item.Email || item['Email Address'] || Object.values(item).find(v => typeof v === 'string' && v.includes('@'));
                    if (email && typeof email === 'string') {
                        const emailKey = email.toLowerCase().trim();
                        const existing = lookup.get(emailKey);
                        const firstName = item.firstName || item.name || item['First Name'] || item['First'] || '';
                        const company = item.company || item.Company || item['Company Name'] || item['Organization'] || '';
                        const industry = item.industry || item.Industry || '';

                        if (!existing || (!existing.firstName && firstName) || (!existing.company && company)) {
                            lookup.set(emailKey, {
                                firstName: String(firstName).trim(),
                                company: String(company).trim(),
                                industry: String(industry).trim()
                            });
                        }
                    }
                });
            }
        } catch (err: any) {
            // silent ignore
        }
    });

    return lookup;
}

async function main() {
    const isDryRun = process.env.DRY_RUN === 'true' || process.argv.includes('--dry-run');
    console.log(`\n🎯 Preparing USMCA Compliance Audit Campaign (Dry-Run: ${isDryRun})...`);

    const HIGH_TICKET_INDUSTRIES = [
        'Aerospace & Defense',
        'Medical Devices & Equipment',
        'Biotechnology',
        'Pharmaceuticals'
    ];

    const leadsDir = path.join(process.cwd(), 'segmented_leads');
    const tier1File = path.join(leadsDir, 'feb17/tier1_med_device.json');
    const tier2File = path.join(leadsDir, 'feb17/tier2_manufacturing.json');
    const clickersFile = path.join(leadsDir, 'high_intent_clickers.json');

    const tier1 = fs.existsSync(tier1File) ? JSON.parse(fs.readFileSync(tier1File, 'utf-8')) : [];
    const tier2 = fs.existsSync(tier2File) ? JSON.parse(fs.readFileSync(tier2File, 'utf-8')) : [];
    const clickers = fs.existsSync(clickersFile) ? JSON.parse(fs.readFileSync(clickersFile, 'utf-8')) : [];

    // 2. Build Enriched Lookup map across all lead files
    const masterLookup = buildMasterLookup(leadsDir);
    console.log(`ℹ️ Built lookup registry with ${masterLookup.size} unique master contacts.`);

    // 3. Segment & Deduplicate
    const processedEmails = new Set<string>();
    const segmentA: any[] = []; // Clickers (High Intent, Enriched)
    const segmentB: any[] = []; // High Ticket Prospects (New)

    // Segment A: Priority Clickers
    let enrichedClickerCount = 0;
    clickers.forEach((c: any) => {
        if (c.email) {
            const emailLower = c.email.toLowerCase().trim();
            if (!processedEmails.has(emailLower)) {
                processedEmails.add(emailLower);
                
                const masterRecord = masterLookup.get(emailLower);
                let firstName = 'there';
                let company = 'your company';
                let industry = 'Manufacturing';

                if (masterRecord) {
                    if (masterRecord.firstName) firstName = masterRecord.firstName;
                    if (masterRecord.company) company = masterRecord.company;
                    if (masterRecord.industry) industry = masterRecord.industry;
                    enrichedClickerCount++;
                }

                segmentA.push({
                    email: emailLower,
                    firstName,
                    company,
                    industry
                });
            }
        }
    });
    console.log(`✅ Segment A: Loaded ${segmentA.length} clickers (Enriched ${enrichedClickerCount} records from master directory).`);

    // Segment B: High Ticket (New Prospects)
    [...tier1, ...tier2].forEach((l: any) => {
        if (!l.email || processedEmails.has(l.email.toLowerCase().trim())) return;
        
        if (HIGH_TICKET_INDUSTRIES.includes(l.industry)) {
            const emailLower = l.email.toLowerCase().trim();
            processedEmails.add(emailLower);
            segmentB.push({
                email: emailLower,
                firstName: l.firstName || 'there',
                company: l.company || 'your company',
                industry: l.industry
            });
        }
    });

    // Limit Segment B to top 150 for this wave to keep list highly targeted
    const targetSegmentB = segmentB.slice(0, 150);
    const finalLeads = [...segmentA, ...targetSegmentB];
    console.log(`✅ Segment B: Selected ${targetSegmentB.length} new high-ticket prospects.`);
    console.log(`🚀 Total Recipients: ${finalLeads.length}`);

    if (finalLeads.length === 0) {
        console.error('❌ No leads selected. Exiting.');
        return;
    }

    const listName = `USMCA-Compliance-Audit-Outreach`;
    
    if (isDryRun) {
        console.log('\n--- DRY RUN SUMMARY ---');
        console.log(`Campaign Name: ${listName}`);
        console.log(`Total Recipients to import: ${finalLeads.length}`);
        console.log('Sample Lead Attributes (showing enrichment results):');
        console.log(finalLeads.slice(0, 8).map(l => ({
            email: l.email,
            firstName: l.firstName,
            company: l.company,
            industry: l.industry
        })));
        
        const testContent = wrapHtml(`
            <p>Hi {{contact.FIRSTNAME}},</p>
            <p>With the USMCA joint review beginning July 1st, CBP has significantly increased audits on Mexican manufacturing imports—particularly targeting Chinese components.</p>
            <p>If {{contact.COMPANY}} is shipping medical/aerospace components from Baja California, do you have documented compliance to avoid the new 10% global surcharge?</p>
            <p>We’re running brief USMCA exposure audits for US manufacturers this week. It takes 15 minutes to review your supply chain footprint and verify qualifications.</p>
            <p>Are you available for a brief session later this week?</p>
        `, "Book Strategic USMCA Audit", "https://calendly.com/denisse-nearshorenavigator/30min");
        
        console.log('\nEmail Subject: {{contact.COMPANY}} — USMCA July Review exposure?');
        console.log('Email Body HTML (snippet):', testContent.substring(0, 500) + '...\n... [TRUNCATED] ...');
        console.log('--- END DRY RUN ---');
        return;
    }

    const { brevo } = await import('../../lib/brevo');

    try {
        let listId: number;
        const listsRes = await brevo.getLists({ limit: 50 });
        const existingList = (listsRes.lists || []).find((l: any) => l.name === listName);
        
        if (existingList) {
            listId = existingList.id;
            console.log(`ℹ️ Using existing list: ${listName} (ID: ${listId})`);
        } else {
            console.log(`🔨 Creating new list: ${listName}...`);
            const newList = await brevo.createList(listName); 
            listId = newList.id;
            console.log(`✅ Created new list: ${listName} (ID: ${listId})`);
        }

        // 4. Import Contacts in batches of 50
        console.log(`📥 Importing ${finalLeads.length} contacts into list...`);
        for (let i = 0; i < finalLeads.length; i += 50) {
            const batch = finalLeads.slice(i, i + 50);
            await Promise.all(batch.map(l => brevo.createContact({
                email: l.email,
                attributes: { 
                    FIRSTNAME: l.firstName, 
                    COMPANY: l.company,
                    INDUSTRY: l.industry
                },
                listIds: [listId],
                updateEnabled: true
            })));
            console.log(`   Imported batch ${i / 50 + 1}...`);
        }

        // 5. Schedule Campaign for tomorrow at 8:00 AM
        const scheduledAt = new Date();
        scheduledAt.setDate(scheduledAt.getDate() + 1); // Tomorrow
        scheduledAt.setHours(8, 0, 0, 0); // 8:00 AM
        
        const htmlContent = wrapHtml(`
            <p>Hi {{contact.FIRSTNAME}},</p>
            <p>With the USMCA joint review beginning July 1st, CBP has significantly increased audits on Mexican manufacturing imports—particularly targeting Chinese components.</p>
            <p>If <strong>{{contact.COMPANY}}</strong> is shipping medical/aerospace components from Baja California, do you have documented compliance to avoid the new 10% global surcharge?</p>
            <p>We’re running brief <strong>USMCA exposure audits</strong> for US manufacturers this week. It takes 15 minutes to review your supply chain footprint and verify qualifications.</p>
            <p>Are you available for a brief session later this week?</p>
        `, "Book Strategic USMCA Audit", "https://calendly.com/denisse-nearshorenavigator/30min");

        await brevo.createCampaign({
            name: listName,
            subject: '{{contact.COMPANY}} — USMCA July Review exposure?',
            sender: { name: 'Denisse @ Nearshore Navigator', email: 'nearshore.navigator@gmail.com' },
            htmlContent,
            listIds: [listId],
            scheduledAt: scheduledAt.toISOString()
        });

        console.log(`\n📅 CAMPAIGN SCHEDULED:`);
        console.log(`   Name:      ${listName}`);
        console.log(`   Time:      ${scheduledAt.toLocaleString()}`);
        console.log(`   Recipients: ${finalLeads.length}`);
        console.log(`\n✅ Done. Campaign created successfully in Brevo.`);

    } catch (e: any) {
        console.error(`❌ Campaign creation failed: ${e.message}`);
    }
}

function wrapHtml(content: string, ctaText: string, ctaUrl: string) {
  const primaryGreen = "#10B981"; 
  const darkDeep = "#020617"; 
  const glassBg = "#0F172A"; 
  const glassBorder = "#1E293B"; 
  const textMuted = "#94A3B8"; 
  const signatureBanner = "https://nearshorenavigator.com/images/denisse-banner.jpg?v=MAY8";

  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${darkDeep}" style="background-color: ${darkDeep}; table-layout: fixed;">
      <tr>
        <td align="center" style="padding: 60px 10px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; border-radius: 32px; overflow: hidden; border: 1px solid ${glassBorder};" bgcolor="${glassBg}">
            <tr>
              <td height="12" bgcolor="${primaryGreen}" style="background: linear-gradient(90deg, ${primaryGreen} 0%, ${primaryGreen} 40%, #ffffff 50%, ${primaryGreen} 60%, ${primaryGreen} 100%); background-size: 200% 100%;">
              </td>
            </tr>
            <tr>
              <td style="padding: 56px 48px;">
                <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 48px;">
                  <tr>
                    <td width="42" valign="middle">
                      <table border="0" cellpadding="0" cellspacing="0" bgcolor="${primaryGreen}" style="border-radius: 12px; width: 42px; height: 42px;">
                        <tr><td align="center" style="color: #000; font-family: sans-serif; font-weight: 900; font-size: 24px; line-height: 42px;">N</td></tr>
                      </table>
                    </td>
                    <td style="padding-left: 16px; font-family: sans-serif; font-size: 22px; font-weight: 700; color: #ffffff; text-transform: uppercase;">
                      Nearshore <span style="color: ${primaryGreen};">Navigator</span>
                    </td>
                  </tr>
                </table>
                <div style="font-family: sans-serif; font-size: 17px; line-height: 1.8; color: ${textMuted}; margin-bottom: 56px;">
                  ${content}
                </div>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 56px;">
                  <tr>
                    <td align="center" bgcolor="${primaryGreen}" style="border-radius: 16px;">
                      <a href="${ctaUrl}" style="display: block; padding: 22px 48px; text-decoration: none; color: #000; font-weight: 800; text-align: center; font-family: sans-serif;">
                        ${ctaText}
                      </a>
                    </td>
                  </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center">
                      <img src="${signatureBanner}" width="544" style="display: block; width: 100%; height: auto; border-radius: 16px; border: 0;" alt="Denisse Martinez — Lead Advisor" />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

main();
