
import { google } from 'googleapis';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const KEY_FILE = '/Users/gax8627/.config/gcloud/application_default_credentials.json';

const PRIORITY_URLS = [
    'https://nearshorenavigator.com/ja/locations/tijuana',
    'https://nearshorenavigator.com/de/locations/mexicali',
    'https://nearshorenavigator.com/en/locations/tijuana/shelter-services',
    'https://nearshorenavigator.com/en/locations/mexicali/shelter-services',
    'https://nearshorenavigator.com/en/locations/juarez/shelter-services',
    'https://nearshorenavigator.com/es/locations/tijuana',
    'https://nearshorenavigator.com/es/locations/mexicali',
    'https://nearshorenavigator.com/es/locations/juarez',
    'https://nearshorenavigator.com/ja/locations/mexicali',
    'https://nearshorenavigator.com/de/locations/tijuana'
];

async function forceIndex() {
    console.log('🚀 Triggering Google Indexing API for Priority Location Pages...\n');

    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: KEY_FILE,
            scopes: ['https://www.googleapis.com/auth/indexing'],
        });

        const indexing = google.indexing({ version: 'v3', auth });

        for (const url of PRIORITY_URLS) {
            console.log(`📡 Pushing: ${url}`);
            try {
                const res = await indexing.urlNotifications.publish({
                    requestBody: {
                        url: url,
                        type: 'URL_UPDATED'
                    }
                });
                console.log(`   ✅ Success: ${res.data.urlNotificationMetadata?.latestUpdate?.type}`);
            } catch (err: any) {
                console.error(`   ❌ Failed: ${err.message}`);
            }
        }

        console.log('\n🏁 Force-indexing batch complete.');

    } catch (error: any) {
        console.error('Fatal Error:', error.message);
    }
}

forceIndex();
