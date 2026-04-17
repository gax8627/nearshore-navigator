import ContractClient from "./ContractClient";
import { Metadata } from 'next';
import { getDictionary } from '@/app/i18n/get-dictionary';


export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as any);

  const title = lang === 'en'
    ? 'Contract Manufacturing in Tijuana Mexico | ISO Certified, $7.84/hr | 2026 Guide'
    : `${dict.contractPage.heroTitle} ${dict.contractPage.heroTitleHighlight} | Nearshore Navigator`;

  const description = lang === 'en'
    ? 'Tijuana contract manufacturers: ISO 13485 medical, AS9100 aerospace, IATF 16949 automotive. $7.84/hr labor, 0% USMCA duty, 20 min from San Diego. 60-day startup. Nearshore Navigator vets and places you — no commissions.'
    : dict.contractPage.heroSubtitle;

  return {
    title,
    description,
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/services/contract-manufacturing-tijuana`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/services/contract-manufacturing-tijuana',
        'es': 'https://nearshorenavigator.com/es/services/contract-manufacturing-tijuana',
        'x-default': 'https://nearshorenavigator.com/en/services/contract-manufacturing-tijuana',
      }
    }
  };
}

export default function ContractManufacturingPage() {
  return <ContractClient />;
                                       }
