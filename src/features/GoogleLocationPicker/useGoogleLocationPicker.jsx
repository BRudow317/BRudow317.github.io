/**
 * useGoogleLocationPicker.jsx
 * 
 * Combines GoogleAddressInput and GoogleMapBox into a coordinated pair.
 * Returns a tuple: [AddressInputElement, MapElement, { location, setLocation }]
 * 
 * USAGE:
 *   const [AddressInput, Map, { location }] = useGoogleLocationPicker();
 *   return (
 *     <div>
 *       {AddressInput}
 *       {Map}
 *     </div>
 *   );
 */

import { useMemo, useState, useCallback } from "react";
import { GoogleAddressInput } from "../GoogleAddressInput/GoogleAddressInput";
import { GoogleMapBox } from "../GoogleMapBox/GoogleMapBox";

const DEFAULT_CENTER = { lat: 39.7684, lng: -86.1581 };

export function useGoogleLocationPicker({
  apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  mapId = import.meta.env.VITE_GOOGLE_MAP_ID || "DEMO_MAP_ID",
  defaultCenter = DEFAULT_CENTER,
  onLocationSelected,
  addressProps = {},
  mapProps = {},
} = {}) {
  const [location, setLocation] = useState(null);

  const handleLocationSelected = useCallback(
    (loc) => {
      setLocation(loc);
      onLocationSelected?.(loc);
    },
    [onLocationSelected]
  );

  const center = useMemo(() => {
    return location?.lat && location?.lng
      ? { lat: location.lat, lng: location.lng }
      : defaultCenter;
  }, [location?.lat, location?.lng, defaultCenter]);

  const AddressEl = (
    <GoogleAddressInput
      apiKey={apiKey}
      onLocationSelected={handleLocationSelected}
      {...addressProps}
    />
  );

  const MapEl = (
    <GoogleMapBox
      apiKey={apiKey}
      mapId={mapId}
      center={center}
      zoom={15}
      style={mapProps.style}
      {...mapProps}
    />
  );

  return [AddressEl, MapEl, { location, setLocation }];
}