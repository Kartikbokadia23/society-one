import { createApp } from './app';
import { loadConfig } from './config';
import { openDb, runMigrations } from './db';

const config = loadConfig();
const db = openDb(config.databasePath);
runMigrations(db);
createApp(db).listen(config.port, () => console.log(`SocietyOne API listening on :${config.port}`));
