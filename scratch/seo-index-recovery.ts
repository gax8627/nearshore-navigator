
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const KEY_FILE = '/Users/gax8627/.config/gcloud/application_default_credentials.json';
const SITE_URL = 'sc-domain:nearshorenavigator.com';
const SITEMAP_URL = 'https://nearshorenavigator.com/sitemap.xml';

async function runSeoIndexFix() {
    console.log('🛠️  RUNNING SEO INDEX RECOVERY...\n');

    try {
        // 1. Setup Auth (Service Account)
        const auth = new google.auth.GoogleAuth({
            keyFile: KEY_FILE,
            scopes: ['https://www.googleapis.com/auth/webmasters'],
        });

        const searchconsole = google.searchconsole({ version: 'v1', auth });

        // 2. Resubmit Sitemap to Google
        console.log('[Google] Resubmitting Sitemap Index...');
        await searchconsole.sitemaps.submit({
            siteUrl: SITE_URL,
            feedpath: SITEMAP_URL,
        });
        console.log('✅ Google: Sitemap submitted successfully.');

        // 3. Ping Bing with Priority URLs
        console.log('\n[Bing] Pinging IndexNow with Priority URLs...');
        const priorityUrls = [
            'https://nearshorenavigator.com/en',
            'https://nearshorenavigator.com/ja/locations/tijuana',
            'https://nearshorenavigator.com/de/locations/mexicali',
            'https://nearshorenavigator.com/en/locations/tijuana/shelter-services',
            'https://nearshorenavigator.com/en/locations/mexicali/shelter-services',
            'https://nearshorenavigator.com/es/locations/tijuana',
            'https://nearshorenavigator.com/es/locations/mexicali'
        ];

        const bingRes = await fetch('https://www.bing.com/indexnow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                host: 'nearshorenavigator.com',
                key: '9c6ec652f75d4967a5f6e8c894982637',
                keyLocation: `https://nearshorenavigator.com/9c6ec652f75d4967a5f6e8c894982637.txt`,
                urlList: priorityUrls,
            }),
        });

        if (bingRes.ok) {
            console.log(`✅ Bing: IndexNow Success. Submitted ${priorityUrls.length} URLs.`);
        } else {
            console.error(`❌ Bing Error: ${bingRes.status}`);
        }

        console.log('\n🏁 SEO Index Recovery Complete.');

    } catch (error: any) {
        console.error('❌ Fatal Error:', error.message);
    }
}

runSeoIndexFix();
