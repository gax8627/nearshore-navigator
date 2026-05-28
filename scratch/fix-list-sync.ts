
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function fixSync() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const TARGET_LIST_ID = 5;

    console.log('🔍 Auditing all contacts in Brevo...');

    try {
        // 1. Get all contacts (paged)
        let allEmails: string[] = [];
        let offset = 0;
        let limit = 500;
        
        while (true) {
            const res = await fetch(`https://api.brevo.com/v3/contacts?limit=${limit}&offset=${offset}`, {
                headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
            });
            const data = await res.json();
            if (!data.contacts || data.contacts.length === 0) break;
            
            allEmails.push(...data.contacts.map((c: any) => c.email));
            offset += limit;
            if (allEmails.length >= data.count) break;
        }

        console.log(`✅ Found ${allEmails.length} global contacts.`);

        // 2. Add ALL to List 5 (Bulk)
        console.log(`📥 Adding ${allEmails.length} contacts to List ${TARGET_LIST_ID}...`);
        
        // Brevo Bulk Add to List endpoint
        const addRes = await fetch(`https://api.brevo.com/v3/contacts/lists/${TARGET_LIST_ID}/contacts/add`, {
            method: 'POST',
            headers: { 
                'api-key': BREVO_API_KEY!, 
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify({ emails: allEmails })
        });

        if (addRes.ok) {
            console.log('✅ Bulk Sync Success.');
        } else {
            const err = await addRes.json();
            console.error('❌ Bulk Sync Failed:', err);
        }

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

fixSync();
