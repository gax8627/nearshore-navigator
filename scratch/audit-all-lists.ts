
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
    const res = await fetch('https://api.brevo.com/v3/contacts/lists?limit=50', {
        headers: { 'api-key': process.env.BREVO_API_KEY!, 'Accept': 'application/json' }
    });
    const data = await res.json();
    console.log('\nID   | Name                           | Subs');
    console.log('-----|--------------------------------|-----');
    data.lists.forEach((l: any) => {
        console.log(`${l.id.toString().padEnd(4)} | ${l.name.padEnd(30)} | ${l.totalSubscribers}`);
    });
}
main();
