import { ApiError, createApiClient } from '../src/api/client';

const reply = (status: number, body?: unknown) =>
  jest.fn().mockResolvedValue({ ok: status < 400, status, text: async () => (body === undefined ? '' : JSON.stringify(body)) });

describe('api client', () => {
  it('fetches typed health with auth header', async () => {
    const fetchImpl = reply(200, { status: 'ok', uptime: 1 });
    const client = createApiClient({ baseUrl: 'http://x', getToken: async () => 'tok', fetchImpl: fetchImpl as any });
    const res = await client.health();
    expect(res.status).toBe('ok');
    expect(fetchImpl).toHaveBeenCalledWith('http://x/health', expect.objectContaining({ method: 'GET', headers: expect.objectContaining({ Authorization: 'Bearer tok' }) }));
  });

  it('sends JSON bodies', async () => {
    const fetchImpl = reply(200, {});
    await createApiClient({ baseUrl: 'http://x', fetchImpl: fetchImpl as any }).post('/a', { n: 1 });
    expect(fetchImpl.mock.calls[0][1].body).toBe('{"n":1}');
  });

  it('throws ApiError with server code and message', async () => {
    const client = createApiClient({ baseUrl: 'http://x', fetchImpl: reply(409, { error: { code: 'conflict', message: 'dup' } }) as any });
    await expect(client.post('/a', {})).rejects.toMatchObject({ status: 409, code: 'conflict', message: 'dup' });
  });

  it('wraps network failures', async () => {
    const client = createApiClient({ baseUrl: 'http://x', fetchImpl: jest.fn().mockRejectedValue(new Error('down')) as any });
    await expect(client.get('/a')).rejects.toBeInstanceOf(ApiError);
  });
});
