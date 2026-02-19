
import fs from 'fs';
import path from 'path';

const localesDir = path.join(process.cwd(), 'app/i18n/locales');
const locales = ['es', 'fr', 'de', 'ja', 'zh', 'ko'];
const masterLocale = 'en';

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

function audit() {
    console.log(`Starting Translation Audit...`);
    
    // Load Master (EN)
    const masterPath = path.join(localesDir, `${masterLocale}.json`);
    if (!fs.existsSync(masterPath)) {
        console.error(`❌ Master locale file not found: ${masterPath}`);
        process.exit(1);
    }
    const masterContent = JSON.parse(fs.readFileSync(masterPath, 'utf-8'));
    const masterKeys = new Set(flattenKeys(masterContent));
    console.log(`✅ Master (${masterLocale}) loaded: ${masterKeys.size} keys.`);

    let hasErrors = false;

    for (const locale of locales) {
        const localePath = path.join(localesDir, `${locale}.json`);
        if (!fs.existsSync(localePath)) {
            console.error(`❌ Missing locale file: ${locale}`);
            hasErrors = true;
            continue;
        }

        const content = JSON.parse(fs.readFileSync(localePath, 'utf-8'));
        const keys = new Set(flattenKeys(content));
        const missingKeys = [...masterKeys].filter(k => !keys.has(k));

        if (missingKeys.length > 0) {
            console.error(`⚠️  ${locale.toUpperCase()}: Missing ${missingKeys.length} keys`);
            // Only show first 5 to avoid spam
            missingKeys.slice(0, 5).forEach(k => console.error(`   - ${k}`));
            if (missingKeys.length > 5) console.error(`   ...and ${missingKeys.length - 5} more.`);
            hasErrors = true;
        } else {
            console.log(`✅ ${locale.toUpperCase()}: 100% Match (${keys.size} keys)`);
        }
    }

    if (hasErrors) {
        console.warn(`\n⚠️  Audit completed with warnings. Some keys are missing in target languages.`);
        console.warn(`Note: "resources" and "brochure" keys were recently added. If they are missing in ES, that is expected/fixable.`);
    } else {
        console.log(`\n🎉 Audit Passed! All locales have 100% key parity.`);
    }
}

audit();
