import { google } from 'googleapis';
import path from 'path';

const KEY_FILE = '/Users/gax8627/.config/gcloud/application_default_credentials.json';
const SITE_URL = 'sc-domain:nearshorenavigator.com';

const URLS_TO_CHECK = [
  'https://nearshorenavigator.com/en',
  'https://nearshorenavigator.com/ja/locations/tijuana',
  'https://nearshorenavigator.com/de/locations/mexicali',
  'https://nearshorenavigator.com/es/locations/juarez',
  'https://nearshorenavigator.com/en/services/shelter-services'
];

async function checkIndexStatus() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    console.log('🔍 Running Deep Indexing Audit via GSC URL Inspection API...\n');

    for (const url of URLS_TO_CHECK) {
      console.log(`Inspecting: ${url}`);
      try {
        const res = await searchconsole.urlInspection.index.inspect({
          requestBody: {
            inspectionUrl: url,
            siteUrl: SITE_URL,
            languageCode: 'en-US'
          }
        });

        const result = res.data.inspectionResult;
        if (!result) {
            console.log('  ⚠️ No inspection result returned.');
            continue;
        }

        const indexStatus = result.indexStatusResult;
        console.log(`  Verdict: ${indexStatus?.verdict}`);
        console.log(`  Coverage State: ${indexStatus?.coverageState}`);
        console.log(`  Last Crawl: ${indexStatus?.lastCrawlTime || 'Never'}`);
        if (indexStatus?.verdict !== 'PASS') {
            console.log(`  User Canonical: ${indexStatus?.userCanonical}`);
            console.log(`  Google Canonical: ${indexStatus?.googleCanonical}`);
        }
        console.log('--------------------------------------------------');
      } catch (err: any) {
        console.error(`  ❌ Failed to inspect URL: ${err.message}`);
      }
    }

  } catch (error: any) {
    console.error('Fatal Error:', error.message);
  }
}

checkIndexStatus();
