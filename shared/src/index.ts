export * from './types';
import * as path from 'path';

/** Absolute path of the SQL migrations directory shipped by this package. */
export const MIGRATIONS_DIR = path.resolve(__dirname, '..', 'migrations');
