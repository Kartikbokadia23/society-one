import { MIGRATIONS_DIR } from '@societyone/shared';
import { createApp } from './app';
import { openDb } from './db';
import { runMigrations } from './migrate';

runMigrations(openDb(), MIGRATIONS_DIR);
const port = Number(process.env.PORT ?? 3000);
createApp().listen(port, () => console.log(`SocietyOne API listening on :${port}`));
