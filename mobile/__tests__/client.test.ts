import { ApiError, createApiClient } from '../src/api/client';

const res = (status: number, body?: unknown) =>
  Promise.resolve({ ok: status < 400, status, text: () => Promise.resolve(body === undefined ? '' : JSON.stringify(body)) } as Response);

describe('api client', () => {
  it('fetches health with typed result', async () => {
    const fetchImpl = jest.fn().mockReturnValue(res(200, { status: 'ok', uptime: 1 }));
    const client = createApiClient({ baseUrl: 'http://x', fetchImpl });
    expect((await client.health()).status).toBe('ok');
    expect(fetchImpl.mock.calls[0][0]).toBe('http://x/health');
  });

  it('sends bearer token and JSON body', async () => {
    const fetchImpl = jest.fn().mockReturnValue(res(200, {}));
    const client = createApiClient({ baseUrl: 'http://x', getToken: async () => 'tok', fetchImpl });
    await client.post('/things', { a: 1 });
    const init = fetchImpl.mock.calls[0][1];
    expect(init.headers.Authorization).toBe('Bearer tok');
    expect(init.body).toBe('{"a":1}');
  });

  it('throws ApiError with server error details', async () => {
    const fetchImpl = jest.fn().mockReturnValue(res(409, { error: { code: 'conflict', message: 'exists' } }));
    const client = createApiClient({ baseUrl: 'http://x', fetchImpl });
    await expect(client.get('/x')).rejects.toMatchObject({ status: 409, code: 'conflict', message: 'exists' });
  });

  it('maps network failures', async () => {
    const fetchImpl = jest.fn().mockRejectedValue(new Error('down'));
    const client = createApiClient({ baseUrl: 'http://x', fetchImpl });
    const err = await client.get('/x').catch((e) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect(err.code).toBe('network_error');
  });
});
