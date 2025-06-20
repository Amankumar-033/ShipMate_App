
/*
  This component fetches a route between two locations using the OpenRouteService API
  and displays it on a Leaflet map. It includes a close button to remove the map.
*/

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Polyline, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const Wrapper = styled.div`
  position: relative;
  margin-top: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  border: 2px solid #94a3b8;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 1001;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const Loader = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.1rem;
  color: #475569;
  background-color: #f8fafc;
`;

interface Props {
  origin: string;
  destination: string;
  onClose: () => void;
}

const FitBounds = ({ coords }: { coords: [number, number][] }) => {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(coords);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [coords, map]);
  return null;
};

const RouteMapCard: React.FC<Props> = ({ origin, destination, onClose }) => {
  const [coords, setCoords] = React.useState<[number, number][]>([]);
  const [loading, setLoading] = React.useState(true);
  const [routeAvailable, setRouteAvailable] = React.useState(true);

  useEffect(() => {
    const fetchRoute = async () => {
      setLoading(true);
      try {
        const geocode = async (address: string) => {
          const res = await axios.get('https://api.openrouteservice.org/geocode/search', {
            params: {
              api_key: import.meta.env.VITE_ORS_API_KEY,
              text: address,
              size: 1,
            },
          });
          return res.data.features[0].geometry.coordinates;
        };

        const originCoords = await geocode(origin);
        const destinationCoords = await geocode(destination);

        const routeRes = await axios.post(
          'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
          {
            coordinates: [originCoords, destinationCoords],
          },
          {
            headers: {
              Authorization: import.meta.env.VITE_ORS_API_KEY,
              'Content-Type': 'application/json',
            },
          }
        );

        const line = routeRes.data.features[0]?.geometry?.coordinates;
        if (!line || line.length === 0) {
          setRouteAvailable(false);
          return;
        }

        const latLngs: [number, number][] = line.map(
          ([lng, lat]: [number, number]) => [lat, lng]
        );
        setCoords(latLngs);
        setRouteAvailable(true);
      } catch (err) {
        console.error('Failed to fetch route:', err);
        setRouteAvailable(false);
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [origin, destination]);

  if (loading) {
    return (
      <Wrapper>
        <CloseButton onClick={onClose}>❌</CloseButton>
        <Loader>🚗 Fetching route...</Loader>
      </Wrapper>
    );
  }

  if (!routeAvailable) return null;

  return (
    <Wrapper>
      <CloseButton onClick={onClose}>❌</CloseButton>
      <MapContainer
        style={{ height: '300px', width: '100%' }}
        zoom={6}
        center={[20.5, 78.9]}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ZoomControl position="topright" />
        {coords.length > 0 && (
          <>
            <Polyline positions={coords} color="#1d4ed8" />
            <FitBounds coords={coords} />
          </>
        )}
      </MapContainer>
    </Wrapper>
  );
};

export default RouteMapCard;
