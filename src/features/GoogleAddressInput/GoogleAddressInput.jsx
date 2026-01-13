/**
 * GoogleAddressInput.jsx
 *
 * A React component that provides an address input field with Google Places
 * Autocomplete functionality. It allows users to type an address and
 * receive suggestions from the Google Places API, enhancing user experience
 * when entering location data.
 */


import { TextInput } from "../../components";
import { MapPin, Search, X } from "lucide-react";
import styles from "./GoogleAddressInput.module.css";
import { useGoogleAddressInput } from "./useGoogleAddressInput";

export function GoogleAddressInput({
  apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  maxSuggestions = 3,
  debounceMs = 400,
  onLocationSelected,
  requestOptions = {
    // types: ["address"]
    includedPrimaryTypes: ["street_address"]
  },
}) {
  
  const ac = useGoogleAddressInput({
    apiKey: apiKey,
    maxSuggestions,
    debounceMs,
    onLocationSelected,
    requestOptions,
  });

  const hasSuggestions = (ac.suggestions?.length ?? 0) > 0;
  const showClearButton = ac.address.length > 0;

  const handleClear = () => {
    ac.setAddress("");
    ac.clearSuggestions();
  };

  return (
    <div className={styles.AddressWrap}>
      <Search size={18} className={styles.SearchIcon} aria-hidden="true" />

      <TextInput
        type="text"
        id="address"
        placeholder="Contact Address..."
        value={ac.address}
        onChange={ac.handleAddressChange}
        onBlur={ac.handleInputBlur}
        onKeyDown={ac.handleKeyDown}
        className={`${styles.Input} ${styles.InputWithIcons}`}
        aria-autocomplete="list"
        aria-controls={ac.listboxId}
        aria-expanded={hasSuggestions}
      />

      {showClearButton && (
        <button
          type="button"
          onClick={handleClear}
          className={styles.ClearButton}
          aria-label="Clear address"
        >
          <X size={18} aria-hidden="true" />
        </button>
      )}

      {(hasSuggestions || ac.isLoading) && (
        <div className={styles.SuggestionsPanel}>
          {ac.isLoading && (
            <div className={styles.SuggestionsLoading}>Searching...</div>
          )}

          {hasSuggestions && (
            <div id={ac.listboxId} role="listbox">
              {ac.suggestions.map((s, index) => (
                <div
                  key={`${s.placeId}-${index}`}
                  role="option"
                  aria-selected={index === ac.activeIndex}
                  className={`${styles.SuggestionRow} ${
                    index === ac.activeIndex ? styles.SuggestionRowActive : ""
                  }`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    ac.handleSelectSuggestion(s);
                  }}
                >
                  <MapPin
                    size={18}
                    className={styles.PinIcon}
                    aria-hidden="true"
                  />
                  <span className={styles.SuggestionText}>{s.address}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}