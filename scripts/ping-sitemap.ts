import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

/**
 * CONFIGURATION & CONSTANTS
 */
const DOMAIN = 'nearshorenavigator.com';
const BASE_URL = `https://${DOMAIN}`;
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;
const GSC_SITE_DOMAIN = `sc-domain:${DOMAIN}`;
const GSC_SITE_URL = `${BASE_URL}/`;
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '9c6ec652f75d4967a5f6e8c894982637';
const INDEXNOW_KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;
const BING_API_KEY = process.env.BING_API_KEY || process.env.BING_WEBMASTER_KEY;

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000';

export interface SitemapResult {
  googleGsc: { success: boolean; status?: number; message: string };
  googlePing: { success: boolean; status?: number; message: string };
  bingIndexNow: { success: boolean; status?: number; submittedUrls: number; message: string };
  bingPing: { success: boolean; status?: number; message: string };
  bingApi?: { success: boolean; status?: number; message: string };
}

/**
 * Obtain Google OAuth2 / ADC Authentication Client
 */
async function getGoogleAuth() {
  const tokenPath = path.join(process.cwd(), 'google-token.json');
  let tokens: any = null;

  if (process.env.GOOGLE_TOKEN_JSON) {
    try {
      tokens = JSON.parse(process.env.GOOGLE_TOKEN_JSON);
      console.log('  [Auth] Using credentials from GOOGLE_TOKEN_JSON env variable');
    } catch {
      console.warn('  [Auth] Invalid GOOGLE_TOKEN_JSON environment variable');
    }
  } else if (fs.existsSync(tokenPath)) {
    try {
      tokens = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
      console.log('  [Auth] Loaded tokens from local file: google-token.json');
    } catch {
      console.warn('  [Auth] Failed to parse google-token.json file');
    }
  }

  if (tokens && CLIENT_ID && CLIENT_SECRET) {
    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oauth2Client.setCredentials(tokens);
    return oauth2Client;
  }

  // Fallback to Application Default Credentials (ADC)
  const adcPaths = [
    '/Users/gax8627/.config/gcloud/application_default_credentials.json',
    path.join(process.cwd(), '.gcloud-adc.json'),
  ];
  const foundAdc = adcPaths.find(p => fs.existsSync(p));

  if (foundAdc) {
    console.log(`  [Auth] Using Google Application Default Credentials from: ${foundAdc}`);
    return new google.auth.GoogleAuth({
      keyFile: foundAdc,
      scopes: ['https://www.googleapis.com/auth/webmasters'],
    });
  }

  throw new Error('No valid Google authentication credentials found (GOOGLE_TOKEN_JSON, google-token.json, or ADC).');
}

/**
 * Extract all SSG page URLs dynamically from Next.js sitemap generator or fallback file
 */
async function getSSGPageUrls(): Promise<string[]> {
  try {
    const sitemapModule = await import('../app/sitemap');
    const generator = sitemapModule.default;
    const routes = await generator();
    const urls = routes.map((r: any) => r.url).filter(Boolean);
    if (urls.length > 0) {
      return urls;
    }
  } catch (err: any) {
    console.warn(`  [SSG] Direct import of sitemap generator failed: ${err.message}. Checking public/sitemap.xml...`);
  }

  // Fallback: parse public/sitemap.xml if exists
  const publicSitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  if (fs.existsSync(publicSitemapPath)) {
    const xmlContent = fs.readFileSync(publicSitemapPath, 'utf8');
    const matches = xmlContent.match(/<loc>(.*?)<\/loc>/g);
    if (matches) {
      const extractedUrls = matches.map(m => m.replace(/<\/?loc>/g, '').trim());
      console.log(`  [SSG] Loaded ${extractedUrls.length} URLs from public/sitemap.xml`);
      return extractedUrls;
    }
  }

  // Minimum fallback default homepage & key SSG paths
  console.warn('  [SSG] Warning: Could not extract dynamic URLs, returning fallback core URLs');
  return [
    `${BASE_URL}/en`,
    `${BASE_URL}/es`,
    `${BASE_URL}/en/services`,
    `${BASE_URL}/en/locations`,
  ];
}

/**
 * Main Ping Sitemap Function
 */
