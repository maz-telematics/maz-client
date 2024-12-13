
import React, { useEffect, useState } from 'react';
import { Table, Card, DatePicker, Row, Col, Select, Button } from 'antd';
import { Dayjs } from 'dayjs';
import DetailView from '../../SuperAdminPages/ReportsPage/DetailView';

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

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      minHeight: '100vh',
      backgroundColor: "#F0F4F8",
    }}>
      <Row style={{
        margin: "30px 40px 30px 40px",
        flex: "1",
      }}>
        <Col xs={24} >
          <Row justify="start" align="middle" style={{ marginBottom: 16 }}>
            <Col>
              <h1 style={{ margin: 0, color: '#1e40af' }}>Отчеты</h1>
            </Col>
          </Row>
          <div style={filterContainerStyle}>


            <DatePicker onChange={date => setSelectedDate(date)} />
            <Select placeholder="Выберите транспорт" style={{ width: 200, margin: '0 10px' }} onChange={value => setSelectedTransport(value)}>
              {transportReports.map(report => (
                <Select.Option key={report.id} value={report.id}>
                  {report.name}
                </Select.Option>
              ))}
            </Select>
            <Select placeholder="Выберите организацию" style={{ width: 200, margin: '0 10px' }} onChange={value => setSelectedOrganization(value)}>
              {organizationReports.map(report => (
                <Select.Option key={report.id} value={report.id}>
                  {report.name}
                </Select.Option>
              ))}
            </Select>
            <Button type="primary" onClick={handleFilter}>Фильтровать</Button>
          </div>

          <Card title="Отчеты по транспорту" style={cardStyle}>
            <Table
              dataSource={filteredTransportReports.length > 0 ? filteredTransportReports : transportReports}
              columns={transportColumns}
              rowKey="id"
              onRow={record => ({
                onClick: () => showDetail(record),
              })}
            />
          </Card>

          <Card title="Отчеты по организациям" style={cardStyle}>
            <Table
              dataSource={filteredOrganizationReports.length > 0 ? filteredOrganizationReports : organizationReports}
              columns={organizationColumns}
              rowKey="id"
              onRow={record => ({
                onClick: () => showDetail(record),
              })}
            />
          </Card>

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

const cardStyle: React.CSSProperties = {
  width: '100%',
  marginBottom: '20px',
};

const filterContainerStyle: React.CSSProperties = {
  display: 'flex',
  marginBottom: '20px',
};

export default ReportsPage;
