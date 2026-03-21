/**
 * GA4 Data API reporting script — uses googleapis (already in deps)
 * Property: Nearshore Navigator (528048108)  |  Measurement ID: G-7RHTT5QR43
 *
 * ─── SETUP (one-time, run in terminal on your Mac) ─────────────────────────
 *   gcloud auth application-default login \
 *     --scopes="https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/webmasters.readonly,https://www.googleapis.com/auth/cloud-platform"
 *
 * ─── USAGE ─────────────────────────────────────────────────────────────────
 *   npx tsx scripts/ga4-report.mjs               # last 28 days (full report)
 *   npx tsx scripts/ga4-report.mjs --days 7      # last 7 days
 *   npx tsx scripts/ga4-report.mjs --pages       # top pages only
 *   npx tsx scripts/ga4-report.mjs --sources     # traffic channels only
 *   npx tsx scripts/ga4-report.mjs --countries   # top countries only
 */

import { google } from 'googleapis';

const PROPERTY_ID = '528048108';

const args = process.argv.slice(2);
const daysArg = args.includes('--days') ? parseInt(args[args.indexOf('--days') + 1]) : 28;
const showPages = args.includes('--pages');
const showSources = args.includes('--sources');
const showCountries = args.includes('--countries');
const showAll = !showPages && !showSources && !showCountries;

// Auth via gcloud application-default credentials
const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
});

const analyticsdata = google.analyticsdata({ version: 'v1beta', auth });

async function runReport(body) {
  const res = await analyticsdata.properties.runReport({
    property: `properties/${PROPERTY_ID}`,
    requestBody: body,
  });
  return res.data;
}

async function summary(days) {
  const data = await runReport({
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
    metrics: [
      { name: 'sessions' },
      { name: 'totalUsers' },
      { name: 'newUsers' },
      { name: 'engagedSessions' },
      { name: 'bounceRate' },
      { name: 'averageSessionDuration' },
      { name: 'screenPageViews' },
      { name: 'conversions' },
    ],
  });

  const v = (i, dec = 0) => parseFloat(data.rows?.[0]?.metricValues?.[i]?.value ?? 0).toFixed(dec);

  console.log(`\n📊 Nearshore Navigator — GA4 Summary (last ${days} days)`);
  console.log('═'.repeat(52));
  console.log(`  Sessions              ${v(0).padStart(10)}`);
  console.log(`  Total users           ${v(1).padStart(10)}`);
  console.log(`  New users             ${v(2).padStart(10)}`);
  console.log(`  Engaged sessions      ${v(3).padStart(10)}`);
  console.log(`  Bounce rate           ${(parseFloat(v(4, 4)) * 100).toFixed(1).padStart(9)}%`);
  console.log(`  Avg session (sec)     ${v(5, 0).padStart(10)}`);
  console.log(`  Page views            ${v(6).padStart(10)}`);
  console.log(`  Conversions           ${v(7).padStart(10)}`);
}

async function topPages(days) {
  const data = await runReport({
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 20,
  });

  console.log(`\n📄 Top Pages (last ${days} days)`);
  console.log('═'.repeat(72));
  for (const row of data.rows ?? []) {
    const path = (row.dimensionValues[0].value).padEnd(48).substring(0, 48);
    const views = row.metricValues[0].value.padStart(6);
    const users = row.metricValues[1].value.padStart(6);
    console.log(`  ${path}  ${views} views  ${users} users`);
  }
}

async function sources(days) {
  const data = await runReport({
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'conversions' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
  });

  console.log(`\n🔗 Traffic Sources (last ${days} days)`);
  console.log('═'.repeat(60));
  for (const row of data.rows ?? []) {
    const ch = row.dimensionValues[0].value.padEnd(28);
    const sess = row.metricValues[0].value.padStart(7);
    const usr = row.metricValues[1].value.padStart(7);
    const conv = row.metricValues[2].value.padStart(5);
    console.log(`  ${ch}  ${sess} sessions  ${usr} users  ${conv} conv`);
  }
}

async function countries(days) {
  const data = await runReport({
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
    dimensions: [{ name: 'country' }],
    metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 15,
  });

  console.log(`\n🌍 Top Countries (last ${days} days)`);
  console.log('═'.repeat(44));
  for (const row of data.rows ?? []) {
    const c = row.dimensionValues[0].value.padEnd(24);
    const sess = row.metricValues[0].value.padStart(7);
    const usr = row.metricValues[1].value.padStart(7);
    console.log(`  ${c}  ${sess} sessions  ${usr} users`);
  }
}

try {
  if (showAll) {
    await summary(daysArg);
    await topPages(daysArg);
    await sources(daysArg);
    await countries(daysArg);
  } else {
    if (showPages) await topPages(daysArg);
    if (showSources) await sources(daysArg);
    if (showCountries) await countries(daysArg);
  }
  console.log('');
} catch (err) {
  const msg = err.message ?? '';
  if (msg.includes('PERMISSION_DENIED') || err.code === 403) {
    console.error('\n❌ Analytics API not authorized. Run this once:\n');
    console.error('  gcloud auth application-default login \\');
    console.error('    --scopes="https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/webmasters.readonly,https://www.googleapis.com/auth/cloud-platform"\n');
  } else if (msg.includes('UNAUTHENTICATED') || err.code === 401) {
    console.error('\n❌ Not authenticated. Run:\n  gcloud auth application-default login\n');
  } else {
    console.error('\n❌ Error:', msg);
    if (process.env.DEBUG) console.error(err);
  }
  process.exit(1);
}
