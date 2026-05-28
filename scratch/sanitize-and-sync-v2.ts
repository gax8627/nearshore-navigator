
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

function isValidEmail(email: string) {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

async function sanitizeAndSync() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const TARGET_LIST_ID = 5;

    try {
        console.log('🔍 Fetching all contacts from Brevo...');
        let allContacts: any[] = [];
        let offset = 0;
        let limit = 500;
        while (true) {
            const res = await fetch(`https://api.brevo.com/v3/contacts?limit=${limit}&offset=${offset}`, {
                headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
            });
            const data = await res.json();
            if (!data.contacts || data.contacts.length === 0) break;
            allContacts.push(...data.contacts);
            offset += limit;
            if (allContacts.length >= data.count) break;
        }

        console.log(`✅ Fetched ${allContacts.length} total contacts.`);

        // 2. Filter for valid and unique emails
        const validEmails = allContacts
            .filter(c => c && c.email && isValidEmail(c.email))
            .map(c => c.email.trim().toLowerCase());

        const uniqueEmails = Array.from(new Set(validEmails));
        console.log(`🎯 Found ${uniqueEmails.length} valid unique emails.`);

        // 3. Bulk Add to List 5
        console.log(`📥 Syncing to List ${TARGET_LIST_ID}...`);
        const chunkSize = 100;
        for (let i = 0; i < uniqueEmails.length; i += chunkSize) {
            const chunk = uniqueEmails.slice(i, i + chunkSize);
            console.log(`   - Processing chunk ${Math.floor(i / chunkSize) + 1}...`);
            
            const addRes = await fetch(`https://api.brevo.com/v3/contacts/lists/${TARGET_LIST_ID}/contacts/add`, {
                method: 'POST',
                headers: { 
                    'api-key': BREVO_API_KEY!, 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' 
                },
                body: JSON.stringify({ emails: chunk })
            });

            if (!addRes.ok) {
                const err = await addRes.json();
                console.error(`   ❌ Chunk Failed:`, err);
            }
        }

        console.log('🏁 Final Sync Complete.');

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

sanitizeAndSync();
