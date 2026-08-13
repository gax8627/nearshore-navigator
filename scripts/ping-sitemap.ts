import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GSC_SITE = 'sc-domain:nearshorenavigator.com';
const SITEMAP_URL = 'https://nearshorenavigator.com/sitemap.xml';

async function getAuth() {
  const TOKEN_PATH = path.join(process.cwd(), 'google-token.json');
  let tokens: any = null;

  if (process.env.GOOGLE_TOKEN_JSON) {
    tokens = JSON.parse(process.env.GOOGLE_TOKEN_JSON);
  } else if (fs.existsSync(TOKEN_PATH)) {
    tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
  }

  if (tokens) {
    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, 'http://localhost:3000');
    oauth2Client.setCredentials(tokens);
    return oauth2Client;
  }
  throw new Error('No valid Google tokens found.');
}

async function pingSitemap() {
  console.log('📡 Pinging Google Search Console to submit sitemap...');
  try {
    const auth = await getAuth();
    const searchconsole = google.searchconsole({ version: 'v1', auth });

    const res = await searchconsole.sitemaps.submit({
      siteUrl: GSC_SITE,
      feedpath: SITEMAP_URL,
    });

    console.log('✅ Sitemap successfully submitted!');
    console.log('Response Status:', res.status, res.statusText);
  } catch (error: any) {
    console.error('❌ Failed to ping sitemap:', error.message);
  }
}

pingSitemap();
