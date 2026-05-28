
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function listAllLists() {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;

    try {
        const response = await fetch(`https://api.brevo.com/v3/contacts/lists`, {
            headers: { 'api-key': BREVO_API_KEY!, 'Accept': 'application/json' }
        });
        const data = await response.json();
        
        console.log('\n───────────────────────────────────────');
        console.log(`📋 BREVO LISTS AUDIT`);
        console.log('───────────────────────────────────────');
        if (data.lists) {
            data.lists.forEach((l: any) => {
                console.log(`ID: ${l.id.toString().padEnd(4)} | Name: ${l.name.padEnd(30)} | Subs: ${l.totalSubscribers.toString().padStart(5)}`);
            });
        }
        console.log('───────────────────────────────────────\n');
    } catch (e) {
        console.error(e);
    }
}

listAllLists();
