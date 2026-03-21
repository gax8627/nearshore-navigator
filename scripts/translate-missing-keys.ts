import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const locales = ['es', 'fr', 'de', 'ja', 'zh', 'ko', 'it', 'pt', 'ru'];
const localesDir = path.join(process.cwd(), 'app/i18n/locales');
const enPath = path.join(localesDir, 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

function flattenObject(ob: any) {
    let toReturn: any = {};
    for (let i in ob) {
        if (!ob.hasOwnProperty(i)) continue;
        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            let flatObject = flattenObject(ob[i]);
            for (let x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;
                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}

function unflattenObject(ob: any) {
    let result: any = {};
    for (let key in ob) {
        let keys = key.split('.');
        let current = result;
        for (let i = 0; i < keys.length; i++) {
            let k = keys[i];
            if (i === keys.length - 1) {
                current[k] = ob[key];
            } else {
                current[k] = current[k] || {};
                current = current[k];
            }
        }
    }

    const fixArrays = (obj: any) => {
        for (let k in obj) {
            if (typeof obj[k] === 'object' && obj[k] !== null) {
                fixArrays(obj[k]);
                const keys = Object.keys(obj[k]);
                if (keys.length > 0 && keys.every(key => !isNaN(Number(key)))) {
                    const arr: any[] = [];
                    const sortedKeys = keys.map(Number).sort((a, b) => a - b);
                    if (sortedKeys[0] === 0 && sortedKeys[sortedKeys.length - 1] === sortedKeys.length - 1) {
                        sortedKeys.forEach(num => {
                            arr[num] = obj[k][num.toString()];
                        });
                        obj[k] = arr;
                    }
                }
            }
        }
    };
    fixArrays(result);
    return result;
}

const enFlat = flattenObject(enData);
const BATCH_SIZE = 50; // Optimized batching: 50 keys per request reduces RPM significantly

async function translateBatch(batch: string[], locale: string): Promise<Record<string, string>> {
    const prompt = `Translate these B2B manufacturing and nearshoring dictionary keys from English to ${locale}. 
Return a JSON object where the keys are EXACTLY the same as provided.
Tone: Professional, Authoritative, B2B.
Do NOT translate city names (Tijuana, Mexicali, etc.) or brand names like "Nearshore Navigator".
Maintain all variable placeholders like {name} or {location} as is.
JSON format only.

Keys:
${batch.map(k => `${k}: ${enFlat[k]}`).join('\n')}
`;

    let backoff = 10000;
    while (true) {
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const jsonStr = text.match(/\{[\s\S]*\}/)?.[0] || text;
            const translated: Record<string, string> = JSON.parse(jsonStr);

            return translated;
        } catch (e: any) {
            if (e?.status === 429 || e?.message?.includes('429')) {
                console.log(`    Rate limited (429). Waiting ${backoff/1000}s then retrying...`);
                await new Promise(resolve => setTimeout(resolve, backoff));
                backoff = Math.min(backoff * 2, 300000); 
            } else {
                console.error(`    Error in batch: ${e.message || e}`);
                await new Promise(resolve => setTimeout(resolve, 30000));
                return {}; // Skip bad batch
            }
        }
    }
}

const targetLocales = process.argv.slice(2);
const localesToProcess = targetLocales.length > 0 ? targetLocales : locales;

async function translateMissingKeys() {
  console.log(`Starting Optimized Sequential Sweep: ${localesToProcess.join(', ')}`);
  for (const locale of localesToProcess) {
    const localePath = path.join(localesDir, `${locale}.json`);
    if (!fs.existsSync(localePath)) continue;

    const localeData = JSON.parse(fs.readFileSync(localePath, 'utf8'));
    const localeFlat = flattenObject(localeData);

    const keysToTranslate: string[] = [];
    for (const key in enFlat) {
      if (typeof enFlat[key] === 'string' && (localeFlat[key] === enFlat[key] || !localeFlat[key]) && enFlat[key].match(/[a-zA-Z]/)) {
        keysToTranslate.push(key);
      }
    }

    if (keysToTranslate.length === 0) {
      console.log(`[${locale}] 100% Translated.`);
      continue;
    }

    console.log(`\n[${locale}] Translating ${keysToTranslate.length} remaining keys in batches of ${BATCH_SIZE}...`);

    const translatedFlat = { ...localeFlat };
    
    for (let i = 0; i < keysToTranslate.length; i += BATCH_SIZE) {
      const batch = keysToTranslate.slice(i, i + BATCH_SIZE);
      console.log(`  [${locale}] Processing Batch ${Math.floor(i/BATCH_SIZE)+1}/${Math.ceil(keysToTranslate.length/BATCH_SIZE)}...`);
      
      const translatedBatch = await translateBatch(batch, locale);
      
      for (const key of batch) {
          if (translatedBatch[key]) {
              translatedFlat[key] = translatedBatch[key];
          }
      }

      fs.writeFileSync(localePath, JSON.stringify(unflattenObject(translatedFlat), null, 2));
      // 5-second breath between batches to keep RPM low but efficient
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

translateMissingKeys().catch(console.error);
