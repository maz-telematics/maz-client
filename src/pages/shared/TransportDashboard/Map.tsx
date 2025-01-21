import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Location } from "../../../types/carTrackingTypes";
import dayjs, { Dayjs } from "dayjs";
import axiosInstance from "../../../services/axiosInstance";
import { useUser } from "../../../services/auth";

interface MapProps {
  selectedDate: Dayjs | null;
}

const Map: React.FC<MapProps> = ({ selectedDate }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const mapRef = useRef<L.Map | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null); 
  const markersRef = useRef<L.Marker[]>([]); 
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null); 
  const [mapZoom, setMapZoom] = useState<number>(10); 
  const id = sessionStorage.getItem("id");
  const isCurrentDay = (date: Dayjs | null): boolean => {
    return date ? date.isSame(dayjs(), "day") : false;
  };
  const websocketRef = useRef<WebSocket | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(id)
  const getLocations = async (id: string, date: Dayjs | null): Promise<Location[]> => {
    try {
      if (!date) {
        console.warn("Дата не указана, запрос не будет выполнен.");
        return [];
      }
      const dateStr = date.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      const response = await axiosInstance.get(`/transport/locations/${id}`, {
        params: { date: dateStr },
      })
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const initializeWebSocket = (id: string) => {
    if (!id || websocketRef.current) return; // Предотвращаем повторное открытие

    websocketRef.current = new WebSocket(`${apiUrl.replace(/^http/, "ws")}/ws`);
    websocketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Полученные данные:", data);
      if (data) {
        setLocations((prev) => [...prev, ...data]);
      }
    };

    websocketRef.current.onerror = (error) => console.error("WebSocket Error:", error);

    websocketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
      websocketRef.current = null;
    };

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.token) {
      console.error("Токен отсутствует");
      return;
    }
    const message =  JSON.stringify({
      transportVin: id,
      messageType: "locations",
      token: user.token
    });
    websocketRef.current.onopen = () => {
      console.log("WebSocket подключен", message);
      websocketRef.current?.send(message);
    };
  };

  const closeWebSocket = () => {
    if (websocketRef.current) {
      websocketRef.current.close();
      websocketRef.current = null;
    }
  };

  useEffect(() => {
    const id = sessionStorage.getItem("id");
  
    if (!id) return;

    if (isCurrentDay(selectedDate)) {
      if (!websocketRef.current) {
        initializeWebSocket(id);
      }
    } else {
      closeWebSocket();
      getLocations(id, selectedDate).then((locationsData) => {
        setLocations(locationsData);
      });
    }

    return () => {
      closeWebSocket();
    };
    
  }, [id, selectedDate]);

  useEffect(() => {
    if (!mapRef.current) {
      const initialCenter = mapCenter || [53.9, 27.5667]; 
      mapRef.current = L.map("map", {
        center: initialCenter,
        zoom: mapZoom,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "",
      }).addTo(mapRef.current);

      mapRef.current.on("moveend", () => {
        if (mapRef.current) {
          const center = mapRef.current.getCenter();
          setMapCenter([center.lat, center.lng]);
        }
      });

      mapRef.current.on("zoomend", () => {
        if (mapRef.current) {
          const zoom = mapRef.current.getZoom();
          setMapZoom(zoom);
        }
      });
    }

    if (!mapRef.current) return;
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    if (polylineRef.current) {
      polylineRef.current.remove(); 
      polylineRef.current = null;
    }

    const waypoints = locations
      .filter((loc) => loc.latitude !== undefined && loc.longitude !== undefined)
      .map((loc) => L.latLng(loc.latitude, loc.longitude));

    if (!polylineRef.current) {
      polylineRef.current = L.polyline(waypoints, {
        color: "blue",
        weight: 6,
        opacity: 0.9,
        interactive: false,
      }).addTo(mapRef.current);
    } 

    waypoints.forEach((point, index) => {
      const popupContent = 
        <div>
          // <strong>Точка ${index + 1}</strong><br />
          Широта: ${locations[index].latitude}<br />
          Долгота: ${locations[index].longitude}<br />
          Скорость: ${locations[index].speed ?? "N/A"} км/ч<br />
          Дата: ${locations[index].date ? new Date(locations[index].date).toLocaleString() : "N/A"}<br />
        </div>
      ;

      const iconUrl =
        index === 0
          ? "../start.png"
          : index === waypoints.length - 1
            ? "../end.png"
            : "../default.png";

      const icon = L.icon({
        iconUrl,
        iconSize: [25, 35],
        iconAnchor: [12, 41],
      });

      const marker = L.marker(point, { icon }).bindPopup(popupContent);
      marker.addTo(mapRef.current);
      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };
  }, [locations, selectedDate]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div id="map" style={{ display: "flex", width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default Map;
