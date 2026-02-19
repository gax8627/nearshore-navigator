import { Metadata } from 'next';
import DistributionClient from './DistributionClient';

export const metadata: Metadata = {
  title: 'Distribution Centers in Tijuana | Section 321 & 3PL Fulfillment Services',
  description: 'Optimize cross-border logistics with strategically located 3PL, fulfillment, and distribution hubs in Tijuana — 20 minutes from San Diego. Section 321 duty-free eligible.',
  openGraph: {
    title: 'Distribution Centers in Tijuana | Nearshore Navigator',
    description: 'Cross-border logistics, Section 321 fulfillment, and 3PL warehousing in Tijuana, Baja California — 20 min from San Diego.',
  },
};

export default function DistributionCentersPage() {
  return <DistributionClient />;
}
