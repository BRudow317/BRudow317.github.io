/**
 * SuggestionsDropdown.jsx
 *
 * Pure presentational component for displaying Google Places autocomplete suggestions.
 * Handles keyboard navigation, mouse hover, and click selection.
 *
 * DESIGN PRINCIPLES:
 * - Pure presentational (no internal state except hover index)
 * - Parent controls visibility via conditional rendering
 * - Parent manages selected index for keyboard navigation
 * - Callbacks for all user interactions
 */

import { MapPin } from "lucide-react";
import styles from "./SuggestionsDropdown.module.css";

export function SuggestionsDropdown({
  suggestions = [],
  selectedIndex = -1,
  onSelect,
  onHover,
  isLoading = false,
  className = "",
}) {
  // Don't render if no suggestions and not loading
  if (!isLoading && suggestions.length === 0) {
    return null;
  }

  const handleMouseEnter = (index) => {
    if (onHover) onHover(index);
  };

  const handleClick = (suggestion) => {
    if (onSelect) onSelect(suggestion);
  };

  return (
    <div className={`${styles.Panel} ${className}`}>
      {isLoading && (
        <div className={styles.Loading}>
          Searching addresses...
        </div>
      )}

      {!isLoading && suggestions.map((suggestion, index) => {
        const isActive = index === selectedIndex;

        return (
          <div
            key={suggestion.placeId}
            className={`${styles.Row} ${isActive ? styles.RowActive : ""}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={() => handleClick(suggestion)}
            role="option"
            aria-selected={isActive}
          >
            <MapPin size={16} className={styles.Icon} />
            <span className={styles.Text}>{suggestion.address}</span>
          </div>
        );
      })}
    </div>
  );
}
