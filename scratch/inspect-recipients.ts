
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function inspectCampaignRecipients() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;

    try {
        const res = await fetch('https://api.brevo.com/v3/emailCampaigns/11', {
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });
        const data = await res.json();
        
        console.log('Campaign 11 Recipients JSON:', JSON.stringify(data.recipients, null, 2));

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

inspectCampaignRecipients();
