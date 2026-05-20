
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
    const { brevo } = await import('../../lib/brevo');
    
    console.log('🎯 Preparing High-Ticket Zoom Call Outreach...');

    const HIGH_TICKET_INDUSTRIES = [
        'Aerospace & Defense',
        'Medical Devices & Equipment',
        'Biotechnology',
        'Pharmaceuticals'
    ];

    // 1. Load Leads
    const leadsDir = path.join(process.cwd(), 'segmented_leads');
    const tier1File = path.join(leadsDir, 'feb17/tier1_med_device.json');
    const tier2File = path.join(leadsDir, 'feb17/tier2_manufacturing.json');
    const clickersFile = path.join(leadsDir, 'high_intent_clickers.json');

    const tier1 = fs.existsSync(tier1File) ? JSON.parse(fs.readFileSync(tier1File, 'utf-8')) : [];
    const tier2 = fs.existsSync(tier2File) ? JSON.parse(fs.readFileSync(tier2File, 'utf-8')) : [];
    const clickers = fs.existsSync(clickersFile) ? JSON.parse(fs.readFileSync(clickersFile, 'utf-8')) : [];

    // 2. Segment & Deduplicate
    const processedEmails = new Set<string>();
    const segmentA: any[] = []; // Clickers (High Intent)
    const segmentB: any[] = []; // High Ticket Prospects

    // Segment A: Priority Clickers
    clickers.forEach((c: any) => {
        if (!processedEmails.has(c.email.toLowerCase())) {
            processedEmails.add(c.email.toLowerCase());
            segmentA.push(c);
        }
    });

    // Segment B: High Ticket (New Prospects)
    [...tier1, ...tier2].forEach((l: any) => {
        if (processedEmails.has(l.email.toLowerCase())) return;
        
        if (HIGH_TICKET_INDUSTRIES.includes(l.industry)) {
            processedEmails.add(l.email.toLowerCase());
            segmentB.push(l);
        }
    });

    // Limit Segment B to top 100 for this wave
    const finalLeads = [...segmentA, ...segmentB.slice(0, 100)];
    console.log(`✅ Selected ${segmentA.length} clickers and ${Math.min(segmentB.length, 100)} new high-ticket prospects.`);
    console.log(`🚀 Total Recipients: ${finalLeads.length}`);

    // 3. Create List in Brevo (or use existing)
    // For classic campaigns, we need a list ID. 
    // We'll create a temporary list for this tomorrow-8am wave.
    const listName = `Zoom-Call-Outreach`;
    let listId: number;
    
    try {
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

        // 4. Import Contacts
        console.log(`📥 Importing ${finalLeads.length} contacts into list...`);
        // We'll do this in batches of 50 to be safe
        for (let i = 0; i < finalLeads.length; i += 50) {
            const batch = finalLeads.slice(i, i + 50);
            await Promise.all(batch.map(l => brevo.createContact({
                email: l.email,
                attributes: { 
                    FIRSTNAME: l.firstName || l.name || '', 
                    COMPANY: l.company || '',
                    INDUSTRY: l.industry || ''
                },
                listIds: [listId]
            })));
        }

        // 5. Schedule Campaign
        const scheduledAt = new Date();
        scheduledAt.setDate(scheduledAt.getDate() + 1); // Tomorrow
        scheduledAt.setHours(8, 0, 0, 0); // 8:00 AM
        
        const htmlContent = wrapHtml(`
            <p>Hi {{contact.FIRSTNAME}},</p>
            <p>Following up on your interest in the <strong>USMCA Audit protocols</strong>.</p>
            <p>The upcoming "100% Rules of Origin" mandate is more than a compliance hurdle—it's an operational shift that will define the competitive landscape in ${HIGH_TICKET_INDUSTRIES[0]} and related sectors for the next decade.</p>
            <p>I'd like to offer you a 15-minute <strong>Strategic Exposure Audit</strong> over Zoom. We’ll look at your current supply chain map and identify exactly where the new July thresholds create risk—or opportunity—for <strong>{{contact.COMPANY}}</strong>.</p>
            <p>Are you available for a brief session later this week?</p>
        `, "Book Strategic Audit (Zoom)", "https://calendly.com/denisse-nearshorenavigator/30min");

        await brevo.createCampaign({
            name: listName,
            subject: '{{contact.COMPANY}} — Strategic USMCA Exposure Audit?',
            sender: { name: 'Denisse @ Nearshore Navigator', email: 'nearshore.navigator@gmail.com' },
            htmlContent,
            listIds: [listId],
            scheduledAt: scheduledAt.toISOString()
        });

        console.log(`\n📅 CAMPAIGN SCHEDULED:`);
        console.log(`   Name:      ${listName}`);
        console.log(`   Time:      ${scheduledAt.toLocaleString()}`);
        console.log(`   Recipients: ${finalLeads.length}`);
        console.log(`\n✅ Done. Check the Brevo dashboard to confirm.`);

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
              <td height="12" bgcolor="${primaryGreen}" style="background: linear-gradient(90deg, ${primaryGreen} 0%, ${primaryGreen} 40%, #ffffff 50%, ${primaryGreen} 60%, ${primaryGreen} 100%); background-size: 200% 100%; animation: scan 3s linear infinite;">
                <style>
                  @keyframes scan { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
                </style>
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
