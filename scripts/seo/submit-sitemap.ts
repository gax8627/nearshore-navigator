import { google } from 'googleapis';

import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const TOKEN_PATH = path.join(process.cwd(), 'google-token.json');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000';

const SITE_URL = 'sc-domain:nearshorenavigator.com';
const SITEMAP_URL = 'https://nearshorenavigator.com/sitemap.xml';

async function submitSitemap() {
  try {
    const auth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    const tokenData = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
    auth.setCredentials(tokenData);

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    console.log(`🚀 Submitting Sitemap to Google Search Console...`);
    console.log(`Site: ${SITE_URL}`);
    console.log(`Sitemap: ${SITEMAP_URL}`);

    await searchconsole.sitemaps.submit({
      siteUrl: SITE_URL,
      feedpath: SITEMAP_URL,
    });

    console.log('✅ Success: Sitemap submitted. Google will queue it for crawling.');

  } catch (error: any) {
    if (error.message.includes('permission denied')) {
        console.error('❌ Permission Denied: Ensure the service account is added as a full Owner in Google Search Console Settings > Users and Permissions.');
    } else {
        console.error('❌ Fatal Error:', error.message);
    }
  }
}

submitSitemap();
