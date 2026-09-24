import { google } from 'googleapis';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { exec } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000';
const TOKEN_PATH = path.join(__dirname, '../google-token.json');
const PROPERTY_ID = '528048108';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET missing in .env.local');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: [
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/webmasters.readonly'
  ]
});

console.log('\n🚀 Starting Google Analytics OAuth Server on http://localhost:3000...');
console.log('───────────────────────────────────────────────────────────────────');
console.log('🔗 Please open this link in your browser if it does not open automatically:\n');
console.log(authUrl);
console.log('\n⚠️ If you see "Google hasn\'t verified this app":');
console.log('   Click "Advanced" (bottom left) -> "Go to Nearshore Navigator (unsafe)" -> Check the permission box -> Continue.');
console.log('───────────────────────────────────────────────────────────────────\n');

// Try to open browser automatically on macOS
exec(`open "${authUrl}"`);

const server = http.createServer(async (req, res) => {
  try {
    const reqUrl = new URL(req.url, 'http://localhost:3000');
    const code = reqUrl.searchParams.get('code');
    const error = reqUrl.searchParams.get('error');

    if (error) {
      res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h1>Authentication Failed</h1><p>${error}</p>`);
      console.error('❌ OAuth Error from Google:', error);
      server.close();
      process.exit(1);
    }

    if (code) {
      console.log('⚡ Received authorization code. Exchanging for tokens...');
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
      console.log(`✅ Tokens saved to: ${TOKEN_PATH}`);

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; text-align: center;">
          <h2 style="color: #10b981;">✅ Authentication Successful!</h2>
          <p>Google Analytics access granted for <strong>Nearshore Navigator</strong>.</p>
          <p style="color: #666;">You can now close this tab and return to the assistant.</p>
        </div>
      `);

      server.close();

      console.log('\n📊 Fetching Google Analytics 4 Data...');
      await displayReport(oauth2Client);
      process.exit(0);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Nearshore Navigator OAuth Listener active.');
    }
  } catch (err) {
    console.error('❌ Server error:', err.message);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal error during OAuth callback.');
    server.close();
    process.exit(1);
  }
});

server.listen(3000);

async function displayReport(authClient) {
  const analyticsdata = google.analyticsdata({ version: 'v1beta', auth: authClient });

  async function runReport(body) {
    const res = await analyticsdata.properties.runReport({
      property: `properties/${PROPERTY_ID}`,
      requestBody: body,
    });
    return res.data;
  }

  // 1. Summary
  const summaryData = await runReport({
    dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
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

  const v = (i, dec = 0) => parseFloat(summaryData.rows?.[0]?.metricValues?.[i]?.value ?? 0).toFixed(dec);

  console.log(`\n══════════════════════════════════════════════════════════`);
  console.log(`📊 NEARSHORE NAVIGATOR — GA4 SUMMARY (Last 28 Days)`);
  console.log(`══════════════════════════════════════════════════════════`);
  console.log(`  Total Sessions:        ${v(0).padStart(8)}`);
  console.log(`  Total Users:           ${v(1).padStart(8)}`);
  console.log(`  New Users:             ${v(2).padStart(8)}`);
  console.log(`  Engaged Sessions:      ${v(3).padStart(8)}`);
  console.log(`  Bounce Rate:           ${(parseFloat(v(4, 4)) * 100).toFixed(1).padStart(7)}%`);
  console.log(`  Avg Session Duration:  ${v(5, 0).padStart(7)}s`);
  console.log(`  Total Pageviews:       ${v(6).padStart(8)}`);
  console.log(`  Conversions:           ${v(7).padStart(8)}`);

  // 2. Top Pages
  const pagesData = await runReport({
    dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 15,
  });

  console.log(`\n📄 TOP PAGES (Last 28 Days)`);
  console.log(`──────────────────────────────────────────────────────────`);
  for (const row of pagesData.rows ?? []) {
    const pathStr = (row.dimensionValues[0].value).padEnd(42).substring(0, 42);
    const views = row.metricValues[0].value.padStart(6);
    const users = row.metricValues[1].value.padStart(6);
    console.log(`  ${pathStr} | ${views} views | ${users} users`);
  }

  // 3. Traffic Sources
  const sourcesData = await runReport({
    dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
  });

  console.log(`\n🔗 TRAFFIC SOURCES (Last 28 Days)`);
  console.log(`──────────────────────────────────────────────────────────`);
  for (const row of sourcesData.rows ?? []) {
    const ch = row.dimensionValues[0].value.padEnd(25);
    const sess = row.metricValues[0].value.padStart(7);
    const usr = row.metricValues[1].value.padStart(7);
    console.log(`  ${ch} | ${sess} sessions | ${usr} users`);
  }

  // 4. Countries
  const countriesData = await runReport({
    dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'country' }],
    metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 10,
  });

  console.log(`\n🌍 TOP COUNTRIES (Last 28 Days)`);
  console.log(`──────────────────────────────────────────────────────────`);
  for (const row of countriesData.rows ?? []) {
    const c = row.dimensionValues[0].value.padEnd(25);
    const sess = row.metricValues[0].value.padStart(7);
    const usr = row.metricValues[1].value.padStart(7);
    console.log(`  ${c} | ${sess} sessions | ${usr} users`);
  }
  console.log('\n══════════════════════════════════════════════════════════\n');
}
