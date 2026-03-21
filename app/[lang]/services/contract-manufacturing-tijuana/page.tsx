import ContractClient from "./ContractClient";
import { Metadata } from 'next';
import { getDictionary } from '@/app/i18n/get-dictionary';

const NOINDEX_LOCALES = new Set(['fr', 'de', 'it', 'pt', 'ru']);

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as any);

  // EN-specific optimized title targeting the highest-volume Tijuana queries
  const title = lang === 'en'
    ? 'Contract Manufacturing in Tijuana Mexico | ISO Certified, $7.84/hr | 2026 Guide'
    : `${dict.contractPage.heroTitle} ${dict.contractPage.heroTitleHighlight} | Nearshore Navigator`;

  const description = lang === 'en'
    ? 'Tijuana contract manufacturers: ISO 13485 medical, AS9100 aerospace, IATF 16949 automotive. $7.84/hr labor, 0% USMCA duty, 20 min from San Diego. 60-day startup. Nearshore Navigator vets and places you — no commissions.'
    : dict.contractPage.heroSubtitle;

  return {
    title,
    description,
    robots: NOINDEX_LOCALES.has(lang) ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/services/contract-manufacturing-tijuana`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/services/contract-manufacturing-tijuana',
        'es': 'https://nearshorenavigator.com/es/services/contract-manufacturing-tijuana',
        'fr': 'https://nearshorenavigator.com/fr/services/contract-manufacturing-tijuana',
        'de': 'https://nearshorenavigator.com/de/services/contract-manufacturing-tijuana',
        'ja': 'https://nearshorenavigator.com/ja/services/contract-manufacturing-tijuana',
        'zh': 'https://nearshorenavigator.com/zh/services/contract-manufacturing-tijuana',
        'ko': 'https://nearshorenavigator.com/ko/services/contract-manufacturing-tijuana',
        'it': 'https://nearshorenavigator.com/it/services/contract-manufacturing-tijuana',
        'pt': 'https://nearshorenavigator.com/pt/services/contract-manufacturing-tijuana',
        'ru': 'https://nearshorenavigator.com/ru/services/contract-manufacturing-tijuana',
        'x-default': 'https://nearshorenavigator.com/en/services/contract-manufacturing-tijuana',
      }
    }
  };
}

export default function ContractManufacturingPage() {
  return <ContractClient />;
}
