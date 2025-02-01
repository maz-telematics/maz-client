

import { useState, useEffect } from "react";
import { Table, Modal, Button, Row, Col, message, Input, Progress, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { Organization } from "../../types/transportListTypes";
import moment from "moment";
import axiosInstance from "../../services/axiosInstance";
import DownloadButton from "../../Components/DownloadButton";
import DownloadIcon from "@mui/icons-material/Download";
import { User } from "./TransportsPage";

interface OrganizationsPageProps {
  extraControls?: React.ReactNode; 
  extraActions?: (record: Organization) => React.ReactNode;
}

const OrganizationsPage: React.FC<OrganizationsPageProps> = ({ extraControls, extraActions }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Размер страницы
  const [totalCount, setTotalCount] = useState(0); // Общее количество записей

  const navigate = useNavigate();



  // Получение данных с учетом пагинации
  const fetchOrganizations = async (page: number) => {
    try {
      const response = await axiosInstance.get<{
        organizations: Organization[];
        total: number;
      }>("/organizations/list", {
        params: { page, size: pageSize },
      });
      setOrganizations(response.data);
      setTotalCount(response.data.total);
    } catch (error) {
      console.error(error);
      message.error("Ошибка загрузки организаций.");
    }
  };

  useEffect(() => {
    fetchOrganizations(currentPage);
  }, [currentPage]);

  const handleRedirectAndSaveOrganizationId = async (id: number) => {
    await sessionStorage.setItem("organization_id", String(id));
     const storedUser = localStorage.getItem("user");
            const user: User | null = storedUser ? JSON.parse(storedUser) : null;
            const basePath = user?.role === "ROLE_ADMIN" ? "/admin/organization" : "/master/organization";
    navigate(basePath);
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
       <Row style={{ padding: isMobile ? "0 20px" : "0 40px" }}>
        <Col xs={24}>
          <Row justify="space-between" style={{ marginBottom: 16, alignItems: "flex-end" }}>
            <Col>
              <h1 style={{ margin: 0, fontSize: window.innerWidth < 768 ? "24px" : "32px" }}>
                Организации
              </h1>
            </Col>
            <Col>
              <Row align="middle" wrap={false} style={{ gap: "10px",  }}>
              {extraControls}
                  <DownloadButton
                url="/api/organizations/download"
                filename="transports.pdf"
                buttonText={!isMobile ? "Скачать таблицу" : ""}
                icon={<DownloadIcon style={{ fontSize: 18, color: 'white' }} />}
                buttonProps={{ className: 'download-btn' }}
              />
        
              </Row>
            </Col>
          </Row>
          <Table
            components={{
              header: {
                cell: (props: any) => (
                  <th
                    {...props}
                    style={{
                      backgroundColor: "#1B232A",
                      color: "#fff",
                      border: "none",
                    }}
                  >
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
              ...(extraActions ? [{ title: "Действия", key: "actions", render: (_: any, record: Organization) => extraActions(record) }] : []),
            
            ]}
            pagination={false}
            dataSource={organizations}
            bordered
            rowKey={(record) => record.id}
            style={{
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#F7F9FB",
            }}
            scroll={{ x: "max-content" }}
          />
          <div
  style={{
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
    paddingBottom: "16px",
  }}
>
{totalCount > pageSize && (
          <Pagination
            current={currentPage}
            total={totalCount}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
            style={{ marginTop: 16, textAlign: "right" }}
          />
        )}</div>
        </Col>
      </Row>

    
    </div>
  );
};

export default OrganizationsPage;

