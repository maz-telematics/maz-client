import { useState, useEffect } from "react";
import { Table, Modal, Button, Row, Col, message, Input,Progress } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { Organization } from "../../../types/transportListTypes";
import moment from "moment";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import axiosInstance from '../../../services/axiosInstance';
import DownloadButton from "../../../Components/DownloadButton";
import DownloadIcon from '@mui/icons-material/Download';

const OrganizationsPage = () => {
  const [organization, setOrganizations] = useState<Organization[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [updatedOrganization, setUpdatedOrganization] = useState<Organization | null>(null);
  const user = localStorage.getItem("user");
  let userId: number;
  let role: string | null = null;
  if (user) {
    const userData = JSON.parse(user);
    userId = userData.id;
    role = userData.role;
  }

  const navigate = useNavigate();

  const navigateToNewOrganization = () => {
    navigate("/master/create-organization");
  };

  const fetchOrganizatios = async () => {
    try {
      const response = await axiosInstance.get('/organizations/list');
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
    navigate("/master/organization");
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
          const response = await axiosInstance.delete(`/organizations/${idOrganization}`);
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
  const handleEditOrganization = (organization: Organization) => {
    setCurrentOrganization(organization);
    setUpdatedOrganization({ ...organization });
    setIsModalVisible(true);
  };

  const handleSaveChanges = async () => {
    if (updatedOrganization) {
      try {
        // Используем PATCH для частичного обновления данных
        const response = await axiosInstance.patch(`/organizations/${updatedOrganization.id}`, updatedOrganization);
        if (response.status === 200) {
          message.success("Данные организации успешно обновлены!");
          setIsModalVisible(false);
          fetchOrganizatios();  // Обновляем список организаций после изменения
        }
      } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
        message.error("Не удалось обновить данные организации.");
      }
    }
  };

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
              >Организации</h1>
            </Col>
            <Col>
            
              <Row align="middle" wrap={false} style={{ gap: "10px",  }}>
                <DownloadButton
                  url="/api/organizations/download"
                  filename="organizations.pdf"
                  buttonText="Скачать"
                  icon={<DownloadIcon style={{ fontSize: 18, color: "white" }} />}
                  buttonProps={{
                    className: "add-transport-btn", // Общий класс для стиля
                  }}
                />
                <Button
                  type="primary"
                  onClick={navigateToNewOrganization}
                  icon={<LibraryAddOutlinedIcon />}
                  className="add-transport-btn" // Общий класс для стиля
                >
                  {!isMobile && "Создать организацию"}
                </Button>


              </Row>
            </Col>
          </Row>
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
                title: "Название организации",
                dataIndex: "organizationName",
                key: "organizationName",
                render: (text, record) => (
                  <a
                    onClick={() =>
                      handleRedirectAndSaveOrganizationId(record.id)
                    }
                    style={{
                      color: "red",
                      fontWeight: "500",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
                  >
                    {text}
                  </a>
                ),
              },
              
              
              {
                title: "Контактное лицо",
                dataIndex: "contactPerson",
                key: "contactPerson",
              },
              {
                title: "Номер телефона",
                dataIndex: "contactInfo",
                key: "contactInfo",
              },
              {
                title: "Электронная почта",
                dataIndex: "emailContactPerson",
                key: "emailContactPerson",
              },
              {
                title: "Адрес",
                dataIndex: "organizationAddress",
                key: "organizationAddress",
              },
   
              {
                title: "Дата регистрации",
                dataIndex: "registrationDate",
                key: "registrationDate",
                render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
              },
              {
                title: "Договор",
                dataIndex: "contractFile",
                key: "contractFile",
                render: (text) => (
                  <>
                    <a
                      href={text}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "red", textDecoration: "none" }}
                      onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                      onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
                    >
                      Открыть
                    </a>
              
                    <span style={{ margin: "0 8px" }}>|</span>
                    <a
                      href={text}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      style={{ color: "red", textDecoration: "none" }}
                      onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                      onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
                    >
                      Скачать
                    </a>
                  </>
                ),
              },
              
             
              
              
              {
                title: "Тип подписки",
                dataIndex: "subscriptionType",
                key: "subscriptionType",
              },
              {
                title: "Статус подписки",
                dataIndex: "subscription_status",
                key: "subscription_status",
                render: (text) => <Progress percent={text} status="active" strokeColor="red" />,
              },
              {
                dataIndex: "actions",
                key: "actions",
                width: 150,
                align: "center",
                render: (text, record) => (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Button
                      style={{
                        backgroundColor: "#1B232A",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        // border: "1px solid red",
                        transition: "all 0.3s ease", // Добавляет плавный переход
                      }}
                      size="middle"
                      onClick={() => handleEditOrganization(record)}
                      icon={<EditOutlinedIcon />}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "red"; // Красный фон
                        e.currentTarget.style.borderColor = "red";     // Красный бордер
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "#1B232A"; // Исходный фон
                        e.currentTarget.style.borderColor = "#1B232A";         // Исходный бордер
                      }}
                    >
                      Изменить
                    </Button>
                    {/* <Button
                      style={{
                        backgroundColor: "#1B232A",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid red",
                      }}
                      size="middle"
                      onClick={() => handleEditOrganization(record)}
                      icon={<EditOutlinedIcon />}
                      className="edit-button"
                      
                    >
                      
                      Изменить
                    </Button> */}

                  <Button
                    disabled={true}
                    size="middle"
                    onClick={() => handleDeleteOrganization(record.id)}
                    style={{
                      backgroundColor: "#1B232A",
                      color: "#fff",
                    }}
                    icon={<ArchiveOutlinedIcon />}
                  >
                    Переместить в архив
                  </Button>
                </div>
                ),
              },
            ]}
            pagination={false}
            dataSource={organization}
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
        </Col>
      </Row>

      {/* Modal для редактирования данных организации */}
      <Modal
        title="Изменить организацию"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSaveChanges}
      >
        {updatedOrganization && (
          <>
            <div style={{ marginBottom: 16 }}>
              <label>Название организации</label>
              <Input
                value={updatedOrganization.organization_name}
                onChange={(e) => setUpdatedOrganization({ ...updatedOrganization, organization_name: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Номер телефона</label>
              <Input
                value={updatedOrganization.contact_info}
                onChange={(e) => setUpdatedOrganization({ ...updatedOrganization, contact_info: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Контактное лицо</label>
              <Input
                value={updatedOrganization.contact_person}
                onChange={(e) => setUpdatedOrganization({ ...updatedOrganization, contact_person: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Адрес</label>
              <Input
                value={updatedOrganization.organization_address}
                onChange={(e) => setUpdatedOrganization({ ...updatedOrganization, organization_address: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Электронная почта</label>
              <Input
                value={updatedOrganization.email_contact_person}
                onChange={(e) => setUpdatedOrganization({ ...updatedOrganization, email_contact_person: e.target.value })}
              />
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default OrganizationsPage;
