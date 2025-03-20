import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Location } from "../../../types/carTrackingTypes";
import dayjs, { Dayjs } from "dayjs";
import axiosInstance from "../../../services/axiosInstance";
import { fetchTransportLocations } from "../../../Store/apis/transportLocations";
import { Tabs, Table } from "antd";
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



// import React, { useEffect, useRef, useState } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { Location } from "../../../types/carTrackingTypes";
// import dayjs, { Dayjs } from "dayjs";
// import axiosInstance from "../../../services/axiosInstance";
// import { fetchTransportLocations } from "../../../Store/apis/transportLocations";
// import { Tabs, Table, Pagination } from "antd";

// interface MapProps {
//   selectedDate: Dayjs | null;
// }

// function removeDuplicateLocations(
//   locations: Array<{ latitude: number; longitude: number }>,
//   minDistance = 0.0001
// ) {
//   const filteredLocations: Array<{ latitude: number; longitude: number }> = [];

//   locations.forEach((loc) => {
//     const isDuplicate = filteredLocations.some((filteredLoc) => {
//       const distance = Math.sqrt(
//         Math.pow(loc.latitude - filteredLoc.latitude, 2) +
//           Math.pow(loc.longitude - filteredLoc.longitude, 2)
//       );
//       return distance < minDistance;
//     });

//     if (!isDuplicate) {
//       filteredLocations.push(loc);
//     }
//   });

//   return filteredLocations;
// }

// const Map: React.FC<MapProps> = ({ selectedDate }) => {
//   const [locations, setLocations] = useState<Location[]>([]);
//   const [activeTab, setActiveTab] = useState("map"); // Хранение состояния активного таба
//   const mapRef = useRef<L.Map | null>(null);
//   const polylineRef = useRef<L.Polyline | null>(null); 
//   const markersRef = useRef<L.Marker[]>([]); 
//   const [mapCenter, setMapCenter] = useState<[number, number] | null>(null); 
//   const [mapZoom, setMapZoom] = useState<number>(20); 
//   const id = sessionStorage.getItem("id");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize] = useState(10); // Размер страницы (например, 10 записей на страницу)
//   const [totalItems,setTotalItems] = useState(0); // Общее количество элементов (здесь locations.length)
//   const [totalPages,setTotalPages] = useState(0);


//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     // Здесь вы можете также выполнять дополнительную обработку данных на основе текущей страницы
//   };


//   const isCurrentDay = (date: Dayjs | null): boolean => {
//     return date ? date.isSame(dayjs(), "day") : false;
//   };

//   const getLocations = async (id: string, date: Dayjs | null): Promise<Location[]> => {
//     try {
//       if (!date) {
//         console.warn("Дата не указана, запрос не будет выполнен.");
//         return [];
//       }
//       const dateStr = date.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
//       const response = await axiosInstance.get(`/transport/locations/${id}`, {
//         params: { date: dateStr },
//       })
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       return [];
//     }
//   };

//   useEffect(() => {
//     const id = sessionStorage.getItem("id");
  
//     if (!id) return;

