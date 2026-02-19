import ResourcesClient from "./ResourcesClient";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industrial Resources & Tools | Nearshore Navigator',
  description: 'Access free tools for manufacturing in Mexico: Tijuana Industrial Map, Cost Estimators, Logistics Questionnaires, and Market Insights.',
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
