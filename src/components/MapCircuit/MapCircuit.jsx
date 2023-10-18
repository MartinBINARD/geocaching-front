/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import style from '../../assets/map/style.json';

function MapCircuit({ className, longitude, latitude }) {
  useEffect(() => {
    // Creating the map
    const map = new maplibregl.Map({
      container: 'map', // Select the container where the map will be display
      style, // Using an asset folder for the map's style
      center: [longitude, latitude], // Coordinate
      zoom: 15, // Initial zoom
    });

    new maplibregl.Marker().setLngLat([longitude, latitude]).addTo(map);

    //  Add geolocate control to the map.
    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    // Cleaner for the map
    return () => map.remove();
  }, [latitude, longitude]);

  return (
    <div id="map" className={className}>
      {/* Map container */}
    </div>
  );
}

export default MapCircuit;
