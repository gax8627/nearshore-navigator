
interface Dictionary {
  [key: string]: any;
}

const dictionaries: { [key: string]: () => Promise<Dictionary> } = {
  en: () => import('./locales/en.json').then((module) => module.default),
  es: () => import('./locales/es.json').then((module) => module.default),
  fr: () => import('./locales/fr.json').then((module) => module.default),
  de: () => import('./locales/de.json').then((module) => module.default),
  ja: () => import('./locales/ja.json').then((module) => module.default),
  zh: () => import('./locales/zh.json').then((module) => module.default),
  ko: () => import('./locales/ko.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
  const dictionaryLoader = dictionaries[locale] || dictionaries.en;
  return dictionaryLoader();
}
