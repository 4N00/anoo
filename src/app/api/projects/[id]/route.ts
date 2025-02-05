import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { Project, ProjectFormData, toProjectDB } from '@/types/project';

const projectUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  imageUrl: z.string().url('Must be a valid URL').optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  category: z.string().min(1, 'Category is required').optional(),
  githubUrl: z.string().url('Must be a valid URL').nullable().optional(),
  liveUrl: z.string().url('Must be a valid URL').nullable().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<Project | { error: string; details?: any }>> {
  try {
    const json = await request.json();
    const validatedData = projectUpdateSchema.parse(json) as Partial<ProjectFormData>;

    const { data: project, error } = await supabase
      .from('projects')
      .update({
        ...toProjectDB(validatedData as ProjectFormData), // Type assertion since we handle partial data
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;
    if (!project) throw new Error('Project not found');

    return NextResponse.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid project data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<null | { error: string }>> {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', params.id);

    if (error) throw error;

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}