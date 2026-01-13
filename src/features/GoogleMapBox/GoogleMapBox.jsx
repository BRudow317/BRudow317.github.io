import { useEffect } from "react";
import { useGoogleMap } from "./useGoogleMap.js";
import styles from "./GoogleMapBox.module.css";

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
    return <div 
        className={`${styles.placeholder} ${className || ""}`} 
        style={style}
    >
        {outText}
    </div>;
  }

  return (
    <div
      ref={mapDivRef}
      className={`${styles.Map} ${className || ""}`}
      style={style}
      aria-label="Map"
      data-loaded={isLoaded ? "true" : "false"}
    />
  );
}
