import { useEffect } from "react";
import { useGoogleMap } from "./useGoogleMap.js";

export function GoogleMapBox({
  apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  mapId = import.meta.env.VITE_GOOGLE_MAP_ID || "DEMO_MAP_ID",
  center = { lat: 39.7684, lng: -86.1581 },
  zoom,
  className,
  style,
  onMapReady,
}) {
  const { mapDivRef, map, isLoaded, loadError } = useGoogleMap({
    apiKey: apiKey,
    mapId,
    center,
    zoom,
  });

  useEffect(() => {
    if (map && typeof onMapReady === "function") onMapReady(map);
  }, [map, onMapReady]);

  // If error or no key, render a placeholder instead of an empty box
  if (loadError || !apiKey || apiKey.trim() === "") {
    let outText = loadError ? "Map failed to load." : "No Google Maps API key.";
    return <div role="Placeholder">{outText}</div>;
  }

  return (
    <div
      ref={mapDivRef}
      aria-label="Map"
      role="Map"
      data-loaded={isLoaded ? "true" : "false"}
      className={className}
      style={style}
    />
  );
}
