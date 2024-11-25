// import { useState, useEffect } from "react";
// import { Tabs, DatePicker, Form, Row, Col } from "antd";
// import axios from "axios";
// import { Dayjs } from "dayjs";
// import dayjs from "dayjs";
// import { Car } from "../../../types/transportListTypes";
// import Map from "./Map";
// import { Location, Parameters, ErrorData } from "../../../types/carTrackingTypes";
// import ErrorsTable from "./ErrorsTable";
// import ParametersTable from "./ParametersTable";

// // import moment from "moment";
// const apiUrl = import.meta.env.VITE_API_URL;
// const TransportDashboard = () => {
//   const [errors, setErrors] = useState<ErrorData[]>([]);
//   const [parameters, setParameters] = useState<Parameters[]>([]);
//   const [locations, setLocations] = useState<Location[]>([]);
//   const [idTransport, setIdTransport] = useState<string | null>(null);
//   const [selectedDate, setSelectedDate] = useState<Dayjs>();
//   const [transport, setTransport] = useState<Car>();
  
//   useEffect(() => {
//     const id = sessionStorage.getItem("id");
//     if (id) {
//       setIdTransport(id);
//       console.log(id);
//     }

//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/transport/car/${id}`);
//         setTransport(response.data[0]);
//         console.log(transport);
//       } catch (error) {
//         console.error("Ошибка при получении данных:", error);
//       }
//     };
//     const currentDate = dayjs(new Date());
//     const locations = getLocations(String(id), currentDate);
//     if (Array.isArray(locations)) {
//       setLocations(locations);
//     } else {
//       console.error("Error: Response data is not an array");
//     }
//     fetchData();
//   }, []);

//   const getErrors = async (idTransport: string): Promise<[]> => {
//     try {
//       if (!selectedDate) {
//         return [];
//       }
//       const dateStr = selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
//       const response = await axios.get(
//         `${apiUrl}/transport/errors/${idTransport}`,
//         {
//           params: {
//             date: dateStr,
//           },
//         }
//       );
//       const data = await response.data;
//       return data;
//     } catch (error) {
//       console.error(error);
//       return [];
//     }
//   };

//   const getLocations = async (
//     idTransport: string,
//     selectedDate: Dayjs
//   ): Promise<[]> => {
//     try {
//       const dateStr = selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
//       const response = await axios.get(
//         `${apiUrl}/transport/locations/${idTransport}`,
//         {
//           params: {
//             date: dateStr,
//           },
//         }
//       );
//       const data = await response.data;
//       return data;
//     } catch (error) {
//       console.error(error);
//       return [];
//     }
//   };

//   const getParameters = async (idTransport: string) => {
//     try {
//       if (!selectedDate) {
//         return [];
//       }
//       const dateStr = selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
//       const response = await axios.get(
//         `${apiUrl}/transport/parameters/${idTransport}`,
//         {
//           params: {
//             date: dateStr,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       return [];
//     }
//   };
//   const onSelectDate = async (date: Dayjs) => {
//     setSelectedDate(date);
//     if (!idTransport) return;
//     if (!selectedDate) {
//       return [];
//     }
//     const errors = await getErrors(idTransport);
//     const locations = await getLocations(idTransport, selectedDate);
//     const parameters = await getParameters(idTransport);
//     if (Array.isArray(errors)) {
//       setErrors(errors);
//     } else {
//       console.error("Error: Response data is not an array");
//     }

//     if (Array.isArray(locations)) {
//       setLocations(locations);
//     } else {
//       console.error("Error: Response data is not an array");
//     }
//     if (Array.isArray(parameters)) {
//       setParameters(parameters);
//     } else {
//       console.error("Error: Response data is not an array");
//     }
//   };
//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           width: "100%",
//           backgroundColor: "#F0F4F8",
//         }}
//       >
//         <Row
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             width: "100%",
//             height: "60vh",
//             marginTop: "40px",
//             paddingRight: "50px",
//             paddingLeft: "50px",
//           }}
//         >
//           <Col
//             xs={5}
//             sm={5}
//             md={5}
//             lg={6}
//             xl={5}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "flex-start",
//               alignItems: "flex-start",
//               width: "100%",
//               height: "40vh",
//               borderRadius: "15px",
//               border: "1.4px solid #ccc",
//               backgroundColor: "#F7F9FB", // Изменено на белый для более чистого вида
//               padding: "20px",
//               boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
//               transition: "transform 0.2s, box-shadow 0.2s",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = "scale(1.02)";
//               e.currentTarget.style.boxShadow =
//                 "0px 5px 20px rgba(0, 0, 0, 0.2)"; // Увеличен размер тени
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = "scale(1)";
//               e.currentTarget.style.boxShadow =
//                 "0px 3px 10px rgba(0, 0, 0, 0.1)";
//             }}
//           >
//             <Row
//               style={{
//                 fontSize: "22px",
//                 fontWeight: "bold",
//                 marginBottom: "10px",
//                 textAlign: "center",
//                 width: "100%",
//                 color: "#333",
//               }}
//             >
//               Транспорт
//             </Row>

