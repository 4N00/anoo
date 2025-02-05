import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';

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

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    }).catch(() => []);  // Return empty array if database is not available

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json([], { status: 200 });  // Return empty array with 200 status
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validatedData = projectSchema.parse(json);

    try {
      const project = await prisma.project.create({
        data: {
          ...validatedData,
          authorId: 'system', // Default system user ID
        },
      });

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