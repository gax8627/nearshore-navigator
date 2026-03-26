import { google } from 'googleapis';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const KEY_FILE = '/Users/gax8627/.config/gcloud/application_default_credentials.json';
const GSC_SITE = 'sc-domain:nearshorenavigator.com';
const GA4_PROPERTY = 'properties/528048108';

async function getLiveMetrics() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    quotaProjectId: 'nearshore-navigator-mcp', // Fixed project ID
    scopes: [
      'https://www.googleapis.com/auth/webmasters.readonly',
      'https://www.googleapis.com/auth/analytics.readonly'
    ],
  });

  const analyticsdata = google.analyticsdata({ version: 'v1beta', auth });
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  const now = new Date();
  const endDate = 'today';
  const startDate = '30daysAgo';

  console.log(`\n--- 30-DAY PERFORMANCE AUDIT (${startDate} to ${endDate}) ---\n`);

  // 1. GA4: 24h Summary + Organic Search
  try {
    const ga4Res = await analyticsdata.properties.runReport({
      property: GA4_PROPERTY,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [
          { name: 'sessionDefaultChannelGroup' },
          { name: 'sessionSourceMedium' }
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'totalUsers' },
          { name: 'screenPageViews' }
        ],
      },
    });

    console.log('--- GA4 Sources (Last 24h) ---');
    if (ga4Res.data.rows) {
      ga4Res.data.rows.forEach(row => {
        const channel = row.dimensionValues?.[0]?.value;
        const sourceMedium = row.dimensionValues?.[1]?.value;
        const sessions = row.metricValues?.[0]?.value;
        const users = row.metricValues?.[1]?.value;
        console.log(` - ${channel} (${sourceMedium}): ${sessions} sessions, ${users} users`);
      });
      
      const organic = ga4Res.data.rows.filter(r => r.dimensionValues?.[0]?.value === 'Organic Search');
      const organicSessions = organic.reduce((acc, r) => acc + parseInt(r.metricValues?.[0]?.value || '0'), 0);
      console.log(`\nTotal Organic Visitors: ${organicSessions}`);
    } else {
      console.log('No GA4 sessions found in last 24 hours.');
    }
  } catch (e) { console.error('GA4 Error:', e.message); }

  // 2. GSC: 24h Top Queries
  try {
    const gscRes = await searchconsole.searchanalytics.query({
      siteUrl: GSC_SITE,
      requestBody: { startDate: '2026-03-24', endDate: '2026-03-25', dimensions: ['query'], rowLimit: 10 },
    });
    console.log('\n--- GSC Queries (Last 24h) ---');
    if (gscRes.data.rows) {
      gscRes.data.rows.forEach(r => {
        console.log(` - ${r.keys?.[0]}: ${r.clicks} clicks, ${r.impressions} impressions`);
      });
    } else {
      console.log('No GSC data found for last 24h.');
    }
  } catch (e) { console.error('GSC Error:', e.message); }
}

getLiveMetrics();
