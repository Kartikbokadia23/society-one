import express from 'express';
import request from 'supertest';
import { z } from 'zod';
import { createApp } from '../src/app';
import { AppError } from '../src/errors';
import { errorHandler, validateBody } from '../src/middleware';

describe('app', () => {
  it('answers /health', async () => {
    const res = await request(createApp()).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('returns a JSON 404 for unknown routes', async () => {
    const res = await request(createApp()).get('/nope');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('not_found');
  });

  it('returns 400 for malformed JSON', async () => {
    const res = await request(createApp()).post('/health').set('Content-Type', 'application/json').send('{bad');
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('bad_json');
  });
});

describe('error handling', () => {
  const app = express();
  app.use(express.json());
  app.post('/v', validateBody(z.object({ name: z.string().min(1) })), (_q, r) => r.json({ ok: true }));
  app.get('/conflict', (_q, _r, next) => next(new AppError(409, 'conflict', 'Already exists')));
  app.get('/boom', () => {
    throw new Error('secret internals');
  });
  app.use(errorHandler);

  it('maps validation errors to 400', async () => {
    const res = await request(app).post('/v').send({});
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('validation_error');
  });

  it('maps AppError to its status', async () => {
    const res = await request(app).get('/conflict');
    expect(res.status).toBe(409);
    expect(res.body.error.message).toBe('Already exists');
  });

  it('hides internals on unexpected errors', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const res = await request(app).get('/boom');
    spy.mockRestore();
    expect(res.status).toBe(500);
    expect(JSON.stringify(res.body)).not.toContain('secret');
  });
});
