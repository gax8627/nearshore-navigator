const axios = require('axios');
const path = require('path');
const fs = require('fs');

// Load API Key manually from .env.local
const envPath = path.join(process.cwd(), '.env.local');
let apiKey = '';
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf-8');
  const match = content.match(/^BREVO_API_KEY=(.*)$/m);
  if (match) apiKey = match[1].trim().replace(/^"|"$/g, '');
}

if (!apiKey) {
  console.error('No BREVO_API_KEY found');
  process.exit(1);
}

async function check() {
  console.log('--- Brevo Campaigns (Last 10) ---');
  try {
    const res = await axios.get('https://api.brevo.com/v3/emailCampaigns?limit=10', {
      headers: { 'api-key': apiKey }
    });
    
    if (res.data && res.data.campaigns) {
       res.data.campaigns.forEach((c) => {
         console.log(`[${c.id}] ${c.name} - Status: ${c.status} - Scheduled: ${c.scheduledAt || 'N/A'}`);
       });
    } else {
       console.log('No campaigns found:', res.data);
    }
  } catch (e) {
    console.error('API Error:', e.response ? e.response.data : e.message);
  }
}

check();
