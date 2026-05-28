import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { parse } from 'csv-parse/sync';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
    const isDryRun = process.env.DRY_RUN === 'true' || process.argv.includes('--dry-run');
    console.log(`🎯 Preparing SoCal Machining Outreach Campaign (Dry-Run: ${isDryRun})...`);

    // 1. Load Suppression List (Bad Emails)
    const badEmailsFile = path.join(process.cwd(), 'scratch/bad_emails.json');
    const badEmails = new Set<string>();
    if (fs.existsSync(badEmailsFile)) {
        const list = JSON.parse(fs.readFileSync(badEmailsFile, 'utf-8'));
        list.forEach((e: string) => badEmails.add(e.toLowerCase().trim()));
        console.log(`🧹 Loaded ${badEmails.size} suppressed/bad emails to exclude.`);
    } else {
        console.log('ℹ️ No suppression list found. Proceeding without exclusion.');
    }

    // 2. Locate California CSV Files
    const leadsDir = path.join(process.cwd(), 'segmented_leads');
    const filesToMerge = [
        path.join(leadsDir, 'Machine-shop-San-Diego-CA-Companies.csv'),
        path.join(leadsDir, 'Machine-shop-Los-Angeles-CA-Companies.csv'),
        path.join(leadsDir, 'Machine-shop-Irvine-CA-Companies.csv'),
        path.join(leadsDir, 'Machine-shop-Orange-CA-Companies.csv'),
        path.join(leadsDir, 'Machine-shop-Riverside-CA-Companies.csv')
    ];

    const leads: any[] = [];
    const processedEmails = new Set<string>();

    filesToMerge.forEach(file => {
        if (!fs.existsSync(file)) {
            console.warn(`⚠️ Warning: Lead file not found at ${file}`);
            return;
        }

        console.log(`📂 Parsing ${path.basename(file)}...`);
        try {
            const rawContent = fs.readFileSync(file, 'utf-8');
            // Remove UTF-8 BOM if present
            const cleanContent = rawContent.replace(/^\uFEFF/, '');
            const records = parse(cleanContent, { columns: true, skip_empty_lines: true });

            records.forEach((row: any) => {
                const keys = Object.keys(row);
                
                // Find contact email or general email
                const emailKey = keys.find(k => k.toLowerCase() === 'contact email') || keys.find(k => k.toLowerCase() === 'email');
                let email = emailKey ? row[emailKey] : '';
                if (typeof email === 'string') {
                    email = email.trim();
                }

                if (!email || !email.includes('@')) return;

                const emailLower = email.toLowerCase();

                // Skip if suppressed or already processed
                if (badEmails.has(emailLower) || processedEmails.has(emailLower)) return;

                // Robust company name key search (contains 'business' or 'company')
                const companyKey = keys.find(k => k.toLowerCase().includes('business') || k.toLowerCase().includes('company'));
                const businessName = companyKey ? String(row[companyKey]).trim() : 'your company';

                // Robust first name key search
                const firstNameKey = keys.find(k => k.toLowerCase().includes('first name') || k.toLowerCase().includes('first'));
                let firstName = firstNameKey ? String(row[firstNameKey]).trim() : 'there';
                
                if (!firstName || firstName.toLowerCase() === 'null') {
                    firstName = 'there';
                }

                processedEmails.add(emailLower);
                leads.push({
                    email: emailLower,
                    firstName: firstName,
                    company: businessName,
                    industry: 'Machining & Fabrication'
                });
            });
        } catch (err: any) {
            console.error(`❌ Error parsing ${path.basename(file)}: ${err.message}`);
        }
    });

    // Limit to top 250 leads for high relevance
    const finalLeads = leads.slice(0, 250);
    console.log(`\n✅ Merged and sanitized ${leads.length} unique contacts. Limited to ${finalLeads.length} for this wave.`);

    if (finalLeads.length === 0) {
        console.error('❌ No leads available for outreach. Exiting.');
        return;
    }

    const listName = `SoCal-Machine-Shop-Outreach`;

    if (isDryRun) {
        console.log('\n--- DRY RUN SUMMARY ---');
        console.log(`Campaign Name: ${listName}`);
        console.log(`Total Recipients to import: ${finalLeads.length}`);
        console.log('Sample Lead Attributes:');
        console.log(finalLeads.slice(0, 8).map(l => ({
            email: l.email,
            firstName: l.firstName,
            company: l.company,
            industry: l.industry
        })));
        
        const testContent = wrapHtml(`
            <p>Hi {{contact.FIRSTNAME}},</p>
            <p>Finding skilled CNC machinists in Southern California has become a massive bottleneck in 2026, and shop rates keep climbing.</p>
            <p>Many SoCal precision shops are setting up secondary assembly or secondary machining operations in Tijuana to scale their capacity at 40% lower costs, while maintaining same-day shipping back to San Diego.</p>
            <p>We help California machine shops evaluate and set up cross-border capacity expansions in Baja California without the traditional administrative overhead.</p>
            <p>I put together a brief feasibility checklist specifically for SoCal machining operations. Worth a look?</p>
        `, "Book Tijuana Capacity Audit", "https://calendly.com/denisse-nearshorenavigator/30min");
        
        console.log('\nEmail Subject: {{contact.COMPANY}} — SoCal machinist capacity?');
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

        // Import Contacts in batches of 50
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

        // Schedule Campaign for tomorrow at 10:00 AM (to give spacing from the 8:00 AM campaign)
        const scheduledAt = new Date();
        scheduledAt.setDate(scheduledAt.getDate() + 1); // Tomorrow
        scheduledAt.setHours(10, 0, 0, 0); // 10:00 AM
        
        const htmlContent = wrapHtml(`
            <p>Hi {{contact.FIRSTNAME}},</p>
            <p>Finding skilled CNC machinists in Southern California has become a massive bottleneck in 2026, and shop rates keep climbing.</p>
            <p>Many SoCal precision shops are setting up secondary assembly or secondary machining operations in Tijuana to scale their capacity at 40% lower costs, while maintaining same-day shipping back to San Diego.</p>
            <p>We help California machine shops evaluate and set up cross-border capacity expansions in Baja California without the traditional administrative overhead.</p>
            <p>I put together a brief feasibility checklist specifically for SoCal machining operations. Worth a look?</p>
        `, "Book Tijuana Capacity Audit", "https://calendly.com/denisse-nearshorenavigator/30min");

        await brevo.createCampaign({
            name: listName,
            subject: '{{contact.COMPANY}} — SoCal machinist capacity?',
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
