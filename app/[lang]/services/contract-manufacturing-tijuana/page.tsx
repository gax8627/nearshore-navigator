import ContractClient from "./ContractClient";
import { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'Contract Manufacturing in Tijuana | 30–50% Cost Savings | ISO-Certified Partners',
    description: 'Connect with verified ISO 13485 and AS9100 contract manufacturers in Tijuana. Save 30–50% vs. US costs on medical, aerospace, and electronics production.',
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
