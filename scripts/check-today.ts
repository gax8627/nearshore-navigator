import dotenv from 'dotenv';
import path from 'path';

// Load env FIRST
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
dotenv.config({ path: path.join(process.cwd(), '.env') }); // fallback

async function main() {
  const { brevo } = await import('../lib/brevo');

  const today = new Date().toISOString().split('T')[0];
  console.log(`Checking email events for today: ${today}`);
  
  try {
    const events = await brevo.getEmailEvents({
      startDate: today,
      endDate: today,
      limit: 1000
    });
    
    if (events && events.events) {
      const delivered = events.events.filter((e: any) => e.event === 'delivered');
      const opened = events.events.filter((e: any) => e.event === 'opened');
      const clicks = events.events.filter((e: any) => e.event === 'clicks');
      const deferred = events.events.filter((e: any) => e.event === 'deferred');
      console.log(`Today's stats from Brevo API:`);
      console.log(`  Delivered: ${delivered.length}`);
      console.log(`  Opened:    ${opened.length}`);
      console.log(`  Clicks:    ${clicks.length}`);
      console.log(`  Deferred:  ${deferred.length}`);
    } else {
      console.log('No events found or error fetching:', events);
    }
  } catch (e) {
    console.error('Error fetching from Brevo:', e);
  }
}

main();
