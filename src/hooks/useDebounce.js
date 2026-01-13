import { useEffect, useState } from "react";

/**
 *
 * @param {any} value - The value to debounce
 * @param {number} delay - The debounce delay in milliseconds (default: 1000ms)
 * @returns {any} - The debounced value
 *
 * @description My custom hook to debounce a value over a specified delay.
 * 
 * @example
 *   const [searchTerm, setSearchTerm] = useState('');
 *   const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 *   useEffect(() => {
 *     // Perform search with debouncedSearchTerm
 *   }, [debouncedSearchTerm]);
*/
export { useDebounce };
function useDebounce(
  value, 
  delay = 1000
) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}