import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GSC_SITE = 'sc-domain:nearshorenavigator.com';
const GA4_PROPERTY = 'properties/528048108';

async function getAuth() {
  const TOKEN_PATH = path.join(process.cwd(), 'google-token.json');
  let tokens: any = null;

  if (fs.existsSync(TOKEN_PATH)) {
    tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
  }

  if (tokens) {
    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, 'http://localhost:3000');
    oauth2Client.setCredentials(tokens);
    return oauth2Client;
  }
  throw new Error('No valid Google tokens found. Please run scripts/auth-gsc.ts first.');
}

async function runMonthlyAudit() {
  console.log('\n🚀 Starting Monthly Traffic Audit Agent...');
  console.log('───────────────────────────────────────');

  try {
    const auth = await getAuth();
    const analyticsdata = google.analyticsdata({ version: 'v1beta', auth });
    const searchconsole = google.searchconsole({ version: 'v1', auth });

    const now = new Date();
    const end = now.toISOString().split('T')[0];
    const start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    // GSC data is delayed ~2 days
    const gscEnd = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const gscStart = new Date(now.getTime() - 32 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    console.log(`Period: ${start} to ${end}`);
    console.log('───────────────────────────────────────\n');

    // ─── 1. GA4 SUMMARY ───
    console.log('📊 GA4: TRAFFIC SUMMARY');
    try {
      const gaRes = await analyticsdata.properties.runReport({
        property: GA4_PROPERTY,
        requestBody: {
          dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
          metrics: [
            { name: 'sessions' },
            { name: 'totalUsers' },
            { name: 'screenPageViews' },
            { name: 'bounceRate' },
            { name: 'averageSessionDuration' },
          ],
        },
      });

      if (gaRes.data.rows?.[0]) {
        const r = gaRes.data.rows[0];
        console.log(`  Sessions:      ${r.metricValues?.[0]?.value}`);
        console.log(`  Total Users:   ${r.metricValues?.[1]?.value}`);
        const pvs = r.metricValues?.[2]?.value;
        console.log(`  Page Views:    ${pvs}`);
        const bounce = (parseFloat(r.metricValues?.[3]?.value || '0') * 100).toFixed(1);
        console.log(`  Bounce Rate:   ${bounce}%`);
        const duration = parseFloat(r.metricValues?.[4]?.value || '0').toFixed(0);
        console.log(`  Avg Duration:  ${duration}s`);
      }
    } catch (e: any) { console.error('  [GA4 Error]:', e.message); }

    // ─── 2. GA4 SOURCES ───
    console.log('\n🔗 GA4: TOP TRAFFIC SOURCES');
    try {
      const sourceRes = await analyticsdata.properties.runReport({
        property: GA4_PROPERTY,
        requestBody: {
          dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
          dimensions: [{ name: 'sessionDefaultChannelGroup' }],
          metrics: [{ name: 'sessions' }],
          orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
          limit: 5,
        },
      });
      sourceRes.data.rows?.forEach(r => {
        console.log(`  - ${r.dimensionValues?.[0]?.value?.padEnd(15)}: ${r.metricValues?.[0]?.value} sessions`);
      });
    } catch (e: any) { console.error('  [GA4 Source Error]:', e.message); }

    // ─── 3. GSC SUMMARY ───
    console.log('\n🔍 GSC: SEARCH PERFORMANCE');
    try {
      const gscRes = await searchconsole.searchanalytics.query({
        siteUrl: GSC_SITE,
        requestBody: {
          startDate: gscStart,
          endDate: gscEnd,
          dimensions: ['query'],
          rowLimit: 10,
        },
      });

      if (gscRes.data.rows) {
        const totalClicks = gscRes.data.rows.reduce((acc, r) => acc + (r.clicks || 0), 0);
        const totalImpr = gscRes.data.rows.reduce((acc, r) => acc + (r.impressions || 0), 0);
        console.log(`  Total Clicks:      ${totalClicks}`);
        console.log(`  Total Impressions: ${totalImpr}`);
        console.log('  Top Queries:');
        gscRes.data.rows.slice(0, 5).forEach(r => {
          console.log(`   - ${r.keys?.[0]}: ${r.clicks} clicks, ${r.impressions} impr (Pos ${r.position?.toFixed(1)})`);
        });
      } else {
        console.log('  No GSC data found.');
      }
    } catch (e: any) { console.error('  [GSC Error]:', e.message); }

    // ─── 4. GSC TOP PAGES ───
    console.log('\n📄 GSC: TOP PAGES');
    try {
      const pageRes = await searchconsole.searchanalytics.query({
        siteUrl: GSC_SITE,
        requestBody: {
          startDate: gscStart,
          endDate: gscEnd,
          dimensions: ['page'],
          rowLimit: 5,
        },
      });
      pageRes.data.rows?.forEach(r => {
        const cleanPage = r.keys?.[0].replace('https://nearshorenavigator.com', '');
        console.log(`   - ${cleanPage}: ${r.clicks} clicks, ${r.impressions} impr`);
      });
    } catch (e: any) { console.error('  [GSC Page Error]:', e.message); }

    console.log('\n───────────────────────────────────────');
    console.log('✅ Audit Complete.');

  } catch (e: any) {
    console.error('\n❌ Critical Audit Error:', e.message);
  }
}

runMonthlyAudit();
