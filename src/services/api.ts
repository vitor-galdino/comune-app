import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 15000,
});

export function setAuthToken(token: string) {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
}
