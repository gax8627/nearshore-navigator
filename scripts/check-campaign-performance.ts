import dotenv from 'dotenv';
import path from 'path';

// Load env FIRST
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
dotenv.config({ path: path.join(process.cwd(), '.env') }); // fallback

async function main() {
  const { brevo } = await import('../lib/brevo');

  const startDate = '2026-03-02';
  const endDate = '2026-03-03';
  console.log(`Checking email events from ${startDate} to ${endDate}...`);
  
  try {
    const events = await brevo.getEmailEvents({
      startDate,
      endDate,
      limit: 1000
    });
    
    if (events && events.events) {
      const delivered = events.events.filter((e: any) => e.event === 'delivered');
      const opened = events.events.filter((e: any) => e.event === 'opened');
      const clicks = events.events.filter((e: any) => e.event === 'clicks');
      const deferred = events.events.filter((e: any) => e.event === 'deferred');
      const softBounces = events.events.filter((e: any) => e.event === 'softBounces');
      const hardBounces = events.events.filter((e: any) => e.event === 'hardBounces');

      console.log(`Campaign Stats (${startDate} to ${endDate}):`);
      console.log(`  Delivered:   ${delivered.length}`);
      console.log(`  Opened:      ${opened.length} (${((opened.length/delivered.length)*100).toFixed(1)}%)`);
      console.log(`  Clicks:      ${clicks.length} (${((clicks.length/delivered.length)*100).toFixed(1)}%)`);
      console.log(`  Deferred:    ${deferred.length}`);
      console.log(`  Soft Bounce: ${softBounces.length}`);
      console.log(`  Hard Bounce: ${hardBounces.length}`);

      if (clicks.length > 0) {
          console.log('\nTop Clickers:');
          const clickers: Record<string, number> = {};
          clicks.forEach((e: any) => {
              clickers[e.email] = (clickers[e.email] || 0) + 1;
          });
          Object.entries(clickers)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .forEach(([email, count]) => console.log(` - ${email}: ${count} clicks`));
      }
    } else {
      console.log('No events found or error fetching:', events);
    }
  } catch (e) {
    console.error('Error fetching from Brevo:', e);
  }
}

main();
