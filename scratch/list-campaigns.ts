
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function listCampaigns() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;

    console.log(`🔍 Listing all Brevo email campaigns...`);

    try {
        const response = await fetch(`https://api.brevo.com/v3/emailCampaigns?limit=20&status=sent`, {
            method: 'GET',
            headers: {
                'api-key': BREVO_API_KEY!,
                'Accept': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Error: ${JSON.stringify(data)}`);
        }

        console.log('\n───────────────────────────────────────');
        console.log(`📧 RECENT SENT CAMPAIGNS`);
        console.log('───────────────────────────────────────');
        
        if (data.campaigns) {
            data.campaigns.forEach((c: any) => {
                console.log(`ID: ${c.id.toString().padEnd(5)} | Name: ${c.name.padEnd(40)} | Sent: ${c.statistics.globalStats.sent.toString().padStart(6)} | Date: ${c.scheduledAt}`);
            });
        } else {
            console.log('No campaigns found.');
        }
        console.log('───────────────────────────────────────\n');
    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

listCampaigns();
