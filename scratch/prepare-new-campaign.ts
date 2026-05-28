
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function prepareNewCampaign() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const OLD_CAMPAIGN_ID = 9;
    const LIST_ID = 5;

    console.log(`🔄 Duplicating Campaign ${OLD_CAMPAIGN_ID} for re-launch...`);

    try {
        // 1. Fetch old campaign details
        const res = await fetch(`https://api.brevo.com/v3/emailCampaigns/${OLD_CAMPAIGN_ID}`, {
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });
        const oldC = await res.json();

        if (!res.ok) throw new Error(`Failed to fetch campaign: ${JSON.stringify(oldC)}`);

        // 2. Create New Campaign
        console.log(`📝 Creating new campaign: "July Rescue Sequence - RE-LAUNCH"...`);
        const createRes = await fetch('https://api.brevo.com/v3/emailCampaigns', {
            method: 'POST',
            headers: { 
                'api-key': BREVO_API_KEY!, 
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify({
                name: `July Rescue Sequence - RE-LAUNCH (Fixed List)`,
                subject: oldC.subject || 'Strategic Expansion 2026: Baja / Mexicali Support',
                sender: { email: oldC.sender.email, name: oldC.sender.name },
                type: 'classic',
                recipients: { listIds: [LIST_ID] },
                htmlContent: oldC.htmlContent,
            })
        });

        const newC = await createRes.json();
        if (!createRes.ok) throw new Error(`Failed to create campaign: ${JSON.stringify(newC)}`);

        console.log('\n───────────────────────────────────────');
        console.log(`✅ CAMPAIGN READY (DRAFT)`);
        console.log(`   New ID: ${newC.id}`);
        console.log(`   List:   ID ${LIST_ID} (583 contacts)`);
        console.log('───────────────────────────────────────\n');

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

prepareNewCampaign();
