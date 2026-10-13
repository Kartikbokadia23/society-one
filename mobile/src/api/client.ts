import type { ApiErrorBody, HealthResponse } from '@societyone/shared';

export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string, public details?: unknown) {
    super(message);
  }
}

export interface ApiClientOptions {
  baseUrl: string;
  getToken?: () => Promise<string | null>;
  fetchImpl?: typeof fetch;
}

export function createApiClient({ baseUrl, getToken, fetchImpl = fetch }: ApiClientOptions) {
  async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    const token = getToken ? await getToken() : null;
    if (token) headers.Authorization = `Bearer ${token}`;

    let res: Response;
    try {
      res = await fetchImpl(`${baseUrl}${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
    } catch {
      throw new ApiError(0, 'network_error', 'Cannot reach the server. Check your connection.');
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
    get: <T>(path: string) => request<T>('GET', path),
    post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
    put: <T>(path: string, body?: unknown) => request<T>('PUT', path, body),
    delete: <T>(path: string) => request<T>('DELETE', path),
    health: () => request<HealthResponse>('GET', '/health'),
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;
