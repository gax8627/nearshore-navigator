import { Metadata } from 'next';
import MasterGuideClient from './MasterGuideClient';

export const metadata: Metadata = {
  title: 'The Ultimate Guide to Manufacturing in Tijuana | 2026 Nearshore Report',
  description: 'Everything you need to know about Tijuana nearshoring. Labor rates, industrial parks, USMCA compliance, and San Diego border logistics for US manufacturers.',
  openGraph: {
    title: 'Tijuana Manufacturing Master Guide | Nearshore Navigator',
    description: 'Bypass Asian supply chain risks. Explore Tijuana’s $7.84/hr labor and 0% tariff advantage.',
    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200'],
  }
};

export default function TijuanaMasterGuide() {
  return <MasterGuideClient />;
}
