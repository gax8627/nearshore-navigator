import AboutClient from "./AboutClient";
import { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'About Nearshore Navigator | Expert Nearshoring Advisors in Baja California',
    description: 'Meet the team behind Nearshore Navigator — boots-on-the-ground advisors helping US companies set up manufacturing in Tijuana and Baja California since 2020.',
    alternates: {
      canonical: `https://nearshorenavigator.com/en/about`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/about',
        'es': 'https://nearshorenavigator.com/es/about',
        'fr': 'https://nearshorenavigator.com/fr/about',
        'de': 'https://nearshorenavigator.com/de/about',
        'ja': 'https://nearshorenavigator.com/ja/about',
        'zh': 'https://nearshorenavigator.com/zh/about',
        'ko': 'https://nearshorenavigator.com/ko/about',
        'it': 'https://nearshorenavigator.com/it/about',
        'pt': 'https://nearshorenavigator.com/pt/about',
        'ru': 'https://nearshorenavigator.com/ru/about',
        'x-default': 'https://nearshorenavigator.com/en/about',
      }
    }
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
