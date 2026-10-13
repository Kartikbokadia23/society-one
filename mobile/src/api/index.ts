import * as SecureStore from 'expo-secure-store';
import { createApiClient } from './client';

const TOKEN_KEY = 'societyone.token';

export const tokenStorage = {
  get: () => SecureStore.getItemAsync(TOKEN_KEY),
  set: (token: string) => SecureStore.setItemAsync(TOKEN_KEY, token),
  clear: () => SecureStore.deleteItemAsync(TOKEN_KEY),
};

export const api = createApiClient({
  baseUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000',
  getToken: tokenStorage.get,
});

export * from './client';
