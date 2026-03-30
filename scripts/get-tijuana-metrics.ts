import { google } from 'googleapis';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const KEY_FILE = '/Users/gax8627/.config/gcloud/application_default_credentials.json';
const GSC_SITE = 'sc-domain:nearshorenavigator.com';
const GA4_PROPERTY = 'properties/528048108';

async function getTijuanaMetrics() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    quotaProjectId: 'nearshore-navigator-mcp',
    scopes: [
      'https://www.googleapis.com/auth/webmasters.readonly',
      'https://www.googleapis.com/auth/analytics.readonly'
    ],
  });

  const analyticsdata = google.analyticsdata({ version: 'v1beta', auth });
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  const endDate = 'today';
  const startDate = '7daysAgo';

  console.log(`\n📊 TIJUANA PERFORMANCE HUB (Last 7 Days)`);
  console.log(`───────────────────────────────────────\n`);

  // 1. GA4: Tijuana Page Views
  try {
    const ga4Res = await analyticsdata.properties.runReport({
      property: GA4_PROPERTY,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'pagePath' }],
        dimensionFilter: {
           filter: {
             fieldName: 'pagePath',
             stringFilter: { matchType: 'CONTAINS', value: 'tijuana' }
           }
        },
        metrics: [
          { name: 'sessions' },
          { name: 'totalUsers' },
          { name: 'averageSessionDuration' }
        ],
      },
    });

    console.log('📈 GA4 TIJUANA PAGES:');
    if (ga4Res.data.rows) {
      ga4Res.data.rows.forEach(row => {
        const path = row.dimensionValues?.[0]?.value;
        const sessions = row.metricValues?.[0]?.value;
        const users = row.metricValues?.[1]?.value;
        console.log(` - ${path}: ${sessions} sessions, ${users} users`);
      });
    } else {
      console.log(' - No Tijuana-specific sessions in the last 7 days.');
    }
  } catch (e) { console.error('GA4 Error:', e.message); }

  // 2. GSC: Tijuana Queries
  try {
    const gscRes = await searchconsole.searchanalytics.query({
      siteUrl: GSC_SITE,
      requestBody: { 
        startDate: '2026-03-23', // Last 7 days
        endDate: '2026-03-29', 
        dimensions: ['query'],
        dimensionFilterGroups: [{
          filters: [{
            dimension: 'query',
            operator: 'contains',
            expression: 'tijuana'
          }]
        }],
        rowLimit: 10 
      },
    });
    console.log('\n🔍 GSC TIJUANA SEARCH QUERIES:');
    if (gscRes.data.rows) {
      gscRes.data.rows.forEach(r => {
        console.log(` - "${r.keys?.[0]}": ${r.clicks} clicks, ${r.impressions} impressions`);
      });
    } else {
      console.log(' - No "Tijuana" search queries yet. Growth period active.');
    }
  } catch (e) { console.error('GSC Error:', e.message); }

  // 3. GSC: Tijuana Landing Pages
  try {
    const gscPages = await searchconsole.searchanalytics.query({
      siteUrl: GSC_SITE,
      requestBody: { 
        startDate: '2026-03-23',
        endDate: '2026-03-29', 
        dimensions: ['page'],
        dimensionFilterGroups: [{
          filters: [{
            dimension: 'page',
            operator: 'contains',
            expression: 'tijuana'
          }]
        }],
        rowLimit: 10 
      },
    });
    console.log('\n📄 GSC TIJUANA LANDING PAGES (SERP Impressions):');
    if (gscPages.data.rows) {
      gscPages.data.rows.forEach(r => {
        const p = r.keys?.[0]?.replace('https://nearshorenavigator.com', '');
        console.log(` - ${p}: ${r.clicks} clicks, ${r.impressions} impressions`);
      });
    } else {
      console.log(' - No Tijuana landing pages indexed yet.');
    }
  } catch (e) { console.error('GSC Error:', e.message); }
}

getTijuanaMetrics();
