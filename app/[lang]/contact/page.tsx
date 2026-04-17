import { Metadata } from 'next';
import ContactClient from './ContactClient';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  
  return {
    title: 'Contact Us | Nearshore Navigator',
    description: 'Get in touch with Nearshore Navigator for industrial nearshoring expertise in Baja California, Mexico.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/contact`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/contact',
        'es': 'https://nearshorenavigator.com/es/contact',
        'x-default': 'https://nearshorenavigator.com/en/contact',
      }
    }
  };
}

export default function Page() {
  return <ContactClient />;
}
