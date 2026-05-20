
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
  const { brevo } = await import(path.join(process.cwd(), 'lib/brevo.ts'));

  console.log('# 📊 EMAIL OUTREACH PERFORMANCE REPORT');
  console.log(`*Generated on: ${new Date().toLocaleString()}*\n`);

  try {
    // 1. Get recent campaigns
    console.log('## 🎯 Recent Campaign Metrics\n');
    const campaignsRes = await brevo.getCampaigns({ limit: 10 });
    
    if (campaignsRes && campaignsRes.campaigns) {
      console.log('| Campaign Name | Status | Sent | Delivered | Opens | Clicks | Bounce Rate |');
      console.log('|---------------|--------|------|-----------|-------|--------|-------------|');
      
      campaignsRes.campaigns.slice(0, 5).forEach((c: any) => {
        // Aggregate stats from campaignStats array
        const stats = c.statistics?.campaignStats?.[0] || {};
        const sent = stats.sent || 0;
        const delivered = stats.delivered || 0;
        const opens = stats.uniqueViews || 0;
        const clicks = stats.clickers || 0;
        const hardBounces = stats.hardBounces || 0;
        const softBounces = stats.softBounces || 0;
        const totalBounces = hardBounces + softBounces;
        const bounceRate = sent > 0 ? ((totalBounces / sent) * 100).toFixed(1) : '0.0';
        
        console.log(`| ${c.name} | ${c.status} | ${sent} | ${delivered} | ${opens} | ${clicks} | ${bounceRate}% |`);
      });
      console.log('\n');
      
      // Deliverability Alert
      const latestStats = campaignsRes.campaigns[0]?.statistics?.campaignStats?.[0] || {};
      if (latestStats.hardBounces > (latestStats.sent * 0.1)) {
        console.log('> [!CAUTION]');
        console.log('> **CRITICAL DELIVERABILITY ALERT:** The latest campaign has a hard bounce rate of over 10%. This indicates significant data decay or poor lead list quality, which risks permanent domain blacklisting.\n');
      }
    }

    // 2. Get recent events (last 7 days)
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    
    const startDate = sevenDaysAgo.toISOString().split('T')[0];
    const endDate = today.toISOString().split('T')[0];
    
    console.log(`## 📈 Aggregated Activity (Last 7 Days: ${startDate} to ${endDate})\n`);
    
    const eventsRes = await brevo.getEmailEvents({
      startDate,
      endDate,
      limit: 1000
    });

    if (eventsRes && eventsRes.events) {
      const events = eventsRes.events;
      const delivered = events.filter((e: any) => e.event === 'delivered');
      const opened = events.filter((e: any) => e.event === 'opened');
      const clicks = events.filter((e: any) => e.event === 'clicks');
      const unsubscribed = events.filter((e: any) => e.event === 'unsubscribe');
      const bounces = events.filter((e: any) => e.event === 'bounces' || e.event === 'hardBounces' || e.event === 'softBounces');
      
      const uniqueOpeners = new Set(opened.map((e: any) => e.email));
      const uniqueClickers = new Set(clicks.map((e: any) => e.email));

      console.log(`- **Total Delivered:** ${delivered.length}`);
      console.log(`- **Unique Openers:** ${uniqueOpeners.size} (${delivered.length ? ((uniqueOpeners.size / delivered.length) * 100).toFixed(1) : 0}%)`);
      console.log(`- **Unique Clickers:** ${uniqueClickers.size} (${delivered.length ? ((uniqueClickers.size / delivered.length) * 100).toFixed(1) : 0}%)`);
      console.log(`- **Total Bounces:** ${bounces.length}`);
      console.log(`- **Unsubscribed:** ${unsubscribed.length}\n`);

      if (uniqueClickers.size > 0) {
        console.log('### 🎯 HIGH-INTENT LEADS (Multiple Clicks)\n');
        console.log('| Lead Email | Total Engagement (Clicks) |');
        console.log('|------------|---------------------------|');
        
        const clickCounts: Record<string, number> = {};
        clicks.forEach((e: any) => {
          clickCounts[e.email] = (clickCounts[e.email] || 0) + 1;
        });

        Object.entries(clickCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .forEach(([email, count]) => {
            console.log(`| ${email} | ${count} |`);
          });
      }
    } else {
      console.log('No recent event data available.');
    }

    console.log('\n## 🛠 Next Strategic Actions');
    console.log('1. **Hard Clean:** Immediately remove all hard-bouncing emails from the master database.');
    console.log('2. **Segment Refresh:** Re-verify Tier 2 manufacturing leads before the next "Rescue" wave.');
    console.log('3. **Nurture Sequence:** Trigger automated follow-up for the identified High-Intent leads.');

  } catch (error: any) {
    console.error('Error generating report:', error.message);
  }
}

main();
