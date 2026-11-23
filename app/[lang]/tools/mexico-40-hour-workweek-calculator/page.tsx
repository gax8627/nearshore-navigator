import { getAlternateLanguages, INDEXABLE_LOCALES } from '@/app/constants/seo-config';
import { Metadata } from 'next';
import WorkweekCalculatorClient from './WorkweekCalculatorClient';

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export function generateStaticParams() {
  return INDEXABLE_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  const title = 'Mexico 40-Hour Workweek Cost & Fine Calculator (2027)';
  const description =
    'Model Mexico 48-to-40 hour workweek phase-in costs (2027–2030), overtime caps, and STPS electronic timekeeping fine exposure up to MXN $586,550/employee.';

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/tools/mexico-40-hour-workweek-calculator`,
      languages: getAlternateLanguages('/tools/mexico-40-hour-workweek-calculator'),
    },
    openGraph: {
      title,
      description,
      url: `https://nearshorenavigator.com/${lang}/tools/mexico-40-hour-workweek-calculator`,
      siteName: 'Nearshore Navigator',
      locale: lang === 'es' ? 'es_MX' : 'en_US',
      type: 'website',
    },
  };
}

export default async function WorkweekCalculatorPage({ params }: Props) {
  const { lang } = await params;

  const appSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `https://nearshorenavigator.com/${lang}/tools/mexico-40-hour-workweek-calculator#software`,
        name: 'Mexico 40-Hour Workweek Cost & STPS Fine Calculator (2027–2030)',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: `https://nearshorenavigator.com/${lang}/tools/mexico-40-hour-workweek-calculator`,
        description:
          'Interactive manufacturing labor modeler estimating 2027–2030 phased 48-to-40 hour workweek shift gaps, overtime cost deltas, and STPS electronic time-record fine exposure under Mexican Federal Labor Law.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        provider: {
          '@type': 'Organization',
          name: 'Nearshore Navigator',
          url: 'https://nearshorenavigator.com',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `https://nearshorenavigator.com/${lang}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: `https://nearshorenavigator.com/${lang}/tools/cost-calculator`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Mexico 40-Hour Workweek Calculator',
            item: `https://nearshorenavigator.com/${lang}/tools/mexico-40-hour-workweek-calculator`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'When does Mexico’s 40-hour workweek reform take effect?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Following the March 3, 2026 constitutional reform (Art. 123) and May 1, 2026 Federal Labor Law amendments, the workweek phases down by 2 hours every January 1 with no reduction in wages or benefits: 46 hours in 2027, 44 hours in 2028, 42 hours in 2029, and 40 hours in 2030.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the STPS fine for missing electronic time records in Mexico?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under LFT Articles 132 (Frac. XXXIV), 994 (Frac. IV Bis), and 1000, failing to maintain verifiable electronic clock-in/clock-out records starting January 1, 2027 carries STPS fines of 250 to 5,000 UMA. At the 2026 UMA value ($117.31 MXN), 5,000 UMA equals MXN $586,550 per affected employee under Article 992—and increases automatically when INEGI updates the UMA on February 1, 2027.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do Mexican overtime limits change under the 2027–2030 workweek reform?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Weekly double-pay (+100%) overtime caps expand as base hours shrink: 9 hours/week in 2026–2027, 10 hours in 2028, 11 hours in 2029, and 12 hours in 2030+, subject to a maximum of 4 hours/day across up to 4 days/week. Triple-pay (+200%) overtime is capped at 4 supplementary hours/week, and total daily time (regular plus overtime) cannot exceed 12 hours.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can Mexican factories simply switch to 4x10 or 3x12 compressed shifts?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Not without formal legal structuring. Standard daily ordinary caps remain 8 hours (day), 7.5 hours (mixed), and 7 hours (night) under LFT Article 61. Compressing hours above 8 hours/day requires written mutual agreements under Articles 58–59, updated Internal Work Regulations (Reglamento Interior), and union CBA alignment—and 3x12 leaves zero buffer under the absolute 12-hour daily ceiling.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can manufacturers maintain output without proportionally adding headcount?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Plants typically combine four operational levers: 4-shift overlapping rotations with trained relief pools (grupos de relevo), SMED changeover and OEE uptime improvements, staggered shift handoffs to eliminate line-stop gaps, and targeted cell automation on bottleneck stations.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <WorkweekCalculatorClient language={lang} />
    </>
  );
}
