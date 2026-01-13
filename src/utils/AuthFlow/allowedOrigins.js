/**
 * Allowed origins for CORS requests.
 * @returns {Set<string>} - Allowed origins list.
 */
export default ALLOWED_ORIGINS;
export { ALLOWED_ORIGINS };

const ALLOWED_ORIGINS = new Set([
  "https://brudow317.github.io",
  "http://127.0.0.1:8788", // wrangler dev
  "http://localhost:8788",
]);
