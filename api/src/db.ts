import Database from 'better-sqlite3';
import { loadMigrations, Migration } from '@societyone/shared';

export type Db = Database.Database;

export function openDb(path: string): Db {
  const db = new Database(path);
  db.pragma('foreign_keys = ON');
  return db;
}

/** Applies pending migrations in order, each in a transaction. Returns ids applied. */
export function runMigrations(db: Db, migrations: Migration[] = loadMigrations()): string[] {
  db.exec('CREATE TABLE IF NOT EXISTS schema_migrations (id TEXT PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT (datetime(\'now\')))');
  const done = new Set(db.prepare('SELECT id FROM schema_migrations').all().map((r: any) => r.id as string));
  const applied: string[] = [];
  for (const m of migrations) {
    if (done.has(m.id)) continue;
    db.transaction(() => {
      db.exec(m.sql);
      db.prepare('INSERT INTO schema_migrations (id) VALUES (?)').run(m.id);
    })();
    applied.push(m.id);
  }
  return applied;
}
