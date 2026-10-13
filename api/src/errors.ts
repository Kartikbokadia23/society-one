export class AppError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
  }
}

export const notFound = (message = 'Resource not found') => new AppError(404, 'not_found', message);
export const conflict = (message: string) => new AppError(409, 'conflict', message);
