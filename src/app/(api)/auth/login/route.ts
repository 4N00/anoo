import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const createClient = () => {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => {
          return Array.from(cookieStore.getAll()).map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        setAll: (cookies: { name: string; value: string; options?: CookieOptions }[]) => {
          cookies.forEach((cookie) => {
            cookieStore.set(cookie.name, cookie.value, cookie.options);
          });
        },
      },
    }
  );
};

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { email, password } = await request.json();

    console.log('Login attempt for email:', email); // Debug log

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error); // Debug log
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (!data.session || !data.user) {
      console.error('No session or user after login'); // Debug log
      return NextResponse.json(
        { error: 'Login failed - no session' },
        { status: 401 }
      );
    }

    // Get user role
    const { data: userData, error: roleError } = await supabase
      .from('users')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (roleError || !userData) {
      console.error('Role check error:', roleError); // Debug log
      return NextResponse.json(
        { error: 'Failed to verify user role' },
        { status: 401 }
      );
    }

    console.log('Login successful for user:', data.user.id, 'role:', userData.role); // Debug log

    return NextResponse.json({
      user: {
        ...data.user,
        role: userData.role,
      },
      session: data.session,
    });
  } catch (error) {
    console.error('Unexpected error during login:', error); // Debug log
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 