import axios from 'axios';
import nookies from 'nookies';

export const instance = axios.create({
  baseURL: 'https://comune-server-production.up.railway.app',
  timeout: 15000,
});

export function setAuthToken(token: string | null) {
  if (token) {
    const hasToken = nookies.get().token;
    if (!hasToken) {
      nookies.set(null, 'token', token, { secure: true, maxAge: 60 * 60 * 24 });
    }
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
    nookies.destroy(null, 'token');
  }
}

const token = nookies.get().token;
if (token) {
  setAuthToken(token);
}