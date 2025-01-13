import { useState, useEffect } from "react";
import { Table, Modal, Button, Row, Col, message, Progress } from "antd";
import { useNavigate } from "react-router-dom";
import { Organization } from "../../../types/transportListTypes";
import moment from "moment";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import axiosInstance from '../../../services/axiosInstance';

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

  const isMobile = window.innerWidth < 768;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", backgroundColor: "#E1E1E1" }}>
      <Row style={{ padding: "0 40px" }}>
        <Col xs={24}>
          <Row justify="space-between" style={{ marginBottom: 16, alignItems: 'flex-end' }}>
            <Col>
              <h1 style={{ margin: 0, fontSize: isMobile ? '24px' : '32px' }}>Организации</h1>
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={navigateToNewOrganization}
                icon={<LibraryAddOutlinedIcon />}
                style={{ backgroundColor: "#3A5F73" }}
              >
                {!isMobile && 'Создать организацию'}
              </Button>
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
                  <a onClick={() => handleRedirectAndSaveOrganizationId(record.id)} style={{ color: "#1890ff", fontWeight: "500" }}>
                    {text}
                  </a>
                ),
              },
              {
                title: "Адрес",
                dataIndex: "organizationAddress",
                key: "organizationAddress",
              },
              {
                title: "Электронная почта",
                dataIndex: "emailContactPerson",
                key: "emailContactPerson",
              },
              {
                title: "Номер телефона",
                dataIndex: "contactInfo",
                key: "contactInfo",
              },
              {
                title: "Контактное лицо",
                dataIndex: "contactPerson",
                key: "contactPerson",
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
                    <a href={text} target="_blank" rel="noopener noreferrer">
                      Открыть
                    </a>
                    
                    <span style={{ margin: "0 8px" }}>|</span>
                    <a href={text} target="_blank" rel="noopener noreferrer" download>
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
                render: (text) => <Progress percent={text} status="active" strokeColor="#3A5F73" />,
              },
              {
                dataIndex: "actions",
                key: "actions",
                width: 150,
                align: "center",
                render: (text, record) => (
                  <Button
                    disabled={true}
                    size="middle"
                    onClick={() => handleDeleteOrganization(record.id)}
                    style={{ backgroundColor: "#3A5F73", color: "#fff", display: "flex", alignItems: "center" }}
                    icon={<ArchiveOutlinedIcon />}
                  >
                    Переместить в архив
                  </Button>
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
    </div>
  );
};

export default OrganizationsPage;
