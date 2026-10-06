import { openDb } from './db';
import { runMigrations } from './migrate';

const applied = runMigrations(openDb());
console.log(applied.length ? `Applied migrations: ${applied.join(', ')}` : 'Database is up to date');
