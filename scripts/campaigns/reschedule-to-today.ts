import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// Helper to format ISO date with dynamic local offset for Brevo scheduling
function getScheduledTime(): string {
  const date = new Date(Date.now() + 5 * 60 * 1000); // 5 mins from now
  const pad = (num: number) => String(num).padStart(2, '0');
  
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  
  const offsetMinutes = date.getTimezoneOffset();
  const offsetSign = offsetMinutes > 0 ? '-' : '+';
  const offsetHours = pad(Math.floor(Math.abs(offsetMinutes) / 60));
  const offsetMins = pad(Math.abs(offsetMinutes) % 60);
  
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMins}`;
}

const CAMPAIGNS = [32, 33, 34, 35, 36, 37];

async function main() {
  const { brevo } = await import('../../lib/brevo');
  
  const newTime = getScheduledTime();
  console.log(`⏰ Rescheduling campaigns to dispatch today at: ${newTime}\n`);

  for (const id of CAMPAIGNS) {
    try {
      console.log(`Rescheduling campaign ${id}...`);
      await brevo.updateCampaign(id, { scheduledAt: newTime });
      console.log(`✅ Campaign ${id} successfully rescheduled.`);
    } catch (err: any) {
      console.error(`❌ Failed to reschedule campaign ${id}:`, err.message);
    }
  }

  console.log('\n🎉 Rescheduling run completed.');
}

main().catch(console.error);
