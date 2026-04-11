import { get, patch, post } from './apiClient';

export async function login(credentials) {
  var response = await post('/login', credentials || {});
  return response.user;
}

export async function logout() {
  return Promise.resolve({ ok: true });
}

export async function getProfile() {
  return get('/profile');
}

export async function saveProfile(updates) {
  return patch('/profile', updates || {});
}
