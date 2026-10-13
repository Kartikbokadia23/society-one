CREATE TABLE societies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE flats (
  id TEXT PRIMARY KEY,
  society_id TEXT NOT NULL REFERENCES societies(id),
  block TEXT NOT NULL,
  number TEXT NOT NULL,
  UNIQUE (society_id, block, number)
);

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  society_id TEXT NOT NULL REFERENCES societies(id),
  flat_id TEXT REFERENCES flats(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('resident','admin','guard')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (society_id, email)
);

CREATE TABLE visitors (
  id TEXT PRIMARY KEY,
  society_id TEXT NOT NULL REFERENCES societies(id),
  flat_id TEXT NOT NULL REFERENCES flats(id),
  host_user_id TEXT NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  phone TEXT,
  purpose TEXT,
  pass_code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'expected' CHECK (status IN ('expected','checked_in','checked_out','denied')),
  expected_at TEXT NOT NULL,
  checked_in_at TEXT,
  checked_out_at TEXT,
  UNIQUE (society_id, pass_code)
);

CREATE TABLE notices (
  id TEXT PRIMARY KEY,
  society_id TEXT NOT NULL REFERENCES societies(id),
  author_id TEXT NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  pinned INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE amenities (
  id TEXT PRIMARY KEY,
  society_id TEXT NOT NULL REFERENCES societies(id),
  name TEXT NOT NULL,
  description TEXT,
  capacity INTEGER NOT NULL DEFAULT 1 CHECK (capacity > 0),
  open_time TEXT NOT NULL,
  close_time TEXT NOT NULL,
  UNIQUE (society_id, name)
);

CREATE TABLE bookings (
  id TEXT PRIMARY KEY,
  amenity_id TEXT NOT NULL REFERENCES amenities(id),
  user_id TEXT NOT NULL REFERENCES users(id),
  starts_at TEXT NOT NULL,
  ends_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed','cancelled')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  CHECK (ends_at > starts_at)
);

CREATE TABLE invoices (
  id TEXT PRIMARY KEY,
  society_id TEXT NOT NULL REFERENCES societies(id),
  flat_id TEXT NOT NULL REFERENCES flats(id),
  description TEXT NOT NULL,
  amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0),
  currency TEXT NOT NULL DEFAULT 'INR',
  due_date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','overdue')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE payments (
  id TEXT PRIMARY KEY,
  invoice_id TEXT NOT NULL REFERENCES invoices(id),
  user_id TEXT NOT NULL REFERENCES users(id),
  amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0),
  status TEXT NOT NULL DEFAULT 'initiated' CHECK (status IN ('initiated','succeeded','failed')),
  reference TEXT,
  paid_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE tickets (
  id TEXT PRIMARY KEY,
  society_id TEXT NOT NULL REFERENCES societies(id),
  flat_id TEXT REFERENCES flats(id),
  created_by TEXT NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low','medium','high')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','in_progress','resolved','closed')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE ticket_comments (
  id TEXT PRIMARY KEY,
  ticket_id TEXT NOT NULL REFERENCES tickets(id),
  author_id TEXT NOT NULL REFERENCES users(id),
  body TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_flats_society ON flats(society_id);
CREATE INDEX idx_visitors_flat ON visitors(flat_id);
CREATE INDEX idx_notices_society ON notices(society_id, created_at);
CREATE INDEX idx_bookings_amenity ON bookings(amenity_id, starts_at);
CREATE INDEX idx_invoices_flat ON invoices(flat_id, status);
CREATE INDEX idx_payments_invoice ON payments(invoice_id);
CREATE INDEX idx_tickets_society ON tickets(society_id, status);
CREATE INDEX idx_ticket_comments_ticket ON ticket_comments(ticket_id);
