import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3';

async function main() {
  if (!BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not set');
    return;
  }

  console.log('🔍 Fetching webhooks from Brevo...');
  try {
    const response = await fetch(`${BREVO_API_URL}/webhooks`, {
      method: 'GET',
      headers: {
        'api-key': BREVO_API_KEY,
        'Accept': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('❌ Failed to fetch webhooks:', data);
      return;
    }

    if (data.webhooks && data.webhooks.length > 0) {
      console.log(`\nFound ${data.webhooks.length} webhook(s):`);
      data.webhooks.forEach((w: any) => {
        console.log(` - URL: ${w.url}`);
        console.log(`   Type: ${w.type} | Associated to: ${w.associatedFor}`);
        console.log(`   Events: ${w.events.join(', ')}`);
        console.log(`   Status: ${w.status}`);
      });
    } else {
      console.log('ℹ️ No webhooks found in Brevo.');
    }
  } catch (err: any) {
    console.error('Error:', err.message);
  }
}

main();
