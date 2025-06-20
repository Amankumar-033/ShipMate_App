// src/components/RouteMapCard.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import L from 'leaflet';

interface RouteMapCardProps {
  origin: string;
  destination: string;
  onClose: () => void;
}

const MapWrapper = styled.div`
  margin-top: 1rem;
  position: relative;
  height: 250px;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid #cbd5e1;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  left: 8px;
  background: #f87171;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 1000;
`;

const RouteMapCard: React.FC<RouteMapCardProps> = ({ origin, destination, onClose }) => {
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [center, setCenter] = useState<[number, number]>([20, 78]); // Default center: India

  useEffect(() => {
    const fetchRoute = async () => {
      const formatLocation = async (location: string): Promise<[number, number]> => {
        const res = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${import.meta.env.VITE_ORS_API_KEY}&text=${encodeURIComponent(location)}`);
        const data = await res.json();
        const coords = data.features?.[0]?.geometry?.coordinates;
        return coords ? [coords[1], coords[0]] : [0, 0];
      };

      const [from, to] = await Promise.all([formatLocation(origin), formatLocation(destination)]);
      setCenter(from);

      const res = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
        method: 'POST',
        headers: {
          'Authorization': import.meta.env.VITE_ORS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coordinates: [[from[1], from[0]], [to[1], to[0]]],
        }),
      });
      const data = await res.json();
      const coords = data.features[0].geometry.coordinates.map((c: number[]) => [c[1], c[0]]);
      setRouteCoords(coords);
    };

    fetchRoute();
  }, [origin, destination]);

  return (
    <MapWrapper>
      <CloseButton onClick={onClose}>❌</CloseButton>
      <MapContainer center={center} zoom={6} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} color="blue" />
        )}
      </MapContainer>
    </MapWrapper>
  );
};

export default RouteMapCard;
