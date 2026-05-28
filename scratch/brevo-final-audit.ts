
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function finalAudit() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;

    try {
        // 1. Check List 5
        const listRes = await fetch('https://api.brevo.com/v3/contacts/lists/5', {
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });
        const listData = await listRes.json();
        console.log(`📋 List 5 Contacts: ${listData.uniqueContacts}`);

        // 2. Check Campaign 11
        const campRes = await fetch('https://api.brevo.com/v3/emailCampaigns/11', {
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });
        const campData = await campRes.json();
        console.log(`📧 Campaign 11 Status: ${campData.status}`);
        console.log(`📊 Statistics:`, campData.statistics?.globalStats);

        // 3. Check for any "suspension" or account issues
        const accountRes = await fetch('https://api.brevo.com/v3/account', {
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });
        const accountData = await accountRes.json();
        console.log(`👤 Account Status: ${accountData.plan?.[0]?.type || 'Active'}`);

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

finalAudit();
