import HomeClient from "./HomeClient";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nearshore Navigator | Industrial Manufacturing In Baja California',
  description: 'Strategic advisory for US companies expanding to Mexico. We connect you with verified contract manufacturers and industrial real estate in Tijuana and Baja California.',
};

export default function Home() {
  return <HomeClient />;
}
