import { google } from 'googleapis';

const PROPERTY_URL = 'sc-domain:nearshorenavigator.com';
const TEST_URL = 'https://nearshorenavigator.com/en';

async function inspectUrl() {
  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    const properties = [
      'sc-domain:nearshorenavigator.com',
      'https://nearshorenavigator.com/',
      'https://www.nearshorenavigator.com/',
      'https://nearshore-navigator.com/'
    ];

    for (const prop of properties) {
      console.log(`\n🔍 Checking property: ${prop}`);
      try {
        const res = await searchconsole.urlInspection.index.inspect({
          requestBody: {
            inspectionUrl: prop.startsWith('sc-domain') ? 'https://nearshorenavigator.com/' : prop,
            siteUrl: prop,
            languageCode: 'en-US'
          }
        });
        console.log(`✅ SUCCESS for ${prop}:`, res.data.inspectionResult?.indexStatusResult?.verdict);
      } catch (e: any) {
        console.log(`❌ FAILED for ${prop}: ${e.message}`);
      }
    }
  } catch (error: any) {
    console.error('❌ Permission Check Failed:', error.message);
    if (error.response) {
      console.error('Response Data:', error.response.data);
    }
  }
}

inspectUrl();
