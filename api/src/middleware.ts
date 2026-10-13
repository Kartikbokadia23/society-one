import { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
import type { ApiErrorBody } from '@societyone/shared';
import { HttpError } from './errors';

export const notFoundHandler: RequestHandler = (req, res) => {
  const body: ApiErrorBody = { error: { code: 'not_found', message: `Route ${req.method} ${req.path} not found` } };
  res.status(404).json(body);
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let status = 500;
  let body: ApiErrorBody = { error: { code: 'internal_error', message: 'Internal server error' } };

  if (err instanceof HttpError) {
    status = err.status;
    body = { error: { code: err.code, message: err.message, details: err.details } };
  } else if (err instanceof ZodError) {
    status = 400;
    body = { error: { code: 'validation_error', message: 'Invalid request', details: err.flatten() } };
  } else if (err?.type === 'entity.parse.failed') {
    status = 400;
    body = { error: { code: 'bad_request', message: 'Malformed JSON body' } };
  } else if (typeof err?.code === 'string' && err.code.startsWith('SQLITE_CONSTRAINT_UNIQUE')) {
    status = 409;
    body = { error: { code: 'conflict', message: 'A record with these values already exists' } };
  } else {
    console.error(err);
  }
  res.status(status).json(body);
};
