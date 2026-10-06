export interface Migration {
  id: number;
  name: string;
  sql: string;
}

export const migrations: Migration[] = [
  {
    id: 1,
    name: 'initial_schema',
    sql: `
CREATE TABLE societies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE TABLE flats (
  id TEXT PRIMARY KEY,
  society_id TEXT NOT NULL REFERENCES societies(id),
  block TEXT NOT NULL,
  number TEXT NOT NULL,
  floor INTEGER,
  UNIQUE (society_id, block, number)
);
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  society_id TEXT NOT NULL REFERENCES societies(id),
  flat_id TEXT REFERENCES flats(id),
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  role TEXT NOT NULL CHECK (role IN ('resident','admin','guard')),
  created_at TEXT NOT NULL
);
CREATE TABLE visitors (
  id TEXT PRIMARY KEY,
  society_id TEXT NOT NULL REFERENCES societies(id),
  flat_id TEXT NOT NULL REFERENCES flats(id),
  host_user_id TEXT NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  phone TEXT,
  purpose TEXT NOT NULL,
  pass_code TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('expected','checked_in','checked_out','denied')),
  expected_at TEXT NOT NULL,
  checked_in_at TEXT,
  checked_out_at TEXT
);
CREATE TABLE notices (
  id TEXT PRIMARY KEY,
  society_id TEXT NOT NULL REFERENCES societies(id),
  author_id TEXT NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('general','maintenance','event','emergency')),
  pinned INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);
CREATE TABLE amenities (
  id TEXT PRIMARY KEY,
  society_id TEXT NOT NULL REFERENCES societies(id),
  name TEXT NOT NULL,
  description TEXT,
  capacity INTEGER NOT NULL,
  opens_at TEXT NOT NULL,
  closes_at TEXT NOT NULL
);
CREATE TABLE bookings (
  id TEXT PRIMARY KEY,
  amenity_id TEXT NOT NULL REFERENCES amenities(id),
  user_id TEXT NOT NULL REFERENCES users(id),
  starts_at TEXT NOT NULL,
  ends_at TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('confirmed','cancelled')),
  created_at TEXT NOT NULL
);
CREATE TABLE invoices (
  id TEXT PRIMARY KEY,
  society_id TEXT NOT NULL REFERENCES societies(id),
  flat_id TEXT NOT NULL REFERENCES flats(id),
  title TEXT NOT NULL,
  amount_minor INTEGER NOT NULL,
  currency TEXT NOT NULL,
  due_date TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('due','paid','overdue','void')),
  created_at TEXT NOT NULL
);
CREATE TABLE payments (
  id TEXT PRIMARY KEY,
  invoice_id TEXT NOT NULL REFERENCES invoices(id),
  user_id TEXT NOT NULL REFERENCES users(id),
  amount_minor INTEGER NOT NULL,
  method TEXT NOT NULL,
  reference TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending','succeeded','failed','refunded')),
  paid_at TEXT,
  created_at TEXT NOT NULL
);
CREATE TABLE tickets (
  id TEXT PRIMARY KEY,
  society_id TEXT NOT NULL REFERENCES societies(id),
  flat_id TEXT REFERENCES flats(id),
  created_by TEXT NOT NULL REFERENCES users(id),
  assigned_to TEXT REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low','medium','high')),
  status TEXT NOT NULL CHECK (status IN ('open','in_progress','resolved','closed')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE ticket_comments (
  id TEXT PRIMARY KEY,
  ticket_id TEXT NOT NULL REFERENCES tickets(id),
  author_id TEXT NOT NULL REFERENCES users(id),
  body TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX idx_visitors_flat ON visitors(flat_id);
CREATE INDEX idx_notices_society ON notices(society_id, created_at);
CREATE INDEX idx_bookings_amenity ON bookings(amenity_id, starts_at);
CREATE INDEX idx_invoices_flat ON invoices(flat_id, status);
CREATE INDEX idx_tickets_society ON tickets(society_id, status);
CREATE INDEX idx_ticket_comments_ticket ON ticket_comments(ticket_id);
`,
  },
];

/** Tables created by the migrations, one per entity in types.ts. */
export const TABLES = [
  'societies', 'flats', 'users', 'visitors', 'notices', 'amenities',
  'bookings', 'invoices', 'payments', 'tickets', 'ticket_comments',
] as const;
