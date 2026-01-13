/**
 * @Description Custom hook to perform HTTP requests.
 * 
 * @returns {Object} - An object containing:
 *   - loading: A boolean indicating if the request is in progress.
 *   - error: An error object if the request failed, otherwise null.
 *   - data: The response data from the request.
 *   - execute: A function to execute the HTTP request.
 * 
 * @example
 * const { loading, error, data, execute } = useHttp();
 * 
 * useEffect(() => {
 *   execute('https://api.example.com/data')
 *     .then(responseData => {
 *       // Handle the response data
 *     })
 *     .catch(err => {
 *       // Handle the error
 *     });
 * }, [execute]);
 */

import { useCallback, useState } from "react";
export {useHttp};
function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    data,
    execute,
  };
}
