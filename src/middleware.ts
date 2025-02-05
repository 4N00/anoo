import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('Middleware executing for path:', request.nextUrl.pathname);

  // Don't run on login page to prevent redirect loops
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.next();
  }

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const cookieStore = request.cookies;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name, options) {
          response.cookies.delete({
            name,
            ...options,
          });
        },
      },
    }
  );

  // Handle admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('Checking auth for admin route');

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.log('No authenticated user found, redirecting to login');
        return NextResponse.redirect(new URL('/login', request.url));
      }

      console.log('User found, checking admin status for user:', user.id);

      const { data: userData, error: roleError } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (roleError) {
        console.error('Error fetching user role:', roleError);
        return NextResponse.redirect(new URL('/login', request.url));
      }

      console.log('User data:', userData);

      if (!userData || userData.role !== 'ADMIN') {
        console.log('User is not an admin, redirecting to login');
        // Sign out the user if they're not an admin
        await supabase.auth.signOut();
        return NextResponse.redirect(new URL('/login', request.url));
      }

      console.log('Admin access granted');
      return response;
    } catch (error) {
      console.error('Error in middleware:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes that don't require auth
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api/public).*)',
  ],
};
