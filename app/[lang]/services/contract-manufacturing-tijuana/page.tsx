import { getAlternateLanguages } from '@/app/constants/seo-config';
import ContractClient from "./ContractClient";
import { Metadata } from 'next';
import { getDictionary } from '@/app/i18n/get-dictionary';


export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as any);

  const title = lang === 'en'
    ? 'Contract Manufacturing in Tijuana Mexico | Vetted ISO Facilities | 2026 Guide'
    : `${dict.contractPage.heroTitle} ${dict.contractPage.heroTitleHighlight} | Nearshore Navigator`;

  const description = lang === 'en'
    ? 'Tijuana contract manufacturing: network of ISO 13485 medical, AS9100 aerospace, and IATF 16949 facilities. Competitive labor rates, preferential USMCA access on qualifying goods, 20 min from San Diego.'
    : dict.contractPage.heroSubtitle;

  return {
    title,
    description,
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/services/contract-manufacturing-tijuana`,
      languages: getAlternateLanguages('/services/contract-manufacturing-tijuana')
    }
  };
}

export default function ContractManufacturingPage() {
  return <ContractClient />;
                                       }
