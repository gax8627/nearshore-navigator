
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GSC_SITE = 'sc-domain:nearshorenavigator.com';

async function getAuth() {
  const TOKEN_PATH = path.join(process.cwd(), 'google-token.json');
  let tokens: any = null;
  if (process.env.GOOGLE_TOKEN_JSON) {
    tokens = JSON.parse(process.env.GOOGLE_TOKEN_JSON);
  } else if (fs.existsSync(TOKEN_PATH)) {
    tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
  }
  const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, 'http://localhost:3000');
  oauth2Client.setCredentials(tokens);
  return oauth2Client;
}

async function inspectUrls(urls: string[]) {
  try {
    const auth = await getAuth();
    const searchconsole = google.searchconsole({ version: 'v1', auth });

    console.log(`\n🚀 Starting Bulk URL Inspection (${urls.length} URLs)...`);

    for (const url of urls) {
      console.log(`\n🔍 Inspecting: ${url}`);
      const res = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl: GSC_SITE,
          languageCode: 'en-US'
        }
      });

      const result = res.data.inspectionResult;
      console.log('Verdict:', result?.indexStatusResult?.verdict);
      console.log('Last Crawl:', result?.indexStatusResult?.lastCrawlTime);
      console.log('---');
      
      // Delay to avoid quota issues
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

  } catch (e: any) {
    console.error('Error:', e.message);
  }
}

const targets = [
  'https://nearshorenavigator.com/en/locations/monterrey/industries/automotive',
  'https://nearshorenavigator.com/en/locations/tijuana/industries/medical-devices',
  'https://nearshorenavigator.com/en/locations/queretaro/industries/aerospace',
  'https://nearshorenavigator.com/en/locations/juarez/industries/electronics'
];

inspectUrls(targets);
