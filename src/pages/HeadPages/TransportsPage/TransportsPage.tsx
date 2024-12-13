import { useState, useEffect } from "react";
import { Table, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Car } from "../../../types/organizationTypes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../services/axiosInstance';

const TransportsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [message, setMessage] = useState('');
  
  const user = localStorage.getItem("user");
  let userId: number;
  let role: string | null = null;
  if (user) {
    const userData = JSON.parse(user);
    userId = userData.id;
    role = userData.role;
  }

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axiosInstance.get('/transport/list/${userId}');
        if (response.data.message) {
          toast.warning(response.data.message, {
            position: 'top-center', // Изменяем на строку
            autoClose: 5000,
          });
          setCars([]); // Очищаем список автомобилей, если доступ ограничен
        } else {
          setCars(response.data);
        }
      } catch (error) {
        console.error(error);
        toast.error('Ошибка при получении данных. Попробуйте позже.', {
          position: 'top-center', // Изменяем на строку
          autoClose: 5000,
        });
      }
    };
    fetchCars();
  }, []);

  const handleRedirectAndSaveId = async (id: string) => {
    await sessionStorage.setItem("id", String(id));
    navigate("/parameters");
  };

  const navigate = useNavigate();

  return (
    <div style={{  display: "flex", 
      flexDirection: "column", 
      width: "100%", 
      height: "100vh",
      backgroundColor: "#F0F4F8",
      boxSizing: "border-box",
      overflow: "hidden",
      scrollbarWidth: "thin",
      scrollbarColor:"#3b82f6 white"}}>
      <Row style={{ width: "80%", margin: "30px auto" }}>
        <Col xs={24}>
        <ToastContainer />
       <Table
            columns={[
              {
                title: "Модель",
                dataIndex: "model",
                key: "model",
                render: (text, record) => (
                  <a
                    onClick={() => handleRedirectAndSaveId(record.id)}
                  >
                    {text}
                  </a>
                ),
              },
              {
                title: "VIN номер",
                dataIndex: "id",
                key: "id",
              },

              {
                title: "Год выпуска",
                dataIndex: "year_release",
                key: "year_release",
                render: (text) => (
                  <span>{moment(text).format("YYYY-MM-DD")}</span>
                ),
              },
              {
                title: "Организация",
                dataIndex: "organizationName",
                key: "organizationName",
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
