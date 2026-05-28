
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function checkList() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const listId = 5;

    try {
        const response = await fetch(`https://api.brevo.com/v3/contacts/lists/${listId}`, {
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(e);
    }
}

checkList();
