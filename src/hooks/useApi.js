/**
 * @Description Hook to manage API requests with loading and error states.
 * 
 * @param {string} baseUrl - The base URL for the API.
 * 
 * @returns {Object} - An object containing methods for GET, POST, PUT, DELETE requests,
 *                     along with loading and error states.
 * 
 * @example
 * const api = useApi('https://api.example.com');
 * 
 * // GET request
 * const data = await api.get('/endpoint');
 */

import { useState } from 'react';
export { useApi };
// Hook: API Manager (GET/POST/PUT/DELETE)
const useApi = (baseUrl = '') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (
    endpoint, 
    method = 'GET', 
    body = null,
    headers = {}
  ) => {
    setLoading(true);
    setError(null);
    try {
      const config = {
        method,
        headers: { 'Content-Type': 'application/json', ...headers },
        body: body ? JSON.stringify(body) : null,
      };
      const response = await fetch(`${baseUrl}${endpoint}`, config);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'API Error');
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    get: (endpoint) => request(endpoint, 'GET'),
    post: (endpoint, body) => request(endpoint, 'POST', body),
    put: (endpoint, body) => request(endpoint, 'PUT', body),
    del: (endpoint) => request(endpoint, 'DELETE'),
    loading,
    error,
  };
};
