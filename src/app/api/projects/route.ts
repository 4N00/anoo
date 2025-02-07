import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Project } from '@/types/project';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  tags: z.array(z.string()),
  featured: z.boolean(),
  githubUrl: z.string().nullable(),
  liveUrl: z.string().nullable(),
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

export async function GET(): Promise<NextResponse<Project[]>> {
  const supabase = createClient();
  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;

    return NextResponse.json(projects || []);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json([], { status: 200 }); // Return empty array with 200 status
  }
}

export async function POST(
  request: Request
): Promise<NextResponse<Project | { error: string; details?: any }>> {
  const supabase = createClient();
  try {
    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const { data: userData, error: roleError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (roleError || !userData || userData.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 });
    }

    const json = await request.json();
    console.log('Received data:', json); // Add logging
    const validatedData = projectSchema.parse(json);
    console.log('Validated data:', validatedData); // Add logging

    const { data: project, error } = await supabase
      .from('projects')
      .insert([
        {
          title: validatedData.title,
          description: validatedData.description,
          image_url: validatedData.imageUrl,
          tags: validatedData.tags,
          featured: validatedData.featured,
          github_url: validatedData.githubUrl,
          live_url: validatedData.liveUrl,
          author_id: user.id,
          version: 1,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error); // Add logging
      throw error;
    }
    if (!project) throw new Error('Failed to create project');

    return NextResponse.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors); // Add logging
      return NextResponse.json(
        { error: 'Invalid project data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
