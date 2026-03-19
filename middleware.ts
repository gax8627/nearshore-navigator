import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es', 'fr', 'de', 'ja', 'zh', 'ko', 'it', 'pt', 'ru'];

// Check if Clerk is configured
const isClerkConfigured = !!(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
  process.env.CLERK_SECRET_KEY
);

// Helper to match locales from Accept-Language header
function getPreferredLocale(request: NextRequest): string | undefined {
  // 1. Check for cookie first (User Preference)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return undefined;

  // Simple parser for Accept-Language: "en-US,en;q=0.9,es;q=0.8"
  // We split by comma, then sort by quality if present, but for simplicity
  // we'll just take the first supported one we find in the list.
  // A robust parser would sort by 'q' values.
  const preferredLocales = acceptLanguage.split(',').map(lang => {
    const [locale, q] = lang.split(';');
    return { locale: locale.trim(), q: q ? parseFloat(q.split('=')[1]) : 1.0 };
  }).sort((a, b) => b.q - a.q);

  for (const { locale } of preferredLocales) {
    // Check exact match (e.g. "fr")
    if (locales.includes(locale)) return locale;
    
    // Check base language (e.g. "fr-CA" -> "fr")
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
    
    return NextResponse.redirect(redirectUrl, 307);
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
