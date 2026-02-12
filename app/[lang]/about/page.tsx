import AboutClient from "./AboutClient";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Nearshore Navigator',
  description: 'We are not just brokers. We are your strategic partners for nearshoring in Mexico. Learn about our "No-BS" approach to industrial real estate and shelter services.',
};

export default function AboutPage() {
  return <AboutClient />;
}
