import { brevo } from '../lib/brevo';

async function checkSenders() {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_API_URL = 'https://api.brevo.com/v3';

  const response = await fetch(`${BREVO_API_URL}/senders`, {
    method: 'GET',
    headers: {
      'api-key': BREVO_API_KEY as string,
      'Accept': 'application/json',
    },
  });

  const data = await response.json();
  console.log('Verified Senders:', JSON.stringify(data, null, 2));
}

checkSenders();
