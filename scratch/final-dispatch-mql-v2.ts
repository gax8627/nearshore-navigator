
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function finalDispatch() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;

    try {
        console.log('🚀 MISSION: Full MQL Outreach - Meeting Focus (V2)...');

        // 1. Create a fresh clean list (List 18)
        const listName = `July Rescue - Meeting Focus - FINAL - ${new Date().toLocaleDateString()}`;
        const listRes = await fetch('https://api.brevo.com/v3/contacts/lists', {
            method: 'POST',
            headers: { 
                'api-key': BREVO_API_KEY!, 
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify({ name: listName, folderId: 1 })
        });
        const listData = await listRes.json();
        const newListId = listData.id;
        console.log(`✅ List 18 Created (ID: ${newListId})`);

        // 2. Select the top 583 MQLs from the verified JSON
        const allLeads = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'segmented_leads/feb17/tier2_manufacturing.json'), 'utf-8'));
        const mqlLeads = allLeads
            .filter((l: any) => l.email && l.firstName)
            .sort((a: any, b: any) => (a.status === 'Marketing Qualified Lead' ? -1 : 1))
            .slice(0, 583);

        console.log(`📥 Syncing ${mqlLeads.length} MQLs via Individual Creation...`);

        // Individual creation is safer for Trial/Starter accounts to avoid bulk rejection
        const chunkSize = 25; 
        for (let i = 0; i < mqlLeads.length; i += chunkSize) {
            const chunk = mqlLeads.slice(i, i + chunkSize);
            console.log(`   - Processing batch ${Math.floor(i / chunkSize) + 1}...`);
            await Promise.all(chunk.map(async (l: any) => {
                await fetch('https://api.brevo.com/v3/contacts', {
                    method: 'POST',
                    headers: { 
                        'api-key': BREVO_API_KEY!, 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json' 
                    },
                    body: JSON.stringify({
                        email: l.email,
                        attributes: {
                            FIRSTNAME: l.firstName,
                            COMPANY: l.company,
                            INDUSTRY: l.industry || 'Manufacturing'
                        },
                        listIds: [newListId]
                    })
                }).catch(() => {}); // Ignore duplicate errors
            }));
        }

        // 3. Create the Meeting-Focus Campaign
        const htmlContent = `
            <div style="background-color: #030712; color: #f3f4f6; padding: 40px; font-family: sans-serif; line-height: 1.6;">
                <div style="max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #10b981; font-size: 24px; margin-bottom: 20px;">USMCA 2026: Compliance Audit Call</h1>
                    <p>Hi {{contact.FIRSTNAME}},</p>
                    <p>The signals regarding the <strong>July 2026 USMCA review</strong> are now absolute: the pivot toward a "100% Rules of Origin" mandate is accelerating for the {{contact.INDUSTRY}} sector.</p>
                    <p>If the supply chain at <strong>{{contact.COMPANY}}</strong> isn't audited by year-end, you risk exposure to the 10% tariff cliff.</p>
                    <p>I'd like to propose a brief 10-minute audit call this week to review your risk profile and see if our shelter setup can insulate your operations.</p>
                    <div style="margin: 35px 0;">
                        <a href="https://calendly.com/denisse-nearshorenavigator/30min" 
                           style="background-color: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                           Schedule 10-Min Audit
                        </a>
                    </div>
                    <p style="margin-top: 40px; border-top: 1px solid #374151; padding-top: 20px; font-size: 0.9em; color: #9ca3af;">
                        Best regards,<br/>
                        <strong>Denisse Martinez</strong><br/>
                        Director of Compliance | Nearshore Navigator
                    </p>
                </div>
            </div>
        `;

        const campRes = await fetch('https://api.brevo.com/v3/emailCampaigns', {
            method: 'POST',
            headers: { 
                'api-key': BREVO_API_KEY!, 
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify({
                name: `Meeting Focus - ${new Date().toISOString()}`,
                subject: '{{contact.COMPANY}} — USMCA Audit Call?',
                sender: { name: 'Denisse @ Nearshore Navigator', email: 'nearshore.navigator@gmail.com' },
                type: 'classic',
                htmlContent,
                recipients: { listIds: [newListId] }
            })
        });

        const campData = await campRes.json();
        if (campData.id) {
            console.log(`✅ Campaign Created! ID: ${campData.id}`);
            console.log('🚀 Dispatching NOW...');
            await fetch(`https://api.brevo.com/v3/emailCampaigns/${campData.id}/sendNow`, {
                method: 'POST',
                headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
            });
            console.log('🏁 MISSION COMPLETE: Meeting-focused outreach is live.');
        } else {
            console.error('❌ Campaign Creation Failed:', campData);
        }

    } catch (error: any) {
        console.error('❌ Fatal Error:', error.message);
    }
}

finalDispatch();
