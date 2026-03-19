const { google } = require('googleapis');
const path = require('path');

async function getPerformance() {
  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
    const searchconsole = google.searchconsole({ version: 'v1', auth });
    
    const SITE_URL = 'sc-domain:nearshorenavigator.com';
    
    console.log(`\n📊 Fetching performance for ${SITE_URL}...`);
    const res = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: '2026-02-13',
        endDate: '2026-03-13',
        dimensions: ['QUERY', 'PAGE'],
        rowLimit: 50
      }
    });

    if (!res.data.rows) {
      console.log('⚠️ No performance data found for this period.');
      return;
    }

    console.log('✅ PERFORMANCE DATA (Top 10):');
    res.data.rows.slice(0, 10).forEach(row => {
      console.log(`- Q: ${row.keys[0]} | P: ${row.keys[1]} | Clicks: ${row.clicks} | Impr: ${row.impressions} | CTR: ${(row.ctr * 100).toFixed(2)}%`);
    });

    // Check subdirectory impressions
    const pages = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: '2026-02-13',
        endDate: '2026-03-13',
        dimensions: ['PAGE'],
        rowLimit: 100
      }
    });

    const locales = ['/es', '/it', '/pt', '/de', '/fr', '/ja', '/ko', '/ru', '/zh'];
    console.log('\n🌍 Locale Subdirectory Visibility:');
    locales.forEach(loc => {
      const imps = pages.data.rows
        ? pages.data.rows
            .filter(r => r.keys[0].includes(loc))
            .reduce((sum, r) => sum + r.impressions, 0)
        : 0;
      console.log(`- ${loc}: ${imps} impressions`);
    });

  } catch (error) {
    console.error('❌ Data Fetch Failed:', error.message);
  }
}

getPerformance();
