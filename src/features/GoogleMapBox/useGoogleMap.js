/**
 * useGoogleMap.js
 * 
 * React hook for rendering a Google Map with an optional marker.
 * 
 * REACT FLOW:
 * 1. Component mounts, ref is null, isLoaded is false
 * 2. Effect 1 starts loading the Google Maps script
 * 3. Effect 0 sets mounted=true, triggering a re-render (ref now populated)
 * 4. Script loads, isLoaded becomes true
 * 5. Effect 2 runs: isLoaded=true, mounted=true, ref exists → create map
 * 6. When center prop changes, Effect 3 updates map position
 * 
 * WHY THE "mounted" STATE?
 * - useRef values are null on first render, populated after DOM mount
 * - useEffect dependencies don't track ref.current changes
 * - We need a state change to trigger re-evaluation after mount
 */

import { useEffect, useRef, useState, useMemo } from "react";
import { loadGoogleMapsScript } from "../../utils/loadGoogleMapsScript";

export function useGoogleMap({
  apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || null,
  mapId = import.meta.env.VITE_GOOGLE_MAP_ID || "DEMO_MAP_ID",
  center = { lat: 37.7749, lng: -122.4194 },
  zoom = 15,
  libraries = ["places", "marker"],
  marker = true,
  // mapOptions = {},
} = {}) {
  const mapDivRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [map, setMap] = useState(null);
  const [mapMarker, setMapMarker] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Stabilize dependencies that are objects/arrays
  // We use the serialized string as the dependency, not the object itself
  const librariesKey = useMemo(() => libraries.join(","), [libraries]);
  // const mapOptionsKey = JSON.stringify(mapOptions);
  // const stableMapOptions = useMemo(() => mapOptions, [mapOptions, mapOptionsKey]);
  const centerLat = center?.lat;
  const centerLng = center?.lng;

  // Effect 0: Signal that component has mounted (ref is now available)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Effect 1: Load Google Maps script
  useEffect(() => {
    let active = true;

    loadGoogleMapsScript({ apiKey, libraries })
      .then((loaded) => {
        if (active && loaded) setIsLoaded(true);
      })
      .catch((err) => {
        if (active) setLoadError(err);
      });

    return () => { active = false; };
  }, [apiKey, libraries, librariesKey]);

  // Effect 2: Initialize map once script is loaded and DOM is ready
  useEffect(() => {
    if (!isLoaded || !mounted || !mapDivRef.current || mapRef.current) return;

    let cancelled = false;

    (async () => {
      try {
        const { Map } = await window.google.maps.importLibrary("maps");
        if (cancelled) return;

        const mapInstance = new Map(mapDivRef.current, {
          center: { lat: centerLat, lng: centerLng },
          zoom,
          mapId,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          gestureHandling: "cooperative",
          // ...stableMapOptions,
        });

        mapRef.current = mapInstance;
        setMap(mapInstance);

        if (marker) {
          const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
          if (cancelled) return;

          const adv = new AdvancedMarkerElement({
            map: mapInstance,
            position: { lat: centerLat, lng: centerLng },
            title: "Selected location",
          });
          markerRef.current = adv;
          setMapMarker(adv);
        }
      } catch (err) {
        if (!cancelled) setLoadError(err);
      }
    })();

    return () => { cancelled = true; };
  }, [isLoaded, mounted, centerLat, centerLng, zoom, marker, mapId]); // , stableMapOptions

  // Effect 3: Update map center when it changes
  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.setCenter({ lat: centerLat, lng: centerLng });

    if (markerRef.current) {
      // AdvancedMarkerElement uses .position property, legacy Marker uses .setPosition()
      if ("position" in markerRef.current) {
        markerRef.current.position = { lat: centerLat, lng: centerLng };
      }
    }
  }, [centerLat, centerLng]);

  return { mapDivRef, map, marker: mapMarker, isLoaded, loadError };
}