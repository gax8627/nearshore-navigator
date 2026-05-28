
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const KEY_FILE = '/Users/gax8627/.config/gcloud/application_default_credentials.json';
const SITE_URL = 'sc-domain:nearshorenavigator.com';

async function checkSitemaps() {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: KEY_FILE,
            scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
        });

        const searchconsole = google.searchconsole({ version: 'v1', auth });

        console.log('📊 Fetching Sitemaps Status...\n');

        const res = await searchconsole.sitemaps.list({
            siteUrl: SITE_URL
        });

        if (res.data.sitemap) {
            res.data.sitemap.forEach(s => {
                console.log(`URL:    ${s.path}`);
                console.log(`Status: ${s.errors === '0' && s.warnings === '0' ? '✅ SUCCESS' : '⚠️ ISSUES'}`);
                console.log(`Last Downloaded: ${s.lastDownloaded}`);
                console.log(`Last Submitted:  ${s.lastSubmitted}`);
                console.log(`Total URLs:      ${s.contents?.[0]?.submitted}`);
                console.log(`Indexed URLs:    ${s.contents?.[0]?.indexed || 'Unknown'}`);
                console.log('--------------------------------------------------');
            });
        } else {
            console.log('❌ No sitemaps found.');
        }

    } catch (error: any) {
        console.error('Fatal Error:', error.message);
    }
}

checkSitemaps();
