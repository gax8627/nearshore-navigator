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

async function inspectUrl(url: string) {
  try {
    const auth = await getAuth();
    const searchconsole = google.searchconsole({ version: 'v1', auth });

    console.log(`\n🔍 Inspecting URL: ${url}`);
    const res = await searchconsole.urlInspection.index.inspect({
      requestBody: {
        inspectionUrl: url,
        siteUrl: GSC_SITE,
        languageCode: 'en-US'
      }
    });

    const result = res.data.inspectionResult;
    console.log('\n--- GSC INSPECTION RESULT ---');
    console.log('Verdict:', result?.indexStatusResult?.verdict);
    console.log('User Canonical:', result?.indexStatusResult?.userCanonical);
    console.log('Google Canonical:', result?.indexStatusResult?.googleCanonical);
    console.log('-----------------------------\n');

  } catch (e: any) {
    console.error('Error:', e.message);
  }
}

const target = process.argv[2] || 'https://nearshorenavigator.com/en/locations/tijuana/contract-manufacturing';
inspectUrl(target);
