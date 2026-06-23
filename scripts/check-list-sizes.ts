import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
  const { brevo } = await import('../lib/brevo');
  console.log('📋 Fetching lists from Brevo...');
  try {
    const res = await brevo.getLists({ limit: 50 });
    if (res && res.lists) {
      console.log('----------------------------------------------------');
      console.log('ID    List Name                               Total Contacts');
      console.log('----------------------------------------------------');
      res.lists.forEach((l: any) => {
        console.log(`${l.id.toString().padEnd(5)} ${l.name.padEnd(40)} ${l.uniqueSubscribers}`);
      });
      console.log('----------------------------------------------------');
    } else {
      console.log('No lists found or error:', res);
    }
  } catch (e) {
    console.error('Error:', e);
  }
}

main().catch(console.error);