//             <Col
//               style={{
//                 fontSize: "16px",
//                 marginBottom: "10px",
//                 textAlign: "left",
//                 width: "100%",
//               }}
//             >
//               <div>
//                 Модель: <strong>{transport?.model}</strong>
//               </div>
//               <div>
//                 VIN: <strong>{transport?.vin}</strong>
//               </div>
//             </Col>

//             <Form layout="vertical" style={{ width: "100%" }}>
//               <Form.Item
//                 label={
//                   <span
//                     style={{
//                       fontWeight: "bold",
//                       fontSize: "16px",
//                       color: "#333",
//                       marginBottom: "8px",
//                       marginTop: "25px",
//                     }}
//                   >
//                     Выбор даты
//                   </span>
//                 }
//                 style={{
//                   marginBottom: "24px",
//                 }}
//               >
//                 <p
//                   style={{
//                     margin: 0,
//                     color: "#555",
//                     fontSize: "14px",
//                     marginBottom: "5px",
//                     lineHeight: "1.5",
//                   }}
//                 >
//                   Выберите дату для получения маршрута, параметров, ошибок
//                   транспорта.
//                 </p>
//                 <DatePicker
//                   placeholder="Выбрать дату"
//                   format="YYYY-MM-DD HH:mm:ss"
//                   onChange={onSelectDate}
//                   style={{
//                     width: "100%",
//                     marginTop: "10px",
//                     borderRadius: "4px",
//                     border: "1px solid #ccc",
//                     padding: "10px",
//                   }}
//                 />
//               </Form.Item>
//             </Form>
//           </Col>

//           <Col
//             xs={18}
//             sm={18}
//             md={18}
//             lg={18}
//             xl={18}
//             style={{
//               display: "flex",
//               width: "100%",
//               alignItems: "center",
//               flexDirection: "column",
//               justifyContent: "center",
//               padding: "10px",
//               backgroundColor: "#F8F9FA",
//               borderRadius: "10px", // Закругленные углы для современного вида
//               boxShadow: "0 2px 15px rgba(0, 0, 0, 0.1)", // Легкая тень для глубины
//               position: "relative", // Позволяет наложить элементы на карту
//             }}
//           >
//             <div
//               style={{
//                 width: "100%",
//                 height: "60vh",
//                 borderRadius: "8px",
//                 overflow: "hidden",
//               }}
//             >
//               <Map locations={locations} />
//             </div>
//           </Col>
//         </Row>
//         <Row
//           style={{
//             textAlign: "center",
//             marginLeft: "auto",
//             marginRight: "auto",
//             marginTop: "20px", // Добавлен верхний отступ
//             marginBottom: "40px",
//             width: "100%",
//           }}
//           justify="center"
//         >
//           <Col
//             xs={22}
//             sm={22}
//             md={22}
//             lg={22}
//             xl={22}
//             style={{ fontSize: "20px", fontWeight: "400" }}
//           >
//             <Tabs
//               defaultActiveKey="params"
//               type="card"
//               tabBarStyle={{ margin: 0 }} // Убираем стандартные отступы табов
//             >
//               <Tabs.TabPane
//                 key="params"
//                 tab={
//                   <span style={{ fontSize: "18px", fontWeight: "600" }}>
//                     Параметры
//                   </span>
//                 }
//               >
//                 <ParametersTable parameters={parameters} />
//               </Tabs.TabPane>

//               <Tabs.TabPane
//                 key="errors"
//                 tab={
//                   <span style={{ fontSize: "18px", fontWeight: "600" }}>
//                     Ошибки
//                   </span>
//                 } // Стилизация заголовка
//               >
//                 <ErrorsTable errors={errors} />
//               </Tabs.TabPane>
//             </Tabs>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// };

// export default TransportDashboard;


import { useState, useEffect, useRef } from "react";
import { Tabs, DatePicker, Form, Row, Col } from "antd";
import axios from "axios";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Car } from "../../../types/transportListTypes";
import Map from "./Map";
import { Location, Parameters, ErrorData } from "../../../types/carTrackingTypes";
import ErrorsTable from "./ErrorsTable";
import ParametersTable from "./ParametersTable";
import axiosInstance from '../../../services/axiosInstance';

const apiUrl = import.meta.env.VITE_API_URL;

