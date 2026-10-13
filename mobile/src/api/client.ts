import type {
  ApiErrorBody, Amenity, Booking, HealthResponse, Invoice, Notice, Ticket, Visitor,
} from '@societyone/shared';

export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string, public details?: unknown) {
    super(message);
  }
}

export interface ClientOptions {
  baseUrl: string;
  getToken?: () => Promise<string | null> | string | null;
  fetchImpl?: typeof fetch;
}

export function createApiClient({ baseUrl, getToken, fetchImpl = fetch }: ClientOptions) {
  async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    const token = getToken ? await getToken() : null;
    if (token) headers.Authorization = `Bearer ${token}`;

    let res: Response;
    try {
      res = await fetchImpl(`${baseUrl}${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
    } catch {
      throw new ApiError(0, 'network_error', 'Cannot reach the server');
    }
    const text = await res.text();
    const data = text ? JSON.parse(text) : undefined;
    if (!res.ok) {
      const err = (data as ApiErrorBody | undefined)?.error;
      throw new ApiError(res.status, err?.code ?? 'http_error', err?.message ?? `Request failed (${res.status})`, err?.details);
    }
    return data as T;
  }

  return {
    request,
    get: <T>(path: string) => request<T>('GET', path),
    post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
    health: () => request<HealthResponse>('GET', '/health'),
    // Typed resource accessors; endpoints are delivered by the module features.
    visitors: { list: () => request<Visitor[]>('GET', '/visitors') },
    notices: { list: () => request<Notice[]>('GET', '/notices') },
    amenities: { list: () => request<Amenity[]>('GET', '/amenities'), bookings: () => request<Booking[]>('GET', '/bookings') },
    invoices: { list: () => request<Invoice[]>('GET', '/invoices') },
    tickets: { list: () => request<Ticket[]>('GET', '/tickets') },
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;
