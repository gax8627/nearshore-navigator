import type { Metadata, Viewport } from 'next'
import '../globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { LanguageProvider } from '@/app/context/LanguageContext'
import { ThemeProvider } from '@/app/context/ThemeContext'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { AIConsultant } from '@/components/AIConsultant'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = 'https://nearshorenavigator.com';
  const url = `${baseUrl}/${lang}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: 'Nearshore Navigator | Industrial Manufacturing in Baja California, Mexico',
      template: '%s | Nearshore Navigator'
    },
    description: 'Your partner for industrial nearshoring, shelter services, and contract manufacturing in Baja California, Mexico. Access Class A industrial buildings, bilingual workforce, and 40-60% cost savings just 20 minutes from San Diego.',
    alternates: {
      canonical: url,
      languages: {
        'en': `${baseUrl}/en`,
        'es': `${baseUrl}/es`,
        'fr': `${baseUrl}/fr`,
        'de': `${baseUrl}/de`,
        'it': `${baseUrl}/it`,
        'pt': `${baseUrl}/pt`,
        'ja': `${baseUrl}/ja`,
        'ko': `${baseUrl}/ko`,
        'zh': `${baseUrl}/zh`,
        'ru': `${baseUrl}/ru`,
        'x-default': `${baseUrl}/en`,
      }
    },
    openGraph: {
      url: url,
      type: 'website',
      title: 'Nearshore Navigator | Industrial Manufacturing in Baja California',
      description: 'Your partner for industrial nearshoring, shelter services, and contract manufacturing in Baja California, Mexico.',
      images: ['/og-image.png'],
    }
  };
}

export default async function LangLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;

  return (
    <LanguageProvider lang={lang as any}>
      <ThemeProvider>
        <SchemaMarkup />
        {/* Preload hero poster image for LCP improvement */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-last-frame.jpg"
          fetchPriority="high"
        />
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          {/* Skip to content – keyboard accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-gray-900 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-xl focus:font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="flex-grow pt-[80px]">
            {children}
          </main>
          <Footer />
          <AIConsultant />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  )
}

