import { useState, useEffect } from "react";
import { Table, Modal, Button, Row, Col, message,Typography, Pagination, Spin, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { Car } from "../../Store/apis/transportApi";
import axiosInstance from "../../services/axiosInstance";
import DownloadButton from "../../Components/DownloadButton";
import DownloadIcon from '@mui/icons-material/Download';
import moment from "moment";
import { useGetCarsQuery } from "../../Store/apis/transportApi";
import { CarOutlined } from '@ant-design/icons';
const { Title, Paragraph  } = Typography;
interface TransportsPageProps {
  extraControls?: React.ReactNode;
  extraActions?: (record: Car) => React.ReactNode;
}

export interface User {
  role: "ROLE_ADMIN" | "ROLE_SUPERADMIN" | "ROLE_DIRECTOR";
  name:string
}

const TransportsPage: React.FC<TransportsPageProps> = ({ extraControls, extraActions }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetCarsQuery({ page: currentPage, size: pageSize });

  const cars: readonly Car[] = data || [];

  useEffect(() => {
    if (error) {
      message.error("Ошибка загрузки данных транспорта.");
    }
    console.log("Fetched Cars Data:", data);
  }, [error, data]);
  
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />  
      </div>
    );
  }
  
  if (!cars.length) {
    return <Row justify="center" align="middle" >
    <Col>
      <Empty
        image={<CarOutlined style={{ fontSize: '80px', color: '#1890ff', animation: 'pulse 2s infinite' }} />}
        description={
          <div style={{ textAlign: 'center', padding: '20px', borderRadius: '10px', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Title level={3} style={{ color: '#1890ff', fontWeight: 'bold' }}>
              Транспорт пока не подключен к вашей организации
            </Title>
            <Paragraph style={{ fontSize: '16px', color: '#888' }}>
              Для добавления транспорта, пожалуйста, обратитесь в техническую поддержку.
            </Paragraph>
            <Paragraph style={{ fontSize: '16px', color: '#888' }}>
            <strong>Телефон поддержки:</strong> +375 (29) 311-88-78
            </Paragraph>
            <Paragraph style={{ fontSize: '16px', color: '#888' }}>
              <strong>Электронная почта:</strong> maztelematics@gmail.com
            </Paragraph>
          </div>
        }
      />
    </Col>
  </Row>
  }

  const columns = [
    {
      title: "Модель",
      dataIndex: "model",
      key: "model",
      render: (model: string, record: Car) => {
        const storedUser = localStorage.getItem("user");
        const user: User | null = storedUser ? JSON.parse(storedUser) : null;
        const basePath = user?.role === "ROLE_ADMIN" ? "/admin/transport" : "/master/transport";
        return (
          <a
            onClick={() => {
              sessionStorage.setItem("id", record.id);
              navigate(`${basePath}?id=${record.id}`);
            }}
            style={{ color: "red", fontWeight: 500 }}
          >
            {model}
          </a>
        );
      },
    },
    { title: "VIN номер", dataIndex: "id", key: "id" },
    { title: "Регистрационный номер", dataIndex: "reg_number", key: "reg_number" },
    { title: "Состояние", dataIndex: "connectionStatus", key: "connectionStatus", render: (status: boolean) => (status ? "Связь есть" : "Нет связи") },
    { title: "Тип транспорта", dataIndex: "vehicleType", key: "vehicleType" },
    { title: "Тип двигателя", dataIndex: "engineType", key: "engineType" },
    { title: "Год выпуска", dataIndex: "yearRelease", key: "yearRelease", render: (yearRelease: string) => moment(yearRelease).format("YYYY-MM-DD") },
    { title: "Организация", dataIndex: "organizationName", key: "organizationName" },
    { title: "Блок телематики", dataIndex: "blockType", key: "blockType" },
    ...(extraActions ? [{ title: "Действия", key: "actions", render: (_: any, record: Car) => extraActions(record) }] : []),
  ];

  const isMobile = window.innerWidth < 768;

  if (isLoading) {
    return <div>Loading...</div>;  // Пока данные загружаются, показываем индикатор
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", backgroundColor: "#E1E1E1" }}>
      <Row style={{ padding: isMobile ? "0 20px" : "0 40px" }}>
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
                {extraControls}
                <DownloadButton
                  url="/api/transports/download"
                  filename="transports.pdf"
                  buttonText={!isMobile ? "Скачать таблицу" : ""}
                  icon={<DownloadIcon style={{ fontSize: 18, color: 'white' }} />}
                  buttonProps={{ className: 'download-btn' }}
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
          paddingBottom: "16px",
        }}
      >
        {/* {totalCount > pageSize && (
          <Pagination
            current={currentPage}
            total={totalCount}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}  // Обновляем текущую страницу
          />
        )} */}
      </div>
    </div>
  );
};

export default TransportsPage;