import { google } from 'googleapis';
import path from 'path';

const KEY_FILE = '/Users/gax8627/.config/gcloud/application_default_credentials.json';

async function listSites() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });
    const res = await searchconsole.sites.list();
    
    console.log('Search Console Sites:');
    res.data.siteEntry?.forEach(site => {
      console.log(`- ${site.siteUrl} (Permission: ${site.permissionLevel})`);
    });
  } catch (error: any) {
    console.error('Error listing sites:', error.message);
  }
}

listSites();
