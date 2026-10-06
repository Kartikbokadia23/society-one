import type { ApiErrorBody } from '@societyone/shared';

export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string, public details?: unknown) {
    super(message);
  }
}

export interface ApiClientOptions {
  baseUrl: string;
  getToken?: () => Promise<string | null> | string | null;
  fetchImpl?: typeof fetch;
}

export interface HealthResponse { status: 'ok' | 'degraded'; db: 'up' | 'down' | 'unconfigured'; uptime: number }

/** Typed JSON client. Feature modules add typed methods on top of `request`. */
export class ApiClient {
  constructor(private opts: ApiClientOptions) {}

  async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const doFetch = this.opts.fetchImpl ?? fetch;
    const token = await this.opts.getToken?.();
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (token) headers.Authorization = `Bearer ${token}`;

    let res: Response;
    try {
      res = await doFetch(this.opts.baseUrl.replace(/\/$/, '') + path, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
      });
    } catch {
      throw new ApiError(0, 'network_error', 'Could not reach the server');
    }
    const text = await res.text();
    const json = text ? safeParse(text) : undefined;
    if (!res.ok) {
      const err = (json as ApiErrorBody | undefined)?.error;
      throw new ApiError(res.status, err?.code ?? 'http_error', err?.message ?? `Request failed (${res.status})`, err?.details);
    }
    return json as T;
  }

  get<T>(path: string) { return this.request<T>('GET', path); }
  post<T>(path: string, body?: unknown) { return this.request<T>('POST', path, body); }
  put<T>(path: string, body?: unknown) { return this.request<T>('PUT', path, body); }
  delete<T>(path: string) { return this.request<T>('DELETE', path); }

  health() { return this.get<HealthResponse>('/health'); }
}

function safeParse(text: string): unknown {
  try { return JSON.parse(text); } catch { return undefined; }
}
