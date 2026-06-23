import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
  const { brevo } = await import(path.join(process.cwd(), 'lib/brevo'));
  console.log('🔍 Fetching click and link statistics for campaigns >= 26...');

  try {
    const res = await brevo.getCampaigns({ limit: 20 });
    if (res && res.campaigns) {
      const campaigns = res.campaigns.filter((c: any) => c.id >= 26).sort((a: any, b: any) => b.id - a.id);
      campaigns.forEach((c: any) => {
        const stats = c.statistics || {};
        console.log(`\n======================================================`);
        console.log(`[Campaign ID: ${c.id}] Name: ${c.name} | Status: ${c.status}`);
        console.log(`Scheduled At: ${c.scheduledAt || c.sentDate || 'N/A'}`);
        
        let sent = stats.sent || 0;
        let delivered = stats.delivered || 0;
        let uniqueOpens = stats.uniqueOpens || 0;
        let uniqueClicks = stats.uniqueClicks || 0;
        let hardBounces = stats.hardBounces || 0;
        let softBounces = stats.softBounces || 0;

        if (stats.campaignStats && Array.isArray(stats.campaignStats)) {
          let csSent = 0, csDelivered = 0, csOpens = 0, csClicks = 0, csHB = 0, csSB = 0;
          stats.campaignStats.forEach((cs: any) => {
            csSent += cs.sent || 0;
            csDelivered += cs.delivered || 0;
            csOpens += cs.uniqueViews || 0;
            csClicks += cs.uniqueClicks || 0;
            csHB += cs.hardBounces || 0;
            csSB += cs.softBounces || 0;
          });
          if (csSent > 0) {
            sent = csSent;
            delivered = csDelivered;
            uniqueOpens = csOpens;
            uniqueClicks = csClicks;
            hardBounces = csHB;
            softBounces = csSB;
          }
        }

        console.log(`Sent: ${sent} | Delivered: ${delivered} | Bounces: ${hardBounces + softBounces} (${hardBounces} hard, ${softBounces} soft)`);
        console.log(`Unique Opens (Views): ${uniqueOpens} | Unique Clicks: ${uniqueClicks}`);
        
        if (stats.linksStats) {
          console.log('Links Clicked:');
          Object.entries(stats.linksStats).forEach(([link, count]) => {
            console.log(`  - ${link}: ${count} click(s)`);
          });
        }
      });
    }
  } catch (err: any) {
    console.error('Error:', err.message);
  }
}

main().catch(console.error);
