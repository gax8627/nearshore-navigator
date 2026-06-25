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

  const webhookId = 2053497;
  const webhookUrl = 'https://nearshorenavigator.com/api/webhooks/brevo';
  console.log(`🌐 Updating webhook ID ${webhookId} to listen for all deliverability and click events...`);

  try {
    const response = await fetch(`${BREVO_API_URL}/webhooks/${webhookId}`, {
      method: 'PUT',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        events: ['opened', 'click', 'hardBounce', 'softBounce', 'unsubscribed', 'spam'],
        description: 'App webhook for email opens, clicks, unsubscribes, spam, and bounces'
      })
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      console.error('❌ Failed to update webhook:', data);
      return;
    }

    console.log('✅ Webhook successfully updated in Brevo!');
  } catch (err: any) {
    console.error('Error:', err.message);
  }
}

main();
