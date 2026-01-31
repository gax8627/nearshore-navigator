import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'es', 'fr', 'de', 'ja', 'zh', 'ko', 'it', 'pt', 'ru']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Skip if it's an asset or API route
  if (
    pathname.includes('.') || 
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next')
  ) {
    return
  }

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Determine the locale (basic implementation, can be expanded with headers)
    const locale = 'en' // Default to English for now if not detected

    // e.g. /products -> /en/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|.*\\.).*)',
    // Optional: only run on root (/)
    '/'
  ],
}
