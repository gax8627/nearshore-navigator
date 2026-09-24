import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import Script from 'next/script';
import { Suspense } from 'react';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata = {
  title: 'Nearshore Navigator',
  description: 'Your guide to nearshore manufacturing.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning={true}>
      <head>
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM Knowledge Base" />
        <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="Full LLM Codex" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7RHTT5QR43"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            var isBot = Boolean(
              (window.navigator && window.navigator.webdriver) ||
              /HeadlessChrome|Bytespider|PetalBot|crawler|spider|bot|preview/i.test(navigator.userAgent) ||
              (window.outerWidth === 0 && window.outerHeight === 0)
            );

            gtag('config', 'G-7RHTT5QR43', {
              traffic_type: isBot ? 'datacenter_bot' : 'production',
              transport_type: 'beacon'
            });
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`} suppressHydrationWarning={true}>
        <Providers>
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
