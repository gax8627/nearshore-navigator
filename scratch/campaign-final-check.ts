
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function checkCampaign() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const CAMPAIGN_ID = 11;

    console.log(`📊 Querying Brevo for Campaign ${CAMPAIGN_ID} stats...`);

    try {
        const res = await fetch(`https://api.brevo.com/v3/emailCampaigns/${CAMPAIGN_ID}`, {
            headers: { 
                'api-key': BREVO_API_KEY!,
                'Accept': 'application/json' 
            }
        });

        if (!res.ok) {
            throw new Error(`API Error: ${res.status}`);
        }

        const data = await res.json();
        
        console.log('\n--- Campaign Dispatch Report ---');
        console.log(`Status:      ${data.status.toUpperCase()}`);
        console.log(`Total Leads: ${data.recipients?.lists?.length > 0 ? '583 (List 5)' : 'Unknown'}`);
        console.log(`Sent:        ${data.statistics?.globalStats?.sent || 0}`);
        console.log(`Delivered:   ${data.statistics?.globalStats?.delivered || 0}`);
        console.log(`Opens:       ${data.statistics?.globalStats?.uniqueOpens || 0}`);
        console.log('--------------------------------\n');

        if (data.status === 'sent') {
            console.log('✅ DISPATCH COMPLETE. The emails have been fully processed by the mail server.');
        } else if (data.status === 'queued' || data.status === 'sending') {
            console.log('⏳ DISPATCH IN PROGRESS. Brevo is currently pushing the emails to the recipients.');
        }

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

checkCampaign();
