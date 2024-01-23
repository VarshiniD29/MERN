import React from 'react';
import { MapContainer, TileLayer } from "react-leaflet";


import "./Map.css"

const Map = props => {
  console.log('Map component rendered');
  const center = [41.58389937037336, -87.47355647640109];
  
  return (
    <MapContainer center={center} zoom={16} className="map-container" >
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
       </MapContainer>
  );
}

export default Map;
