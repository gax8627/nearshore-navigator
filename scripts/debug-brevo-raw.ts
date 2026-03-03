import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
  const { brevo } = await import(path.join(process.cwd(), 'lib/brevo.ts'));
  const today = new Date().toISOString().split('T')[0];
  
  console.log(`Dumping raw email events for: ${today}`);
  
  try {
    const data = await brevo.getEmailEvents({
      startDate: today,
      endDate: today,
      limit: 100
    });
    
    if (data && data.events) {
      console.log(`Found ${data.events.length} events.`);
      // Extract unique event types
      const types = [...new Set(data.events.map((e: any) => e.event))];
      console.log('Event types present:', types);
      
      // Dump first 5 events
      console.log('First 5 events:', JSON.stringify(data.events.slice(0, 5), null, 2));
      
      // Count all events
      const counts: Record<string, number> = {};
      data.events.forEach((e: any) => {
        counts[e.event] = (counts[e.event] || 0) + 1;
      });
      console.log('Event counts:', counts);
    } else {
      console.log('Full API Response:', JSON.stringify(data, null, 2));
    }
  } catch (e) {
    console.error('Error:', e);
  }
}

main();
