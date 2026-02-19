import { Metadata } from 'next';
import CallCenterClient from './CallCenterClient';

export const metadata: Metadata = {
  title: 'Call Center & BPO in Tijuana | 50K+ Bilingual Agents | 40–60% Cost Savings',
  description: 'Launch a world-class call center or BPO operation in Tijuana with 50,000+ bilingual agents, PST time-zone alignment, and 40–60% labor cost savings vs. the US.',
  openGraph: {
    title: 'Call Center & BPO in Tijuana | Nearshore Navigator',
    description: 'Bilingual call center and BPO solutions in Tijuana, Baja California. PST time zone, 40-60% cost savings, 50K+ available agents.',
  },
};

export default function CallCenterPage() {
  return <CallCenterClient />;
}
