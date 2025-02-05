import { NextResponse } from 'next/server';
import { prisma, prismaOperation, handlePrismaError } from '@/lib/prisma';
import { requireAdmin, isAuthError, isAdminError } from '@/lib/supabase';
import { projectValidation } from '@/utils/validation';
import { z } from 'zod';

// GET /api/projects - Get all projects
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';

    const projects = await prismaOperation(() =>
      prisma.project.findMany({
        where: featured ? { featured: true } : undefined,
        orderBy: { createdAt: 'desc' },
      })
    );

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    const { status, message } = handlePrismaError(error);
    return NextResponse.json({ error: message }, { status });
  }
}

// POST /api/projects - Create a new project (protected, admin only)
export async function POST(request: Request) {
  try {
    // Verify admin access
    await requireAdmin();

    // Parse and validate request body
    const body = await request.json();
    const validatedData = await projectValidation.create.parseAsync(body);

    // Create project
    const project = await prismaOperation(() =>
      prisma.project.create({
        data: validatedData,
      })
    );

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    if (isAuthError(error)) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    if (isAdminError(error)) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const { status, message } = handlePrismaError(error);
    return NextResponse.json({ error: message }, { status });
  }
}

// PATCH /api/projects - Update a project (protected, admin only)
export async function PATCH(request: Request) {
  try {
    // Verify admin access
    await requireAdmin();

    // Parse and validate request body
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    const validatedData = await projectValidation.update.parseAsync(updateData);

    // Update project with optimistic concurrency control
    const project = await prismaOperation(() =>
      prisma.project.update({
        where: { id },
        data: {
          ...validatedData,
          version: {
            increment: 1,
          },
        },
      })
    );

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    if (isAuthError(error)) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    if (isAdminError(error)) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const { status, message } = handlePrismaError(error);
    return NextResponse.json({ error: message }, { status });
  }
}

// DELETE /api/projects - Delete a project (protected, admin only)
export async function DELETE(request: Request) {
  try {
    // Verify admin access
    await requireAdmin();

    // Get project ID from URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    // Delete project
    await prismaOperation(() =>
      prisma.project.delete({
        where: { id },
      })
    );

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting project:', error);

    if (isAuthError(error)) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    if (isAdminError(error)) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const { status, message } = handlePrismaError(error);
    return NextResponse.json({ error: message }, { status });
  }
}