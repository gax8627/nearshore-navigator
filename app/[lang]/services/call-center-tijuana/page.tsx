import { getAlternateLanguages } from '@/app/constants/seo-config';
import { Metadata } from 'next';
import CallCenterClient from './CallCenterClient';


export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'Call Center & BPO in Tijuana | Bilingual Talent | Nearshore Navigator',
    description: 'Launch or evaluate call center and BPO operations in Tijuana with skilled bilingual agents, Pacific time-zone alignment, and competitive labor cost structures vs. the US.',
    openGraph: {
      title: 'Call Center & BPO in Tijuana | Nearshore Navigator',
      description: 'Bilingual call center and BPO advisory in Tijuana, Baja California. Pacific time zone alignment, bilingual talent, and competitive operational cost advantages.',
    },
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/services/call-center-tijuana`,
      languages: getAlternateLanguages('/services/call-center-tijuana')
    }
  };
}

export default function CallCenterPage() {
  return <CallCenterClient />;
  }
