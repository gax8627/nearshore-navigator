import { brevo } from '../../lib/brevo';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function checkBrevoLogs() {
  console.log("🔍 Fetching email events from Brevo API...");
  try {
    const events = await brevo.getEmailEvents({ limit: 10 });
    console.log(JSON.stringify(events, null, 2));
  } catch (error) {
    console.error("❌ Failed to fetch Brevo events:", error);
  }
}

checkBrevoLogs().catch(console.error);
