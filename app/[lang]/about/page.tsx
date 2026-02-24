import AboutClient from "./AboutClient";
import { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'About Us | Nearshore Navigator',
    description: 'We are not just brokers. We are your strategic partners for nearshoring in Mexico. Learn about our "No-BS" approach to industrial real estate and shelter services.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/about`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/about',
        'es': 'https://nearshorenavigator.com/es/about',
        'fr': 'https://nearshorenavigator.com/fr/about',
        'de': 'https://nearshorenavigator.com/de/about',
        'ja': 'https://nearshorenavigator.com/ja/about',
        'zh': 'https://nearshorenavigator.com/zh/about',
        'ko': 'https://nearshorenavigator.com/ko/about',
        'x-default': 'https://nearshorenavigator.com/en/about',
      }
    }
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
