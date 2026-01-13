/**
 * @file GoogleAddrSelMap.jsx
 *
 * @description Combines GoogleSelectInput and GoogleMapBox into a coordinated pair.
 * @returns a tuple: [SelectInputComponent, MapComponent, { location, setLocation }]
 *
 * @requires parent state management:
 *
 * @example
 *    const [address, setAddress] = useState("");
 *    const [GoogleSelectInput, GoogleMapBox] = GoogleAddrSelMap();
 *
 *    <GoogleSelectInput
 *      value={address}
 *      onChange={(e) => setAddress(e.target.value)}
 *      onSelectionChange={(location) => {
 *        console.log("Selected:", location);
 *      }}
 *    />
 *    <GoogleMapBox />
 */

import { useMemo, useState, useCallback } from "react";
import { GoogleSelectInput } from "./GoogleSelectInput/GoogleSelectInput";
import { GoogleMapBox } from "./GoogleMapBox/GoogleMapBox";

export { GoogleAddrSelMap };

const DEFAULT_CENTER = { lat: 39.7684, lng: -86.1581 };
const DEFAULT_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
const DEFAULT_MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID || "DEMO_MAP_ID";

function GoogleAddrSelMap({
  apiKey = DEFAULT_API_KEY,
  mapId = DEFAULT_MAP_ID,
  defaultCenter = DEFAULT_CENTER,
} = {}) {
  const [location, setLocation] = useState(null);

  // Internal handler to update map when address is selected
  const handleInternalLocationSelected = useCallback((loc) => {
    setLocation(loc);
  }, []);

  const center = useMemo(() => {
    return location?.lat && location?.lng
      ? { lat: location.lat, lng: location.lng }
      : defaultCenter;
  }, [location, defaultCenter]);

  // SelectInputComponent - Controlled mode only
  // Requires parent to provide value and onChange props
  const SelectInputComponent = useMemo(() => {
    const Component = ({ value, onChange, onSelectionChange, ...props }) => {
      // Wrap the parent's onSelectionChange to also update our internal map state
      const handleSelectionChange = (loc) => {
        // Update our internal state (for map)
        handleInternalLocationSelected(loc);

        // Call parent's callback (for form)
        if (onSelectionChange) {
          onSelectionChange(loc);
        }
      };

      return (
        <GoogleSelectInput
          apiKey={apiKey}
          value={value}
          onChange={onChange}
          onSelectionChange={handleSelectionChange}
          {...props}
        />
      );
    };
    // Component.displayName = "GoogleSelectInputWrapper";
    return Component;
  }, [apiKey, handleInternalLocationSelected]);

  const MapBoxComponent = useMemo(() => {
    const Component = ({ style, className }) => (
      <GoogleMapBox
        apiKey={apiKey}
        mapId={mapId}
        center={center}
        zoom={15}
        style={style}
        className={className}
      />
    );
    // Component.displayName = "GoogleMapBoxWrapper";
    return Component;
  }, [apiKey, mapId, center]);

  return [SelectInputComponent, MapBoxComponent, { location, setLocation }];
}
