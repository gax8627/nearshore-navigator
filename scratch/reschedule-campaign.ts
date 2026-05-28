
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function reschedule() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const campaignId = 9; 
    
    // Target: Monday, May 4th at 8:00 AM Pacific (PDT, which is UTC-7)
    // 8:00 AM PDT = 15:00 UTC
    const newDateISO = "2026-05-04T15:00:00.000Z"; 

    console.log(`⏳ Rescheduling campaign ${campaignId} to ${newDateISO}...`);

    try {
        const response = await fetch(`https://api.brevo.com/v3/emailCampaigns/${campaignId}`, {
            method: 'PUT',
            headers: {
                'api-key': BREVO_API_KEY!,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                scheduledAt: newDateISO
            }),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(`Reschedule Error: ${JSON.stringify(data)}`);
        }

        console.log('✅ Campaign successfully rescheduled for Monday 8:00 AM PDT!');
    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

reschedule();
