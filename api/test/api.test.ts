import express from 'express';
import request from 'supertest';
import { createApp } from '../src/app';
import { openDb, runMigrations } from '../src/db';
import { loadConfig } from '../src/config';
import { signToken, verifyToken } from '../src/auth';
import { errorHandler } from '../src/middleware';
import { HttpError } from '../src/errors';

const tables = (db: ReturnType<typeof openDb>) =>
  db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map((r: any) => r.name);

describe('migrations', () => {
  it('creates every model table and is idempotent', () => {
    const db = openDb(':memory:');
    expect(runMigrations(db)).toEqual(['001_init.sql']);
    expect(runMigrations(db)).toEqual([]);
    for (const t of ['societies', 'flats', 'users', 'visitors', 'notices', 'amenities', 'bookings', 'invoices', 'payments', 'tickets', 'ticket_comments']) {
      expect(tables(db)).toContain(t);
    }
  });

  it('scopes uniqueness per society', () => {
    const db = openDb(':memory:');
    runMigrations(db);
    db.prepare("INSERT INTO societies (id, name) VALUES ('s1','A'),('s2','B')").run();
    const ins = db.prepare("INSERT INTO users (id, society_id, name, email, password_hash, role) VALUES (?,?,?,?,?,'resident')");
    ins.run('u1', 's1', 'X', 'x@a.com', 'h');
    ins.run('u2', 's2', 'X', 'x@a.com', 'h');
    expect(() => ins.run('u3', 's1', 'X', 'x@a.com', 'h')).toThrow(/UNIQUE/);
  });
});

describe('app', () => {
  const db = openDb(':memory:');
  runMigrations(db);
  const app = createApp(db);

  it('answers /health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('returns JSON 404 for unknown routes', async () => {
    const res = await request(app).get('/nope');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('not_found');
  });

  it('returns 400 for malformed JSON', async () => {
    const res = await request(app).post('/health').set('Content-Type', 'application/json').send('{bad');
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('bad_request');
  });
});

describe('errorHandler', () => {
  const make = (err: unknown) => {
    const a = express();
    a.get('/e', () => {
      throw err;
    });
    a.use(errorHandler);
    return a;
  };

  it('maps HttpError', async () => {
    const res = await request(make(new HttpError(409, 'conflict', 'dup'))).get('/e');
    expect(res.status).toBe(409);
    expect(res.body.error).toMatchObject({ code: 'conflict', message: 'dup' });
  });

  it('maps unique constraint failures to 409', async () => {
    const res = await request(make(Object.assign(new Error('x'), { code: 'SQLITE_CONSTRAINT_UNIQUE' }))).get('/e');
    expect(res.status).toBe(409);
  });

  it('hides unexpected errors behind a 500', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const res = await request(make(new Error('secret detail'))).get('/e');
    expect(res.status).toBe(500);
    expect(JSON.stringify(res.body)).not.toContain('secret detail');
  });
});

describe('config and auth', () => {
  it('requires JWT_SECRET', () => {
    expect(() => loadConfig({})).toThrow(/JWT_SECRET/);
    expect(loadConfig({ JWT_SECRET: 'x', PORT: '4000' }).port).toBe(4000);
  });

  it('round-trips a token', () => {
    const t = signToken({ sub: 'u1', societyId: 's1', role: 'admin' }, 'test-secret');
    expect(verifyToken(t, 'test-secret')).toMatchObject({ sub: 'u1', role: 'admin' });
    expect(() => verifyToken(t, 'other')).toThrow();
  });
});
