import { createApp } from './app';
import { openDb } from './db';
import { runMigrations } from './migrate';

const db = openDb();
runMigrations(db);
const port = Number(process.env.PORT ?? 3000);
createApp(db).listen(port, () => console.log(`SocietyOne API listening on :${port}`));
