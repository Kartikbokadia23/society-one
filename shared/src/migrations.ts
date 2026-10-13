import fs from 'fs';
import path from 'path';

export interface Migration {
  id: string;
  sql: string;
}

// Works from both src/ and dist/: migrations live one level above either.
export const migrationsDir = path.join(__dirname, '..', 'migrations');

export function loadMigrations(dir: string = migrationsDir): Migration[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.sql'))
    .sort()
    .map((f) => ({ id: f, sql: fs.readFileSync(path.join(dir, f), 'utf8') }));
}
