import { Metadata } from 'next';
import MasterGuideClient from './MasterGuideClient';

export const metadata: Metadata = {
  title: 'The Ultimate Guide to Manufacturing in Tijuana | 2026 Nearshore Report',
  description: 'Everything you need to know about Tijuana nearshoring. Labor rates, industrial parks, USMCA compliance, and San Diego border logistics for US manufacturers.',
  openGraph: {
    title: 'Tijuana Manufacturing Master Guide | Nearshore Navigator',
    description: 'Bypass Asian supply chain risks. Explore Tijuana’s $7.84/hr labor and 0% tariff advantage.',
    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200'],
  }
};

export default function TijuanaMasterGuide() {
  const schemaData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "The Ultimate Guide to Manufacturing in Tijuana | 2026 Nearshore Report",
      "description": "Everything you need to know about Tijuana nearshoring. Labor rates, industrial parks, USMCA compliance, and San Diego border logistics for US manufacturers.",
      "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
      "author": {
        "@type": "Person",
        "name": "Denisse Martinez",
        "url": "https://nearshorenavigator.com/en/about/denisse-martinez"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Nearshore Navigator",
        "url": "https://nearshorenavigator.com"
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [
          ".speakable-direct-answer",
          ".speakable-summary",
          ".direct-answer-capsule",
          ".faq-answer",
          "#faq-direct-response",
          "h1",
          "h2"
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nearshorenavigator.com/en" },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://nearshorenavigator.com/en/locations" },
        { "@type": "ListItem", "position": 3, "name": "Tijuana", "item": "https://nearshorenavigator.com/en/locations/tijuana" },
        { "@type": "ListItem", "position": 4, "name": "Master Guide", "item": "https://nearshorenavigator.com/en/locations/tijuana/master-guide" }
      ]
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <MasterGuideClient />
    </>
  );
}
