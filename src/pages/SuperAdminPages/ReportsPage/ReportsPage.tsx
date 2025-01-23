
import React, { useEffect, useState } from 'react';
import { Table, Card, DatePicker, Row, Col, Select, Button } from 'antd';
import { Dayjs } from 'dayjs';
import DetailView from './DetailView'; 
import DownloadButton from '../../../Components/DownloadButton';
import DownloadIcon from '@mui/icons-material/Download';

const ReportsPage: React.FC = () => {
  const [transportReports, setTransportReports] = useState<any[]>([]);
  const [organizationReports, setOrganizationReports] = useState<any[]>([]);
  const [filteredTransportReports, setFilteredTransportReports] = useState<any[]>([]);
  const [filteredOrganizationReports, setFilteredOrganizationReports] = useState<any[]>([]);

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTransport, setSelectedTransport] = useState<number | null>(null);
  const [selectedOrganization, setSelectedOrganization] = useState<number | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<any | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  useEffect(() => {
    const fetchTransportReports = () => {
      setTransportReports([
        { id: 1, name: 'Транспорт 1', status: 'Активен', errors: 1, location: 'Москва', route: 'Маршрут 1', speed: 60 },
        { id: 2, name: 'Транспорт 2', status: 'Неактивен', errors: 0, location: 'Санкт-Петербург', route: 'Маршрут 2', speed: 0 },
        { id: 3, name: 'Транспорт 3', status: 'Активен', errors: 2, location: 'Казань', route: 'Маршрут 3', speed: 55 },
      ]);
    };

    const fetchOrganizationReports = () => {
      setOrganizationReports([
        { id: 1, name: 'Организация 1', status: 'Активна', activeTransports: 5, inactiveTransports: 2 },
        { id: 2, name: 'Организация 2', status: 'Неактивна', activeTransports: 0, inactiveTransports: 1 },
        { id: 3, name: 'Организация 3', status: 'Активна', activeTransports: 10, inactiveTransports: 3 },
      ]);
    };

    fetchTransportReports();
    fetchOrganizationReports();
  }, []);

  const showDetail = (data: any) => {
    setSelectedDetail(data);
    setIsDetailVisible(true);
  };

  const handleFilter = () => {
    setFilteredTransportReports(transportReports);
    setFilteredOrganizationReports(organizationReports);
  };

  const organizationColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Название', dataIndex: 'name', key: 'name' },
    { title: 'Статус', dataIndex: 'status', key: 'status' },
    { title: 'Активные ТС', dataIndex: 'activeTransports', key: 'activeTransports' },
    { title: 'Неактивные ТС', dataIndex: 'inactiveTransports', key: 'inactiveTransports' },
  ];

  const transportColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Название', dataIndex: 'name', key: 'name' },
    { title: 'Статус', dataIndex: 'status', key: 'status' },
    { title: 'Количество ошибок', dataIndex: 'errors', key: 'errors' },
    { title: 'Местоположение', dataIndex: 'location', key: 'location' },
    { title: 'Маршрут', dataIndex: 'route', key: 'route' },
    { title: 'Скорость (км/ч)', dataIndex: 'speed', key: 'speed' },
  ];
  const isMobile = window.innerWidth < 768;

  
  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#E1E1E1",
    }}>
      <Row style={{
       padding: "0 40px",
        flex: "1",
      }}>
        <Col xs={24} >
          <Row justify="start" align="middle" style={{ marginBottom: 16 }}>
            <Col>
              <h1
          style={{
            margin: 0,
            fontSize: isMobile ? '24px' : '32px', 
          }}
        >Отчеты</h1>
            </Col>
          </Row>
          <div style={filterContainerStyle}>
      <DatePicker
        onChange={date => setSelectedDate(date)}
        style={{ width: '200px', minWidth: '150px' }} // Ширина с минимальным значением
      />
      <Select
        placeholder="Выберите транспорт"
        style={{ width: '200px', minWidth: '150px' }}
        onChange={value => setSelectedTransport(value)}
      >
        {transportReports.map(report => (
          <Select.Option key={report.id} value={report.id}>
            {report.name}
          </Select.Option>
        ))}
      </Select>
            <Select
              placeholder="Выберите организацию"
              style={{ width: '200px', minWidth: '150px' }}
              onChange={value => setSelectedOrganization(value)}
            >
              {organizationReports.map(report => (
                <Select.Option key={report.id} value={report.id}>
                  {report.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Col>
              <Row align="middle" justify="space-between" wrap={false} style={{ gap: "16px" }}>
                <h3 style={{ marginBottom: "15px", fontSize: isMobile ? "18px" : "24px" }}>
                  Отчеты по транспорту
                </h3>
                <DownloadButton
                  url="/api/transports_report/download"
                  filename="transports_report.pdf"
                  buttonText="Скачать отчёт"
                  icon={<DownloadIcon style={{ fontSize: 18, color: "white" }} />}
                  buttonProps={{
                    style: {
                      border: "none", // Убираем рамку
                      outline: "none", // Убираем обводку при фокусе
                      cursor: "pointer", // Курсор в виде указателя
                      backgroundColor: "#1B232A", // Исходный фон
                      color: "#fff", // Цвет текста
                      transition: "all 0.3s ease", // Плавный переход
                    },
                    onMouseOver: (e) => {
                      e.currentTarget.style.backgroundColor = "red"; // Красный фон при наведении
                    },
                    onMouseOut: (e) => {
                      e.currentTarget.style.backgroundColor = "#1B232A"; // Исходный фон при убирании мыши
                    },
                  }}
                />

              </Row>
            </Col>
            <Table
              dataSource={filteredTransportReports.length > 0 ? filteredTransportReports : transportReports}
              columns={transportColumns}
              rowKey="id"
              onRow={record => ({
                onClick: () => showDetail(record),
              })}
              components={{
                header: {
                  cell: (props: any) => (
                    <th {...props} style={{ backgroundColor: "#1B232A", color: "#fff", border: "none" }}>
                      {props.children}
                    </th>
                  ),
                },
              }}
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#F7F9FB",
              }}
              scroll={{ x: 'max-content' }}
              pagination={false}
            />
          </div>

          <div >
            <Col>
              <Row align="middle" justify="space-between" wrap={false} style={{ gap: "16px" }}>
                <h3 style={{ marginBottom: "15px", fontSize: isMobile ? "18px" : "24px" }}>
                  Отчеты по организациям
                </h3>
                <DownloadButton
                  url="/api/organizations_report/download"
                  filename="organizations_report.pdf"
                  buttonText="Скачать отчёт"
                  icon={<DownloadIcon style={{ fontSize: 18, color: "white" }} />}
                  buttonProps={{
                    style: {
                      border: "none", // Убираем рамку
                      outline: "none", // Убираем обводку при фокусе
                      cursor: "pointer", // Курсор в виде указателя
                      backgroundColor: "#1B232A", // Исходный фон
                      color: "#fff", // Цвет текста
                      transition: "all 0.3s ease", // Плавный переход
                    },
                    onMouseOver: (e) => {
                      e.currentTarget.style.backgroundColor = "red"; // Красный фон при наведении
                    },
                    onMouseOut: (e) => {
                      e.currentTarget.style.backgroundColor = "#1B232A"; // Исходный фон при убирании мыши
                    },
                  }}
                />

  </Row>
</Col>
  <Table
    dataSource={filteredOrganizationReports.length > 0 ? filteredOrganizationReports : organizationReports}
    columns={organizationColumns}
    rowKey="id"
    onRow={record => ({
      onClick: () => showDetail(record),
    })}
    components={{
      header: {
        cell: (props: any) => (
          <th {...props} style={{ backgroundColor: "#1B232A", color: "#fff", border: "none" }}>
            {props.children}
          </th>
        ),
      },
    }}
    style={{
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#F7F9FB",
    }}
    scroll={{ x: 'max-content' }}
    pagination={false}
  />
</div>

          {isDetailVisible && (
            <DetailView
              title={selectedDetail?.name || 'Детали'}
              data={selectedDetail}
              onClose={() => setIsDetailVisible(false)}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

const filterContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap', // Чтобы элементы переносились на мобильных экранах
  gap: '10px', // Пробел между элементами
  marginBottom: '20px',
};

export default ReportsPage;
