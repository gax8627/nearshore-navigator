import { Metadata } from 'next';
import Section321Client from './Section321Client';
import { getDictionary } from '@/app/i18n/get-dictionary';
import { NOINDEX_LOCALES } from '@/app/constants/seo-config';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await props.params;
    const dict = await getDictionary(lang);
    
    const title = dict.s321?.heroTitle ? `${dict.s321.heroTitle} ${dict.s321.heroTitleHighlight || ''} | Nearshore Navigator` : 'Section 321 Master Guide | Tijuana Distribution Centers';
    const description = dict.s321?.heroSubtitle || 'Navigate the 2025 de minimis suspension and discover compliant Section 321 distribution strategies in Mexico.';

    return {
        title,
        description,
        robots: NOINDEX_LOCALES.has(lang) ? { index: false, follow: true } : undefined,
        alternates: {
            canonical: NOINDEX_LOCALES.has(lang)
              ? 'https://nearshorenavigator.com/en/services/distribution-centers-tijuana/section-321-guide'
              : `https://nearshorenavigator.com/${lang}/services/distribution-centers-tijuana/section-321-guide`,
            languages: {
              'en': 'https://nearshorenavigator.com/en/services/distribution-centers-tijuana/section-321-guide',
              'es': 'https://nearshorenavigator.com/es/services/distribution-centers-tijuana/section-321-guide',
              'fr': 'https://nearshorenavigator.com/fr/services/distribution-centers-tijuana/section-321-guide',
              'de': 'https://nearshorenavigator.com/de/services/distribution-centers-tijuana/section-321-guide',
              'ja': 'https://nearshorenavigator.com/ja/services/distribution-centers-tijuana/section-321-guide',
              'zh': 'https://nearshorenavigator.com/zh/services/distribution-centers-tijuana/section-321-guide',
              'ko': 'https://nearshorenavigator.com/ko/services/distribution-centers-tijuana/section-321-guide',
              'it': 'https://nearshorenavigator.com/it/services/distribution-centers-tijuana/section-321-guide',
              'pt': 'https://nearshorenavigator.com/pt/services/distribution-centers-tijuana/section-321-guide',
              'ru': 'https://nearshorenavigator.com/ru/services/distribution-centers-tijuana/section-321-guide',
              'x-default': 'https://nearshorenavigator.com/en/services/distribution-centers-tijuana/section-321-guide',
            }
        }
    };
}

export default async function Section321GuidePage(props: { params: Promise<{ lang: string }> }) {
    const { lang } = await props.params;
    
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://nearshorenavigator.com/${lang}` },
                { "@type": "ListItem", "position": 2, "name": "Distribution Centers", "item": `https://nearshorenavigator.com/${lang}/services/distribution-centers-tijuana` },
                { "@type": "ListItem", "position": 3, "name": "Section 321 Guide", "item": `https://nearshorenavigator.com/${lang}/services/distribution-centers-tijuana/section-321-guide` }
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Set Up Section 321 Distribution from a Tijuana Distribution Center",
            "description": "Step-by-step guide to establishing compliant Section 321 de minimis cross-border distribution operations using Tijuana as a nearshore fulfillment hub.",
            "totalTime": "P90D",
            "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "5000" },
            "step": [
                { "@type": "HowToStep", "position": 1, "name": "Assess product eligibility", "text": "Confirm your goods qualify under Section 321: shipments must be valued at $800 or less per recipient per day. Excluded categories include alcohol, tobacco, and textiles with quota restrictions." },
                { "@type": "HowToStep", "position": 2, "name": "Select a Tijuana distribution center", "text": "Choose a Class A warehouse in Tijuana near the Otay Mesa commercial crossing. Look for bonded warehouse status, 24/7 operations, and integrated customs brokerage partnerships." },
                { "@type": "HowToStep", "position": 3, "name": "Establish customs brokerage", "text": "Partner with a licensed US Customs broker at the Otay Mesa port of entry. Pre-file Section 321 entry summaries electronically through CBP's Automated Broker Interface (ABI) for same-day clearance." },
                { "@type": "HowToStep", "position": 4, "name": "Configure inventory and WMS", "text": "Integrate your Warehouse Management System (WMS) with cross-border carrier manifests. Set up order routing rules to ensure individual order values stay at or below the $800 threshold." },
                { "@type": "HowToStep", "position": 5, "name": "Launch and optimize", "text": "Begin with a pilot batch of shipments to test customs clearance times (typically 2-4 hours at Otay Mesa). Scale once compliance processes are confirmed and transit SLAs are established." }
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                { "@type": "Question", "name": "What is Section 321 de minimis?", "acceptedAnswer": { "@type": "Answer", "text": "Section 321 of the Tariff Act allows duty-free and tax-free import of goods valued at $800 or less per person per day into the US. Companies use Tijuana distribution centers to fulfill US e-commerce orders under this threshold, legally eliminating import duties." } },
                { "@type": "Question", "name": "Is Section 321 still valid after the 2025 executive order?", "acceptedAnswer": { "@type": "Answer", "text": "The August 2025 executive order suspended de minimis for goods from China and Hong Kong. However, Section 321 remains valid for goods manufactured in or substantially transformed in Mexico and other non-affected countries." } },
                { "@type": "Question", "name": "What types of products work best for Section 321 from Tijuana?", "acceptedAnswer": { "@type": "Answer", "text": "Consumer electronics, apparel, home goods, beauty products, and other e-commerce items priced under $800 per unit are ideal. High-volume, low-unit-value SKUs benefit most from the duty elimination." } },
                { "@type": "Question", "name": "How long does customs clearance take at Otay Mesa?", "acceptedAnswer": { "@type": "Answer", "text": "With pre-filed electronic entry summaries through CBP's ABI system, Section 321 shipments typically clear customs at Otay Mesa within 2-4 hours. Nearshore Navigator's partner brokers maintain dedicated Section 321 lanes." } }
            ]
        }
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Section321Client />
        </>
    );
}
