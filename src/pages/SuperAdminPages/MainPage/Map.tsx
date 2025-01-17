import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store/store'; // Путь к store

const MapComponent: React.FC = () => {
  const { transports } = useSelector((state: RootState) => state.transports); // получаем данные о транспорте
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(10);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Устанавливаем начальные координаты карты
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

    // Отображаем маркеры для транспорта, если координаты есть
    transports.forEach((transportGroup) => {
      transportGroup.transports.forEach((transport) => {
        if (transport.lastLocation) {
          const { latitude, longitude } = transport.lastLocation;

          // Добавляем маркер на карту
          L.marker([latitude, longitude])
            .addTo(mapRef.current!)
            .bindPopup(`
              <div>
                <strong>${transport.model}</strong><br/>
                ${transport.organizationName}<br/>
                ${transport.status ? transport.status : 'Статус не указан'}
              </div>
            `);
        }
      });
    });
  }, [transports]);

  return (
    <div id="map" className="w-full h-full" style={{ height: '100%', width: '100%' }}></div>
  );
};

export default MapComponent;
