
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function checkTotal() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    try {
        const response = await fetch(`https://api.brevo.com/v3/contacts?limit=1`, {
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });
        const data = await response.json();
        console.log('Total Contacts:', data.count);
    } catch (e) {
        console.error(e);
    }
}

checkTotal();
