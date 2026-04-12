import { get, patch, post } from './apiClient';
import type { LoginCredentials, LoginResponse, User } from '../types';

export async function login(credentials: LoginCredentials): Promise<User> {
  var response = (await post('/login', { ...credentials })) as LoginResponse;
  return response.user;
}

export async function logout(): Promise<{ ok: boolean }> {
  return Promise.resolve({ ok: true });
}

export async function getProfile(): Promise<User> {
  return get('/profile') as Promise<User>;
}

export async function saveProfile(updates: Partial<User>): Promise<User> {
  return patch('/profile', (updates || {}) as Record<string, unknown>) as Promise<User>;
}
