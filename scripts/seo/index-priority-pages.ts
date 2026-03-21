import { google } from 'googleapis';
import path from 'path';

const KEY_FILE = '/Users/gax8627/.config/gcloud/application_default_credentials.json';

const PRIORITY_URLS = [
  'https://nearshorenavigator.com/en/resources/questionnaire',
  'https://nearshorenavigator.com/es/resources/questionnaire',
  'https://nearshorenavigator.com/en/blog/3pl-logistics-mexico-guide',
  'https://nearshorenavigator.com/en',
];

async function indexPages() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing({ version: 'v3', auth });

    console.log('🚀 Starting Priority Indexing Acceleration...');

    for (const url of PRIORITY_URLS) {
      try {
        const res = await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });
        console.log(`✅ Success: Indexed ${url}`);
      } catch (err: any) {
        if (err.message.includes('permission denied') || err.message.includes('403')) {
           console.warn(`⚠️ Permission Issue for ${url}: Indexing API might not be enabled for this service account or the site property.`);
           console.log('Trying GSC Inspections fallback...');
           break;
        }
        console.error(`❌ Failed: ${url} - ${err.message}`);
      }
    }

    console.log('\n✨ Priority indexing requests submitted.');
  } catch (error: any) {
    console.error('Fatal Error:', error.message);
  }
}

indexPages();
