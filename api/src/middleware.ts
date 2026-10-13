import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodTypeAny } from 'zod';
import type { ApiErrorBody } from '@societyone/shared';
import { AppError } from './errors';

export function notFoundHandler(_req: Request, _res: Response, next: NextFunction) {
  next(new AppError(404, 'not_found', 'Route not found'));
}

/** Validates req.body against a zod schema, replacing it with the parsed value. */
export const validateBody =
  (schema: ZodTypeAny) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) return next(result.error);
    req.body = result.data;
    next();
  };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  let status = 500;
  let body: ApiErrorBody = { error: { code: 'internal_error', message: 'Internal server error' } };

  if (err instanceof AppError) {
    status = err.status;
    body = { error: { code: err.code, message: err.message, details: err.details } };
  } else if (err instanceof ZodError) {
    status = 400;
    body = { error: { code: 'validation_error', message: 'Invalid request', details: err.issues } };
  } else if (err && (err as { type?: string }).type === 'entity.parse.failed') {
    status = 400;
    body = { error: { code: 'bad_json', message: 'Malformed JSON body' } };
  } else if (err && (err as { code?: string }).code?.startsWith?.('SQLITE_CONSTRAINT_UNIQUE')) {
    status = 409;
    body = { error: { code: 'conflict', message: 'A record with these values already exists' } };
  } else {
    console.error(err);
  }
  res.status(status).json(body);
}
