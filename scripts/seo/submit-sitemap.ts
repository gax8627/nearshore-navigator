import { google } from 'googleapis';

const KEY_FILE = '/Users/gax8627/.config/gcloud/application_default_credentials.json';
const SITE_URL = 'sc-domain:nearshorenavigator.com';
const SITEMAP_URL = 'https://nearshorenavigator.com/sitemap.xml';

async function submitSitemap() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE,
      scopes: [
        'https://www.googleapis.com/auth/webmasters',
        'https://www.googleapis.com/auth/searchconsole'
      ],
    });

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
