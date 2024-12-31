import { useState, useEffect } from "react";
import { Table, Modal, Button, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Car } from "../../../Types/transportListTypes";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import moment from "moment";
import axiosInstance from "../../../services/axiosInstance";

const TransportsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteVin, setDeleteVin] = useState<number>();
  const [deleteOrganizationId, setDeleteOrganizationId] = useState<number>();
  const user = localStorage.getItem("user");
  let userId: number;
  let role: string | null = null;
  if (user) {
    const userData = JSON.parse(user);
    userId = userData.id;
    role = userData.role;
  }

  const navigate = useNavigate();

  const navigateToNewCar = () => {
    navigate("/master/create-transport");
  };

  const navigateToEditCar = async (id: number) => {
    await sessionStorage.setItem("id", String(id));
    navigate("/master/edit-transport");
  };

  const handleDelete = (vin: number, organization_id: number) => {
    setDeleteVin(vin);
    setDeleteOrganizationId(organization_id);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/transport/${deleteVin}`, {
        params: { organization_id: deleteOrganizationId },
      });
      if (response.status === 200) {
        message.success("Авто перемещена в архив успешно!!");
        setCars(response.data.remainingCars);
        setDeleteModalVisible(false);
      } else {
        message.error("Ошибка при архивировании!");
      }
    } catch (error) {
      message.error("Ошибка при архивировании!");
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axiosInstance.get(`/transport/list-transport`);
        setCars(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCars();
  }, []);

  const handleRedirectAndSaveId = async (id: number) => {
    await sessionStorage.setItem("id", String(id));
    navigate("/master/transport");
  };
  const isMobile = window.innerWidth < 768;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#E1E1E1",
      }}
    >
      <Row style={{ padding: "0 40px", flex: "1" }}>
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
              <Button
                type="primary"
                icon={<LibraryAddOutlinedIcon />}
                onClick={navigateToNewCar}
                style={{
                  backgroundColor: "#3A5F73",
                }}
              >
                {!isMobile && 'Добавить транспорт'}
              </Button>
            </Col>
          </Row>
          <div style={{ overflowX: 'auto', maxWidth: '100%', WebkitOverflowScrolling: 'touch' }}>
            <Table
              components={{
                header: {
                  cell: (props: any) => (
                    <th {...props} style={{ backgroundColor: "#1B232A", color: "#fff", border: "none" }}>
                      {props.children}
                    </th>
                  ),
                },
              }}
              columns={[
                {
                  title: "Модель",
                  dataIndex: "model",
                  key: "model",
                  render: (text, record) => (
                    <a onClick={() => handleRedirectAndSaveId(record.id)} style={{ color: "#1890ff", fontWeight: "500" }}>
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
                  render: (text) => <span>{moment(text).format("YYYY")}</span>,
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
                {
                  dataIndex: "",
                  key: "actions",
                  width: 250,
                  align: "center",
                  render: (text, record) => (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Button
                        size="middle"
                        onClick={() => navigateToEditCar(record.id)}
                        style={{ backgroundColor: "#3A5F73", color: "#fff", display: "flex", alignItems: "center" }}
                        icon={<ModeEditOutlinedIcon />}
                      >
                        Изменить
                      </Button>
                      <Button
                        disabled={true}
                        size="middle"
                        onClick={() => handleDelete(record.id, record.organization_id)}
                        style={{ backgroundColor: "#3A5F73", color: "#fff", display: "flex", alignItems: "center" }}
                        icon={<ArchiveOutlinedIcon />}
                      >
                        Переместить в архив
                      </Button>
                    </div>
                  ),
                },
              ]}
              pagination={false}
              dataSource={cars}
              bordered
              rowKey={(record) => record.id}
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#F7F9FB",
              }}
              scroll={{ x: 'max-content' }}
            />
          </div>

          <Row justify="end" style={{ marginTop: "30px" }}></Row>
        </Col>
      </Row>

      <Modal
        title="Подтверждение архивирования"
        visible={deleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Переместить в архив"
        cancelText="Отменить"
        style={{ borderRadius: "8px" }}
      >
        <p>Вы уверены, что хотите переместить транспорт в архив?</p>
      </Modal>
    </div>
  );
};

export default TransportsPage;
