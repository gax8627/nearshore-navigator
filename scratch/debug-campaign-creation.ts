
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function debug() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const LIST_ID = 16; // The one I just created

    const htmlContent = `
        <div style="background-color: #030712; color: #f3f4f6; padding: 40px; font-family: sans-serif; line-height: 1.6;">
            <h2 style="color: #10b981;">Urgent: USMCA 2026 Compliance Review</h2>
            <p>Hi {{contact.FIRSTNAME}},</p>
            <p>Following up on my previous note regarding the <strong>Rules of Origin shift</strong> hitting the {{contact.INDUSTRY}} sector.</p>
            <p>Given the complexity of the new Section 122 requirements for <strong>{{contact.COMPANY}}</strong>, I'd like to propose a brief 10-minute audit call.</p>
            <div style="margin-top: 30px;">
                <a href="https://calendly.com/denisse-nearshorenavigator/30min" 
                   style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                   Schedule 10-Min Audit Call
                </a>
            </div>
            <p style="margin-top: 40px; font-size: 0.9em; color: #9ca3af;">Best, Denisse</p>
        </div>
    `;

    const body = {
        name: 'July Rescue - Meeting Request Focus - FINAL',
        subject: '{{contact.COMPANY}} — USMCA Audit Call?',
        sender: { name: 'Nearshore Navigator', email: 'nearshore.navigator@gmail.com' },
        type: 'classic',
        htmlContent,
        recipients: { lists: [LIST_ID] }
    };

    console.log('📡 Sending Request to Brevo...');
    const res = await fetch('https://api.brevo.com/v3/emailCampaigns', {
        method: 'POST',
        headers: { 
            'api-key': BREVO_API_KEY!, 
            'Content-Type': 'application/json',
            'Accept': 'application/json' 
        },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    console.log('Response Status:', res.status);
    console.log('Response Body:', JSON.stringify(data, null, 2));

    if (data.id) {
        console.log(`🚀 Campaign Created! ID: ${data.id}`);
        // Send Now
        const sendRes = await fetch(`https://api.brevo.com/v3/emailCampaigns/${data.id}/sendNow`, {
            method: 'POST',
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });
        console.log('Send Response:', sendRes.status);
    }
}

debug();
