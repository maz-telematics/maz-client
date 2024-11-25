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

    // Добавление тайлов
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Отображение точек маршрута
    locations.forEach((location) => {
      const { lantitude, longitude, data } = location;

      if (lantitude !== undefined && longitude !== undefined) {
        const formattedDate = new Date(data).toLocaleString("ru-RU", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        L.circle([lantitude, longitude], {
          color: "blue",
          fillColor: "#30f",
          fillOpacity: 1,
          radius: 5,
        })
          .addTo(map)
          .bindPopup(`Широта: ${lantitude}, Долгота: ${longitude}, Дата: ${formattedDate}`);
      } else {
        console.error(
          `Invalid location data: Latitude: ${lantitude}, Longitude: ${longitude}`
        );
      }
    });

    // Формирование маршрута
    const waypoints = locations
      .map((location) => {
        if (
          location.lantitude !== undefined &&
          location.longitude !== undefined
        ) {
          return L.latLng(location.lantitude, location.longitude);
        } else {
          console.error(`Invalid LatLng data for location: ${location}`);
          return null;
        }
      })
      .filter((latLng) => latLng !== null);

    if (waypoints.length > 0) {
      const routingControl = (L.Routing.control as any)({
        waypoints: waypoints,
        routeWhileDragging: false, // Отключить перетаскивание
        draggableWaypoints: false, // Отключить редактирование маршрута
        addWaypoints: false, // Отключить добавление новых точек
        show: false, // Скрыть панель маршрута
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
          // Добавление маркеров только для начальной и конечной точек
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

      // Установить масштаб карты так, чтобы весь маршрут был виден
      map.fitBounds(routingControl.getPlan().getWaypoints().map((wp: any) => wp.latLng));
    } else {
      console.error("No valid waypoints for the routing control.");
    }

    return () => {
      map.remove(); // Удаление экземпляра карты при размонтировании компонента
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
