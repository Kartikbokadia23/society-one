import fs from 'fs';
import path from 'path';
import type { Db } from './db';

export const defaultMigrationsDir = process.env.MIGRATIONS_DIR ?? path.resolve(__dirname, '../../shared/migrations');

/** Applies pending *.sql files in filename order, each in a transaction. Returns applied names. */
export function runMigrations(db: Db, dir: string = defaultMigrationsDir): string[] {
  db.exec('CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT (datetime(\'now\')))');
  const done = new Set(db.prepare('SELECT name FROM schema_migrations').all().map((r: any) => r.name as string));
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();
  const applied: string[] = [];
  for (const file of files) {
    if (done.has(file)) continue;
    const sql = fs.readFileSync(path.join(dir, file), 'utf8');
    db.transaction(() => {
      db.exec(sql);
      db.prepare('INSERT INTO schema_migrations (name) VALUES (?)').run(file);
    })();
    applied.push(file);
  }
  return applied;
}
