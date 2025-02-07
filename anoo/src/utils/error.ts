import { ERROR_MESSAGES } from './constants';

// Custom error class for API errors
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number = 500,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

// Custom error class for validation errors
export class ValidationError extends Error {
  public readonly fields: Record<string, string[]>;

  constructor(fields: Record<string, string[]>) {
    super('Validation Error');
    this.name = 'ValidationError';
    this.fields = fields;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

// Type guard for ApiError
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

// Type guard for ValidationError
export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

// Helper function to get user-friendly error message
export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }

  if (isValidationError(error)) {
    return Object.values(error.fields)
      .flat()
      .join(', ');
  }

  if (error instanceof Error) {
    return error.message;
  }

  return ERROR_MESSAGES.default;
}

// Helper function to handle API errors
export function handleApiError(error: unknown): never {
  if (error instanceof Response) {
    throw new ApiError(
      ERROR_MESSAGES.default,
      error.status
    );
  }

  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      throw new ApiError(ERROR_MESSAGES.network, 0);
    }

    throw new ApiError(error.message);
  }

  throw new ApiError(ERROR_MESSAGES.default);
}

// Helper function to create validation error from form errors
export function createValidationError(
  errors: Record<string, string | string[]>
): ValidationError {
  const formattedErrors: Record<string, string[]> = {};

  for (const [key, value] of Object.entries(errors)) {
    formattedErrors[key] = Array.isArray(value) ? value : [value];
  }

  return new ValidationError(formattedErrors);
}

// Helper function to check if error is a network error
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.name === 'NetworkError' ||
      error.name === 'AbortError' ||
      error.message.includes('network') ||
      error.message.includes('Network') ||
      error.message.includes('Failed to fetch')
    );
  }
  return false;
}

// Helper function to check if error is a timeout error
export function isTimeoutError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.name === 'TimeoutError' ||
      error.message.includes('timeout') ||
      error.message.includes('Timeout')
    );
  }
  return false;
}

// Helper function to handle form submission errors
export function handleFormError(error: unknown): Record<string, string> {
  if (isValidationError(error)) {
    const errorMap: Record<string, string> = {};
    
    for (const [key, messages] of Object.entries(error.fields)) {
      // Ensure messages array is not empty and first message exists
      const firstMessage = messages[0];
      if (firstMessage) {
        errorMap[key] = firstMessage;
      }
    }

    // If no specific field errors, add a generic error
    if (Object.keys(errorMap).length === 0) {
      errorMap.submit = 'Validation failed';
    }

    return errorMap;
  }

  if (isApiError(error)) {
    return {
      submit: error.message,
    };
  }

  if (error instanceof Error) {
    return {
      submit: error.message,
    };
  }

  return {
    submit: ERROR_MESSAGES.default,
  };
}

// Helper function to log errors (can be extended to use error tracking service)
export function logError(
  error: unknown,
  context?: Record<string, unknown>
): void {
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', {
      error,
      context,
      timestamp: new Date().toISOString(),
    });
  } else {
    // In production, you might want to send this to an error tracking service
    // like Sentry, LogRocket, etc.
    // Example: Sentry.captureException(error, { extra: context });
  }
}