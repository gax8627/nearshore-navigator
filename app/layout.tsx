import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import Script from 'next/script';

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
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7RHTT5QR43"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-7RHTT5QR43');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["ProfessionalService", "LocalBusiness"],
              "name": "Nearshore Navigator",
              "description": "Strategic advisory for US companies expanding manufacturing operations to Mexico. Contract manufacturers and industrial real estate in Baja California and beyond.",
              "url": "https://nearshorenavigator.com",
              "areaServed": [
                "United States", "Baja California", "Mexico", "Sonora", "Chihuahua", "Nuevo León", "Tamaulipas", "Jalisco", "Querétaro", "San Luis Potosí", "Coahuila", "Guanajuato", "Puebla"
              ],
              "serviceType": [
                "Nearshoring Advisory",
                "Contract Manufacturing Consulting",
                "Industrial Real Estate",
                "Supply Chain Management",
                "Maquiladora Setup Services",
                "Shelter Services"
              ],
              "address": [
                {
                  "@type": "PostalAddress",
                  "streetAddress": "Blvd. Agua Caliente 10611",
                  "addressLocality": "Tijuana",
                  "addressRegion": "Baja California",
                  "addressCountry": "MX"
                },
                {
                  "@type": "PostalAddress",
                  "addressLocality": "San Diego",
                  "addressRegion": "CA",
                  "addressCountry": "US"
                }
              ],
              "email": "denisse@nearshorenavigator.com",
              "sameAs": [
                "https://www.linkedin.com/company/nearshore-navigator/"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
