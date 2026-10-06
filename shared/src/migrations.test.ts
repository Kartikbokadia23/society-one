import { migrations } from './migrations';

describe('migrations', () => {
  it('have unique, sequential ids', () => {
    expect(migrations.map((m) => m.id)).toEqual(migrations.map((_, i) => i + 1));
  });
  it('create every entity table', () => {
    const sql = migrations.map((m) => m.sql).join('\n');
    for (const t of ['societies','flats','users','visitors','notices','amenities','bookings','invoices','payments','tickets','ticket_comments']) {
      expect(sql).toContain(`CREATE TABLE ${t} (`);
    }
  });
});
