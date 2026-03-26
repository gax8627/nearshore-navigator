import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

/**
 * INSTANT INDEXING ENGINE
 * 
 * Target: Google Search Console & Bing IndexNow
 * Goal: Trigger a re-crawl of the 3,600 URLs in the new sitemap immediately.
 */

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const KEY_FILE = '/Users/gax8627/.config/gcloud/application_default_credentials.json';
const GSC_SITE = 'sc-domain:nearshorenavigator.com';
const SITEMAP_URL = 'https://nearshorenavigator.com/sitemap.xml';
const INDEXNOW_KEY = '9c6ec652f75d4967a5f6e8c894982637';

// Loaded from environment variables (e.g. .env.local or GitHub Secrets)
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000';

async function getAuth() {
  const TOKEN_PATH = path.join(process.cwd(), 'google-token.json');
  let tokens: any = null;

  // 1. Priority: Environment Variable (CI / GitHub Actions)
  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.warn('[Auth] GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not found in env. Falling back to ADC if possible.');
  }

  if (process.env.GOOGLE_TOKEN_JSON) {
    console.log('[Auth] Using tokens from GOOGLE_TOKEN_JSON environment variable...');
    tokens = JSON.parse(process.env.GOOGLE_TOKEN_JSON);
  } 
  // 2. Secondary: Local token file
  else if (fs.existsSync(TOKEN_PATH)) {
    console.log('[Auth] Using manually generated google-token.json file...');
    tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
  }

  if (tokens) {
    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oauth2Client.setCredentials(tokens);
    return oauth2Client;
  } else {
    console.log('[Auth] Falling back to Application Default Credentials...');
    return new google.auth.GoogleAuth({
      keyFile: KEY_FILE,
      scopes: ['https://www.googleapis.com/auth/webmasters'],
    });
  }
}

async function instantIndex() {
  console.log('\n🚀 Starting Instant Indexing Engine...');
  console.log('───────────────────────────────────────');

  const auth = await getAuth();
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  /**
   * ─── GOOGLE SEARCH CONSOLE SITEMAP SUBMISSION ───
   */
  console.log('\n[Google] Submitting Sitemap Index...');
  try {
    await searchconsole.sitemaps.submit({
      siteUrl: GSC_SITE,
      feedpath: SITEMAP_URL,
    });
    console.log('✅ Google: Submission Success. Sitemap queued for parsing.');
  } catch (e: any) {
    console.error('❌ Google Error:', e.message);
  }

  /**
   * ─── BING / INDEXNOW SUBMISSION ───
   */
  console.log('\n[Bing] Pinging IndexNow protocol...');
  try {
    const res = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: 'nearshorenavigator.com',
        key: INDEXNOW_KEY,
        keyLocation: `https://nearshorenavigator.com/${INDEXNOW_KEY}.txt`,
        urlList: [SITEMAP_URL],
      }),
    });

    if (res.ok) {
      console.log('✅ Bing: IndexNow Ping Success (HTTP 200/202).');
    } else {
      const text = await res.text();
      console.error(`❌ Bing Error (${res.status}):`, text);
    }
  } catch (e: any) {
    console.error('❌ Bing Error:', e.message);
  }

  console.log('\n───────────────────────────────────────');
  console.log('🏁 Instant Indexing complete. Check GSC in ~24h for status.\n');
}

instantIndex();
