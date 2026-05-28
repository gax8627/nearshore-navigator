
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const CITIES = ['tijuana', 'mexicali', 'juarez', 'monterrey'];
const SERVICES = ['shelter-services', 'contract-manufacturing', 'industrial-real-estate'];
const LANGUAGES = ['en', 'es', 'de', 'ja'];

async function dynamicStressTest() {
    console.log('🧬 STARTING DYNAMIC ROUTE MATRIX STRESS TEST...\n');

    const testResults = [];
    
    for (const lang of LANGUAGES) {
        for (const city of CITIES) {
            for (const service of SERVICES) {
                const url = `https://nearshorenavigator.com/${lang}/locations/${city}/${service}`;
                const start = Date.now();
                try {
                    const res = await fetch(url, { method: 'HEAD' });
                    const time = Date.now() - start;
                    testResults.push({
                        url: `/${lang}/.../${city}/${service}`,
                        status: res.status,
                        time: `${time}ms`,
                        health: res.status === 200 ? '✅' : '❌'
                    });
                } catch (e) {
                    testResults.push({ url, status: 'ERR', time: 'N/A', health: '💀' });
                }
            }
        }
    }

    console.table(testResults.slice(0, 20)); // Show sample
    const failed = testResults.filter(r => r.status !== 200);
    
    if (failed.length > 0) {
        console.log(`\n🚨 ALERT: ${failed.length} routes failed the stress test!`);
        console.table(failed);
    } else {
        console.log(`\n🎉 SUCCESS: All ${testResults.length} matrix routes are healthy.`);
    }
}

dynamicStressTest();
