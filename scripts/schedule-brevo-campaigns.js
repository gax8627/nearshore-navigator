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

async function schedule() {
  // 9:00 AM PST (UTC-8) = 17:00 UTC
  // Date: 2026-03-03
  // Brevo expects ISO 8601 or YYYY-MM-DD HH:mm:ss for some endpoints, 
  // but for emailCampaigns/ID/status it expects a specific JSON.
  const scheduledAt = "2026-03-03T17:00:00.000Z";

  const campaigns = [7, 8];
  
  for (const id of campaigns) {
    console.log(`Scheduling campaign [${id}] for ${scheduledAt}...`);
    try {
      // 1. Update the campaign scheduledAt
      // According to Brevo API docs for Update an email campaign: PUT /emailCampaigns/{campaignId}
      await axios.put(`https://api.brevo.com/v3/emailCampaigns/${id}`, {
        scheduledAt: scheduledAt
      }, {
        headers: { 'api-key': apiKey, 'Content-Type': 'application/json' }
      });
      console.log(`✅ Campaign [${id}] scheduled successfully.`);
    } catch (e) {
      console.error(`❌ Failed to schedule [${id}]:`, e.response ? e.response.data : e.message);
    }
  }
}

schedule();
