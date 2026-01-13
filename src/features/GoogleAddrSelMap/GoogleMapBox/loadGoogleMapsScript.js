/**
 * loadGoogleMapsScript.js
 * 
 * Singleton loader for Google Maps JavaScript API.
 * Handles the complexity of async script loading with callback-based initialization.
 * 
 * WHY THIS EXISTS:
 * - Google Maps must only be loaded once per page
 * - Multiple React components may try to load it simultaneously
 * - The `loading=async` pattern requires a callback, not just script.onload
 * - We need `importLibrary` to be available, not just `window.google.maps`
 */

const SCRIPT_ID = "google-maps-js";

/** Generate a unique callback name to avoid collisions during hot reload */
function uniqueCallbackName() {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return `__gmaps_cb_${[...bytes].map(b => b.toString(16).padStart(2, "0")).join("")}`;
}

/** Check if Google Maps API is fully initialized (importLibrary is our signal) */
function isReady() {
  return typeof window.google?.maps?.importLibrary === "function";
}

/** Poll until isReady() returns true, with timeout */
function waitForReady(resolve, reject, timeout = 15000) {
  const start = Date.now();
  const check = setInterval(() => {
    if (isReady()) {
      clearInterval(check);
      resolve(true);
    } else if (Date.now() - start > timeout) {
      clearInterval(check);
      reject(new Error("Google Maps initialization timed out"));
    }
  }, 50);
}

/**
 * Load the Google Maps JavaScript API
 * @param {Object} options
 * @param {string} options.apiKey - Your Google Maps API key
 * @param {string[]} options.libraries - Libraries to preload (e.g., ['places', 'marker'])
 * @returns {Promise<boolean>} - true if loaded, false if no API key provided
 */
export function loadGoogleMapsScript({
  apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || null,
  libraries = ["places", "marker"],
} = {}) {
  return new Promise((resolve, reject) => {
    // Already loaded - nothing to do
    if (isReady()) return resolve(true);
    
    // No API key - can't load
    if (!apiKey) return resolve(false);

    // Script tag exists (another component started loading) - wait for it
    if (document.getElementById(SCRIPT_ID)) {
      return waitForReady(resolve, reject);
    }

    // We're the first - create and load the script
    const cbName = uniqueCallbackName();
    
    window[cbName] = () => {
      delete window[cbName];
      // Callback fires on script load, but importLibrary may need a tick
      waitForReady(resolve, reject, 5000);
    };

    const params = new URLSearchParams({
      key: apiKey,
      loading: "async",
      callback: cbName,
      v: "weekly",
      libraries: libraries.join(","),
    });

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?${params}`;
    script.onerror = () => {
      delete window[cbName];
      reject(new Error("Failed to load Google Maps script"));
    };

    document.head.appendChild(script);
  });
}