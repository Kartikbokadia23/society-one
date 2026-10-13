/** Single source of truth for the SocietyOne data model. Mirrors migrations/001_init.sql. */
export type ID = string;
export type ISODate = string;

export type Role = 'resident' | 'admin' | 'guard';
export type VisitorStatus = 'expected' | 'checked_in' | 'checked_out' | 'denied';
export type BookingStatus = 'confirmed' | 'cancelled';
export type InvoiceStatus = 'pending' | 'paid' | 'overdue';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';

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
  createdAt: ISODate;
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

export interface Visitor {
  id: ID;
  societyId: ID;
  flatId: ID;
  hostUserId: ID;
  name: string;
  phone: string | null;
  purpose: string | null;
  passCode: string;
  status: VisitorStatus;
  expectedAt: ISODate | null;
  checkedInAt: ISODate | null;
  checkedOutAt: ISODate | null;
  createdAt: ISODate;
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
  description: string | null;
  capacity: number;
  createdAt: ISODate;
}

export interface Booking {
  id: ID;
  societyId: ID;
  amenityId: ID;
  userId: ID;
  startsAt: ISODate;
  endsAt: ISODate;
  status: BookingStatus;
  createdAt: ISODate;
}

export interface Invoice {
  id: ID;
  societyId: ID;
  flatId: ID;
  description: string;
  amountCents: number;
  dueDate: ISODate;
  status: InvoiceStatus;
  createdAt: ISODate;
}

export interface Payment {
  id: ID;
  societyId: ID;
  invoiceId: ID;
  userId: ID;
  amountCents: number;
  method: string;
  reference: string | null;
  paidAt: ISODate;
}

export interface Ticket {
  id: ID;
  societyId: ID;
  flatId: ID | null;
  createdBy: ID;
  title: string;
  description: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: ISODate;
  updatedAt: ISODate;
}

export interface TicketComment {
  id: ID;
  societyId: ID;
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
