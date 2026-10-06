import * as SecureStore from 'expo-secure-store';
import { ApiClient } from './client';

const TOKEN_KEY = 'societyone.token';

export const saveToken = (t: string) => SecureStore.setItemAsync(TOKEN_KEY, t);
export const loadToken = () => SecureStore.getItemAsync(TOKEN_KEY);
export const clearToken = () => SecureStore.deleteItemAsync(TOKEN_KEY);

export const api = new ApiClient({
  baseUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000',
  getToken: loadToken,
});
