import BrochureClient from "./BrochureClient";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nearshore Navigator Brochure | Download PDF',
  description: 'Download our comprehensive guide to manufacturing in Baja California. Services, statistics, and strategic advantages.',
};

export default function BrochurePage() {
  return <BrochureClient />;
}
