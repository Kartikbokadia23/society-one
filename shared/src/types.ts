/** Single source of truth for the SocietyOne data model. Mirrors shared/migrations/*.sql. */
export type ID = string;
export type ISODate = string;

export type Role = 'resident' | 'admin' | 'guard';

export interface Society {
  id: ID;
  name: string;
  address: string;
  createdAt: ISODate;
}

export interface Flat {
  id: ID;
  societyId: ID;
  block: string;
  number: string;
}

export interface User {
  id: ID;
  societyId: ID;
  flatId: ID | null;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
  createdAt: ISODate;
}

export type VisitorStatus = 'expected' | 'approved' | 'checked_in' | 'checked_out' | 'denied';
export interface Visitor {
  id: ID;
  societyId: ID;
  flatId: ID;
  name: string;
  purpose: string | null;
  passCode: string | null;
  status: VisitorStatus;
  expectedAt: ISODate | null;
  checkedInAt: ISODate | null;
  checkedOutAt: ISODate | null;
}

export interface Notice {
  id: ID;
  societyId: ID;
  authorId: ID;
  title: string;
  body: string;
  pinned: boolean;
  createdAt: ISODate;
}

export interface Amenity {
  id: ID;
  societyId: ID;
  name: string;
  capacity: number;
  openTime: string;
  closeTime: string;
}

export type BookingStatus = 'confirmed' | 'cancelled';
export interface Booking {
  id: ID;
  amenityId: ID;
  userId: ID;
  startsAt: ISODate;
  endsAt: ISODate;
  status: BookingStatus;
}

export type InvoiceStatus = 'due' | 'paid' | 'overdue';
export interface Invoice {
  id: ID;
  societyId: ID;
  flatId: ID;
  description: string;
  amountCents: number;
  dueDate: ISODate;
  status: InvoiceStatus;
}

export interface Payment {
  id: ID;
  invoiceId: ID;
  userId: ID;
  amountCents: number;
  method: string;
  reference: string | null;
  paidAt: ISODate;
}

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export interface Ticket {
  id: ID;
  societyId: ID;
  flatId: ID | null;
  createdBy: ID;
  title: string;
  description: string;
  category: string;
  status: TicketStatus;
  createdAt: ISODate;
}

export interface TicketComment {
  id: ID;
  ticketId: ID;
  authorId: ID;
  body: string;
  createdAt: ISODate;
}

export interface HealthResponse {
  status: 'ok';
  uptime: number;
}

export interface ApiErrorBody {
  error: { code: string; message: string; details?: unknown };
}
