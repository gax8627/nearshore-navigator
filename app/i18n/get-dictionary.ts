interface Dictionary {
  [key: string]: any;
}

function deepMerge(target: any, source: any): any {
  if (!source) return target;
  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      output[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}

const dictionaries: { [key: string]: () => Promise<Dictionary> } = {
  en: () => import('./locales/en.json').then((module) => module.default),
  es: () => import('./locales/es.json').then((module) => module.default),
  fr: () => import('./locales/fr.json').then((module) => module.default),
  de: () => import('./locales/de.json').then((module) => module.default),
  ja: () => import('./locales/ja.json').then((module) => module.default),
  zh: () => import('./locales/zh.json').then((module) => module.default),
  ko: () => import('./locales/ko.json').then((module) => module.default),
  pt: () => import('./locales/pt.json').then((module) => module.default),
  it: () => import('./locales/it.json').then((module) => module.default),
  ru: () => import('./locales/ru.json').then((module) => module.default),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  const enDict = await dictionaries.en();
  if (!locale || locale === 'en' || !dictionaries[locale]) {
    return enDict;
  }
  const localeDict = await dictionaries[locale]();
  return deepMerge(enDict, localeDict);
};