//     if (isCurrentDay(selectedDate)) {
//       fetchTransportLocations(id)
//         .then((data) => {
//           setLocations(data as Location[]);
//           setTotalPages(Math.ceil(data.length / pageSize)); 
//           console.log("totalPAGE",Math.ceil(data.length / pageSize))
//           setTotalItems(data.length)
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       getLocations(id, selectedDate).then((locationsData) => {
//         setLocations(locationsData);
//         setTotalItems(locationsData.length)
//         setTotalPages(Math.ceil(locationsData.length / pageSize)); 
//         console.log(totalPages)
//       });
//     }
//   }, [id, selectedDate]);

//   useEffect(() => {
//     if (!mapRef.current) {
//       const initialCenter = mapCenter || [53.9, 27.5667]; 
//       mapRef.current = L.map("map", {
//         center: initialCenter,
//         zoom: mapZoom,
//         attributionControl: false,
//       });

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "",
//       }).addTo(mapRef.current);

//       mapRef.current.on("moveend", () => {
//         if (mapRef.current) {
//           const center = mapRef.current.getCenter();
//           setMapCenter([center.lat, center.lng]);
//         }
//       });

//       mapRef.current.on("zoomend", () => {
//         if (mapRef.current) {
//           const zoom = mapRef.current.getZoom();
//           setMapZoom(zoom);
//         }
//       });
//     }

//     if (!mapRef.current) return;
//     markersRef.current.forEach((marker) => marker.remove());
//     markersRef.current = [];

//     if (polylineRef.current) {
//       polylineRef.current.remove(); 
//       polylineRef.current = null;
//     }

//     const waypoints = locations
//       .filter((loc) => loc.latitude != null && loc.longitude != null)
//       .map((loc) => L.latLng(loc.latitude, loc.longitude));

//     if (!polylineRef.current) {
//       polylineRef.current = L.polyline(waypoints, {
//         color: "blue",
//         weight: 6,
//         opacity: 0.9,
//         interactive: false,
//       }).addTo(mapRef.current);
//     } 

//     waypoints.forEach((point, index) => {
//       const popupContent = `
//       <div>
//         <strong>Точка ${index + 1}</strong><br />
//         Широта: ${locations[index].latitude}<br />
//         Долгота: ${locations[index].longitude}<br />
//         Скорость: ${locations[index].speed ?? "N/A"} км/ч<br />
//         Дата: ${locations[index].date ? new Date(locations[index].date).toLocaleString() : "N/A"}<br />
//       </div>
//     `;

//       const iconUrl =
//         index === 0
//           ? "../start.png"
//           : index === waypoints.length - 1
//             ? "../end.png"
//             : "../default.png";

//       const icon = L.icon({
//         iconUrl,
//         iconSize: [25, 35],
//         iconAnchor: [12, 41],
//       });

//       const marker = L.marker(point, { icon }).bindPopup(popupContent);
//       marker.addTo(mapRef.current);
//       markersRef.current.push(marker);
//     });

//     return () => {
//       markersRef.current.forEach((marker) => marker.remove());
//       markersRef.current = [];
//     };
//   }, [locations, selectedDate]);

//   const columns = [
//     {
//       title: "Дата",
//       dataIndex: "date",
//       key: "date",
//       render: (text: string) => new Date(text).toLocaleString(),
//     },
//     {
//       title: "Широта",
//       dataIndex: "latitude",
//       key: "latitude",
//     },
//     {
//       title: "Долгота",
//       dataIndex: "longitude",
//       key: "longitude",
//     },
//     {
//       title: "Скорость (км/ч)",
//       dataIndex: "speed",
//       key: "speed",
//     },
//   ];
// console.log("locations",locations)
//   return (
//     <div style={{marginTop:"-10px"}}>
//          <Tabs
//       activeKey={activeTab}
//       onChange={(key) => setActiveTab(key)}
//       tabBarStyle={{
//         borderBottom: "none", 
//         fontSize: "24px", 
//         fontWeight: "bold", 
//         color: "#FF0000", 
//       }}
      
//       items={[
//         {
//           label: "Карта",
//           key: "map",
//           children: (
//             <div style={{ width: "100%", height: "75vh" }} id="map"></div>
//           ),
//         },
//         {
//           label: "Таблица",
//           key: "table",
//           children: (
//             <Table
//               dataSource={locations}
//               columns={columns}
//               rowKey="date"
//               components={{
//                 header: {
//                   cell: (props: any) => (
//                     <th {...props} style={{ backgroundColor: "#1B232A", color: "#fff", border: "none" }}>
//                       {props.children}
//                     </th>
//                   ),
//                 },
//               }}
//               bordered
//               style={{
//                 backgroundColor: "#F7F9FB",
//                 borderRadius: "8px",
//                 boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//               }}
//               pagination={false}
//               scroll={{ x: "max-content" }}
//             />
//           ),
//         },
//       ]}
//     />
//     </div>
//     <div >
//     <Tabs
//     activeKey={activeTab}
//     onChange={(key) => setActiveTab(key)}
//     tabBarStyle={{
//       borderBottom: "none", 
//       fontSize: "24px", 
//       fontWeight: "bold", 
//       color: "#FF0000", 
//     }}
//     items={[
//       {
//         label: "Карта",
//         key: "map",
//         children: (
//           <div style={{ width: "100%", height: "75vh" }} id="map"></div>
//         ),
//       },
//       {
//         label: "Таблица",
//         key: "table",
//         children: (
//           <>
//             <Table
//               dataSource={locations.slice((currentPage - 1) * pageSize, currentPage * pageSize)} // Разбиение данных для пагинации
//               columns={columns}
//               rowKey="date"
//               components={{
//                 header: {
//                   cell: (props: any) => (
//                     <th {...props} style={{ backgroundColor: "#1B232A", color: "#fff", border: "none" }}>
//                       {props.children}
//                     </th>
//                   ),
//                 },
//               }}
//               bordered
//               style={{
//                 backgroundColor: "#F7F9FB",
//                 borderRadius: "8px",
//                 boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//               }}
//               pagination={false} // Отключаем встроенную пагинацию Ant Design, так как будем использовать собственную
//               scroll={{ x: "max-content" }}
//             />
//  {totalPages > 1 && ( // Показываем пагинацию, только если страниц больше 1
//         <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
//           <Pagination
//             current={currentPage}
//             total={totalItems} // Общее количество элементов
//             pageSize={pageSize}
//             onChange={handlePageChange}
//             showSizeChanger={false} // Отключаем изменение размера страницы
//             style={{ textAlign: "center" }}
//           />
//         </div>
//       )}
//             {/* <Pagination
//               current={currentPage}
//               total={totalItems}
//               pageSize={pageSize}
//               onChange={handlePageChange}
//               showSizeChanger={false} // Отключаем возможность изменения размера страницы
//               style={{ textAlign: "center", marginTop: "16px" }}
//             /> */}
//           </>
//         ),
//       },
//     ]}
//   />
//   </div>
//   );
// };

// export default Map;
