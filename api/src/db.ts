import Database from 'better-sqlite3';

export type Db = Database.Database;

export function openDb(file: string = process.env.DATABASE_FILE ?? 'societyone.db'): Db {
  const db = new Database(file);
  db.pragma('foreign_keys = ON');
  if (file !== ':memory:') db.pragma('journal_mode = WAL');
  return db;
}
