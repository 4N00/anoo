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
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log('Login attempt for email:', email);
    
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error details:', {
        message: error.message,
        status: error.status,
        name: error.name
      });
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    if (!data.user) {
      console.error('No user data returned after successful login');
      return NextResponse.json(
        { error: 'Login failed - no user data' },
        { status: 401 }
      );
    }

    console.log('Login successful for user:', data.user.id);
    return NextResponse.json({ user: data.user }, { status: 200 });
  } catch (error) {
    console.error('Unexpected server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 