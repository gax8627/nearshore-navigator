
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function listAll() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    try {
        const res = await fetch('https://api.brevo.com/v3/emailCampaigns?limit=10', {
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });
        const data = await res.json();
        data.campaigns.forEach((c: any) => {
            console.log(`ID: ${c.id} | Name: ${c.name} | Status: ${c.status}`);
        });
    } catch (e: any) {
        console.error(e.message);
    }
}
listAll();
