import { useState, useEffect } from "react";
import { Table, Tabs, Modal, Button, Row, Col, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../../components/Header";
import axios from "axios";
import { Car, Organization } from "../../../types/transportListTypes";
import moment from "moment";

const apiUrl = process.env.REACT_APP_API_URL;
const ManufacturerTransportList = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [organization, setOrganizations] = useState<Organization[]>([]);
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

  const navigateToNewCar = () => {
    navigate("/new-car");
  };
  const navigateToNewOrganization = () => {
    navigate("/new-organization");
  };
  const navigateToEditCar = async (id: number) => {
    await sessionStorage.setItem("id", String(id));
    navigate("/edit-car");
  };
  const handleDelete = (vin: number, organization_id: number) => {
    setDeleteVin(vin);
    setDeleteOrganizationId(organization_id);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/transport/${deleteVin}`, {
        params: {
          organization_id: deleteOrganizationId,
        },
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
  const fetchOrganizatios = async () => {
    try {
      const response = await axios.get(`${apiUrl}/organizations/list`);
      setOrganizations(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${apiUrl}/transport/list-transport`);
        setCars(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCars();
    fetchOrganizatios();
  }, []);

  const handleRedirectAndSaveId = async (id: number) => {
    await sessionStorage.setItem("id", String(id));
    navigate("/parameters");
  };
  const handleRedirectAndSaveOrganizationId = async (id: number) => {
    await sessionStorage.setItem("organization_id", String(id));
    navigate("/organization");
  };
  const handleDeleteOrganization = async (idOrganization: number) => {
    Modal.confirm({
      title: "Подтверждение архивирования",
      content: `Вы уверены, что хотите переместить организацию в архив?`,
      okText: "Переместить в архив",
      okType: "danger",
      cancelText: "Отмена",
      onOk: async () => {
        try {
          const response = await axios.delete(
            `${apiUrl}/organizations/${idOrganization}`
          );

          if (response.status === 200) {
            message.success(`Организация перемещена в архив успешно!`);
            fetchOrganizatios();
          }
        } catch (error) {
          console.error("Ошибка при архивировании:", error);
          message.error("Не удалось переместить организацию в архив.");
        }
      },
    });
  };

  const navigate = useNavigate();
  return (
    <div style={{
      display: "flex", 
      flexDirection: "column", 
      width: "100%", 
      height: "100vh", // Установить 100vh, чтобы занять всю высоту
      backgroundColor: "#F0F4F8",
      boxSizing: "border-box",
      overflow: "hidden",
      scrollbarWidth: "thin",
      scrollbarColor:"#3b82f6 white"

      }}>
      {/* <Header /> */}
      <Row style={{  width: "80%", 
        margin: "30px auto", 
        flex: "1", 
        // overflowY: "auto",
        overflowX:"hidden"}}>
        <Col xs={24} >
          <Tabs defaultActiveKey="params" type="card" style={{ margin: 0 }}>
            <Tabs.TabPane key="Transport" tab="Транспорт">
              <Row gutter={[16, 16]} style={{ margin: 0 }}>
                <Col span={24}>
                  <Table
                    columns={[
                      {
                        title: "Модель",
                        dataIndex: "model",
                        key: "model",
                        render: (text, record) => (
                          <a
                            onClick={() =>
                              handleRedirectAndSaveId(record.id_transport)
                            }
                            style={{ color: "#1890ff", fontWeight: "500" }}
                          >
                            {text}
                          </a>
                        ),
                      },
                      {
                        title: "VIN номер",
                        dataIndex: "vin",
                        key: "vin",
                      },
                      {
                        title: "Год выпуска",
                        dataIndex: "year_release",
                        key: "year_release",
                        render: (text) => (
                          <span>{moment(text).format("YYYY")}</span> // Упрощенное отображение года
                        ),
                      },
                      {
                        title: "Организация",
                        dataIndex: "organization",
                        key: "organization",
                      },
                      {
                        title: "Тип транспорта",
                        dataIndex: "vehicle_type",
                        key: "vehicle_type",
                      },
                      {
                        title: "Тип двигателя",
                        dataIndex: "engine_type",
                        key: "engine_type",
                      },
                      {
                        dataIndex: "",
                        key: "actions",
                        width: 250,
                        align: "center",
                        render: (text, record) => (
                          <>
                            <Button
                              size="middle"
                              onClick={() =>
                                navigateToEditCar(record.id_transport)
                              }
                              style={{
                                marginRight: "8px",
                                backgroundColor: "#4a90e2", // Синий цвет
                                borderColor: "#4a90e2",
                                color: "#fff",
                              }}
                            >
                              Изменить
                            </Button>
                            <Button
                              size="middle"
                              onClick={() =>
                                handleDelete(
                                  record.id_transport,
                                  record.organization_id
                                )
                              }
                              style={{
                                backgroundColor: "#007bff", // Темно-синий цвет
                                borderColor: "#007bff",
                                color: "#fff",
                              }}
                            >
                              Переместить в архив
                            </Button>
                          </>
                        ),
                      },
                    ]}
                    pagination={false}
                    dataSource={cars}
                    bordered
                    rowKey={(record) => record.id_transport}
                    style={{
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "#F7F9FB",
                    }}
                  />
                  <Row justify="end" style={{ marginTop: "30px" }}>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#007bff", // Основной синий цвет
                        borderColor: "#007bff",
                        color: "#fff",
                      }}
                      onClick={navigateToNewCar}
                    >
                      Добавить авто
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Tabs.TabPane>
            <Tabs.TabPane key="Organization" tab="Организации">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Table
                    columns={[
                      {
                        title: "Название организации",
                        dataIndex: "organization_name",
                        key: "organization_name",
                        render: (text, record) => (
                          <a
                            onClick={() =>
                              handleRedirectAndSaveOrganizationId(
                                record.organization_id
                              )
                            }
                            style={{ color: "#1890ff", fontWeight: "500" }}
                          >
                            {text}
                          </a>
                        ),
                      },
                      {
                        title: "Номер телефона",
                        dataIndex: "contact_info",
                        key: "contact_info",
                      },
                      {
                        title: "Контактное лицо",
                        dataIndex: "contact_person",
                        key: "contact_person",
                      },
                      {
                        title: "Адрес",
                        dataIndex: "organization_address",
                        key: "organization_address",
                      },
                      {
                        title: "Электронная почта",
                        dataIndex: "email",
                        key: "email",
                      },
                      {
                        title: "Дата регистрации",
                        dataIndex: "registration_date",
                        key: "registration_date",
                        render: (text) => (
                          <span>{moment(text).format("YYYY-MM-DD")}</span>
                        ),
                      },
                      {
                        dataIndex: "",
                        key: "actions",
                        width: 150,
                        align: "center",
                        render: (text, record) => (
                          <Button
                            size="middle"
                            onClick={() =>
                              handleDeleteOrganization(record.organization_id)
                            }
                            style={{
                              backgroundColor: "#007bff", // Темно-синий цвет
                              borderColor: "#007bff",
                              color: "#fff",
                            }}
                          >
                             Переместить в архив
                          </Button>
                        ),
                      },
                    ]}
                    pagination={false}
                    dataSource={organization}
                    bordered
                    rowKey={(record) => record.organization_id}
                    style={{
                    
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "#F7F9FB",
                    }}
                  />
                  <Row justify="end" style={{ marginTop: "30px" }}>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#007bff", // Основной синий цвет
                        borderColor: "#007bff",
                        color: "#fff",
                      }}
                      onClick={navigateToNewOrganization}
                    >
                      Создать организацию
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>

      <Modal
        title="Подтверждение архивирования"
        visible={deleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Переместить в архив"
        cancelText="Отменить"
        style={{ borderRadius: "8px" }} // Добавим стиль к модальному окну
      >
        <p>Вы уверены, что хотите переместить транспорт в архив?</p>
      </Modal>
    </div>
  );
};

export default ManufacturerTransportList;
