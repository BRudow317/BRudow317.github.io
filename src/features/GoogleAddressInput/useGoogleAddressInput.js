/**
 * useGoogleAddressAuto.js
 * 
 * React hook for Google Places address autocomplete.
 * Uses the new AutocompleteSuggestion API (recommended as of March 2025).
 * 
 * FLOW:
 * 1. Load Google Maps script with 'places' library
 * 2. User types in address field
 * 3. After debounce, fetch suggestions via AutocompleteSuggestion
 * 4. User selects a suggestion
 * 5. Fetch full place details via Place.fetchFields()
 * 6. Call onLocationSelected with { address, lat, lng, placeId }
 */

import { useCallback, useEffect, useMemo, useRef, useState, useId } from "react";
import { loadGoogleMapsScript } from "../../utils/loadGoogleMapsScript";

export function useGoogleAddressInput({
  apiKey,
  debounceMs = 400,
  maxSuggestions = 3,
  onLocationSelected,
  requestOptions = {}, // e.g. { includedRegionCodes: ["us"] }
} = {}) {
  const reactId = useId();
  const listboxId = useMemo(() => `address-suggestions-${reactId}`, [reactId]);

  const debounceRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Load Google Maps with places library
  useEffect(() => {
    let mounted = true;

    loadGoogleMapsScript({ apiKey, libraries: ["places", "marker"] })
      .then((loaded) => {
        if (mounted && loaded) setIsLoaded(true);
      })
      .catch(() => {
        if (mounted) setIsLoaded(false);
      });

    return () => { mounted = false; };
  }, [apiKey]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setActiveIndex(-1);
  }, []);

  /**
   * Fetch autocomplete suggestions using the new API
   * https://developers.google.com/maps/documentation/javascript/place-autocomplete-data
   */
  const fetchPredictions = useCallback(
    async (input) => {
      if (!isLoaded) return [];

      try {
        // Import the places library to get AutocompleteSuggestion
        const { AutocompleteSuggestion } = await window.google.maps.importLibrary("places");

        // Build the request
        const request = {
          input,
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
        console.error("AutocompleteSuggestion error:", err);
        return [];
      }
    },
    [isLoaded, maxSuggestions, requestOptions]
  );

  /**
   * Get place details (lat/lng) using the new Place class
   */
  const fetchPlaceDetails = useCallback(async (placeId) => {
    try {
      const { Place } = await window.google.maps.importLibrary("places");
      
      const place = new Place({ id: placeId });
      await place.fetchFields({ fields: ["displayName", "formattedAddress", "location"] });

      return {
        address: place.formattedAddress,
        lat: place.location.lat(),
        lng: place.location.lng(),
        placeId,
      };
    } catch (err) {
      console.error("Place.fetchFields error:", err);
      throw err;
    }
  }, []);

  const handleAddressChange = useCallback(
    (e) => {
      const value = e.target.value;
      setAddress(value);

      if (value.trim().length < 3) {
        setIsLoading(false);
        clearSuggestions();
        return;
      }

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const results = await fetchPredictions(value);
          setSuggestions(results);
          setActiveIndex(results.length ? 0 : -1);
        } finally {
          setIsLoading(false);
        }
      }, debounceMs);
    },
    [clearSuggestions, debounceMs, fetchPredictions]
  );

  const handleSelectSuggestion = useCallback(
    async (suggestion) => {
      setAddress(suggestion.address);
      clearSuggestions();
      setIsLoading(false);

      try {
        const loc = await fetchPlaceDetails(suggestion.placeId);
        if (typeof onLocationSelected === "function") onLocationSelected(loc);
      } catch (err) {
        console.error("Failed to get place details:", err);
      }
    },
    [clearSuggestions, fetchPlaceDetails, onLocationSelected]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (!suggestions.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((idx) => Math.min(idx + 1, suggestions.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((idx) => Math.max(idx - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          handleSelectSuggestion(suggestions[activeIndex]);
        }
      }
      if (e.key === "Escape") {
        e.preventDefault();
        clearSuggestions();
      }
    },
    [activeIndex, clearSuggestions, handleSelectSuggestion, suggestions]
  );

  const handleInputBlur = useCallback(() => {
    // Delay to allow click selection before clearing
    setTimeout(() => clearSuggestions(), 200);
  }, [clearSuggestions]);

  return {
    isLoaded,
    address,
    suggestions,
    isLoading,
    activeIndex,
    listboxId,
    setAddress,
    clearSuggestions,
    handleAddressChange,
    handleSelectSuggestion,
    handleKeyDown,
    handleInputBlur,
  };
}