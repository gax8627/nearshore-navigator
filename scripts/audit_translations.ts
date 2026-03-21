import fs from 'fs';
import path from 'path';

const localesDir = path.join(process.cwd(), 'app/i18n/locales');
const enPath = path.join(localesDir, 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

function flattenObject(ob: any) {
    var toReturn: any = {};
    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;
        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;
                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}

const enFlat = flattenObject(enData);
const enKeys = Object.keys(enFlat);

const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json') && f !== 'en.json');

files.forEach(file => {
    const langPath = path.join(localesDir, file);
    const langData = JSON.parse(fs.readFileSync(langPath, 'utf-8'));
    const langFlat = flattenObject(langData);
    
    let missingKeys = 0;
    let untranslatedKeys = 0;

    enKeys.forEach(key => {
        if (!langFlat.hasOwnProperty(key)) {
            missingKeys++;
        } else if (langFlat[key] === enFlat[key]) {
            // Check if it's identical text (could be intentional, but worth flagging)
            if (typeof enFlat[key] === 'string' && enFlat[key].match(/[a-zA-Z]/)) {
                untranslatedKeys++;
            }
        }
    });

    console.log(`[${file}] Missing Keys: ${missingKeys} | Identical to EN: ${untranslatedKeys}`);
});
