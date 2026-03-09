/**
 * March 9th Campaign Performance Tracker
 * Fetches opens and clicks for the March 9th wave and analyzes results.
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
    console.log('\n📊 Fetching March 9th Campaign Performance (Today)...\n');

    if (!BREVO_API_KEY) {
        console.error('❌ BREVO_API_KEY not set.');
        return;
    }

    try {
        // 1. Get Aggregated Stats for Today
        const aggResponse = await fetch(`${BREVO_API_URL}/smtp/statistics/aggregatedReport?startDate=2026-03-09&endDate=2026-03-09`, {
            headers: { 'api-key': BREVO_API_KEY, 'Accept': 'application/json' }
        });
        const agg = await aggResponse.json();

        // 2. Get Detailed Events
        const eventsResponse = await fetch(`${BREVO_API_URL}/smtp/statistics/events?limit=1000&startDate=2026-03-09&endDate=2026-03-09&sort=desc`, {
            headers: { 'api-key': BREVO_API_KEY, 'Accept': 'application/json' }
        });
        const eventsData = await eventsResponse.json();
        const events = eventsData.events || [];

        // 3. Segment by Type
        const outreachStats = { uniqueOpens: new Set(), uniqueClicks: new Set() };
        const softNurtureStats = { uniqueOpens: new Set(), uniqueClicks: new Set() };
        const generalNurtureStats = { uniqueOpens: new Set(), uniqueClicks: new Set() };

        for (const evt of events) {
            const subject = evt.subject || '';
            const email = evt.email;
            
            const isOutreach = subject.includes('Mexico manufacturing shortlist');
            const isSoftNurture = subject.includes('Just sent this to another client in Baja');
            const isGeneralNurture = subject.includes('The 3 factories our clients keep choosing in Baja');

            if (evt.event === 'opened') {
                if (isOutreach) outreachStats.uniqueOpens.add(email);
                if (isSoftNurture) softNurtureStats.uniqueOpens.add(email);
                if (isGeneralNurture) generalNurtureStats.uniqueOpens.add(email);
            }
            if (evt.event === 'clicks') {
                if (isOutreach) outreachStats.uniqueClicks.add(email);
                if (isSoftNurture) softNurtureStats.uniqueClicks.add(email);
                if (isGeneralNurture) generalNurtureStats.uniqueClicks.add(email);
            }
        }

        console.log('📈 OVERALL STATS (March 9):');
        console.log(`   Requests:   ${agg.requests || 0}`);
        console.log(`   Delivered:  ${agg.delivered || 0}`);
        console.log(`   Unique Opens: ${agg.uniqueOpens || 0} (${((agg.uniqueOpens / TOTAL_SENT) * 100).toFixed(1)}%)`);
        console.log(`   Unique Clicks: ${agg.uniqueClicks || 0} (${((agg.uniqueClicks / TOTAL_SENT) * 100).toFixed(1)}%)`);

        console.log('\n🔍 SEGMENT PERFORMANCE:');
        console.log(`   Cold Outreach (249 sent):`);
        console.log(`      Opens:  ${outreachStats.uniqueOpens.size} (${((outreachStats.uniqueOpens.size / 249) * 100).toFixed(1)}%)`);
        console.log(`      Clicks: ${outreachStats.uniqueClicks.size} (${((outreachStats.uniqueClicks.size / 249) * 100).toFixed(1)}%)`);
        
        console.log(`   Soft Nurture (Mar 6 Clickers - ~191 sent):`);
        console.log(`      Opens:  ${softNurtureStats.uniqueOpens.size} (${((softNurtureStats.uniqueOpens.size / 191) * 100).toFixed(1)}%)`);
        console.log(`      Clicks: ${softNurtureStats.uniqueClicks.size} (${((softNurtureStats.uniqueClicks.size / 191) * 100).toFixed(1)}%)`);

        console.log(`   General Nurture (General Openers - ~59 sent):`);
        console.log(`      Opens:  ${generalNurtureStats.uniqueOpens.size} (${((generalNurtureStats.uniqueOpens.size / 59) * 100).toFixed(1)}%)`);
        console.log(`      Clicks: ${generalNurtureStats.uniqueClicks.size} (${((generalNurtureStats.uniqueClicks.size / 59) * 100).toFixed(1)}%)`);

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
            
            const alreadyExists = engagement[email].history.some((h: any) => h.date === evt.date && h.type === evt.event);
            if (!alreadyExists) {
                engagement[email].history.push({
                    type: evt.event,
                    date: evt.date,
                    subject: evt.subject,
                    messageId: evt.messageId
                });
                
                if (evt.event === 'clicks') engagement[email].status = 'clicked';
                else if (evt.event === 'opened' && engagement[email].status !== 'clicked') engagement[email].status = 'opened';
                
                if (!engagement[email].last_interaction || evt.date > engagement[email].last_interaction) {
                    engagement[email].last_interaction = evt.date;
                }
            }
        }

        fs.writeFileSync(engagementPath, JSON.stringify(engagement, null, 2));
        console.log(`✅ Updated ${engagementPath} with latest events.`);

    } catch (e: any) {
        console.error(`❌ Error tracking March 9 performance: ${e.message}`);
    }
}

fetchStats();
