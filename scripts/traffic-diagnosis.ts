import { google } from 'googleapis';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const KEY_FILE = '/Users/gax8627/.config/gcloud/application_default_credentials.json';
const GSC_SITE = 'sc-domain:nearshorenavigator.com';
const GA4_PROPERTY = 'properties/528048108';

async function diagnose() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: [
      'https://www.googleapis.com/auth/webmasters.readonly',
      'https://www.googleapis.com/auth/analytics.readonly'
    ],
  });

  const analyticsdata = google.analyticsdata({ version: 'v1beta', auth });
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  // ─── 1. GA4: Day-by-day traffic for last 7 days ───
  console.log('\n═══ GA4: DAILY TRAFFIC TREND (Last 7 Days) ═══\n');
  try {
    const res = await analyticsdata.properties.runReport({
      property: GA4_PROPERTY,
      requestBody: {
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'date' }],
        metrics: [
          { name: 'sessions' },
          { name: 'totalUsers' },
          { name: 'screenPageViews' },
          { name: 'bounceRate' },
        ],
        orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }],
      },
    });
    if (res.data.rows) {
      console.log('Date       | Sessions | Users | Pageviews | Bounce');
      console.log('-'.repeat(58));
      res.data.rows.forEach(r => {
        const date = r.dimensionValues?.[0]?.value;
        const sessions = r.metricValues?.[0]?.value;
        const users = r.metricValues?.[1]?.value;
        const pv = r.metricValues?.[2]?.value;
        const bounce = (parseFloat(r.metricValues?.[3]?.value || '0') * 100).toFixed(0);
        console.log(`${date}   | ${sessions?.padStart(8)} | ${users?.padStart(5)} | ${pv?.padStart(9)} | ${bounce}%`);
      });
    } else {
      console.log('No daily data.');
    }
  } catch (e: any) { console.error('GA4 daily error:', e.message); }

  // ─── 2. GA4: Traffic sources for last 24h vs previous 24h ───
  console.log('\n═══ GA4: SOURCE COMPARISON (Today vs Yesterday) ═══\n');
  try {
    const res = await analyticsdata.properties.runReport({
      property: GA4_PROPERTY,
      requestBody: {
        dateRanges: [
          { startDate: 'today', endDate: 'today', name: 'today' },
          { startDate: '1daysAgo', endDate: '1daysAgo', name: 'yesterday' },
        ],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
      },
    });
    if (res.data.rows) {
      console.log('Channel          | Today Sessions | Yesterday Sessions');
      console.log('-'.repeat(55));
      res.data.rows.forEach(r => {
        const channel = r.dimensionValues?.[0]?.value || '';
        const todaySessions = r.metricValues?.[0]?.value || '0';
        const yesterdaySessions = r.metricValues?.[1]?.value || '0';
        console.log(`${channel.padEnd(17)}| ${todaySessions.padStart(14)} | ${yesterdaySessions.padStart(18)}`);
      });
    }
  } catch (e: any) { console.error('GA4 source comparison error:', e.message); }

  // ─── 3. GA4: Top landing pages last 7 days ───
  console.log('\n═══ GA4: TOP LANDING PAGES (Last 7 Days) ═══\n');
  try {
    const res = await analyticsdata.properties.runReport({
      property: GA4_PROPERTY,
      requestBody: {
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'landingPagePlusQueryString' }],
        metrics: [{ name: 'sessions' }, { name: 'bounceRate' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 15,
      },
    });
    if (res.data.rows) {
      res.data.rows.forEach(r => {
        const page = r.dimensionValues?.[0]?.value;
        const sessions = r.metricValues?.[0]?.value;
        const bounce = (parseFloat(r.metricValues?.[1]?.value || '0') * 100).toFixed(0);
        console.log(` ${sessions?.padStart(4)} sessions | ${bounce}% bounce | ${page}`);
      });
    }
  } catch (e: any) { console.error('GA4 landing pages error:', e.message); }

  // ─── 4. GSC: Coverage & Indexing — last 7 days of query data ───
  console.log('\n═══ GSC: SEARCH PERFORMANCE (Last 7 Days) ═══\n');
  try {
    const now = new Date();
    const end = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // GSC data is delayed ~2 days
    const start = new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const res = await searchconsole.searchanalytics.query({
      siteUrl: GSC_SITE,
      requestBody: {
        startDate: start,
        endDate: end,
        dimensions: ['date'],
        rowLimit: 10,
      },
    });
    if (res.data.rows && res.data.rows.length > 0) {
      console.log('Date       | Clicks | Impressions | CTR     | Avg Pos');
      console.log('-'.repeat(60));
      res.data.rows.forEach(r => {
        const date = r.keys?.[0];
        console.log(`${date}   | ${String(r.clicks).padStart(6)} | ${String(r.impressions).padStart(11)} | ${((r.ctr || 0) * 100).toFixed(2)}% | ${r.position?.toFixed(1)}`);
      });
    } else {
      console.log('No GSC date-level data found.');
    }
  } catch (e: any) { console.error('GSC error:', e.message); }

  // ─── 5. GSC: Top queries (last 7 days) ───
  console.log('\n═══ GSC: TOP QUERIES (Last 7 Days) ═══\n');
  try {
    const now = new Date();
    const end = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const start = new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const res = await searchconsole.searchanalytics.query({
      siteUrl: GSC_SITE,
      requestBody: {
        startDate: start,
        endDate: end,
        dimensions: ['query'],
        rowLimit: 20,
      },
    });
    if (res.data.rows && res.data.rows.length > 0) {
      res.data.rows.forEach(r => {
        console.log(` ${String(r.clicks).padStart(3)} clicks | ${String(r.impressions).padStart(4)} impr | pos ${r.position?.toFixed(1)} | ${r.keys?.[0]}`);
      });
    } else {
      console.log('No query data.');
    }
  } catch (e: any) { console.error('GSC query error:', e.message); }

  // ─── 6. GSC: Top pages (indexing clues) ───
  console.log('\n═══ GSC: TOP PAGES (Last 7 Days) ═══\n');
  try {
    const now = new Date();
    const end = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const start = new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const res = await searchconsole.searchanalytics.query({
      siteUrl: GSC_SITE,
      requestBody: {
        startDate: start,
        endDate: end,
        dimensions: ['page'],
        rowLimit: 20,
      },
    });
    if (res.data.rows && res.data.rows.length > 0) {
      res.data.rows.forEach(r => {
        console.log(` ${String(r.clicks).padStart(3)} clicks | ${String(r.impressions).padStart(4)} impr | pos ${r.position?.toFixed(1)} | ${r.keys?.[0]}`);
      });
    } else {
      console.log('No page data.');
    }
  } catch (e: any) { console.error('GSC page error:', e.message); }

  // ─── 7. GSC: Sitemaps status ───
  console.log('\n═══ GSC: SITEMAP STATUS ═══\n');
  try {
    const res = await searchconsole.sitemaps.list({ siteUrl: GSC_SITE });
    const sitemaps = res.data.sitemap || [];
    if (sitemaps.length > 0) {
      sitemaps.forEach((s: any) => {
        console.log(` ${s.path}`);
        console.log(`   Last submitted: ${s.lastSubmitted}`);
        console.log(`   Last downloaded: ${s.lastDownloaded}`);
        console.log(`   Warnings: ${s.warnings}, Errors: ${s.errors}`);
        if (s.contents) {
          s.contents.forEach((c: any) => {
            console.log(`   Type: ${c.type} | Submitted: ${c.submitted} | Indexed: ${c.indexed}`);
          });
        }
      });
    } else {
      console.log('No sitemaps found. This could be a major indexing issue!');
    }
  } catch (e: any) { console.error('GSC sitemap error:', e.message); }
}

diagnose();
