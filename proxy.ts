import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Proxy logic to handle canonical redirects:
 * 1. Force HTTPS
 * 2. Force non-WWW
 * 3. Force Lowercase
 * 4. Force Trailing Slash
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';
  const protocol = request.headers.get('x-forwarded-proto') || 'http';
  
  let shouldRedirect = false;

  // 1. Force HTTPS
  if (protocol === 'http' && !host.includes('localhost')) {
    url.protocol = 'https:';
    shouldRedirect = true;
  }

  // 2. Force non-WWW
  if (host.startsWith('www.')) {
    const newHost = host.replace('www.', '');
    url.hostname = newHost;
    shouldRedirect = true;
  }

  // 3. Force Lowercase (excluding filenames with extensions)
  if (!url.pathname.includes('.') && url.pathname !== url.pathname.toLowerCase()) {
    url.pathname = url.pathname.toLowerCase();
    shouldRedirect = true;
  }

  // 4. Force Trailing Slash (Matching next.config.ts)
  if (
    !url.pathname.endsWith('/') && 
    !url.pathname.includes('.') && 
    url.pathname !== '/'
  ) {
    url.pathname = `${url.pathname}/`;
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    // Using 301 Permanent Redirect for SEO
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icon.png, apple-touch-icon.png (icons)
     * - sitemap.xml, robots.txt (SEO files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-touch-icon.png|sitemap.xml|robots.txt).*)',
  ],
};
