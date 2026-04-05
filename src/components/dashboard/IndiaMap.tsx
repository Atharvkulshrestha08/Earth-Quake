"use client";

import * as React from "react";
import Script from "next/script";

declare global {
  interface Window {
    L: any;
  }
}

export function IndiaMap() {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const initMap = () => {
    if (typeof window !== "undefined" && window.L && mapRef.current && !isLoaded) {
      const L = window.L;
      const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5); // Center of India

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add dummy alerts for demo
      const alerts = [
        { lat: 19.076, lng: 72.8777, title: "Mumbai: Heavy Rain", severity: "high" },
        { lat: 28.6139, lng: 77.209, title: "Delhi: Heatwave", severity: "medium" },
        { lat: 13.0827, lng: 80.2707, title: "Chennai: Coastal Alert", severity: "low" },
      ];

      alerts.forEach((alert) => {
        const color =
          alert.severity === "high" ? "#ef4444" : alert.severity === "medium" ? "#f59e0b" : "#3b82f6";

        L.circle([alert.lat, alert.lng], {
          color: color,
          fillColor: color,
          fillOpacity: 0.5,
          radius: 50000,
        })
          .addTo(map)
          .bindPopup(`<b>${alert.title}</b><br/>Severity: ${alert.severity.toUpperCase()}`);
      });

      setIsLoaded(true);
    }
  };

  return (
    <>
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""
        onLoad={initMap}
      />
      <div className="bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden h-[400px] w-full relative">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-500" />
          </div>
        )}
        <div ref={mapRef} className="h-full w-full" />
      </div>
    </>
  );
}
