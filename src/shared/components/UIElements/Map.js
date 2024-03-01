import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapComponent = () => {
  useEffect(() => {
    // Initialize Mapbox map
    mapboxgl.accessToken = 'pk.eyJ1IjoidmR1bm5hbGEiLCJhIjoiY2x0OTFzZXpvMDdhdDJobWdmdmZpb2lydSJ9.eB-FOo8Oa0dhmBFeaTwOJw';
    const map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // map style URL
      center: [ -87.47382095829578, 41.584115601748344,], // starting position [lng, lat]
      zoom: 13 // starting zoom
    });

    // Add navigation controls (optional)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Cleanup function to remove the map instance
    return () => map.remove();
  }, []);

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
};

export default MapComponent;
