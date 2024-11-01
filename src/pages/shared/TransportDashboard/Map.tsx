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
        routeWhileDragging: false,
        draggableWaypoints: false,
        show: false,
        lineOptions: {
          styles: [
            {
              color: "blue",
              opacity: 0.7,
              weight: 5,
            },
          ],
        },
        createMarker: () => null,
      }).addTo(map);
      routingControl.getPlan().on('waypointdragstart', (e: any) => {
        e.preventDefault(); // Отключить перетаскивание контрольных точек
      });

      routingControl.getPlan().on('waypointdrag', (e: any) => {
        e.preventDefault(); // Отключить операцию перетаскивания
      });
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
      <div
        style={{
          width: '52px',
          height: '15.4px',
          position: "absolute",
          bottom: "0px", // отступ снизу
          right: "160px", // отступ справа
          backgroundColor: "white",
          zIndex: 1000,
        }}
      >
      </div>
    </div>
  );
};

export default Map;
