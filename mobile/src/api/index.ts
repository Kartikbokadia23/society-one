import { createApiClient } from './client';
import { tokenStore } from './tokenStore';

export * from './client';
export { tokenStore } from './tokenStore';

export const api = createApiClient({
  baseUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000',
  getToken: tokenStore.get,
});
