import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Create a response with the appropriate CORS headers
  const res = NextResponse.next({
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });

  try {
    const supabase = createMiddlewareClient({ req, res });

    // Refresh the session
    const { data: { session }, error } = await supabase.auth.getSession();

    // If there's no session and we're trying to access protected routes, redirect to login
    if ((!session || error) && (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/api/projects'))) {
      const redirectUrl = new URL('/login', req.url);
      return NextResponse.redirect(redirectUrl);
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of error, redirect to login
    const redirectUrl = new URL('/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }
}

// Specify which routes should be protected
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/projects/:path*',
    '/login'
  ]
};
