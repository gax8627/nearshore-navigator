
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function prepareCampaign() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const SOURCE_LIST_ID = 5; // We'll stick to 5 but fix it first

    try {
        console.log('🚀 Preparing "Meeting Request" Campaign (Phase 2)...');

        // 1. Create List 6 to ensure clean sync
        const listRes = await fetch('https://api.brevo.com/v3/contacts/lists', {
            method: 'POST',
            headers: { 
                'api-key': BREVO_API_KEY!, 
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify({ name: `July Rescue - Meeting Focus - ${new Date().toISOString()}`, folderId: 1 })
        });
        const listData = await listRes.json();
        const newListId = listData.id;
        console.log(`✅ Created List ID: ${newListId}`);

        // 2. Fetch ALL contacts and sync to List 6
        const contactsRes = await fetch('https://api.brevo.com/v3/contacts?limit=1000', {
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });
        const contactsData = await contactsRes.json();
        const emails = contactsData.contacts.map((c: any) => c.email);

        console.log(`📥 Syncing ${emails.length} contacts to List ${newListId}...`);
        await fetch(`https://api.brevo.com/v3/contacts/lists/${newListId}/contacts/add`, {
            method: 'POST',
            headers: { 
                'api-key': BREVO_API_KEY!, 
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify({ emails })
        });

        // 3. Create Meeting Request Campaign (Wow Factor Design)
        const htmlContent = `
            <div style="background-color: #030712; color: #f3f4f6; padding: 40px; font-family: sans-serif; line-height: 1.6;">
                <h2 style="color: #10b981;">Urgent: USMCA 2026 Compliance Review</h2>
                <p>Hi {{contact.FIRSTNAME}},</p>
                <p>Following up on my previous note regarding the <strong>Rules of Origin shift</strong> hitting the {{contact.INDUSTRY}} sector.</p>
                <p>Given the complexity of the new Section 122 requirements for <strong>{{contact.COMPANY}}</strong>, I'd like to propose a brief 10-minute audit call.</p>
                <p>The goal is simple: determine if your current shelter or contract manufacturing setup is exposed to the 10% tariff cliff before the July review cycle starts.</p>
                <div style="margin-top: 30px;">
                    <a href="https://calendly.com/denisse-nearshorenavigator/30min" 
                       style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                       Schedule 10-Min Audit Call
                    </a>
                </div>
                <p style="margin-top: 40px; font-size: 0.9em; color: #9ca3af;">
                    Best,<br/>
                    <strong>Denisse Martinez</strong><br/>
                    Director of Compliance | Nearshore Navigator
                </p>
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
                name: 'July Rescue - Meeting Request Focus',
                subject: '{{contact.COMPANY}} — USMCA Audit Call?',
                sender: { name: 'Denisse @ Nearshore Navigator', email: 'nearshore.navigator@gmail.com' },
                type: 'classic',
                htmlContent,
                recipients: { lists: [newListId] }
            })
        });

        const campData = await campRes.json();
        console.log(`✅ Campaign Created! ID: ${campData.id}`);

        // 4. Send Now
        console.log(`🚀 Triggering dispatch for Campaign ${campData.id}...`);
        await fetch(`https://api.brevo.com/v3/emailCampaigns/${campData.id}/sendNow`, {
            method: 'POST',
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });

        console.log('🏁 Mission Accomplished: Meeting-focused outreach is live.');

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

prepareCampaign();
