import { openDb } from './db';
import { runMigrations } from './migrate';

const applied = runMigrations(openDb());
console.log(applied.length ? `Applied: ${applied.join(', ')}` : 'Database up to date');
