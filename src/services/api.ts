import axios from 'axios';
import Cookies from 'js-cookie';

export const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 15000,
});

export function setAuthToken(token: string) {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    Cookies.set('token', token, { secure: true });
  } else {
    delete instance.defaults.headers.common['Authorization'];
    Cookies.remove('token');
  }
}

const token = Cookies.get('token');
if (token) {
  setAuthToken(token);
}