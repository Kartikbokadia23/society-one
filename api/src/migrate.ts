import * as fs from 'fs';
import * as path from 'path';
import type { Db } from './db';

/** Applies pending *.sql files (sorted by name) once each, each in a transaction. Returns applied names. */
export function runMigrations(db: Db, dir: string): string[] {
  db.exec(
    `CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT (datetime('now')))`,
  );
  const done = new Set(
    (db.prepare('SELECT name FROM schema_migrations').all() as { name: string }[]).map((r) => r.name),
  );
  const applied: string[] = [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();
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
