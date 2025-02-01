import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Location } from "../../../types/carTrackingTypes";
import dayjs, { Dayjs } from "dayjs";
import axiosInstance from "../../../services/axiosInstance";
import { fetchTransportLocations } from "../../../Store/apis/transportLocations";

interface MapProps {
  selectedDate: Dayjs | null;
}
function removeDuplicateLocations(
  locations: Array<{ latitude: number; longitude: number }>,
  minDistance = 0.0001
) {
  const filteredLocations: Array<{ latitude: number; longitude: number }> = [];

  locations.forEach((loc) => {
    const isDuplicate = filteredLocations.some((filteredLoc) => {
      const distance = Math.sqrt(
        Math.pow(loc.latitude - filteredLoc.latitude, 2) +
          Math.pow(loc.longitude - filteredLoc.longitude, 2)
      );
      return distance < minDistance;
    });

    if (!isDuplicate) {
      filteredLocations.push(loc);
    }
  });

  return filteredLocations;
}
const Map: React.FC<MapProps> = ({ selectedDate }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const mapRef = useRef<L.Map | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null); 
  const markersRef = useRef<L.Marker[]>([]); 
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null); 
  const [mapZoom, setMapZoom] = useState<number>(20); 
  const id = sessionStorage.getItem("id");
  
  const isCurrentDay = (date: Dayjs | null): boolean => {
    return date ? date.isSame(dayjs(), "day") : false;
  };

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


  useEffect(() => {
    const id = sessionStorage.getItem("id");
  
    if (!id) return;

    if (isCurrentDay(selectedDate)) {
    
        fetchTransportLocations(id)
        .then((data) => {
          setLocations(data as Location[]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getLocations(id, selectedDate).then((locationsData) => {
        setLocations(locationsData);
      });
    }
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
    .filter((loc) => loc.latitude != null && loc.longitude != null)
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
      const popupContent = `
      <div>
        <strong>Точка ${index + 1}</strong><br />
        Широта: ${locations[index].latitude}<br />
        Долгота: ${locations[index].longitude}<br />
        Скорость: ${locations[index].speed ?? "N/A"} км/ч<br />
        Дата: ${locations[index].date ? new Date(locations[index].date).toLocaleString() : "N/A"}<br />
      </div>
    `;

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
