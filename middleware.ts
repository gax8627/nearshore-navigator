import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Only en + es are indexable and supported. The other 8 locales
// (fr/de/ja/zh/ko/it/pt/ru) used to serve machine-translated content that
// cannibalized /en/ in search results and produced "Duplicate, Google chose
// different canonical" errors at scale. We now 301-redirect those prefixes
// to /en/ so Google removes them from the index cleanly.
const locales = ['en', 'es'];
const deprecatedLocales = new Set(['fr', 'de', 'ja', 'zh', 'ko', 'it', 'pt', 'ru']);

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

  // ─── Deprecated locales: 301 → /en equivalent ───────────
  // Removes machine-translated duplicates from Google's index without
  // leaving them discoverable. Strips the old locale prefix and preserves
  // the rest of the path.
  const firstSegment = pathname.split('/')[1];
  if (firstSegment && deprecatedLocales.has(firstSegment)) {
    const rest = pathname.slice(`/${firstSegment}`.length) || '';
    const target = `/en${rest}`;
    const redirectUrl = new URL(target + request.nextUrl.search, request.url);
    return NextResponse.redirect(redirectUrl, 301);
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
