import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { LanguageProvider } from '@/app/context/LanguageContext'
import { ThemeProvider } from '@/app/context/ThemeContext'
import WhatsAppButton from '@/app/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nearshore Navigator | Industrial Manufacturing in Tijuana',
  description: 'Your partner for industrial nearshoring, shelter services, and contract manufacturing in Tijuana, Mexico.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
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
