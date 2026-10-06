// Single source of truth for the SocietyOne data model.
// Keep in sync with migrations.ts. Ids are UUID strings; timestamps are ISO-8601 strings;
// money is stored as integer minor units (paise/cents).

export type Id = string;
export type IsoDate = string;

export type UserRole = 'resident' | 'admin' | 'guard';
export interface User {
  id: Id;
  societyId: Id;
  flatId: Id | null;
  name: string;
  phone: string;
  email: string | null;
  role: UserRole;
  createdAt: IsoDate;
}

export interface Society {
  id: Id;
  name: string;
  address: string;
  createdAt: IsoDate;
}

export interface Flat {
  id: Id;
  societyId: Id;
  block: string;
  number: string;
  floor: number | null;
}

export type VisitorStatus = 'expected' | 'checked_in' | 'checked_out' | 'denied';
export interface Visitor {
  id: Id;
  societyId: Id;
  flatId: Id;
  hostUserId: Id;
  name: string;
  phone: string | null;
  purpose: string;
  passCode: string;
  status: VisitorStatus;
  expectedAt: IsoDate;
  checkedInAt: IsoDate | null;
  checkedOutAt: IsoDate | null;
}

export type NoticeCategory = 'general' | 'maintenance' | 'event' | 'emergency';
export interface Notice {
  id: Id;
  societyId: Id;
  authorId: Id;
  title: string;
  body: string;
  category: NoticeCategory;
  pinned: boolean;
  createdAt: IsoDate;
}

export interface Amenity {
  id: Id;
  societyId: Id;
  name: string;
  description: string | null;
  capacity: number;
  opensAt: string; // HH:mm
  closesAt: string; // HH:mm
}

export type BookingStatus = 'confirmed' | 'cancelled';
export interface Booking {
  id: Id;
  amenityId: Id;
  userId: Id;
  startsAt: IsoDate;
  endsAt: IsoDate;
  status: BookingStatus;
  createdAt: IsoDate;
}

export type InvoiceStatus = 'due' | 'paid' | 'overdue' | 'void';
export interface Invoice {
  id: Id;
  societyId: Id;
  flatId: Id;
  title: string;
  amountMinor: number;
  currency: string;
  dueDate: IsoDate;
  status: InvoiceStatus;
  createdAt: IsoDate;
}

export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded';
export interface Payment {
  id: Id;
  invoiceId: Id;
  userId: Id;
  amountMinor: number;
  method: string;
  reference: string | null;
  status: PaymentStatus;
  paidAt: IsoDate | null;
  createdAt: IsoDate;
}

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';
export interface Ticket {
  id: Id;
  societyId: Id;
  flatId: Id | null;
  createdBy: Id;
  assignedTo: Id | null;
  title: string;
  description: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: IsoDate;
  updatedAt: IsoDate;
}

export interface TicketComment {
  id: Id;
  ticketId: Id;
  authorId: Id;
  body: string;
  createdAt: IsoDate;
}

/** Standard API error body. */
export interface ApiErrorBody {
  error: { code: string; message: string; details?: unknown };
}
