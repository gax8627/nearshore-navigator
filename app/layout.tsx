import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { LanguageProvider } from '@/app/context/LanguageContext'
import { ThemeProvider } from '@/app/context/ThemeContext'
import WhatsAppButton from '@/app/components/WhatsAppButton'
import { SchemaMarkup } from '@/components/SchemaMarkup'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://nearshorenavigator.com'),
  title: {
    default: 'Nearshore Navigator | Industrial Manufacturing in Tijuana, Mexico',
    template: '%s | Nearshore Navigator'
  },
  description: 'Your partner for industrial nearshoring, shelter services, and contract manufacturing in Tijuana, Mexico. Access Class A industrial buildings, bilingual workforce, and 40-60% cost savings just 20 minutes from San Diego.',
  keywords: [
    'nearshoring tijuana',
    'manufacturing mexico',
    'shelter services tijuana',
    'industrial real estate tijuana',
    'contract manufacturing mexico',
    'maquiladora tijuana',
    'nearshore manufacturing',
    'distribution centers tijuana',
    'call center bpo tijuana',
    'industrial parks tijuana',
  ],
  authors: [{ name: 'Nearshore Navigator' }],
  creator: 'Nearshore Navigator',
  publisher: 'Nearshore Navigator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_MX',
    url: 'https://nearshorenavigator.com',
    siteName: 'Nearshore Navigator',
    title: 'Nearshore Navigator | Industrial Manufacturing in Tijuana',
    description: 'Your partner for industrial nearshoring, shelter services, and contract manufacturing in Tijuana, Mexico.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nearshore Navigator - Industrial Manufacturing in Tijuana',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nearshore Navigator | Industrial Manufacturing in Tijuana',
    description: 'Your partner for industrial nearshoring, shelter services, and contract manufacturing in Tijuana, Mexico.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'es-MX': '/',
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <SchemaMarkup />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
              <Navbar />
              <main className="flex-grow pt-[80px]">
                {children}
              </main>
              <Footer />
              <WhatsAppButton />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
