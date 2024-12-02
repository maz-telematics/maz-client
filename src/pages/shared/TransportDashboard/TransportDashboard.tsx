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

const apiUrl = import.meta.env.VITE_API_URL;

const TransportDashboard = () => {
  const [errors, setErrors] = useState<ErrorData[]>([]);
  const [parameters, setParameters] = useState<Parameters[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [idTransport, setIdTransport] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [transport, setTransport] = useState<Car>();
  const websocketRef = useRef<WebSocket | null>(null);

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

      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(`/transport/car/${id}`);
          setTransport(response.data[0]);
        } catch (error) {
          console.error("Ошибка при получении данных:", error);
        }
      };

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
    <div style={{ display: "flex", paddingBottom: "40px",overflowX:"hidden", flexDirection: "column", width: "100%", backgroundColor: "#F0F4F8" }}>
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
              <ParametersTable />
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
