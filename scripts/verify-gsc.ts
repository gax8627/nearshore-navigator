import { google } from 'googleapis';

const KEY_FILE = '/Users/gax8627/.config/gcloud/application_default_credentials.json';

async function verifyGSC() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth });

  try {
    console.log('Listing GSC sites...');
    const res = await searchconsole.sites.list();
    console.log('Sites found:', res.data.siteEntry?.map(s => s.siteUrl).join(', '));
    
    // Check if sc-domain:nearshorenavigator.com is in the list
    const sites = res.data.siteEntry || [];
    const site = sites.find(s => s.siteUrl?.includes('nearshorenavigator.com'));
    
    if (site) {
      console.log('✅ Found Nearshore Navigator:', site.siteUrl);
    } else {
      console.log('❌ Nearshore Navigator not found in the list.');
    }
  } catch (error) {
    console.error('Error listing sites:', error.message);
  }
}

verifyGSC();
