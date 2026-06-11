import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOCALES, DEPRECATED_LOCALES } from '@/app/constants/seo-config';

// Phase 1 multilingual: en, es, de, ja are fully indexable.
// fr, zh, ko, it, pt, ru return 410 Gone.
// de and ja have real localized content and proper hreflang — Google will
// serve them to German/Japanese searchers without canonical conflicts.
const locales = LOCALES as readonly string[];

// Check if Clerk is configured
const isClerkConfigured = !!(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
  process.env.CLERK_SECRET_KEY
);

// Helper to match locales from Accept-Language header.
// Only returns supported (indexable) locales: en, es. Unsupported browser
// languages fall through to the default /en (see redirect block below).
function getPreferredLocale(request: NextRequest): string | undefined {
  // 1. Check for cookie first (User Preference)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return undefined;

  const preferredLocales = acceptLanguage.split(',').map(lang => {
    const [locale, q] = lang.split(';');
    return { locale: locale.trim(), q: q ? parseFloat(q.split('=')[1]) : 1.0 };
  }).sort((a, b) => b.q - a.q);

  for (const { locale } of preferredLocales) {
    if (locales.includes(locale)) return locale;
    const baseLocale = locale.split('-')[0];
    if (locales.includes(baseLocale)) return baseLocale;
  }

  return undefined;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── Admin Routes ────────────────────────────────────────
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    // If Clerk is configured, use Clerk auth
    if (isClerkConfigured) {
      try {
        const { clerkMiddleware, createRouteMatcher } = await import('@clerk/nextjs/server');
        const isAdminPublicRoute = createRouteMatcher(['/admin/sign-in(.*)']);
        
        // Create and invoke Clerk middleware
        const clerkHandler = clerkMiddleware(async (auth, req) => {
          if (isAdminPublicRoute(req)) {
            return NextResponse.next();
          }
          await auth.protect();
          return NextResponse.next();
        });
        
        return clerkHandler(request, {} as any);
      } catch (e) {
        // Clerk failed — fail-closed: block admin access rather than allowing through.
        // Admin API routes have their own auth() checks, but admin UI pages do not.
        console.error('[middleware] Clerk auth error on admin route:', e);
        return NextResponse.json({ error: 'Authentication service unavailable' }, { status: 503 });
      }
    }
    
    // No Clerk keys — allow admin pages to show "Setup Required" UI
    return NextResponse.next();
  }

  // ─── Domain Consistency: WWW to Non-WWW ─────────────────
  const host = request.headers.get('host');
  if (host?.startsWith('www.')) {
    const newHost = host.replace('www.', '');
    return NextResponse.redirect(
      new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${newHost}`),
      301
    );
  }

  // ─── Public Routes: Locale Routing ───────────────────────
  // Skip assets, API routes, and internal paths
  if (
    pathname.includes('.') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next();
  }

  // ─── Deprecated Locales - Return 410 Gone ──────────────
  // We return a 410 Gone status code for deprecated/unreleased locales to signal
  // to Googlebot that these pages are permanently removed and should be de-indexed.
  const hasDeprecatedLocale = DEPRECATED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasDeprecatedLocale) {
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>410 Gone</title>
  <meta name="robots" content="noindex, nofollow">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; text-align: center; padding: 10% 5%; background: #ffffff; color: #1f2937; }
    h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 16px; color: #111827; }
    p { font-size: 1.125rem; line-height: 1.75; color: #4b5563; margin-bottom: 24px; }
    a { color: #0284c7; text-decoration: none; font-weight: 600; border-bottom: 2px solid transparent; transition: border-color 0.2s; }
    a:hover { border-color: #0284c7; }
  </style>
</head>
<body>
  <h1>410 Gone</h1>
  <p>This localized version of the page is no longer available.</p>
  <p>Please visit our <a href="/en">English Homepage</a> or browse our <a href="/en/insights">Insights & Articles</a>.</p>
</body>
</html>`,
      {
        status: 410,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      }
    );
  }
  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Detect preferred locale
    const locale = getPreferredLocale(request) || 'en';
    
    // Fix: Remove trailing slash from the redirected path to avoid multi-hop redirects
    // e.g., "/" -> "/en" instead of "/" -> "/en/" -> "/en"
    const targetPath = pathname === '/' ? '' : pathname.replace(/\/$/, '');
    const redirectUrl = new URL(
      `/${locale}${targetPath}${request.nextUrl.search}`,
      request.url
    );
    
    return NextResponse.redirect(redirectUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml, etc.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    '/',
  ],
};
