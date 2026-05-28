
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function sendCampaign() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const CAMPAIGN_ID = 10;

    console.log(`🚀 TRIGGERING CAMPAIGN ID ${CAMPAIGN_ID} NOW...`);

    try {
        const response = await fetch(`https://api.brevo.com/v3/emailCampaigns/${CAMPAIGN_ID}/sendNow`, {
            method: 'POST',
            headers: { 
                'api-key': BREVO_API_KEY!, 
                'Accept': 'application/json' 
            }
        });

        if (response.ok) {
            console.log(`✅ Campaign ${CAMPAIGN_ID} successfully triggered for immediate delivery.`);
        } else {
            const data = await response.json();
            console.error(`❌ Failed to trigger campaign:`, JSON.stringify(data, null, 2));
        }

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

sendCampaign();
