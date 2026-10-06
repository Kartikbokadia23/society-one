import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
import type { ApiErrorBody } from '@societyone/shared';
import { HttpError, notFound } from './errors';

export const notFoundHandler: RequestHandler = (_req, _res, next) => next(notFound('Route not found'));

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let status = 500;
  let body: ApiErrorBody = { error: { code: 'internal_error', message: 'Internal server error' } };
  if (err instanceof HttpError) {
    status = err.status;
    body = { error: { code: err.code, message: err.message, details: err.details } };
  } else if (err instanceof ZodError) {
    status = 400;
    body = { error: { code: 'validation_error', message: 'Invalid request', details: err.flatten() } };
  } else if (err && err.type === 'entity.parse.failed') {
    status = 400;
    body = { error: { code: 'invalid_json', message: 'Malformed JSON body' } };
  } else if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }
  res.status(status).json(body);
};
