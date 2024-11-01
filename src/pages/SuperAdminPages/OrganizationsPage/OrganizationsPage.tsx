import { useState, useEffect } from "react";
import { Table, Tabs, Modal, Button, Row, Col, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Organization } from "../../../types/transportListTypes";
import moment from "moment";

const apiUrl = import.meta.env.VITE_API_URL;
const OrganizationsPage = () => {
  const [organization, setOrganizations] = useState<Organization[]>([]);
  const user = localStorage.getItem("user");
  let userId: number;
  let role: string | null = null;
  if (user) {
    const userData = JSON.parse(user);
    userId = userData.id;
    role = userData.role;
  }


  const navigateToNewOrganization = () => {
    navigate("/new-organization");
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
    fetchOrganizatios();
  }, []);

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
    </div>
  );
};

export default OrganizationsPage;
