import express from 'express';
import request from 'supertest';
import Database from 'better-sqlite3';
import { z } from 'zod';
import { TABLES } from '@societyone/shared';
import { createApp } from '../src/app';
import { runMigrations } from '../src/migrate';
import { HttpError } from '../src/errors';
import { errorHandler } from '../src/middleware';

describe('health', () => {
  it('reports ok with db up', async () => {
    const db = new Database(':memory:');
    const res = await request(createApp(db)).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok', db: 'up' });
  });
  it('reports degraded when db is closed', async () => {
    const db = new Database(':memory:');
    db.close();
    const res = await request(createApp(db)).get('/health');
    expect(res.status).toBe(503);
    expect(res.body.status).toBe('degraded');
  });
  it('returns JSON 404 for unknown routes', async () => {
    const res = await request(createApp()).get('/nope');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('not_found');
  });
});

describe('error middleware', () => {
  const app = express();
  app.use(express.json());
  app.get('/http', () => { throw new HttpError(409, 'conflict', 'Taken'); });
  app.get('/zod', () => { z.object({ a: z.string() }).parse({}); });
  app.get('/boom', () => { throw new Error('secret'); });
  app.post('/json', (_req, res) => res.json({}));
  app.use(errorHandler);

  it('maps HttpError', async () => {
    const res = await request(app).get('/http');
    expect(res.status).toBe(409);
    expect(res.body.error).toMatchObject({ code: 'conflict', message: 'Taken' });
  });
  it('maps validation errors to 400', async () => {
    const res = await request(app).get('/zod');
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('validation_error');
  });
  it('hides internal errors', async () => {
    const res = await request(app).get('/boom');
    expect(res.status).toBe(500);
    expect(JSON.stringify(res.body)).not.toContain('secret');
  });
  it('rejects malformed JSON', async () => {
    const res = await request(app).post('/json').set('Content-Type', 'application/json').send('{bad');
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('invalid_json');
  });
});

describe('migration runner', () => {
  it('creates all tables and is idempotent', () => {
    const db = new Database(':memory:');
    expect(runMigrations(db)).toEqual([1]);
    expect(runMigrations(db)).toEqual([]);
    const names = (db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all() as { name: string }[]).map((r) => r.name);
    for (const t of TABLES) expect(names).toContain(t);
  });
  it('rolls back a failing migration', () => {
    const db = new Database(':memory:');
    expect(() => runMigrations(db, [{ id: 1, name: 'bad', sql: 'CREATE TABLE a (id INTEGER); BOGUS SQL;' }])).toThrow();
    const names = (db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all() as { name: string }[]).map((r) => r.name);
    expect(names).not.toContain('a');
  });
});
