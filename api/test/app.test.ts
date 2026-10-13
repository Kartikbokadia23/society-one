import express from 'express';
import request from 'supertest';
import { z } from 'zod';
import { createApp } from '../src/app';
import { openDb } from '../src/db';
import { errorHandler, HttpError } from '../src/errors';
import { runMigrations } from '../src/migrate';

describe('health and errors', () => {
  const app = createApp();
  it('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
  it('unknown route gives 404 json', async () => {
    const res = await request(app).get('/nope');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('not_found');
  });
  it('malformed JSON gives 400', async () => {
    const res = await request(app).post('/health').set('Content-Type', 'application/json').send('{bad');
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('bad_json');
  });
  it('maps HttpError, ZodError and unexpected errors', async () => {
    const a = express();
    a.get('/http', () => { throw new HttpError(403, 'forbidden', 'no'); });
    a.get('/zod', () => { z.object({ a: z.string() }).parse({}); });
    a.get('/boom', () => { throw new Error('x'); });
    a.use(errorHandler);
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect((await request(a).get('/http')).status).toBe(403);
    expect((await request(a).get('/zod')).body.error.code).toBe('validation_error');
    const boom = await request(a).get('/boom');
    expect(boom.status).toBe(500);
    expect(boom.body.error.message).toBe('Internal server error');
  });
});

describe('migrations', () => {
  it('creates every model table and is idempotent', () => {
    const db = openDb(':memory:');
    const first = runMigrations(db);
    expect(first.length).toBeGreaterThan(0);
    expect(runMigrations(db)).toEqual([]);
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map((r: any) => r.name);
    for (const t of ['societies', 'flats', 'users', 'visitors', 'notices', 'amenities', 'bookings', 'invoices', 'payments', 'tickets', 'ticket_comments']) {
      expect(tables).toContain(t);
    }
  });
  it('enforces per-society unique emails with a unique-constraint error', () => {
    const db = openDb(':memory:');
    runMigrations(db);
    db.prepare("INSERT INTO societies (id,name,address) VALUES ('s1','A','x'),('s2','B','y')").run();
    const ins = db.prepare("INSERT INTO users (id,society_id,name,email,password_hash,role) VALUES (?,?,?,?,?,?)");
    ins.run('u1', 's1', 'n', 'a@b.c', 'h', 'resident');
    ins.run('u2', 's2', 'n', 'a@b.c', 'h', 'resident');
    expect(() => ins.run('u3', 's1', 'n', 'a@b.c', 'h', 'resident')).toThrow(/UNIQUE/);
  });
});
