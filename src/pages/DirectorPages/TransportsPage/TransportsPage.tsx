import { useState, useEffect } from "react";
import { Table, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../services/axiosInstance";
import "../../../App.css"; // Импорт CSS с правилами

import { Car } from "../../../types/organizationTypes";

const TransportsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);

  const user = localStorage.getItem("user");
  let userId: number | null = null;

  if (user) {
    const userData = JSON.parse(user);
    userId = userData.id;
  }

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axiosInstance.get(`/transport/list/${userId}`);
        if (response.data.message) {
          toast.warning(response.data.message, {
            position: "top-center",
            autoClose: 5000,
          });
          setCars([]);
        } else {
          setCars(response.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при получении данных. Попробуйте позже.", {
          position: "top-center",
          autoClose: 5000,
        });
      }
    };
    fetchCars();
  }, [userId]);

  const navigate = useNavigate();

  const handleRedirectAndSaveId = async (id: string) => {
    await sessionStorage.setItem("id", String(id));
    navigate("/parameters");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "#F0F4F8",
        boxSizing: "border-box",
        overflow: "hidden",
        scrollbarWidth: "thin",
        scrollbarColor: "#3b82f6 white",
      }}
    >
      <Row style={{ padding: "0 40px" }}>
        <Col xs={24}>
          <ToastContainer />
          <Table
            columns={[
              {
                title: "Модель",
                dataIndex: "model",
                key: "model",
                render: (text, record) => (
                  <a onClick={() => handleRedirectAndSaveId(record.id)}>{text}</a>
                ),
              },
              {
                title: "VIN номер",
                dataIndex: "vin",
                key: "vin",
              },
              {
                title: "Состояние",
                dataIndex: "connectionStatus",
                key: "connectionStatus",
                render: (status) => (
                  <span>{status ? "Связь есть" : "Нет связи"}</span>
                ),
              },
              
              {
                title: "Тип транспорта",
                dataIndex: "vehicleType",
                key: "vehicleType",
              },
              {
                title: "Тип двигателя",
                dataIndex: "engineType",
                key: "engineType",
              },
              {
                title: "Организация",
                dataIndex: "organizationName",
                key: "organizationName",
              },
            ]}
            pagination={false}
            dataSource={cars}
            bordered
            rowKey={(record) => record.id}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TransportsPage;
