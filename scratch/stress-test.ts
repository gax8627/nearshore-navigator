
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const TARGET_URLS = [
    'https://nearshorenavigator.com/en',
    'https://nearshorenavigator.com/es',
    'https://nearshorenavigator.com/de/locations/tijuana',
    'https://nearshorenavigator.com/ja/locations/mexicali',
    'https://nearshorenavigator.com/en/services/shelter-services',
    'https://nearshorenavigator.com/en/locations/juarez/contract-manufacturing',
    'https://nearshorenavigator.com/en/insights/2025-tariffs-baja-california-supply-chain'
];

async function stressTest() {
    console.log('🔥 INITIATING INFRASTRUCTURE STRESS TEST...\n');

    const results = [];

    for (const url of TARGET_URLS) {
        console.log(`📡 Probing: ${url}`);
        const start = Date.now();
        try {
            const res = await fetch(url, { method: 'HEAD' });
            const duration = Date.now() - start;
            results.push({
                url,
                status: res.status,
                time: `${duration}ms`,
                health: res.status === 200 ? '✅ OK' : '❌ ERROR'
            });
        } catch (err: any) {
            results.push({
                url,
                status: 'FAILED',
                time: 'N/A',
                health: '❌ CRITICAL'
            });
        }
    }

    console.table(results);
    
    console.log('\n⚖️  Brevo API Stress Audit:');
    const BREVO_KEY = process.env.BREVO_API_KEY;
    if (BREVO_KEY) {
        const bStart = Date.now();
        const bRes = await fetch('https://api.brevo.com/v3/account', {
            headers: { 'api-key': BREVO_KEY }
        });
        const bEnd = Date.now() - bStart;
        console.log(`   - Brevo API Latency: ${bEnd}ms`);
        console.log(`   - Brevo API Status: ${bRes.status === 200 ? '✅ HEALTHY' : '⚠️ DEGRADED'}`);
    }

    console.log('\n🏁 Stress Test Complete.');
}

stressTest();
