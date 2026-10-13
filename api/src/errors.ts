export class HttpError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
  }
}

export const notFound = (msg = 'Resource not found') => new HttpError(404, 'not_found', msg);
export const conflict = (msg: string) => new HttpError(409, 'conflict', msg);
export const badRequest = (msg: string, details?: unknown) => new HttpError(400, 'bad_request', msg, details);
