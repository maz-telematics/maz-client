// src/pages/ReportsPage/ReportsPage.tsx
import React, { useEffect, useState } from 'react';
import { Table, Card, DatePicker, Select, Button } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import DetailView from './DetailView'; // Импортируем новый компонент

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
    // Заглушка данных
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
    // Логика фильтрации
    setFilteredTransportReports(transportReports);
    setFilteredOrganizationReports(organizationReports);
  };

  // Определяем колонки для таблиц
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
    <div style={containerStyle}>
      <h1 style={headerStyle}>Отчеты</h1>

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
            onClick: () => showDetail(record), // Показать детальный вид при клике
          })}
        />
      </Card>

      <Card title="Отчеты по организациям" style={cardStyle}>
        <Table
          dataSource={filteredOrganizationReports.length > 0 ? filteredOrganizationReports : organizationReports}
          columns={organizationColumns}
          rowKey="id"
          onRow={record => ({
            onClick: () => showDetail(record), // Показать детальный вид при клике
          })}
        />
      </Card>

      {/* Показываем детальный вид */}
      {isDetailVisible && (
        <DetailView
          title={selectedDetail?.name || 'Детали'}
          data={selectedDetail}
          onClose={() => setIsDetailVisible(false)}
        />
      )}
    </div>
  );
};

// Стили для компонентов
const containerStyle: React.CSSProperties = {
//   padding: '20px',
  width:'100%',
//   height:'100vh',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
justifyContent:'center',
padding: '20px',
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
};

const headerStyle: React.CSSProperties = {
        fontSize: '2rem',
        color: '#1e40af',
        marginBottom: '2rem',
};

const cardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '800px',
  marginBottom: '20px',
};

const filterContainerStyle: React.CSSProperties = {
  display: 'flex',
  marginBottom: '20px',
};

export default ReportsPage;
