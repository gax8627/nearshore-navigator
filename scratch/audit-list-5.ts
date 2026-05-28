
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function audit() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;

    try {
        const res = await fetch('https://api.brevo.com/v3/contacts/lists/5/contacts', {
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });
        const data = await res.json();
        
        console.log(`Total Contacts in List 5: ${data.contacts?.length || 0}`);
        if (data.contacts?.length > 0) {
            console.log('Sample Email:', data.contacts[0].email);
        }

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

audit();
