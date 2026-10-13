import { ApiError, createApiClient } from '../src/api/client';

const json = (status: number, body: unknown) =>
  Promise.resolve({ ok: status < 400, status, text: () => Promise.resolve(JSON.stringify(body)) } as Response);

describe('api client', () => {
  it('fetches typed health and sends the bearer token', async () => {
    const fetchImpl = jest.fn(() => json(200, { status: 'ok', uptime: 1, timestamp: 't' }));
    const client = createApiClient({ baseUrl: 'http://x', getToken: () => 'tok', fetchImpl: fetchImpl as unknown as typeof fetch });
    const res = await client.health();
    expect(res.status).toBe('ok');
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('http://x/health');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer tok');
  });

  it('turns error payloads into ApiError', async () => {
    const fetchImpl = jest.fn(() => json(409, { error: { code: 'conflict', message: 'Already exists' } }));
    const client = createApiClient({ baseUrl: 'http://x', fetchImpl: fetchImpl as unknown as typeof fetch });
    await expect(client.post('/things', { a: 1 })).rejects.toMatchObject({ status: 409, code: 'conflict', message: 'Already exists' });
  });

  it('reports network failures', async () => {
    const fetchImpl = jest.fn(() => Promise.reject(new Error('down')));
    const client = createApiClient({ baseUrl: 'http://x', fetchImpl: fetchImpl as unknown as typeof fetch });
    await expect(client.get('/a')).rejects.toBeInstanceOf(ApiError);
  });
});
