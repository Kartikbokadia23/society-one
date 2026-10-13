import { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
import type { ApiErrorBody } from '@societyone/shared';

export class HttpError extends Error {
  constructor(public status: number, public code: string, message: string, public details?: unknown) {
    super(message);
  }
}

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(new HttpError(404, 'not_found', `Route ${req.method} ${req.path} not found`));
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let status = 500;
  let body: ApiErrorBody = { error: { code: 'internal_error', message: 'Internal server error' } };
  if (err instanceof HttpError) {
    status = err.status;
    body = { error: { code: err.code, message: err.message, details: err.details } };
  } else if (err instanceof ZodError) {
    status = 400;
    body = { error: { code: 'validation_error', message: 'Invalid request', details: err.issues } };
  } else if (err?.type === 'entity.parse.failed') {
    status = 400;
    body = { error: { code: 'bad_json', message: 'Malformed JSON body' } };
  } else if (err?.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    status = 409;
    body = { error: { code: 'conflict', message: 'A record with these values already exists' } };
  } else {
    console.error(err);
  }
  res.status(status).json(body);
};