const TransportDashboard = () => {
  const [errors, setErrors] = useState<ErrorData[]>([]);
  const [parameters, setParameters] = useState<Parameters[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [idTransport, setIdTransport] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [transport, setTransport] = useState<Car>();
  const websocketRef = useRef<WebSocket | null>(null);

  // Проверка текущей даты
  const isCurrentDay = (date: Dayjs): boolean => date.isSame(dayjs(), "day");

  const initializeWebSocket = (id: string) => {
    if (!id) return;

    websocketRef.current = new WebSocket(`${apiUrl.replace(/^http/, "ws")}/realtime/${id}`);

    websocketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "location") {
        setLocations((prev) => [...prev, data.location]);
      } else if (data.type === "parameter") {
        setParameters((prev) => [...prev, data.parameter]);
      } else if (data.type === "error") {
        setErrors((prev) => [...prev, data.error]);
      }
    };

    websocketRef.current.onerror = (error) => console.error("WebSocket Error:", error);

    websocketRef.current.onclose = () => console.log("WebSocket connection closed");
  };

  const closeWebSocket = () => {
    if (websocketRef.current) {
      websocketRef.current.close();
    }
  };

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      setIdTransport(id);

      // Получение данных транспорта
      const fetchData = async () => {
        try {
          // const response = await axios.get(`${apiUrl}/transport/car/${id}`);
          const response = await axiosInstance.get(`/transport/car/${id}`);
          setTransport(response.data[0]);
        } catch (error) {
          console.error("Ошибка при получении данных:", error);
        }
      };

      // Получение данных текущей даты
      if (isCurrentDay(dayjs())) {
        initializeWebSocket(id);
      } else {
        getLocations(String(id), dayjs()).then((data) => setLocations(data));
      }
      fetchData();
    }

    return () => closeWebSocket();
  }, []);

  const getErrors = async (id: string): Promise<[]> => {
    try {
      if (!selectedDate) return [];
      const dateStr = selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      // const response = await axios.get(`${apiUrl}/transport/errors/${id}`, {
        const response = await axiosInstance.get(`/transport/errors/${id}`,{
        params: { date: dateStr },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getLocations = async (id: string, date: Dayjs): Promise<[]> => {
    try {
      const dateStr = date.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      // const response = await axios.get(`${apiUrl}/transport/locations/${id}`, {
        const response = await axiosInstance.get(`/transport/locations/${id}`,{
        params: { date: dateStr },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getParameters = async (id: string): Promise<[]> => {
    try {
      if (!selectedDate) return [];
      const dateStr = selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      // const response = await axios.get(`${apiUrl}/transport/parameters/${id}`, {
        const response = await axiosInstance.get(`/transport/parameters/${id}`,{
        params: { date: dateStr },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const onSelectDate = async (date: Dayjs) => {
    setSelectedDate(date);

    if (!idTransport) return;

    if (isCurrentDay(date)) {
      initializeWebSocket(idTransport);
    } else {
      closeWebSocket();

      const [errorsData, locationsData, parametersData] = await Promise.all([
        getErrors(idTransport),
        getLocations(idTransport, date),
        getParameters(idTransport),
      ]);

      setErrors(errorsData);
      setLocations(locationsData);
      setParameters(parametersData);
    }
  };

  return (
    <div style={{ display: "flex", paddingBottom:"40px", flexDirection: "column", width: "100%", backgroundColor: "#F0F4F8" }}>
      <Row style={{ justifyContent: "space-between", width: "100%", height: "60vh", marginTop: "40px", padding: "0 50px" }}>
        <Col
          xs={5}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            height: "40vh",
            borderRadius: "15px",
            border: "1.4px solid #ccc",
            backgroundColor: "#F7F9FB",
            padding: "20px",
            boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Row style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px", textAlign: "center", width: "100%", color: "#333" }}>
            Транспорт
          </Row>
          <Col style={{ fontSize: "16px", marginBottom: "10px", textAlign: "left", width: "100%" }}>
            <div>Модель: <strong>{transport?.model}</strong></div>
            <div>VIN: <strong>{transport?.vin}</strong></div>
          </Col>
          <Form layout="vertical" style={{ width: "100%" }}>
            <Form.Item label={<span style={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>Выбор даты</span>}>
              <DatePicker
                placeholder="Выбрать дату"
                format="YYYY-MM-DD HH:mm:ss"
                onChange={onSelectDate}
                style={{ width: "100%", marginTop: "10px" }}
              />
            </Form.Item>
          </Form>
        </Col>
        <Col xs={18} style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "10px", backgroundColor: "#F8F9FA", borderRadius: "10px" }}>
          <div style={{ width: "100%", height: "60vh", borderRadius: "8px", overflow: "hidden" }}>
            <Map locations={locations} />
          </div>
        </Col>
      </Row>
      <Row style={{ textAlign: "center", marginTop: "20px", marginBottom: "40px", width: "100%" }} justify="center">
        <Col xs={22}>
          <Tabs defaultActiveKey="params" type="card">
            <Tabs.TabPane key="params" tab={<span style={{ fontSize: "18px", fontWeight: "600" }}>Параметры</span>}>
              {/* <ParametersTable parameters={parameters} /> */}
              <ParametersTable  />
            </Tabs.TabPane>
            <Tabs.TabPane key="errors" tab={<span style={{ fontSize: "18px", fontWeight: "600" }}>Ошибки</span>}>
              <ErrorsTable errors={errors} />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default TransportDashboard;
