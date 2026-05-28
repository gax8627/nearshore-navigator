
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function findSentEmails() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_API_URL = 'https://api.brevo.com/v3';

    console.log(`🕵️ Searching for any sent emails on 2026-05-04...`);

    try {
        // 1. Check all campaigns sent today
        const campaignRes = await fetch(`${BREVO_API_URL}/emailCampaigns?status=sent&startDate=2026-05-04T00:00:00.000Z&endDate=2026-05-04T23:59:59.000Z`, {
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });
        const campaignData = await campaignRes.json();
        console.log('\n--- CAMPAIGNS ---');
        console.log(JSON.stringify(campaignData, null, 2));

        // 2. Check general SMTP statistics for the day
        const statsRes = await fetch(`${BREVO_API_URL}/smtp/statistics/reports?startDate=2026-05-04&endDate=2026-05-04`, {
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });
        const statsData = await statsRes.json();
        console.log('\n--- SMTP STATS (OVERALL) ---');
        console.log(JSON.stringify(statsData, null, 2));

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

findSentEmails();
