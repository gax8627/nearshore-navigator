
import fs from 'fs';
import path from 'path';

const localesDir = path.join(process.cwd(), 'app/i18n/locales');
const locales = ['es', 'fr', 'de', 'ja', 'zh', 'ko'];
const masterLocale = 'en';

// Helper to set nested value
function setNestedValue(obj: any, keyPath: string, value: any) {
    const keys = keyPath.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key]) current[key] = {};
        current = current[key];
    }
    current[keys[keys.length - 1]] = value;
}

// Helper to get nested value
function getNestedValue(obj: any, keyPath: string) {
    const keys = keyPath.split('.');
    let current = obj;
    for (const key of keys) {
        if (current === undefined || current === null) return undefined;
        current = current[key];
    }
    return current;
}

function flattenKeys(obj: any, prefix = ''): string[] {
    let keys: string[] = [];
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            keys = keys.concat(flattenKeys(obj[key], prefix + key + '.'));
        } else {
            keys.push(prefix + key);
        }
    }
    return keys;
}

function fixTranslations() {
    console.log(`Starting Translation Fix...`);
    
    const masterPath = path.join(localesDir, `${masterLocale}.json`);
    const masterContent = JSON.parse(fs.readFileSync(masterPath, 'utf-8'));
    const masterKeys = new Set(flattenKeys(masterContent));
    
    for (const locale of locales) {
        const localePath = path.join(localesDir, `${locale}.json`);
        if (!fs.existsSync(localePath)) {
            console.error(`❌ Missing locale file: ${locale}`);
            continue;
        }

        let content = JSON.parse(fs.readFileSync(localePath, 'utf-8'));
        const localeKeys = new Set(flattenKeys(content));
        const missingKeys = [...masterKeys].filter(k => !localeKeys.has(k));

        if (missingKeys.length > 0) {
            console.log(`🔧 ${locale.toUpperCase()}: Patching ${missingKeys.length} missing keys...`);
            missingKeys.forEach(key => {
                const enValue = getNestedValue(masterContent, key);
                setNestedValue(content, key, enValue);
            });
            
            fs.writeFileSync(localePath, JSON.stringify(content, null, 4));
            console.log(`✅ ${locale.toUpperCase()} updated.`);
        } else {
            console.log(`✨ ${locale.toUpperCase()} is already up to date.`);
        }
    }
    
    console.log(`\n🎉 Translation Fix Complete.`);
}

fixTranslations();
