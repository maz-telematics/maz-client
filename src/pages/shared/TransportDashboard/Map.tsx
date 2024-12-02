import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import { Location } from "../../../types/carTrackingTypes";

interface MapProps {
  locations: Location[];
}

const Map: React.FC<MapProps> = ({ locations }) => {
  useEffect(() => {
    const map = L.map("map").setView([53.9, 27.5667], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
    locations.forEach((location) => {
      const { latitude, longitude, date,speed } = location;

      if (latitude !== undefined && longitude !== undefined) {
        const formattedDate = new Date(date).toLocaleString("ru-RU", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        L.circle([latitude, longitude], {
          color: "blue",
          fillColor: "#30f",
          fillOpacity: 1,
          radius: 5,
        })
          .addTo(map)
          .bindPopup(`Скорость: ${speed} Широта: ${latitude}, Долгота: ${longitude}, Дата: ${formattedDate}`);
      } else {
        console.error(
          `Invalid location data: Latitude: ${latitude}, Longitude: ${longitude}`
        );
      }
    });

    // Формирование маршрута
    const waypoints = locations
      .map((location) => {
        if (
          location.latitude !== undefined &&
          location.longitude !== undefined
        ) {
          return L.latLng(location.latitude, location.longitude);
        } else {
          console.error(`Invalid LatLng data for location: ${location}`);
          return null;
        }
      })
      .filter((latLng) => latLng !== null);

    if (waypoints.length > 0) {
      const routingControl = (L.Routing.control as any)({
        waypoints: waypoints,
        routeWhileDragging: false, 
        draggableWaypoints: false,
        addWaypoints: false, 
        show: false, 
        lineOptions: {
          styles: [
            {
              color: "blue",
              opacity: 0.9,
              weight: 6,
            },
          ],
        },
        createMarker: (i: number, waypoint: any, n: number) => {
          if (i === 0) {
            return L.marker(waypoint.latLng, { icon: L.icon({
              iconUrl: "/start-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            }) }).bindPopup("Начальная точка");
          }
          if (i === n - 1) {
            return L.marker(waypoint.latLng, { icon: L.icon({
              iconUrl: "/end-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            }) }).bindPopup("Конечная точка");
          }
          return null;
        },
      }).addTo(map);

      map.fitBounds(routingControl.getPlan().getWaypoints().map((wp: any) => wp.latLng));
    } else {
      console.error("No valid waypoints for the routing control.");
    }

    return () => {
      map.remove(); 
    };
  }, [locations]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        id="map"
        style={{ display: "flex", width: "100%", height: "100%" }}
      ></div>
    </div>
  );
};

export default Map;
