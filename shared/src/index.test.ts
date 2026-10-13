import * as fs from 'fs';
import * as path from 'path';
import { MIGRATIONS_DIR } from './index';

describe('shared package', () => {
  it('ships SQL migrations for every entity', () => {
    const files = fs.readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith('.sql'));
    expect(files.length).toBeGreaterThan(0);
    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, files[0]), 'utf8');
    for (const t of ['societies', 'flats', 'users', 'visitors', 'notices', 'amenities', 'bookings', 'invoices', 'payments', 'tickets', 'ticket_comments']) {
      expect(sql).toContain(`CREATE TABLE ${t} `);
    }
  });
});
