import { Metadata } from 'next';
import CallCenterClient from './CallCenterClient';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'Call Center & BPO in Tijuana | 50K+ Bilingual Agents | 40–60% Cost Savings',
    description: 'Launch a world-class call center or BPO operation in Tijuana with 50,000+ bilingual agents, PST time-zone alignment, and 40–60% labor cost savings vs. the US.',
    openGraph: {
      title: 'Call Center & BPO in Tijuana | Nearshore Navigator',
      description: 'Bilingual call center and BPO solutions in Tijuana, Baja California. PST time zone, 40-60% cost savings, 50K+ available agents.',
    },
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/services/call-center-tijuana`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/services/call-center-tijuana',
        'es': 'https://nearshorenavigator.com/es/services/call-center-tijuana',
        'fr': 'https://nearshorenavigator.com/fr/services/call-center-tijuana',
        'de': 'https://nearshorenavigator.com/de/services/call-center-tijuana',
        'ja': 'https://nearshorenavigator.com/ja/services/call-center-tijuana',
        'zh': 'https://nearshorenavigator.com/zh/services/call-center-tijuana',
        'ko': 'https://nearshorenavigator.com/ko/services/call-center-tijuana',
        'it': 'https://nearshorenavigator.com/it/services/call-center-tijuana',
        'pt': 'https://nearshorenavigator.com/pt/services/call-center-tijuana',
        'ru': 'https://nearshorenavigator.com/ru/services/call-center-tijuana',
        'x-default': 'https://nearshorenavigator.com/en/services/call-center-tijuana',
      }
    }
  };
}

export default function CallCenterPage() {
  return <CallCenterClient />;
}
