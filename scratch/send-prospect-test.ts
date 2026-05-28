
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function sendProspectTest() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const CAMPAIGN_ID = 10;
    const TEST_EMAIL = 'gmailderamiro@gmail.com';

    console.log(`🔍 Fetching official prospect content from Campaign ${CAMPAIGN_ID}...`);

    try {
        // 1. Fetch the campaign to get the EXACT htmlContent
        const res = await fetch(`https://api.brevo.com/v3/emailCampaigns/${CAMPAIGN_ID}`, {
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });
        const campaign = await res.json();

        if (!res.ok) throw new Error(`Failed to fetch campaign: ${JSON.stringify(campaign)}`);

        // 2. Send as a transactional email to the user (prospect style)
        console.log(`📧 Sending "Prospect-View" test to ${TEST_EMAIL}...`);
        
        // We replace any contact attributes (like {{contact.FIRSTNAME}}) with realistic values
        let prospectHtml = campaign.htmlContent
            .replace(/\{\{contact\.FIRSTNAME\}\}/g, 'Denisse')
            .replace(/\{\{contact\.ORGANIZATION\}\}/g, 'Industrial Solutions')
            .replace(/\{\{contact\.HOOK\}\}/g, 'your recent expansion into Baja');

        const sendRes = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: { 
                'api-key': BREVO_API_KEY!, 
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify({
                sender: { email: campaign.sender.email, name: campaign.sender.name },
                to: [{ email: TEST_EMAIL, name: 'Denisse' }],
                subject: campaign.subject,
                htmlContent: prospectHtml
            })
        });

        if (sendRes.ok) {
            console.log('✅ "Prospect-View" test email sent successfully!');
        } else {
            const errorData = await sendRes.json();
            console.error('❌ Failed to send prospect test:', JSON.stringify(errorData, null, 2));
        }

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

sendProspectTest();
