import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3';

if (!BREVO_API_KEY) {
  console.error('❌ BREVO_API_KEY not set in .env.local');
  process.exit(1);
}

async function main() {
  console.log(`📊 Fetching today's campaign report from Brevo...\n`);

  try {
    const response = await fetch(`${BREVO_API_URL}/emailCampaigns?limit=20&status=sent`, {
      method: 'GET',
      headers: {
        'api-key': BREVO_API_KEY as string,
        'Accept': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok || !data.campaigns) {
      console.error('❌ Failed to fetch campaigns from Brevo:', data);
      return;
    }

    // Filter to find our USMCA Week 1 campaigns (IDs 26, 27, 28, 29, 30)
    const targetIds = [26, 27, 28, 29, 30];
    const campaigns = data.campaigns.filter((c: any) => targetIds.includes(c.id) || c.name.includes('USMCA-Week1'));

    if (campaigns.length === 0) {
      console.log('ℹ️ No USMCA Week 1 sent campaigns found. Checking all recent campaigns...');
      data.campaigns.slice(0, 5).forEach((c: any) => {
        console.log(` - [${c.id}] ${c.name} | Status: ${c.status} | Sent: ${c.statistics?.sent || 0}`);
      });
      return;
    }

    let totalSent = 0;
    let totalOpens = 0;
    let totalClicks = 0;
    let totalBounces = 0;
    let totalUnsubs = 0;

    console.log('---------------------------------------------------------------------------------------------------');
    console.log('ID   Name                             Status   Sent   Unique Opens   Unique Clicks  Bounces  Unsubs');
    console.log('---------------------------------------------------------------------------------------------------');

    campaigns.forEach((c: any) => {
      const stats = c.statistics || {};
      let sent = stats.sent || 0;
      let opens = stats.uniqueOpens || 0;
      let clicks = stats.uniqueClicks || 0;
      let bounces = (stats.hardBounces || 0) + (stats.softBounces || 0);
      let unsubs = stats.unsubscribed || 0;

      // Aggregate stats from campaignStats list array if available
      if (stats.campaignStats && Array.isArray(stats.campaignStats)) {
        let csSent = 0, csOpens = 0, csClicks = 0, csBounces = 0, csUnsubs = 0;
        stats.campaignStats.forEach((cs: any) => {
          csSent += cs.sent || 0;
          csOpens += cs.uniqueViews || 0;
          csClicks += cs.uniqueClicks || 0;
          csBounces += (cs.hardBounces || 0) + (cs.softBounces || 0);
          csUnsubs += cs.unsubscriptions || 0;
        });
        if (csSent > 0) {
          sent = csSent;
          opens = csOpens;
          clicks = csClicks;
          bounces = csBounces;
          unsubs = csUnsubs;
        }
      }

      totalSent += sent;
      totalOpens += opens;
      totalClicks += clicks;
      totalBounces += bounces;
      totalUnsubs += unsubs;

      const nameCol = c.name.padEnd(32).slice(0, 32);
      const statusCol = c.status.padEnd(8);
      const sentCol = sent.toString().padEnd(6);
      const openPct = sent > 0 ? ((opens / sent) * 100).toFixed(1) : '0.0';
      const clickPct = sent > 0 ? ((clicks / sent) * 100).toFixed(1) : '0.0';
      
      console.log(
        `[${c.id}] ${nameCol} ${statusCol} ${sentCol} ` +
        `${opens.toString().padEnd(4)} (${openPct}%)   ` +
        `${clicks.toString().padEnd(4)} (${clickPct}%)  ` +
        `${bounces.toString().padEnd(7)}  ` +
        `${unsubs}`
      );
    });

    console.log('---------------------------------------------------------------------------------------------------');
    const totalOpenPct = totalSent > 0 ? ((totalOpens / totalSent) * 100).toFixed(1) : '0.0';
    const totalClickPct = totalSent > 0 ? ((totalClicks / totalSent) * 100).toFixed(1) : '0.0';
    const totalBouncePct = totalSent > 0 ? ((totalBounces / totalSent) * 100).toFixed(1) : '0.0';
    
    console.log(
      `SUM  Total                            -        ${totalSent.toString().padEnd(6)} ` +
      `${totalOpens.toString().padEnd(4)} (${totalOpenPct}%)   ` +
      `${totalClicks.toString().padEnd(4)} (${totalClickPct}%)  ` +
      `${totalBounces.toString().padEnd(7)} (${totalBouncePct}%) ` +
      `${totalUnsubs}`
    );
    console.log('---------------------------------------------------------------------------------------------------');

  } catch (err: any) {
    console.error('❌ Error executing report script:', err.message);
  }
}

main().catch(console.error);
