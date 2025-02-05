import { z } from 'zod';
import { ERROR_MESSAGES, VALIDATION } from './constants';

// Base schemas
const urlSchema = z
  .string()
  .url(ERROR_MESSAGES.form.invalidUrl)
  .or(z.string().length(0))
  .nullable()
  .optional();

const imageUrlSchema = z
  .string()
  .url(ERROR_MESSAGES.form.invalidUrl)
  .refine(
    (url) => {
      if (!url) return true;
      return /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(url);
    },
    {
      message: ERROR_MESSAGES.form.invalidImage,
    }
  );

// Project validation schemas
export const projectValidation = {
  create: z.object({
    title: z
      .string()
      .min(VALIDATION.project.title.minLength, ERROR_MESSAGES.form.minLength(VALIDATION.project.title.minLength))
      .max(VALIDATION.project.title.maxLength, ERROR_MESSAGES.form.maxLength(VALIDATION.project.title.maxLength)),
    description: z
      .string()
      .min(VALIDATION.project.description.minLength, ERROR_MESSAGES.form.minLength(VALIDATION.project.description.minLength))
      .max(VALIDATION.project.description.maxLength, ERROR_MESSAGES.form.maxLength(VALIDATION.project.description.maxLength)),
    imageUrl: imageUrlSchema,
    githubUrl: urlSchema,
    liveUrl: urlSchema,
    tags: z
      .array(z.string())
      .min(1, 'At least one tag is required')
      .max(VALIDATION.project.maxTags, `Maximum ${VALIDATION.project.maxTags} tags allowed`),
    featured: z.boolean().default(false),
  }),

  update: z.object({
    title: z
      .string()
      .min(VALIDATION.project.title.minLength, ERROR_MESSAGES.form.minLength(VALIDATION.project.title.minLength))
      .max(VALIDATION.project.title.maxLength, ERROR_MESSAGES.form.maxLength(VALIDATION.project.title.maxLength))
      .optional(),
    description: z
      .string()
      .min(VALIDATION.project.description.minLength, ERROR_MESSAGES.form.minLength(VALIDATION.project.description.minLength))
      .max(VALIDATION.project.description.maxLength, ERROR_MESSAGES.form.maxLength(VALIDATION.project.description.maxLength))
      .optional(),
    imageUrl: imageUrlSchema.optional(),
    githubUrl: urlSchema,
    liveUrl: urlSchema,
    tags: z
      .array(z.string())
      .min(1, 'At least one tag is required')
      .max(VALIDATION.project.maxTags, `Maximum ${VALIDATION.project.maxTags} tags allowed`)
      .optional(),
    featured: z.boolean().optional(),
  }),
};

// Auth validation schemas
export const authValidation = {
  signIn: z.object({
    email: z.string().email(ERROR_MESSAGES.auth.invalidEmail),
    password: z
      .string()
      .min(VALIDATION.password.minLength, ERROR_MESSAGES.form.minLength(VALIDATION.password.minLength))
      .max(VALIDATION.password.maxLength, ERROR_MESSAGES.form.maxLength(VALIDATION.password.maxLength)),
  }),

  resetPassword: z.object({
    email: z.string().email(ERROR_MESSAGES.auth.invalidEmail),
  }),

  updatePassword: z
    .object({
      password: z
        .string()
        .min(VALIDATION.password.minLength, ERROR_MESSAGES.form.minLength(VALIDATION.password.minLength))
        .max(VALIDATION.password.maxLength, ERROR_MESSAGES.form.maxLength(VALIDATION.password.maxLength)),
      confirmPassword: z
        .string()
        .min(VALIDATION.password.minLength, ERROR_MESSAGES.form.minLength(VALIDATION.password.minLength))
        .max(VALIDATION.password.maxLength, ERROR_MESSAGES.form.maxLength(VALIDATION.password.maxLength)),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
};

// Helper function to validate data against a schema
export async function validateData<T>(schema: z.ZodSchema<T>, data: unknown): Promise<T> {
  try {
    return await schema.parseAsync(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      interface ValidationError extends Error {
        errors: Record<string, string>;
      }
      const formattedError = new Error('Validation failed') as ValidationError;
      formattedError.errors = error.errors.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.path.join('.')]: curr.message,
        }),
        {}
      );
      throw formattedError;
    }
    throw error;
  }
}

// Export types
export type CreateProjectInput = z.infer<typeof projectValidation.create>;
export type UpdateProjectInput = z.infer<typeof projectValidation.update>;
export type SignInInput = z.infer<typeof authValidation.signIn>;
export type ResetPasswordInput = z.infer<typeof authValidation.resetPassword>;
export type UpdatePasswordInput = z.infer<typeof authValidation.updatePassword>;