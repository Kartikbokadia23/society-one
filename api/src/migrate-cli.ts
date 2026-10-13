import { MIGRATIONS_DIR } from '@societyone/shared';
import { openDb } from './db';
import { runMigrations } from './migrate';

const applied = runMigrations(openDb(), MIGRATIONS_DIR);
console.log(applied.length ? `Applied: ${applied.join(', ')}` : 'Database is up to date');
