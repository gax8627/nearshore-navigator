
import { brevo } from '../lib/brevo';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function checkStatus() {
    console.log('📊 Fetching latest email events from Brevo...');
    try {
        const events = await brevo.getEmailEvents({ limit: 10 });
        console.log('\n--- Latest 10 Email Events ---');
        console.log(JSON.stringify(events, null, 2));

        const campaigns = await brevo.getCampaigns({ limit: 5 });
        console.log('\n--- Recent Campaigns ---');
        console.log(JSON.stringify(campaigns, null, 2));
    } catch (error: any) {
        console.error('❌ Error fetching status:', error.message);
    }
}

checkStatus();
