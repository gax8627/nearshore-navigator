import ContractClient from "./ContractClient";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contract Manufacturing Tijuana | Medical, Aerospace & Electronics',
  description: 'Connect with verified ISO 13485 and AS9100 contract manufacturers in Tijuana. We streamline partner selection, audits, and production launch.',
};

export default function ContractManufacturingPage() {
  return <ContractClient />;
}
