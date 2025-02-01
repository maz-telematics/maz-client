import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store/store';

const MapComponent: React.FC = () => {
  const { transports } = useSelector((state: RootState) => state.transports);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(10);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      const initialCenter = mapCenter || [53.9, 27.5667];
      mapRef.current = L.map('map', {
        center: initialCenter,
        zoom: mapZoom,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
      }).addTo(mapRef.current);

      mapRef.current.on('moveend', () => {
        if (mapRef.current) {
          const center = mapRef.current.getCenter();
          setMapCenter([center.lat, center.lng]);
        }
      });

      mapRef.current.on('zoomend', () => {
        if (mapRef.current) {
          const zoom = mapRef.current.getZoom();
          setMapZoom(zoom);
        }
      });
    }

    if (!mapRef.current) return;

    transports.forEach((transportGroup) => {
      transportGroup.transports.forEach((transport) => {
        if (transport.lastLocation) {
          const { latitude, longitude } = transport.lastLocation;

          // Используем одну и ту же иконку для всех маркеров
          const iconUrl = '/default.png';

          const icon = L.icon({
            iconUrl,
            iconSize: [25, 35],
            iconAnchor: [12, 41],
          });
    
          L.marker([latitude, longitude], { icon })
            .addTo(mapRef.current!)
            .bindPopup(`
              <div>
                <strong>Модель:</strong> ${transport.model}<br/>
                <strong>Организация:</strong> ${transport.organizationName}<br/>
                <strong>Статус:</strong> ${transport.status ? transport.status : 'Статус не указан'}
              </div>
            `);
        }
      });
    });
  }, [transports]);

  return (
    <div className="relative w-full h-full">
      <div id="map" className="absolute top-0 left-0 w-full h-full"></div>
    </div>
  );
};

export default MapComponent;
