import { Metadata } from 'next';
import Section321Client from './Section321Client';
import { getDictionary } from '@/app/i18n/get-dictionary';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await props.params;
    return {
        title: 'Section 321 Master Guide | Tijuana Distribution Centers',
        description: 'Navigate the 2025 de minimis suspension and discover compliant Section 321 distribution strategies in Mexico.',
        alternates: {
            canonical: `https://nearshorenavigator.com/${lang}/services/distribution-centers-tijuana/section-321-guide`,
            languages: {
              'en': 'https://nearshorenavigator.com/en/services/distribution-centers-tijuana/section-321-guide',
              'es': 'https://nearshorenavigator.com/es/services/distribution-centers-tijuana/section-321-guide',
              'fr': 'https://nearshorenavigator.com/fr/services/distribution-centers-tijuana/section-321-guide',
              'de': 'https://nearshorenavigator.com/de/services/distribution-centers-tijuana/section-321-guide',
              'ja': 'https://nearshorenavigator.com/ja/services/distribution-centers-tijuana/section-321-guide',
              'zh': 'https://nearshorenavigator.com/zh/services/distribution-centers-tijuana/section-321-guide',
              'ko': 'https://nearshorenavigator.com/ko/services/distribution-centers-tijuana/section-321-guide',
              'x-default': 'https://nearshorenavigator.com/en/services/distribution-centers-tijuana/section-321-guide',
            }
        }
    };
}

export default async function Section321GuidePage(props: { params: Promise<{ lang: string }> }) {
    const { lang } = await props.params;
    const dict = await getDictionary(lang);
    return <Section321Client dict={dict} />;
}
