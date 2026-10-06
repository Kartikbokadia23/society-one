import type { Database } from 'better-sqlite3';
import { migrations as allMigrations, type Migration } from '@societyone/shared';

/** Applies pending migrations in order, each in its own transaction. Returns applied ids. */
export function runMigrations(db: Database, migrations: Migration[] = allMigrations): number[] {
  db.exec(
    'CREATE TABLE IF NOT EXISTS schema_migrations (id INTEGER PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT NOT NULL)',
  );
  const done = new Set(
    (db.prepare('SELECT id FROM schema_migrations').all() as { id: number }[]).map((r) => r.id),
  );
  const applied: number[] = [];
  for (const m of [...migrations].sort((a, b) => a.id - b.id)) {
    if (done.has(m.id)) continue;
    db.transaction(() => {
      db.exec(m.sql);
      db.prepare('INSERT INTO schema_migrations (id, name, applied_at) VALUES (?, ?, ?)').run(
        m.id,
        m.name,
        new Date().toISOString(),
      );
    })();
    applied.push(m.id);
  }
  return applied;
}
