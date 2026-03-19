import { google } from 'googleapis';

async function listSites() {
  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
    const searchconsole = google.searchconsole({ version: 'v1', auth });
    const res = await searchconsole.sites.list();
    console.log('✅ SITES FOUND:');
    res.data.siteEntry?.forEach(site => {
      console.log(`- ${site.siteUrl} (${site.permissionLevel})`);
    });
  } catch (error: any) {
    console.error('❌ Failed to list sites:', error.message);
  }
}

listSites();
