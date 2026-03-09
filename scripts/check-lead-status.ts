
import { db } from '../lib/db';
import { leads } from '../lib/db/schema';
import { eq, or } from 'drizzle-orm';

async function checkLeads() {
  try {
    console.log('--- Checking Hot Lead Status ---');
    const priorityEmails = ['jtreace@treace.net', 'alovett@treace.net', 'nathan.berg@medela.com', 'tim.powers@medela.com'];
    
    const results = await db.select()
      .from(leads)
      .where(or(...priorityEmails.map(email => eq(leads.email, email))));
    
    if (results.length === 0) {
      console.log('No leads found for priority emails.');
    } else {
      results.forEach(lead => {
        console.log(`Email: ${lead.email} | Status: ${lead.status} | Company: ${lead.company}`);
      });
    }

    console.log('\n--- Checking for ANY meeting_booked leads ---');
    const bookedLeads = await db.select()
      .from(leads)
      .where(eq(leads.status, 'meeting_booked'));
    
    console.log(`Total meeting_booked: ${bookedLeads.length}`);
    bookedLeads.forEach(lead => {
      console.log(`Booked: ${lead.email} (${lead.company})`);
    });

  } catch (error) {
    console.error('Error querying leads:', error);
  } finally {
    process.exit(0);
  }
}

checkLeads();
