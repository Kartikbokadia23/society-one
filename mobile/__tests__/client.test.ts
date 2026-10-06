import { ApiClient, ApiError } from '../src/api/client';
import { colors, spacing, typography } from '../src/theme/tokens';

const respond = (status: number, body?: unknown) =>
  jest.fn().mockResolvedValue({ ok: status < 400, status, text: async () => (body === undefined ? '' : JSON.stringify(body)) });

describe('ApiClient', () => {
  it('sends auth header and parses JSON', async () => {
    const fetchImpl = respond(200, { status: 'ok', db: 'up', uptime: 1 });
    const client = new ApiClient({ baseUrl: 'http://x/', getToken: () => 'tok', fetchImpl: fetchImpl as any });
    await expect(client.health()).resolves.toMatchObject({ status: 'ok' });
    expect(fetchImpl).toHaveBeenCalledWith(
      'http://x/health',
      expect.objectContaining({ method: 'GET', headers: expect.objectContaining({ Authorization: 'Bearer tok' }) }),
    );
  });
  it('sends JSON bodies', async () => {
    const fetchImpl = respond(200, {});
    await new ApiClient({ baseUrl: 'http://x', fetchImpl: fetchImpl as any }).post('/a', { n: 1 });
    expect(fetchImpl.mock.calls[0][1]).toMatchObject({ body: '{"n":1}', headers: { 'Content-Type': 'application/json' } });
  });
  it('throws ApiError from error body', async () => {
    const client = new ApiClient({ baseUrl: 'http://x', fetchImpl: respond(409, { error: { code: 'conflict', message: 'Taken' } }) as any });
    await expect(client.get('/a')).rejects.toMatchObject({ status: 409, code: 'conflict', message: 'Taken' });
  });
  it('wraps network failures', async () => {
    const client = new ApiClient({ baseUrl: 'http://x', fetchImpl: jest.fn().mockRejectedValue(new Error('down')) as any });
    const err = await client.get('/a').catch((e) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect(err.code).toBe('network_error');
  });
});

describe('design tokens', () => {
  it('expose colors, spacing and typography', () => {
    expect(colors.primary).toMatch(/^#/);
    expect(spacing.lg).toBeGreaterThan(spacing.md);
    expect(typography.title.fontSize).toBeGreaterThan(typography.body.fontSize);
  });
});
