import api from './axiosConfig';

export type LoginCredentials = {
  email: string;
  password: string;
};

export const login = (credentials: LoginCredentials) => api.post('/auth/login', credentials);