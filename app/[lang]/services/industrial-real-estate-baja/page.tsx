import { Metadata } from 'next';
import RealEstateClient from './RealEstateClient';

export const metadata: Metadata = {
  title: 'Industrial Real Estate in Baja California | Class A Warehouses & Parks',
  description: 'Find Class A industrial space, build-to-suit, and warehouse leasing in Tijuana and Baja California. 75M+ sq ft of inventory starting at $0.75/sqft/mo.',
  openGraph: {
    title: 'Industrial Real Estate in Baja California | Nearshore Navigator',
    description: 'Class A industrial parks, build-to-suit, and warehouse leasing in Tijuana and Baja California, Mexico.',
  },
};

export default function IndustrialRealEstatePage() {
  return <RealEstateClient />;
}
