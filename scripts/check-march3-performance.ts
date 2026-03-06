import dotenv from 'dotenv';
import path from 'path';

// Load env FIRST
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
  const { brevo } = await import(path.join(process.cwd(), 'lib/brevo.ts'));

  const date = '2026-03-03';
  console.log(`Checking email events for ${date}...`);
  
  try {
    const events = await brevo.getEmailEvents({
      startDate: date,
      endDate: date,
      limit: 1000
    });
    
    if (events && events.events) {
      const delivered = events.events.filter((e: any) => e.event === 'delivered');
      const opened = events.events.filter((e: any) => e.event === 'opened');
      const clicks = events.events.filter((e: any) => e.event === 'clicks');
      
      console.log(`\nGlobal Stats for ${date}:`);
      console.log(`  Delivered:   ${delivered.length}`);
      console.log(`  Opened:      ${opened.length}`);
      console.log(`  Clicks:      ${clicks.length}`);

      // Filter by subject to distinguish campaigns if possible
      const mediaEvents = events.events.filter((e: any) => e.subject?.toLowerCase().includes('media') || e.subject?.toLowerCase().includes('press'));
      const assocEvents = events.events.filter((e: any) => e.subject?.toLowerCase().includes('association') || e.subject?.toLowerCase().includes('partnership'));

      console.log(`\nMedia Pitches Breakdown:`);
      console.log(`  Delivered: ${mediaEvents.filter((e: any) => e.event === 'delivered').length}`);
      console.log(`  Opened:    ${mediaEvents.filter((e: any) => e.event === 'opened').length}`);
      
      console.log(`\nAssociation Outreach Breakdown:`);
      console.log(`  Delivered: ${assocEvents.filter((e: any) => e.event === 'delivered').length}`);
      console.log(`  Opened:    ${assocEvents.filter((e: any) => e.event === 'opened').length}`);
      
    } else {
      console.log('No events found for March 3rd.');
    }
  } catch (e) {
    console.error('Error fetching from Brevo:', e);
  }
}

main();
