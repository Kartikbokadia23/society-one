import Database from 'better-sqlite3';

export function openDb(path: string = process.env.DATABASE_PATH ?? 'societyone.db') {
  const db = new Database(path);
  db.pragma('foreign_keys = ON');
  return db;
}
