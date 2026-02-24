import { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'Contact Us | Nearshore Navigator',
    description: 'Ready to explore nearshoring opportunities? Reach out for a free consultation about industrial manufacturing in Mexico.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/contact`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/contact',
        'es': 'https://nearshorenavigator.com/es/contact',
        'fr': 'https://nearshorenavigator.com/fr/contact',
        'de': 'https://nearshorenavigator.com/de/contact',
        'ja': 'https://nearshorenavigator.com/ja/contact',
        'zh': 'https://nearshorenavigator.com/zh/contact',
        'ko': 'https://nearshorenavigator.com/ko/contact',
        'x-default': 'https://nearshorenavigator.com/en/contact',
      }
    }
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
