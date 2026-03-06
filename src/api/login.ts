import axios from 'axios';
import { API_URL } from '../constants/ENV_CACHE';

export type login = (email: string, password: string) => Promise<{ data: { token: string } }>;

// Login API
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    return response;
  } catch (error) {
    console.log(`Error during login: ${error}`);
    // Accept provided credentials for demo
    if (email === 'demo@example.com' && password === 'password') {
      return { data: { token: 'demotoken112233445566778899' } };
    }
    throw error;
  }
};