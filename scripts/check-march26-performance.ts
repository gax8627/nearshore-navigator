import dotenv from 'dotenv';
import path from 'path';

// Load env FIRST
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
  const { brevo } = await import('../lib/brevo');

  const todayStr = new Date().toISOString().split('T')[0];
  console.log(`\n📊 BREVO PERFORMANCE AUDIT: ${todayStr} (8 AM Blast)`);
  console.log('───────────────────────────────────────');
  
  try {
    const events = await brevo.getEmailEvents({
      startDate: todayStr,
      endDate: todayStr,
      limit: 1000
    });
    
    if (events && events.events) {
      const delivered = events.events.filter((e: any) => e.event === 'delivered');
      const opened = events.events.filter((e: any) => e.event === 'opened');
      const clicks = events.events.filter((e: any) => e.event === 'clicks');
      const softBounces = events.events.filter((e: any) => e.event === 'softBounces');
      const hardBounces = events.events.filter((e: any) => e.event === 'hardBounces');

      console.log(`Results for ${todayStr}:`);
      console.log(` ✅ Delivered:   ${delivered.length}`);
      console.log(` 📧 Opened:      ${opened.length} (${delivered.length > 0 ? ((opened.length/delivered.length)*100).toFixed(1) : 0}%)`);
      console.log(` 🖱️ Clicks:      ${clicks.length} (${delivered.length > 0 ? ((clicks.length/delivered.length)*100).toFixed(1) : 0}%)`);
      console.log(` ⚠️ Bounces:     ${softBounces.length + hardBounces.length}`);

      if (clicks.length > 0) {
          console.log('\n🔥 TOP CLICKERS (Engaged Leads):');
          const clickers: Record<string, number> = {};
          clicks.forEach((e: any) => {
              clickers[e.email] = (clickers[e.email] || 0) + 1;
          });
          Object.entries(clickers)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .forEach(([email, count]) => console.log(` - ${email}: ${count} clicks`));
      } else if (delivered.length > 0) {
          console.log('\n📢 Campaign is live, but no clicks registered yet. Checking for opens...');
          const openers = [...new Set(opened.map((e: any) => e.email))];
          if (openers.length > 0) {
            console.log('\n👀 RECENT OPENERS:');
            openers.slice(0, 5).forEach(email => console.log(` - ${email}`));
          }
      } else {
          console.log('\n🟡 No deliveries found. The campaign might still be in the "Scheduled" queue or Brevo API is lagging.');
      }
    } else {
      console.log('No events found for today.');
    }
  } catch (e) {
    console.error('Error fetching from Brevo:', e);
  }
}

main();
