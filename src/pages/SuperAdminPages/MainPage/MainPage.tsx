import React from 'react';
import { Row, Col, Progress } from 'antd';

const MainPage: React.FC = () => {
  const transportData = {
    totalVehicles: 60,
    totalVehiclesMoving: 40,
    totalVehiclesStopped: 15,
    totalVehiclesMaintenance: 5,
    trucks: 30,
    buses: 15,
    otherVehicles: 5,
    avgDelay: "12 минут",
    activeRoutes: 25,
    completedRoutes: 20,
    totalUsers: 100,
    admins: 5,
    operators: 20,
    organizations: 20,
  };

  const criticalInfo = [
    "Обнаружены проблемы с транспортом #23: ошибка датчика температуры.",
    "Организация 'Transport Company A' не активна с 2024-10-01.",
    "Проблемы с маршрутом #12: задержка на 30 минут.",
  ];

  return (
    <div style={containerStyle}>
      <Row>
        <Col xs={24}>
          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Общая информация</h2>
            <div style={cardsContainerStyle}>
              <Card title="Общее количество транспорта" value={transportData.totalVehicles.toString()} />
              <Card title="Грузовики" value={transportData.trucks.toString()} />
              <Card title="Автобусы" value={transportData.buses.toString()} />
              <Card title="Тягачи" value={transportData.otherVehicles.toString()} />
              <Card title="Организации" value={transportData.organizations.toString()} />
              <Card
                title="Пользователи"
                value={`${transportData.totalUsers} (Администраторы: ${transportData.admins}, Операторы: ${transportData.operators})`}
              />
            </div>
          </section>
          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Текущий статус транспорта</h2>
            <div style={statusContainerStyle}>
              <StatusCard title="Транспорт в движении" value={transportData.totalVehiclesMoving} color="#3498db" />
              <StatusCard title="Транспорт на остановке" value={transportData.totalVehiclesStopped} color="#e74c3c" />
              <StatusCard title="Транспорт на ремонте" value={transportData.totalVehiclesMaintenance} color="#f39c12" />
            </div>
          </section>
          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Критическая информация</h2>
            {criticalInfo.map((info, index) => (
              <p key={index} style={infoTextStyle}>
                {info}
              </p>
            ))}
          </section>
        </Col>
      </Row>
    </div>
  );
};

const Card: React.FC<{ title: string; value: string }> = ({ title, value }) => {
  return (
    <div style={cardStyle}>
      <h3 style={cardTitleStyle}>{title}</h3>
      <p style={cardValueStyle}>{value}</p>
    </div>
  );
};

const StatusCard: React.FC<{ title: string; value: number; color: string }> = ({ title, value, color }) => {
  return (
    <div style={{ ...statusCardStyle, borderLeft: `5px solid ${color}` }}>
      <h3 style={statusCardTitleStyle}>{title}</h3>
      <Progress percent={(value / 60) * 100} status="active" strokeColor={color} showInfo={false} />
      <p style={statusCardValueStyle}>{`${value} транспортных средств`}</p>
    </div>
  );
};
const isMobile = window.innerWidth < 768;
const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: '#E1E1E1',
  margin: 0,
  padding: '0 20px',
};

const cardsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '20px',
  marginBottom: '20px',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  padding: '15px',
  textAlign: 'center',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  flex: '1 1 calc(50% - 20px)',
  minWidth: '200px',
  maxWidth: '250px',
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
};

const cardValueStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  color: '#3498db',
};

const statusContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '20px',
  marginTop: '20px',
};

const statusCardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: '15px',
  textAlign: 'center',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  flex: '1 1 calc(50% - 20px)',
  minWidth: '200px',
  maxWidth: '250px',
};

const statusCardTitleStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const statusCardValueStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  marginTop: '10px',
};

const sectionStyle: React.CSSProperties = {
  margin: '20px 0',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  width: '100%',
};

const sectionTitleStyle: React.CSSProperties = {
  // fontSize: '1.5rem',
  marginBottom: '10px',
  fontSize: isMobile ? '18px' : '24px'
  
};

const infoTextStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: '#e74c3c',
};

export default MainPage;
