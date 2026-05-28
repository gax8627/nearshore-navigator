
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function getCampaignReport() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const campaignId = 9; 

    console.log(`📊 Fetching report for campaign ${campaignId}...`);

    try {
        const response = await fetch(`https://api.brevo.com/v3/emailCampaigns/${campaignId}`, {
            method: 'GET',
            headers: {
                'api-key': BREVO_API_KEY!,
                'Accept': 'application/json',
            },
        });

        const data = await response.json();
        console.log('DEBUG: RAW DATA', JSON.stringify(data, null, 2));

        if (!response.ok) {
            throw new Error(`Report Error: ${JSON.stringify(data)}`);
        }

        console.log('\n───────────────────────────────────────');
        console.log(`📈 CAMPAIGN REPORT: ${data.name}`);
        console.log(`📅 Status: ${data.status.toUpperCase()}`);
        console.log(`🕒 Scheduled: ${data.scheduledAt}`);
        console.log('───────────────────────────────────────');
        
        if (data.statistics) {
            const stats = data.statistics.globalStats;
            console.log(`📧 Total Sent:     ${stats.sent}`);
            console.log(`👁️  Opens:          ${stats.uniqueOpens} (${((stats.uniqueOpens / stats.sent) * 100).toFixed(2)}%)`);
            console.log(`🖱️  Clicks:         ${stats.uniqueClicks} (${((stats.uniqueClicks / stats.sent) * 100).toFixed(2)}%)`);
            console.log(`🚫 Bounces:        ${stats.softBounces + stats.hardBounces}`);
            console.log(`👋 Unsubscribes:   ${stats.unsubscriptions}`);
        } else {
            console.log('⚠️  No statistics available yet.');
        }
        console.log('───────────────────────────────────────\n');
    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

getCampaignReport();
