import { loadConfig } from './config';
import { openDb, runMigrations } from './db';

const db = openDb(loadConfig().databasePath);
const applied = runMigrations(db);
console.log(applied.length ? `Applied: ${applied.join(', ')}` : 'No pending migrations');
