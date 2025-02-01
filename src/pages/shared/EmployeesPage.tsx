import { useState, useEffect } from "react";
import { Table, Modal, Button, Row, Col, message, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { Car } from "../../types/transportListTypes";
import axiosInstance from "../../services/axiosInstance";
import DownloadButton from "../../Components/DownloadButton";
import DownloadIcon from '@mui/icons-material/Download';
import moment from "moment";

interface Employee {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    workplace: string;
    status: "active" | "blocked";
}

interface EmployeesPageProps {
  extraControls?: React.ReactNode;
  extraActions?: (record: Car) => React.ReactNode;
}

const EmployeesPage: React.FC<EmployeesPageProps> = ({ extraControls, extraActions }) => {
 const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axiosInstance.get("/employees");
            setEmployees(response.data);
        } catch (error) {
            message.error("Ошибка загрузки сотрудников");
        }
    };

  const columns = [
    {
        title: "Имя",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Телефон",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },

    {
        title: "Роль",
        dataIndex: "role",
        key: "role",
    },
    {
        title: "Место работы",
        dataIndex: "workplace",
        key: "workplace",
    },
    {
      title: "Должность",
      dataIndex: "position",
      key: "position",
  },
    // {
    //     title: "Статус",
    //     dataIndex: "status",
    //     key: "status",
    //     render: (status: string) =>
    //         status === "active" ? "Активен" : "Заблокирован",
    // },
    ...(extraActions ? [{ title: "Действия", key: "actions", render: (_: any, record: Employee) => extraActions(record) }] : []),
  ];
  const isMobile = window.innerWidth < 768;
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
                >Сотрудники</h1>
            </Col>
            <Col><Row align="middle" wrap={false} style={{ gap: "16px" }}>
              {extraControls}
                <DownloadButton
                url="/api/employees/download"
                filename="transports.pdf"
                buttonText={!isMobile ? "Скачать таблицу" : ""}
                icon={<DownloadIcon style={{ fontSize: 18, color: 'white' }} />}
                buttonProps={{ className: 'download-btn' }}
              />
            </Row></Col>
          </Row>
          <Table
            columns={columns}
            dataSource={employees}
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
      {/* <div
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
            onChange={(page) => fetchCars(page, pageSize)}
          />
        )}
      </div> */}
    </div>
  );
};

export default EmployeesPage;
