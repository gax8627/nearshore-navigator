
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function checkAttributes() {
    const res = await fetch('https://api.brevo.com/v3/contacts?limit=5', {
        headers: { 'api-key': process.env.BREVO_API_KEY!, 'Accept': 'application/json' }
    });
    const data = await res.json();
    console.log(JSON.stringify(data.contacts, null, 2));
}
checkAttributes();
