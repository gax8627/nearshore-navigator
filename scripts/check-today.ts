import dotenv from 'dotenv';
import path from 'path';

// Load env FIRST
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
dotenv.config({ path: path.join(process.cwd(), '.env') }); // fallback

async function main() {
  const { brevo } = await import(path.join(process.cwd(), 'lib/brevo.ts'));

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
      const clicks = (events.events as any[]).filter((e: any) => e.event === 'clicks');
      const uniqueClickers = Array.from(new Set(clicks.map((e: any) => e.email)));

      console.log(`Today's stats from Brevo API:`);
      console.log(`  Delivered: ${delivered.length}`);
      console.log(`  Opened:    ${opened.length}`);
      console.log(`  Clicks:    ${clicks.length} (Total events)`);
      console.log(`  Clickers:  ${uniqueClickers.length} (Unique individuals)`);
      
      if (uniqueClickers.length > 0) {
        console.log('\n🎯 HIGH-INTENT CLICKERS:');
        uniqueClickers.forEach((email: string) => {
            const count = clicks.filter((e: any) => e.email === email).length;
            console.log(`  - ${email} (${count} clicks)`);
        });
      }
    } else {
      console.log('No events found or error fetching:', events);
    }
  } catch (e) {
    console.error('Error fetching from Brevo:', e);
  }
}

main();
