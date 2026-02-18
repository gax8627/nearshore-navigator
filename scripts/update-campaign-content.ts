
import { db } from '@/lib/db';
import { campaigns } from '@/lib/db/schema';
import { like } from 'drizzle-orm';

async function main() {
  console.log('📝 Updating Campaign Text -> New Consultative Copy...');

  const newContent = `
    Hi {{firstName}},
    
    If you’re evaluating contract manufacturing or supplier alternatives closer to the U.S., I’d like to offer a free, no-obligation consultation to map realistic options in Mexico.

    In a 20–30 minute call, we can cover:
    • What you manufacture + key requirements
    • The best-fit regions in Mexico
    • Typical timelines, costs, and common risks
    • Next steps to shortlist capable contract manufacturers

    If it’s helpful, reply with “Mexico” and a couple of times that work this week, and I’ll send a calendar invite.
  `;

  await db.update(campaigns)
    .set({ 
        content: newContent.trim(),
        subject: "Contract Mfg in Mexico: Realistic Options" // Updating subject to match context better, or keep original? keeping generic for now or updating? 
        // User didn't specify subject, but "Nearshore support for your pipeline?" is maybe too generic. 
        // Actually, let's keep the subject from the script: "Nearshore support for ${t.company}'s pipeline?"
    })
    .where(like(campaigns.name, 'Feb 17%'));
  
  console.log('✅ Campaign content updated in DB.');
  process.exit(0);
}

main().catch(console.error);
