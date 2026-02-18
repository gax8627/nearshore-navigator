import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es', 'fr', 'de', 'ja', 'zh', 'ko', 'it', 'pt', 'ru'];

// Check if Clerk is configured
const isClerkConfigured = !!(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
  process.env.CLERK_SECRET_KEY
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── Admin Routes ────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
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
        // Clerk failed, allow through
        return NextResponse.next();
      }
    }
    
    // No Clerk keys — allow admin pages to show "Setup Required" UI
    return NextResponse.next();
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
    const locale = 'en';
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/',
  ],
};
