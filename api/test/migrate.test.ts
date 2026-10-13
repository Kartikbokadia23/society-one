import Database from 'better-sqlite3';
import { MIGRATIONS_DIR } from '@societyone/shared';
import { runMigrations } from '../src/migrate';

describe('migration runner', () => {
  it('creates the schema and is idempotent', () => {
    const db = new Database(':memory:');
    db.pragma('foreign_keys = ON');
    expect(runMigrations(db, MIGRATIONS_DIR)).toEqual(['001_init.sql']);
    expect(runMigrations(db, MIGRATIONS_DIR)).toEqual([]);
    const tables = (db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all() as { name: string }[]).map((t) => t.name);
    expect(tables).toEqual(expect.arrayContaining(['users', 'tickets', 'ticket_comments', 'payments']));
  });

  it('enforces per-society unique emails', () => {
    const db = new Database(':memory:');
    runMigrations(db, MIGRATIONS_DIR);
    db.exec(`INSERT INTO societies (id,name,address) VALUES ('s1','A','x'),('s2','B','y')`);
    const ins = db.prepare(`INSERT INTO users (id,society_id,name,email,password_hash,role) VALUES (?,?,?,?,?,?)`);
    ins.run('u1', 's1', 'N', 'a@x.com', 'h', 'resident');
    ins.run('u2', 's2', 'N', 'a@x.com', 'h', 'resident');
    expect(() => ins.run('u3', 's1', 'N', 'a@x.com', 'h', 'resident')).toThrow(/UNIQUE/);
  });
});
