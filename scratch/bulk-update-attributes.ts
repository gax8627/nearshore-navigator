
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function bulkUpdateBrevoData() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const SOURCE_FILE = 'segmented_leads/feb17/tier2_manufacturing.json';

    console.log(`🔍 Loading source data from ${SOURCE_FILE}...`);

    try {
        const allLeads = JSON.parse(fs.readFileSync(path.join(process.cwd(), SOURCE_FILE), 'utf-8'));
        
        // We only need to update the contacts we likely targeted (the first few hundreds)
        // To be safe, we'll update the first 1000 contacts found in the file
        const targetLeads = allLeads.slice(0, 1000);

        console.log(`📤 Updating ${targetLeads.length} contacts with missing attributes...`);

        const chunkSize = 50; // Smaller chunks for individual updates
        for (let i = 0; i < targetLeads.length; i += chunkSize) {
            const chunk = targetLeads.slice(i, i + chunkSize);
            console.log(`   - Processing chunk ${Math.floor(i / chunkSize) + 1}...`);

            await Promise.all(chunk.map(async (lead: any) => {
                if (!lead.email) return;

                // Brevo Update Contact endpoint
                const res = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(lead.email)}`, {
                    method: 'PUT',
                    headers: { 
                        'api-key': BREVO_API_KEY!, 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json' 
                    },
                    body: JSON.stringify({
                        attributes: {
                            FIRSTNAME: lead.firstName || '',
                            COMPANY: lead.company || '',
                            INDUSTRY: lead.industry || 'Manufacturing'
                        }
                    })
                });

                if (!res.ok && res.status !== 404) {
                    // console.warn(`   ⚠️ Failed to update ${lead.email}`);
                }
            }));
        }

        console.log('✅ Bulk update complete.');

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

bulkUpdateBrevoData();
