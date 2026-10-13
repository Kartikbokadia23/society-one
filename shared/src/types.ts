/** Single source of truth for the SocietyOne data model. Mirrors migrations/001_init.sql. */
export type ID = string;
export type ISODate = string;

export type UserRole = 'resident' | 'admin' | 'guard';
export type VisitorStatus = 'expected' | 'checked_in' | 'checked_out' | 'denied';
export type InvoiceStatus = 'pending' | 'paid' | 'overdue';
export type PaymentStatus = 'initiated' | 'succeeded' | 'failed';
export type BookingStatus = 'confirmed' | 'cancelled';
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
}

export interface User {
  id: ID;
  societyId: ID;
  flatId: ID | null;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
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
  expectedAt: ISODate;
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
  description: string | null;
  capacity: number;
  openTime: string; // HH:mm
  closeTime: string; // HH:mm
}

export interface Booking {
  id: ID;
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
  currency: string;
  dueDate: ISODate;
  status: InvoiceStatus;
  createdAt: ISODate;
}

export interface Payment {
  id: ID;
  invoiceId: ID;
  userId: ID;
  amountCents: number;
  status: PaymentStatus;
  reference: string | null;
  paidAt: ISODate | null;
  createdAt: ISODate;
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
  ticketId: ID;
  authorId: ID;
  body: string;
  createdAt: ISODate;
}

/** Error payload returned by the API for every failure. */
export interface ApiErrorBody {
  error: { code: string; message: string; details?: unknown };
}

export interface HealthResponse {
  status: 'ok';
  uptime: number;
  timestamp: ISODate;
}
