import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const reorderSchema = z.object({
  updates: z.array(
    z.object({
      id: z.string(),
      display_order: z.number(),
    })
  ),
});

// Create a server-side Supabase client
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

export async function PATCH(request: Request) {
  const supabase = createClient();

  try {
    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('Auth error:', userError);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const { data: userData, error: roleError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (roleError || !userData || userData.role !== 'ADMIN') {
      console.error('Role error:', roleError);
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 });
    }

    // Parse and validate the request body
    const json = await request.json();
    console.log('Received update data:', json);

    const validatedData = reorderSchema.parse(json);
    console.log('Validated data:', validatedData);

    // Update each project's display order
    const updateData = validatedData.updates.map((update) => ({
      id: update.id,
      display_order: update.display_order,
      updated_at: new Date().toISOString(),
    }));
    console.log('Update data:', updateData);

    // Update each project one by one
    for (const update of updateData) {
      const { error } = await supabase
        .from('projects')
        .update({
          display_order: update.display_order,
          updated_at: update.updated_at,
        })
        .eq('id', update.id);

      if (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error reordering projects:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to reorder projects' },
      { status: 500 }
    );
  }
} 