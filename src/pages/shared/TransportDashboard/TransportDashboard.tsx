import { useState, useEffect, useRef } from "react";
import { Tabs, DatePicker, Form, Row, Col } from "antd";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Car } from "../../../types/transportListTypes";
import Map from "./Map";
import { Location, Parameters, ErrorData } from "../../../types/carTrackingTypes";
import ErrorsTable from "./ErrorsTable";
import ParametersTable from "./ParametersTable";
import axiosInstance from '../../../services/axiosInstance';
import "dayjs/locale/ru";
import locale from "antd/es/locale/ru_RU";
import { ConfigProvider } from "antd";
dayjs.locale("ru");

const apiUrl = import.meta.env.VITE_API_URL;

const TransportDashboard = () => {
  const [errors, setErrors] = useState<ErrorData[]>([]);
  const [parameters, setParameters] = useState<Parameters[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [idTransport, setIdTransport] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(() => {
    const storedDate = localStorage.getItem("selectedDate");
    return storedDate ? dayjs(storedDate) : dayjs(); // Текущая дата по умолчанию
  });
  const [transport, setTransport] = useState<Car>();
  const websocketRef = useRef<WebSocket | null>(null);

  const isCurrentDay = (date: Dayjs): boolean => date.isSame(dayjs(), "day");

  const initializeWebSocket = (id: string) => {
    if (!id || websocketRef.current) return; // Предотвращаем повторное открытие

    // websocketRef.current = new WebSocket(`${apiUrl.replace(/^http/, "ws")}/ws`);
    websocketRef.current = new WebSocket("http://134.17.17.15:8080/ws");
    websocketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Полученные данные:", data); // Проверьте формат данных
      if (data && data.location) {
        setLocations((prev) => [...prev, data.location]);
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

    const message = `${user.token}, ${id}`; 
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

  const getTransportData = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/transport/car/${id}`);
      setTransport(response.data);
    } catch (error) {
      console.error("Ошибка при получении данных транспорта:", error);
    }
  };

  const getErrors = async (id: string): Promise<[]> => {
    try {
      if (!selectedDate) return [];
      const dateStr = selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      const response = await axiosInstance.get(`/transport/errors/${id}`, {
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
      const response = await axiosInstance.get(`/transport/locations/${id}`, {
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
      const response = await axiosInstance.get(`/transport/parameters/${id}`, {
        params: { date: dateStr },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (!id) return;
  
    // Устанавливаем транспорт только один раз
    setIdTransport(id);
    getTransportData(id);
  
    // Инициализируем WebSocket, если дата текущая
    if (isCurrentDay(selectedDate)) {
      // Только инициализация, если WebSocket еще не открыт
      if (!websocketRef.current) {
        initializeWebSocket(id);
      }
    } else {
      // Закрытие WebSocket, если дата не текущая
      closeWebSocket();
  
      // Выполняем асинхронные запросы только один раз
      Promise.all([
        getErrors(id),
        getLocations(id, selectedDate),
        getParameters(id),
      ]).then(([errorsData, locationsData, parametersData]) => {
        setErrors(errorsData);
        setLocations(locationsData);
        setParameters(parametersData);
      });
    }
  
    return () => {
      // Очистка WebSocket при размонтировании компонента
      closeWebSocket();
    };
  }, [idTransport, selectedDate]);

  const onSelectDate = async (date: Dayjs) => {
    setSelectedDate(date);
    localStorage.setItem("selectedDate", date.toISOString());
  };

  const disableFutureDates = (current: Dayjs | null): boolean => {
    return current ? current.isAfter(dayjs().endOf("day")) : false;
  };


  return (
    <div style={{ display: "flex", paddingBottom: "40px", overflowX: "hidden", flexDirection: "column", width: "100%", backgroundColor: "#F0F4F8" }}>
      <Row style={{ justifyContent: "space-between", width: "100%", height: "60vh", marginTop: "40px", padding: "0 50px" }}>
        <Col xs={5} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", width: "100%", height: "40vh", borderRadius: "15px", border: "1.4px solid #ccc", backgroundColor: "#F7F9FB", padding: "20px", boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)" }}>
          <Row style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px", textAlign: "center", width: "100%", color: "#333" }}>
            Транспорт
          </Row>
          <Col style={{ fontSize: "16px", marginBottom: "10px", textAlign: "left", width: "100%" }}>
            <div>Модель: <strong>{transport?.model}</strong></div>
            <div>VIN: <strong>{transport?.id}</strong></div>
          </Col>
          <Form layout="vertical" style={{ width: "100%" }}>
            <Form.Item label={<span style={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>Выбор даты</span>}>
              <ConfigProvider locale={locale}>
                <DatePicker
                  placeholder="Выбрать дату"
                  format="YYYY-MM-DD"
                  value={selectedDate}
                  onChange={(date) => date && onSelectDate(date)}
                  style={{ width: "100%", marginTop: "10px" }}
                  disabledDate={disableFutureDates}
                />
              </ConfigProvider>
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
              <ParametersTable parameters={parameters} />
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
