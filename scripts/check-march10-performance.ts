/**
 * March 10th Campaign Performance Tracker
 * Fetches opens, clicks and top engagers for the March 10th 1,000-lead wave.
 *
 * Run: npx tsx scripts/check-march10-performance.ts
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const envPath = path.join(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

const BREVO_API_KEY = process.env.BREVO_API_KEY as string;
const BREVO_API_URL = 'https://api.brevo.com/v3';
const TOTAL_SENT = 999;

async function fetchStats() {
  console.log('\n📊 March 10th Campaign Performance (Early Read — ~37 min post-send)\n');

  if (!BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not set.');
    return;
  }

  try {
    // 1. Aggregated today stats
    const aggRes = await fetch(
      `${BREVO_API_URL}/smtp/statistics/aggregatedReport?startDate=2026-03-10&endDate=2026-03-10`,
      { headers: { 'api-key': BREVO_API_KEY, Accept: 'application/json' } }
    );
    const agg = await aggRes.json();

    // 2. Event-level detail (opens + clicks)
    const eventsRes = await fetch(
      `${BREVO_API_URL}/smtp/statistics/events?limit=1000&startDate=2026-03-10&endDate=2026-03-10&sort=desc`,
      { headers: { 'api-key': BREVO_API_KEY, Accept: 'application/json' } }
    );
    const eventsData = await eventsRes.json();
    const events: any[] = eventsData.events || [];

    // 3. Segment by subject line variant (A vs B)
    const formatA = { opens: new Set<string>(), clicks: new Set<string>() };
    const formatB = { opens: new Set<string>(), clicks: new Set<string>() };

    for (const evt of events) {
      const subject: string = evt.subject || '';
      const email: string = evt.email;
      const isA = subject.includes('Mexico manufacturing option');
      const isB = subject.includes('Baja California supply chain shortlist');

      if (evt.event === 'opened') {
        if (isA) formatA.opens.add(email);
        if (isB) formatB.opens.add(email);
      }
      if (evt.event === 'clicks') {
        if (isA) formatA.clicks.add(email);
        if (isB) formatB.clicks.add(email);
      }
    }

    const pct = (n: number, d: number) => d > 0 ? `${((n / d) * 100).toFixed(1)}%` : 'n/a';

    console.log('📈 OVERALL (March 10 — 999 sent):');
    console.log(`   Requests:      ${agg.requests ?? 0}`);
    console.log(`   Delivered:     ${agg.delivered ?? 0}`);
    console.log(`   Bounced:       ${agg.hardBounces ?? 0} hard / ${agg.softBounces ?? 0} soft`);
    console.log(`   Unique Opens:  ${agg.uniqueOpens ?? 0}  (${pct(agg.uniqueOpens ?? 0, TOTAL_SENT)} of sent)`);
    console.log(`   Unique Clicks: ${agg.uniqueClicks ?? 0}  (${pct(agg.uniqueClicks ?? 0, TOTAL_SENT)} of sent)`);
    console.log(`   Unsubscribes:  ${agg.unsubscriptions ?? 0}`);

    const halfSent = Math.round(TOTAL_SENT / 2);
    console.log('\n🔬 A/B SUBJECT LINE SPLIT (~500 each):');
    console.log(`   Format A — "Mexico manufacturing option for your supply chain?"`);
    console.log(`      Opens:  ${formatA.opens.size}  (${pct(formatA.opens.size, halfSent)})`);
    console.log(`      Clicks: ${formatA.clicks.size}  (${pct(formatA.clicks.size, halfSent)})`);
    console.log(`   Format B — "[Company] — Baja California supply chain shortlist?"`);
    console.log(`      Opens:  ${formatB.opens.size}  (${pct(formatB.opens.size, halfSent)})`);
    console.log(`      Clicks: ${formatB.clicks.size}  (${pct(formatB.clicks.size, halfSent)})`);

    // Winner
    const winner = formatA.opens.size >= formatB.opens.size ? 'Format A (curiosity)' : 'Format B (personalized)';
    console.log(`\n🏆 EARLY WINNER: ${winner}`);

    // 4. Top engagers (hot leads)
    const engagerMap: Record<string, { count: number; events: string[] }> = {};
    for (const evt of events) {
      if (evt.event === 'opened' || evt.event === 'clicks') {
        if (!engagerMap[evt.email]) engagerMap[evt.email] = { count: 0, events: [] };
        engagerMap[evt.email].count++;
        engagerMap[evt.email].events.push(evt.event);
      }
    }

    const topEngagers = Object.entries(engagerMap)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, 15);

    console.log('\n🔥 TOP HOT LEADS (March 10):');
    if (topEngagers.length === 0) {
      console.log('   None yet — check back in 1–2 hours for early openers.');
    } else {
      for (const [email, data] of topEngagers) {
        const tag = data.events.includes('clicks') ? '⚡ CLICKED' : '👁 opened';
        console.log(`   ${tag}  ${email}  (${data.count}x)`);
      }
    }

    // 5. Update engagement_data.json
    const engagementPath = path.join(process.cwd(), 'scripts/engagement_data.json');
    const engagement: Record<string, any> = fs.existsSync(engagementPath)
      ? JSON.parse(fs.readFileSync(engagementPath, 'utf-8'))
      : {};

    for (const evt of events) {
      const email = evt.email;
      if (!engagement[email]) engagement[email] = { status: 'new', history: [], last_interaction: '' };

      const alreadyLogged = engagement[email].history.some(
        (h: any) => h.date === evt.date && h.type === evt.event
      );
      if (!alreadyLogged) {
        engagement[email].history.push({ type: evt.event, date: evt.date, subject: evt.subject, messageId: evt.messageId });
        if (evt.event === 'clicks') engagement[email].status = 'clicked';
        else if (evt.event === 'opened' && engagement[email].status !== 'clicked') engagement[email].status = 'opened';
        if (!engagement[email].last_interaction || evt.date > engagement[email].last_interaction) {
          engagement[email].last_interaction = evt.date;
        }
      }
    }

    fs.writeFileSync(engagementPath, JSON.stringify(engagement, null, 2));
    console.log(`\n✅ engagement_data.json updated.\n`);

  } catch (e: any) {
    console.error(`❌ Error: ${e.message}`);
  }
}

fetchStats();
