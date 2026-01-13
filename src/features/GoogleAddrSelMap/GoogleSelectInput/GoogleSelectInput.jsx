/**
 * @file GoogleSelectInput.jsx
 * @description A controlled input component that provides Google Places Autocomplete functionality.
 * 
 * 
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useGooglePlacesAutocomplete } from "./useGooglePlacesAutocomplete";
import { SuggestionsDropdown } from "./SuggestionsDropdown";
import styles from "./GoogleSelectInput.module.css";

export function GoogleSelectInput({
  // Standard controlled input props
  value = "",
  onChange,
  onBlur,
  onFocus,
  onPaste,
  onCut,

  // Autocomplete-specific props
  onSuggestionsChange,
  onSelectionChange,

  // Standard input props
  id,
  name,
  placeholder = "Type address...",
  disabled = false,
  className = "",

  // Configuration
  apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  maxSuggestions = 3,
  debounceMs = 400,
  requestOptions = {},

  // Passthrough props (like data-validation-state)
  ...restProps
}) {
  const inputRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showClearButton, setShowClearButton] = useState(false);

  const {
    isLoaded,
    suggestions,
    isLoading,
    fetchSuggestions,
    clearSuggestions,
    getPlaceDetails,
  } = useGooglePlacesAutocomplete({
    apiKey,
    debounceMs,
    maxSuggestions,
    requestOptions,
  });

  // Update clear button visibility
  useEffect(() => {
    setShowClearButton(value.length > 0);
  }, [value]);

  // Notify parent of suggestions changes
  useEffect(() => {
    if (onSuggestionsChange) {
      onSuggestionsChange(suggestions);
    }
  }, [suggestions, onSuggestionsChange]);

  // Handle input change
  const handleChange = useCallback(
    (e) => {
      // Call parent's onChange (updates value state)
      if (onChange) onChange(e);

      // Fetch suggestions based on new value
      fetchSuggestions(e.target.value);
    },
    [onChange, fetchSuggestions]
  );

  // Handle suggestion selection
  const handleSelectSuggestion = useCallback(
    async (suggestion) => {
      try {
        // Get full place details (lat/lng)
        const location = await getPlaceDetails(suggestion.placeId);

        // Clear suggestions dropdown
        clearSuggestions();
        setSelectedIndex(-1);

        // Notify parent of selection
        if (onSelectionChange) {
          onSelectionChange(location);
        }

        // Update parent's value via synthetic onChange event
        if (onChange) {
          const syntheticEvent = {
            target: {
              name,
              value: location.address,
            },
          };
          onChange(syntheticEvent);
        }

        // Blur the input to trigger validation
        if (inputRef.current) {
          inputRef.current.blur();
        }
      } catch (err) {
        console.error("Failed to select suggestion:", err);
      }
    },
    [getPlaceDetails, clearSuggestions, onSelectionChange, onChange, name]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!suggestions.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((idx) => Math.min(idx + 1, suggestions.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((idx) => Math.max(idx - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        clearSuggestions();
        setSelectedIndex(-1);
      }
    },
    [suggestions, selectedIndex, handleSelectSuggestion, clearSuggestions]
  );

  // Handle blur
  const handleBlur = useCallback(
    (e) => {
      // Delay clearing to allow click selection
      setTimeout(() => {
        clearSuggestions();
        setSelectedIndex(-1);
      }, 200);

      // Call parent's onBlur
      if (onBlur) onBlur(e);
    },
    [onBlur, clearSuggestions]
  );

  // Handle focus
  const handleFocus = useCallback(
    (e) => {
      // Call parent's onFocus
      if (onFocus) onFocus(e);
    },
    [onFocus]
  );

  // Handle clear button click
  const handleClear = useCallback(() => {
    // Clear via synthetic onChange event
    if (onChange) {
      const syntheticEvent = {
        target: {
          name,
          value: "",
        },
      };
      onChange(syntheticEvent);
    }

    // Clear suggestions
    clearSuggestions();
    setSelectedIndex(-1);

    // Focus the input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [onChange, name, clearSuggestions]);

  // Handle hover over suggestion (for keyboard + mouse navigation)
  const handleSuggestionHover = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  const hasSuggestions = suggestions.length > 0 || isLoading;

  return (
    <div className={styles.Wrapper}>
      {/* Search Icon */}
      <Search size={18} className={styles.SearchIcon} aria-hidden="true" />

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPaste={onPaste}
        onCut={onCut}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || !isLoaded}
        className={className}
        aria-autocomplete="list"
        aria-expanded={hasSuggestions}
        {...restProps}
      />

      {/* Clear Button */}
      {showClearButton && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className={styles.ClearButton}
          aria-label="Clear address"
          tabIndex={-1}
        >
          <X size={18} />
        </button>
      )}

      {/* Suggestions Dropdown */}
      {hasSuggestions && !disabled && (
        <SuggestionsDropdown
          suggestions={suggestions}
          selectedIndex={selectedIndex}
          onSelect={handleSelectSuggestion}
          onHover={handleSuggestionHover}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
