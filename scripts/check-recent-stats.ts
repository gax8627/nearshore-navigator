import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
  const { brevo } = await import('../lib/brevo');

  console.log('📊 Fetching detailed campaign statistics from Brevo...');
  try {
    const res = await brevo.getCampaigns({ limit: 40 });
    if (res && res.campaigns) {
       // Filter and sort campaigns by ID descending
       const campaigns = res.campaigns
         .filter((c: any) => c.id >= 25)
         .sort((a: any, b: any) => b.id - a.id);

       console.log('------------------------------------------------------------------------------------------------------------------');
       console.log('ID   Name                                     Status    Sent   Delivered   Opens (%)      Clicks (%)     Bounces  Unsubs');
       console.log('------------------------------------------------------------------------------------------------------------------');

       campaigns.forEach((c: any) => {
         const stats = c.statistics || {};
         let sent = stats.sent || 0;
         let delivered = stats.delivered || 0;
         let uniqueOpens = stats.uniqueOpens || 0;
         let uniqueClicks = stats.uniqueClicks || 0;
         let hardBounces = stats.hardBounces || 0;
         let softBounces = stats.softBounces || 0;
         let bounces = hardBounces + softBounces;
         let unsubs = stats.unsubscribed || 0;

         // Check if we need to aggregate from campaignStats array
         if (stats.campaignStats && Array.isArray(stats.campaignStats)) {
           let csSent = 0, csDelivered = 0, csOpens = 0, csClicks = 0, csBounces = 0, csUnsubs = 0;
           stats.campaignStats.forEach((cs: any) => {
             csSent += cs.sent || 0;
             csDelivered += cs.delivered || 0;
             csOpens += cs.uniqueViews || 0;
             csClicks += cs.uniqueClicks || 0;
             csBounces += (cs.hardBounces || 0) + (cs.softBounces || 0);
             csUnsubs += cs.unsubscriptions || 0;
           });
           if (csSent > 0) {
             sent = csSent;
             delivered = csDelivered;
             uniqueOpens = csOpens;
             uniqueClicks = csClicks;
             bounces = csBounces;
             unsubs = csUnsubs;
           }
         }

         const openPct = delivered > 0 ? ((uniqueOpens / delivered) * 100).toFixed(1) : '0.0';
         const clickPct = delivered > 0 ? ((uniqueClicks / delivered) * 100).toFixed(1) : '0.0';

         const nameStr = c.name.padEnd(40).slice(0, 40);
         const statusStr = c.status.padEnd(8);
         const sentStr = sent.toString().padEnd(6);
         const delivStr = delivered.toString().padEnd(9);
         const openStr = `${uniqueOpens} (${openPct}%)`.padEnd(14);
         const clickStr = `${uniqueClicks} (${clickPct}%)`.padEnd(14);
         const bounceStr = `${bounces}`.padEnd(8);

         console.log(`[${c.id}] ${nameStr} ${statusStr} ${sentStr}  ${delivStr}  ${openStr}  ${clickStr}  ${bounceStr}  ${unsubs}`);
       });
       console.log('------------------------------------------------------------------------------------------------------------------');
    } else {
       console.log('No campaigns found or error:', res);
    }
  } catch (e) {
    console.error('API Error:', e);
  }
}

main().catch(console.error);
