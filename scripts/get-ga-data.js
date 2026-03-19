const { BetaAnalyticsDataClient } = require('@google-analytics/data');

async function getTraffic() {
  const GA_PROPERTY_ID = '528048108';
  
  try {
    const client = new BetaAnalyticsDataClient();
    
    console.log(`\n📈 Fetching Analytics for Property: ${GA_PROPERTY_ID}...`);
    
    const [response] = await client.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [{ startDate: '2026-02-13', endDate: '2026-03-13' }],
      dimensions: [{ name: 'pagePathPlusQueryString' }],
      metrics: [{ name: 'sessions' }, { name: 'conversions' }],
      limit: 100
    });

    if (!response.rows) {
      console.log('⚠️ No analytics rows found.');
      return;
    }

    // Filter by locale
    const locales = ['/en', '/es', '/it', '/pt', '/de', '/fr', '/ja', '/ko', '/ru', '/zh'];
    console.log('\n📊 Sessions by Locale (Last 30 Days):');
    locales.forEach(loc => {
      const topRows = response.rows.filter(r => r.dimensionValues[0].value.startsWith(loc));
      const sessions = topRows.reduce((sum, r) => sum + parseInt(r.metricValues[0].value), 0);
      const conversions = topRows.reduce((sum, r) => sum + parseInt(r.metricValues[1].value), 0);
      console.log(`- ${loc}: ${sessions} sessions | ${conversions} conversions`);
    });

  } catch (error) {
    console.error('❌ Analytics Fetch Failed:', error.message);
  }
}

getTraffic();
