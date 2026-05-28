
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function check() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    try {
        const res = await fetch('https://api.brevo.com/v3/account', {
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });
        const data = await res.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (e: any) {
        console.error(e.message);
    }
}
check();
