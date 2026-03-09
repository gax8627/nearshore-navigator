/**
 * March 6th Campaign Performance Tracker
 * Fetches opens and clicks for the March 6th wave and analyzes results.
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const envPath = path.join(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

const BREVO_API_KEY = process.env.BREVO_API_KEY as string;
const BREVO_API_URL = 'https://api.brevo.com/v3';

// Results from earlier today
const OUTREACH_COUNT = 249;
const NURTURE_COUNT = 250;
const TOTAL_SENT = 499;

async function fetchStats() {
    console.log('\n📊 Fetching March 6th Campaign Performance...\n');

    if (!BREVO_API_KEY) {
        console.error('❌ BREVO_API_KEY not set.');
        return;
    }

    try {
        // 1. Get Aggregated Stats for Today
        const aggResponse = await fetch(`${BREVO_API_URL}/smtp/statistics/aggregatedReport?startDate=2026-03-06&endDate=2026-03-06`, {
            headers: { 'api-key': BREVO_API_KEY, 'Accept': 'application/json' }
        });
        const agg = await aggResponse.json();

        // 2. Get Detailed Events
        const eventsResponse = await fetch(`${BREVO_API_URL}/smtp/statistics/events?limit=1000&startDate=2026-03-06&endDate=2026-03-06&sort=desc`, {
            headers: { 'api-key': BREVO_API_KEY, 'Accept': 'application/json' }
        });
        const eventsData = await eventsResponse.json();
        const events = eventsData.events || [];

        // 3. Segment by Type (Outreach vs Nurture)
        // We can distinguish by subject line keywords
        const outreachStats = { opens: 0, uniqueOpens: new Set(), clicks: 0, uniqueClicks: new Set() };
        const nurtureStats = { opens: 0, uniqueOpens: new Set(), clicks: 0, uniqueClicks: new Set() };
        
        // Tracking A/B for Outreach
        const formatAStats = { opens: 0, uniqueOpens: new Set(), clicks: 0, uniqueClicks: new Set() };
        const formatBStats = { opens: 0, uniqueOpens: new Set(), clicks: 0, uniqueClicks: new Set() };

        for (const evt of events) {
            const subject = evt.subject || '';
            const email = evt.email;
            const isOutreach = subject.includes('Baja California') || subject.includes('Mexico manufacturing shortlist');
            const isNurture = subject.includes('factories our clients keep choosing') || subject.includes('42% cost reduction');
            
            const isFormatA = subject.includes('Manufacturing capacity in Baja California?');
            const isFormatB = subject.includes('Mexico manufacturing shortlist?');

            if (evt.event === 'opened') {
                if (isOutreach) {
                    outreachStats.opens++;
                    outreachStats.uniqueOpens.add(email);
                    if (isFormatA) { formatAStats.opens++; formatAStats.uniqueOpens.add(email); }
                    if (isFormatB) { formatBStats.opens++; formatBStats.uniqueOpens.add(email); }
                }
                if (isNurture) {
                    nurtureStats.opens++;
                    nurtureStats.uniqueOpens.add(email);
                }
            }
            if (evt.event === 'clicks') {
                if (isOutreach) {
                    outreachStats.clicks++;
                    outreachStats.uniqueClicks.add(email);
                    if (isFormatA) { formatAStats.clicks++; formatAStats.uniqueClicks.add(email); }
                    if (isFormatB) { formatBStats.clicks++; formatBStats.uniqueClicks.add(email); }
                }
                if (isNurture) {
                    nurtureStats.clicks++;
                    nurtureStats.uniqueClicks.add(email);
                }
            }
        }

        console.log('📈 OVERALL STATS (March 6):');
        console.log(`   Requests:   ${agg.requests || 0}`);
        console.log(`   Delivered:  ${agg.delivered || 0}`);
        console.log(`   Opens:      ${agg.uniqueOpens || 0} (${((agg.uniqueOpens / TOTAL_SENT) * 100).toFixed(1)}% unique rate)`);
        console.log(`   Clicks:     ${agg.uniqueClicks || 0} (${((agg.uniqueClicks / TOTAL_SENT) * 100).toFixed(1)}% unique rate)`);

        console.log('\n🔍 SEGMENT PERFORMANCE:');
        console.log(`   Outreach (249 sent):`);
        console.log(`      Opens:  ${outreachStats.uniqueOpens.size} (${((outreachStats.uniqueOpens.size / 249) * 100).toFixed(1)}%)`);
        console.log(`      Clicks: ${outreachStats.uniqueClicks.size} (${((outreachStats.uniqueClicks.size / 249) * 100).toFixed(1)}%)`);
        
        console.log(`   Nurture (250 sent):`);
        console.log(`      Opens:  ${nurtureStats.uniqueOpens.size} (${((nurtureStats.uniqueOpens.size / 250) * 100).toFixed(1)}%)`);
        console.log(`      Clicks: ${nurtureStats.uniqueClicks.size} (${((nurtureStats.uniqueClicks.size / 250) * 100).toFixed(1)}%)`);

        console.log('\n🧪 A/B TEST (OUTREACH SUBJECTS):');
        console.log(`   Format A (Curiosity - Baja capacity?):  ${formatAStats.uniqueOpens.size} opens (${((formatAStats.uniqueOpens.size / 125) * 100).toFixed(1)}%)`);
        console.log(`   Format B (Personalized - Shortlist?):   ${formatBStats.uniqueOpens.size} opens (${((formatBStats.uniqueOpens.size / 124) * 100).toFixed(1)}%)`);

        // Identify Top Engagers
        const engagers: Record<string, number> = {};
        for (const evt of events) {
            if (evt.event === 'opened' || evt.event === 'clicks') {
                engagers[evt.email] = (engagers[evt.email] || 0) + 1;
            }
        }
        
        const topEngagers = Object.entries(engagers)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10);

        console.log('\n🔥 TOP HOT LEADS TODAY:');
        for (const [email, count] of topEngagers) {
            console.log(`   ${email}: ${count} interactions`);
        }

        // 4. Update Engagement Data JSON
        const engagementPath = path.join(process.cwd(), 'scripts/engagement_data.json');
        let engagement = fs.existsSync(engagementPath) ? JSON.parse(fs.readFileSync(engagementPath, 'utf-8')) : {};

        for (const evt of events) {
            const email = evt.email;
            if (!engagement[email]) {
                engagement[email] = { status: 'new', history: [], last_interaction: '' };
            }
            
            // Only add if this specific interaction (date+type) isn't already in history
            const alreadyExists = engagement[email].history.some((h: any) => h.date === evt.date && h.type === evt.event);
            if (!alreadyExists) {
                engagement[email].history.push({
                    type: evt.event,
                    date: evt.date,
                    subject: evt.subject,
                    messageId: evt.messageId
                });
                
                // Update top-level status if it's "higher" priority
                if (evt.event === 'clicks') engagement[email].status = 'clicked';
                else if (evt.event === 'opened' && engagement[email].status !== 'clicked') engagement[email].status = 'opened';
                
                // Update last interaction if newer
                if (!engagement[email].last_interaction || evt.date > engagement[email].last_interaction) {
                    engagement[email].last_interaction = evt.date;
                }
            }
        }

        fs.writeFileSync(engagementPath, JSON.stringify(engagement, null, 2));
        console.log(`✅ Updated ${engagementPath} with latest events.`);

    } catch (e: any) {
        console.error(`❌ Error tracking March 6 performance: ${e.message}`);
    }
}

fetchStats();
