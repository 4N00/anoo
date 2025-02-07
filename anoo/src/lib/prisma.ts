import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

interface PrismaError extends Error {
  code?: string;
  meta?: {
    target?: string[];
  };
}

// Utility function to handle Prisma operations with error handling
export async function prismaOperation<T>(
  operation: () => Promise<T>
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error('Prisma operation failed:', error);
    throw error;
  }
}

// Utility function to handle Prisma errors and return appropriate status code and message
export function handlePrismaError(error: unknown): { status: number; message: string } {
  const prismaError = error as PrismaError;
  
  if (prismaError?.code) {
    const target = prismaError.meta?.target?.join(', ') || 'field';
    
    switch (prismaError.code) {
      case 'P2002':
        return {
          status: 409,
          message: `A record with this ${target} already exists`
        };
      case 'P2019':
        return { 
          status: 400, 
          message: 'Missing required arguments' 
        };
      case 'P2025':
        return { 
          status: 404, 
          message: 'Record not found' 
        };
      default:
        return { 
          status: 500, 
          message: 'Database error' 
        };
    }
  }

  return { 
    status: 500, 
    message: 'Internal server error' 
  };
}

// Utility function to check if error is an authentication error
export function isAuthError(error: unknown): boolean {
  return error instanceof Error && error.message === 'Unauthorized';
}

// Utility function to check if error is an admin error
export function isAdminError(error: unknown): boolean {
  return error instanceof Error && error.message === 'Admin access required';
}

export { prisma };