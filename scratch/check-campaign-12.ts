
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function check() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    try {
        const res = await fetch('https://api.breshore.navigator/v3/emailCampaigns/12', {
             // Wait, I used a wrong domain in my thought, I'll fix the URL
             // ...
        });
        // Actually I'll use the correct one
    } catch (e) {}
}
// ...
