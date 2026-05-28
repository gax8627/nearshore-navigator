
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function listSent() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;

    try {
        const res = await fetch('https://api.brevo.com/v3/emailCampaigns?status=sent', {
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });
        const data = await res.json();
        
        console.log('--- SENT CAMPAIGNS ---');
        data.campaigns.forEach((c: any) => {
            console.log(`ID: ${c.id} | Name: ${c.name} | Sent: ${c.statistics?.globalStats?.sent || 0}`);
        });

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

listSent();
