import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { Project, ProjectFormData, toProjectDB } from '@/types/project';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  tags: z.array(z.string()),
  featured: z.boolean(),
  category: z.string().min(1, 'Category is required'),
  githubUrl: z.string().url('Must be a valid URL').nullable(),
  liveUrl: z.string().url('Must be a valid URL').nullable(),
});

export async function GET(): Promise<NextResponse<Project[]>> {
  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(projects || []);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json([], { status: 200 }); // Return empty array with 200 status
  }
}

export async function POST(request: Request): Promise<NextResponse<Project | { error: string; details?: any }>> {
  try {
    const json = await request.json();
    const validatedData = projectSchema.parse(json) as ProjectFormData;

    try {
      const { data: project, error } = await supabase
        .from('projects')
        .insert([
          {
            ...toProjectDB(validatedData),
            version: 1,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      if (!project) throw new Error('Failed to create project');

      return NextResponse.json(project);
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to create project in database' },
        { status: 503 }
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid project data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}