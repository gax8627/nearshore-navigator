import { Metadata } from 'next';
import AssessmentClient from './AssessmentClient';

export const metadata: Metadata = {
  title: 'Free Baja California Site Assessment | Nearshore Navigator',
  description: 'Get a free, data-backed evaluation of how your manufacturing or logistics operation will perform in Baja California, Mexico. Operational fit, cost modeling, and compliance audit.',
  openGraph: {
    title: 'Free Baja California Site Assessment | Nearshore Navigator',
    description: 'Free operational assessment for US companies evaluating nearshore manufacturing in Baja California, Mexico.',
  },
};

export default function AssessmentPage() {
  return <AssessmentClient />;
}
