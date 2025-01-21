import { useState, useEffect } from "react";
import { Table, Modal, Button, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Car } from "../../../types/transportListTypes";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import axiosInstance from "../../../services/axiosInstance";
import DownloadButton from "../../../Components/DownloadButton";
import DownloadIcon from '@mui/icons-material/Download';

const TransportsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteVin, setDeleteVin] = useState<string | undefined>();
  const [deleteOrganizationId, setDeleteOrganizationId] = useState<number | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axiosInstance.get<Car[]>("/transport/list-transport");
        setCars(response.data);
      } catch (error) {
        console.error(error);
        message.error("Ошибка загрузки данных транспорта.");
      }
    };
    fetchCars();
  }, []);

  const handleDelete = (vin: string, organizationId: number) => {
    setDeleteVin(vin);
    setDeleteOrganizationId(organizationId);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteVin || !deleteOrganizationId) return;
    try {
      const response = await axiosInstance.delete(`/transport/${deleteVin}`, {
        params: { organization_id: deleteOrganizationId },
      });
      if (response.status === 200) {
        message.success("Транспорт перемещён в архив успешно!");
        setCars(response.data.remainingCars);
        setDeleteModalVisible(false);
      } else {
        message.error("Ошибка архивирования транспорта.");
      }
    } catch (error) {
      console.error(error);
      message.error("Ошибка архивирования транспорта.");
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  const columns = [
    {
      title: "Модель",
      dataIndex: "model",
      key: "model",
      render: (model: string, record: Car) => (
        <a
        onClick={() => {
          // Сохраняем VIN или id в sessionStorage
          sessionStorage.setItem("id", record.id);
          
          // Перенаправляем на страницу
          navigate(`/master/transport?id=${record.id}`);
        }}
        style={{ color: "#1890ff", fontWeight: 500 }}
        >
          {model}
        </a>
      ),
    },
    { title: "VIN номер", dataIndex: "id", key: "id" },
    {
      title: "Регистрационный номер",
      dataIndex: "reg_number",
      key: "reg_number",
      render: (model: string, record: Car) => (
        <a
          onClick={() => navigate(`/master/transport?id=${record.id}`)}
          style={{ color: "#1890ff", fontWeight: 500 }}
        >
          {model}
        </a>
      ),
    },
    {
      title: "Состояние",
      dataIndex: "connectionStatus",
      key: "connectionStatus",
      render: (status: boolean | undefined) => (status ? "Связь есть" : "Нет связи"),
    },
    { title: "Тип транспорта", dataIndex: "vehicleType", key: "vehicleType" },
    { title: "Тип двигателя", dataIndex: "engineType", key: "engineType" },
    { title: "Год выпуска", dataIndex: "yearRelease", key: "yearRelease" },
    {
      title: "Блок телематики",
      dataIndex: "telemetryBlock",
      key: "telemetryBlock",
      render: (block: string | undefined) => block || "Не указано",
    },
    { title: "Организация", dataIndex: "organizationName", key: "organizationName" },
    
    {
      title: "Действия",
      key: "actions",
      render: (_: any, record: Car) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            size="middle"
            onClick={() => navigate(`/master/edit-transport?id=${record.id}`)}
            style={{ backgroundColor: "#1B232A", color: "#fff" }}
            icon={<ModeEditOutlinedIcon />}
          >
            Изменить
          </Button>
          <Button
            size="middle"
            onClick={() => handleDelete(record.id, record.organization_id)}
            style={{ backgroundColor: "#1B232A", color: "#fff" }}
            icon={<ArchiveOutlinedIcon />}
          >
            Переместить в архив
          </Button>
        </div>
      ),
    },
  ];

  const isMobile = window.innerWidth < 768;

  return (

    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      backgroundColor: "#E1E1E1",
    }}>
      <Row style={{
        padding: "0 40px",
      }}>
           <Col xs={24}>
          <Row justify="space-between" style={{ marginBottom: 16, alignItems: 'flex-end' }}>
            <Col>
              <h1
                style={{
                  margin: 0,
                  fontSize: isMobile ? '24px' : '32px',
                }}
              >Транспорт</h1>
            </Col>
         <Col>
               <Row align="middle" wrap={false} style={{ gap: "16px" }}>
                <Button
                  type="primary"
                  onClick={() => navigate("/master/create-transport")}
                  icon={<LibraryAddOutlinedIcon />}
                  style={{ backgroundColor: "#3A5F73" }}
                >
                  {!isMobile && 'Добавить транспорт'}
                </Button>
                <DownloadButton
                  url="/api/transports/download"
                  filename="transports.pdf"
                  buttonText="Скачать таблицу"
                  icon={<DownloadIcon style={{ fontSize: 18, color: 'white' }} />}
                  buttonProps={{ className: 'bg-blue-500 text-white hover:bg-blue-600' }}
                />
              </Row> 
            </Col>
          </Row>
      <Table
        columns={columns}
        dataSource={cars}
        rowKey={(record) => record.id}
        components={{
          header: {
            cell: (props: any) => (
              <th {...props} style={{ backgroundColor: "#1B232A", color: "#fff", border: "none" }}>
                {props.children}
              </th>
            ),
          },
        }}
        bordered
        style={{
          backgroundColor: "#F7F9FB",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
       </Col>
       </Row>
      <Modal
        title="Подтверждение архивирования"
        visible={deleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Переместить в архив"
        cancelText="Отменить"
      >
        <p>Вы уверены, что хотите переместить транспорт в архив?</p>
      </Modal>
    </div>
  );
};

export default TransportsPage;