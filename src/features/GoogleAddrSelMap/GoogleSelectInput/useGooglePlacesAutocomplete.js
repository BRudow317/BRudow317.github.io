/**
 * useGooglePlacesAutocomplete.js
 *
 * React hook for Google Places autocomplete API integration.
 * Designed for use with controlled input components.
 *
 * FLOW:
 * 1. Load Google Maps script with 'places' library
 * 2. Parent component manages input value state
 * 3. Parent calls fetchSuggestions(value) on change
 * 4. Hook debounces API calls and returns suggestions
 * 5. Parent handles suggestion selection
 * 6. Hook provides getPlaceDetails() to fetch lat/lng
 *
 * KEY DIFFERENCE from useGoogleAddressInput:
 * - Does NOT manage input value state (parent controls that)
 * - Provides functions for parent to call, not event handlers
 * - More flexible, works with any controlled input pattern
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { loadGoogleMapsScript } from "./loadGoogleMapsScript";

export function useGooglePlacesAutocomplete({
  apiKey,
  debounceMs = 400,
  maxSuggestions = 3,
  requestOptions = {}, // e.g. { includedRegionCodes: ["us"] }
  onError = null,
} = {}) {
  const debounceRef = useRef(null);
  const abortControllerRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load Google Maps with places library
  useEffect(() => {
    let mounted = true;

    loadGoogleMapsScript({ apiKey, libraries: ["places", "marker"] })
      .then((loaded) => {
        if (mounted && loaded) setIsLoaded(true);
      })
      .catch((err) => {
        if (mounted) {
          setIsLoaded(false);
          if (onError) onError(err);
        }
      });

    return () => {
      mounted = false;
    };
  }, [apiKey, onError]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  /**
   * Fetch autocomplete suggestions using the new API
   * https://developers.google.com/maps/documentation/javascript/place-autocomplete-data
   */
  const fetchPredictions = useCallback(
    async (input) => {
      if (!isLoaded) return [];
      if (!input || input.trim().length < 3) return [];

      try {
        // Cancel previous request if exists
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        // Import the places library to get AutocompleteSuggestion
        const { AutocompleteSuggestion } = await window.google.maps.importLibrary("places");

        // Build the request
        const request = {
          input: input.trim(),
          ...requestOptions,
        };

        // Fetch suggestions
        const { suggestions: results } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);

        // Map to our format (limit to maxSuggestions)
        return results.slice(0, maxSuggestions).map((suggestion) => ({
          placeId: suggestion.placePrediction.placeId,
          address: suggestion.placePrediction.text.text,
          // Store the full prediction for potential later use
          prediction: suggestion.placePrediction,
        }));
      } catch (err) {
        // Don't log abort errors (they're expected)
        if (err.name !== 'AbortError') {
          console.error("AutocompleteSuggestion error:", err);
          if (onError) onError(err);
        }
        return [];
      }
    },
    [isLoaded, maxSuggestions, requestOptions, onError]
  );

  /**
   * Fetch suggestions with debouncing
   * Call this from parent's onChange handler
   */
  const fetchSuggestions = useCallback(
    (input) => {
      // Clear previous debounce timer
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // If input is too short, clear suggestions immediately
      if (!input || input.trim().length < 3) {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      // Set loading state immediately
      setIsLoading(true);

      // Debounce the API call
      debounceRef.current = setTimeout(async () => {
        try {
          const results = await fetchPredictions(input);
          setSuggestions(results);
        } finally {
          setIsLoading(false);
        }
      }, debounceMs);
    },
    [debounceMs, fetchPredictions]
  );

  /**
   * Clear suggestions
   * Call this when user blurs or selects a suggestion
   */
  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setIsLoading(false);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  }, []);

  /**
   * Get place details (lat/lng) using the new Place class
   * Call this after user selects a suggestion
   */
  const getPlaceDetails = useCallback(
    async (placeId) => {
      if (!isLoaded) {
        throw new Error("Google Maps not loaded");
      }

      try {
        const { Place } = await window.google.maps.importLibrary("places");

        const place = new Place({ id: placeId });
        await place.fetchFields({
          fields: ["displayName", "formattedAddress", "location"],
        });

        return {
          address: place.formattedAddress,
          lat: place.location.lat(),
          lng: place.location.lng(),
          placeId,
        };
      } catch (err) {
        console.error("Place.fetchFields error:", err);
        if (onError) onError(err);
        throw err;
      }
    },
    [isLoaded, onError]
  );

  return {
    // State
    isLoaded,
    suggestions,
    isLoading,

    // Functions for parent to call
    fetchSuggestions,
    clearSuggestions,
    getPlaceDetails,
  };
}