export async function pingAllSitemaps(): Promise<SitemapResult> {
  const startTime = Date.now();
  console.log('\n===============================================================');
  console.log('📡 NEARSHORE NAVIGATOR — SITEMAP PING & INSTANT INDEXING ENGINE');
  console.log('===============================================================\n');

  console.log(`📌 Target Domain:     ${DOMAIN}`);
  console.log(`📄 Sitemap Endpoint: ${SITEMAP_URL}`);
  console.log(`🔑 IndexNow Key:     ${INDEXNOW_KEY}\n`);

  // 1. Discover SSG Page URLs
  console.log('🔎 [1/4] Discovering SSG Static Page URLs...');
  const urls = await getSSGPageUrls();
  console.log(`✅ Discovered ${urls.length} SSG static page URLs for indexation.\n`);

  const results: SitemapResult = {
    googleGsc: { success: false, message: 'Not attempted' },
    googlePing: { success: false, message: 'Not attempted' },
    bingIndexNow: { success: false, submittedUrls: 0, message: 'Not attempted' },
    bingPing: { success: false, message: 'Not attempted' },
  };

  // 2. Google Search Console API Submission
  console.log('🔵 [2/4] Submitting Sitemap to Google Search Console API...');
  try {
    const auth = await getGoogleAuth();
    const searchconsole = google.searchconsole({ version: 'v1', auth });

    // Try domain property first, then fallback to URL property
    let submitted = false;
    let lastError = '';

    for (const siteUrl of [GSC_SITE_DOMAIN, GSC_SITE_URL]) {
      try {
        const res = await searchconsole.sitemaps.submit({
          siteUrl,
          feedpath: SITEMAP_URL,
        });
        results.googleGsc = {
          success: true,
          status: res.status,
          message: `Successfully submitted sitemap to GSC for ${siteUrl} (${res.status} ${res.statusText})`,
        };
        console.log(`  ✅ GSC API: ${results.googleGsc.message}`);
        submitted = true;
        break;
      } catch (err: any) {
        lastError = err.message || String(err);
      }
    }

    if (!submitted) {
      results.googleGsc = {
        success: false,
        message: `GSC API Submission failed: ${lastError}`,
      };
      console.error(`  ❌ GSC API: ${results.googleGsc.message}`);
    }
  } catch (err: any) {
    results.googleGsc = {
      success: false,
      message: `Google Auth Error: ${err.message}`,
    };
    console.error(`  ❌ GSC API: ${results.googleGsc.message}`);
  }

  // 2b. Legacy Google Ping Endpoint
  try {
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    const res = await fetch(pingUrl, { method: 'GET' });
    results.googlePing = {
      success: res.ok,
      status: res.status,
      message: `Google Sitemap Ping response: HTTP ${res.status}`,
    };
    console.log(`  ℹ️ Google Legacy Ping: HTTP ${res.status}`);
  } catch (err: any) {
    results.googlePing = {
      success: false,
      message: `Google Legacy Ping failed: ${err.message}`,
    };
  }

  // 3. Bing IndexNow Protocol Submission
  console.log('\n🟢 [3/4] Submitting URLs to Bing / IndexNow Protocol...');
  try {
    const batchSize = 10000;
    const urlBatches: string[][] = [];
    for (let i = 0; i < urls.length; i += batchSize) {
      urlBatches.push(urls.slice(i, i + batchSize));
    }

    const indexNowEndpoints = [
      'https://www.bing.com/indexnow',
      'https://api.indexnow.org/indexnow',
    ];

    let totalSubmitted = 0;
    let overallSuccess = false;
    let statusMessages: string[] = [];

    for (const endpoint of indexNowEndpoints) {
      for (const batch of urlBatches) {
        const payload = {
          host: DOMAIN,
          key: INDEXNOW_KEY,
          keyLocation: INDEXNOW_KEY_LOCATION,
          urlList: batch,
        };

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(payload),
        });

        if (res.ok || res.status === 200 || res.status === 202) {
          overallSuccess = true;
          totalSubmitted += batch.length;
          statusMessages.push(`${endpoint} returned HTTP ${res.status}`);
        } else {
          const bodyText = await res.text().catch(() => '');
          statusMessages.push(`${endpoint} returned HTTP ${res.status}: ${bodyText}`);
        }
      }
    }

    results.bingIndexNow = {
      success: overallSuccess,
      submittedUrls: totalSubmitted,
      message: overallSuccess
        ? `Successfully submitted ${urls.length} URLs to IndexNow (${statusMessages.join('; ')})`
        : `IndexNow submission encountered errors: ${statusMessages.join('; ')}`,
    };

    if (overallSuccess) {
      console.log(`  ✅ Bing IndexNow: ${results.bingIndexNow.message}`);
    } else {
      console.error(`  ❌ Bing IndexNow: ${results.bingIndexNow.message}`);
    }
  } catch (err: any) {
    results.bingIndexNow = {
      success: false,
      submittedUrls: 0,
      message: `IndexNow ping failed: ${err.message}`,
    };
    console.error(`  ❌ Bing IndexNow: ${results.bingIndexNow.message}`);
  }

  // 4. Bing Webmaster Ping & REST API Submission
  console.log('\n🔷 [4/4] Pinging Bing Webmaster Endpoints...');
  try {
    const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    const res = await fetch(bingPingUrl, { method: 'GET' });
    results.bingPing = {
      success: res.ok,
      status: res.status,
      message: `Bing Sitemap Ping response: HTTP ${res.status}`,
    };
    console.log(`  ✅ Bing Sitemap Ping: HTTP ${res.status}`);
  } catch (err: any) {
    results.bingPing = {
      success: false,
      message: `Bing Sitemap Ping failed: ${err.message}`,
    };
    console.error(`  ❌ Bing Sitemap Ping: ${results.bingPing.message}`);
  }

  // Optional: Bing Webmaster REST API Submission if API Key is configured
  if (BING_API_KEY) {
    try {
      const bingApiUrl = `https://ssl.bing.com/webmaster/api.svc/json/SubmitSitemap?apikey=${BING_API_KEY}`;
      const res = await fetch(bingApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          siteUrl: BASE_URL,
          feedUrl: SITEMAP_URL,
        }),
      });
      results.bingApi = {
        success: res.ok,
        status: res.status,
        message: `Bing Webmaster API SubmitSitemap response: HTTP ${res.status}`,
      };
      console.log(`  ✅ Bing Webmaster API: HTTP ${res.status}`);
    } catch (err: any) {
      results.bingApi = {
        success: false,
        message: `Bing Webmaster API call failed: ${err.message}`,
      };
      console.error(`  ❌ Bing Webmaster API: ${results.bingApi.message}`);
    }
  }

  const durationMs = Date.now() - startTime;
  console.log('\n===============================================================');
  console.log(`✨ Sitemap Ping Completed in ${(durationMs / 1000).toFixed(2)}s`);
  console.log('===============================================================\n');

  return results;
}

// Execute if run directly from CLI
if (process.argv[1] && process.argv[1].includes('ping-sitemap')) {
  pingAllSitemaps().catch(err => {
    console.error('Fatal error during sitemap ping execution:', err);
    process.exit(1);
  });
}
