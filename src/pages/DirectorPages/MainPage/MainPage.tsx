import React from 'react';

import { Chart, registerables } from 'chart.js';
import { Row, Col, Card as AntCard, Divider } from 'antd';


Chart.register(...registerables);

const MainPage: React.FC = () => {
  // Пример данных для графика
  const data = {
    labels: ['Неделя 1', 'Неделя 2', 'Неделя 3', 'Неделя 4'],
    datasets: [
      {
        label: 'Активность транспорта',
        data: [12, 19, 3, 5],
        backgroundColor: 'rgba(56, 162, 255, 0.6)',
      },
    ],
  };

  // Пример данных для отображения критической информации
  const criticalInfo = [
    "Обнаружены проблемы с транспортом #23: ошибка датчика температуры.",
    "Проблемы с маршрутом #12: задержка на 30 минут.",
  ];

  // Пример данных о транспорте
  const transportData = {
    active: 50,
    inactive: 10,
    users: "100 (Администраторы: 5, Операторы: 20)",
    totalRoutes: 25, // Общее количество маршрутов
    delayedRoutes: 3, // Задержанные маршруты
    faultyRoutes: 2, // Маршруты с неисправностями
    fuelStatus: "80% топлива", // Статус топлива
    maintenanceRequired: 5, // Транспортные средства, требующие обслуживания
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: '100vh',
      backgroundColor: "#F0F4F8",
    }}>
      <Row style={{
        margin: "30px 40px 30px 40px",
        flex: "1",
      }}>
        <Col xs={24}>
          {/* Карточки с общей информацией */}
          <div style={cardsContainerStyle}>
            <Card title="Активные транспортные средства" value={transportData.active.toString()} />
            <Card title="Неактивные транспортные средства" value={transportData.inactive.toString()} />
            <Card title="Пользователи" value={transportData.users} />
            <Card title="Маршруты" value={`${transportData.totalRoutes} (Задержанные: ${transportData.delayedRoutes}, Неисправные: ${transportData.faultyRoutes})`} />
            <Card title="Топливо" value={transportData.fuelStatus} />
            <Card title="Транспортные средства на обслуживании" value={transportData.maintenanceRequired.toString()} />
          </div>

          {/* Секция критической информации */}
          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Критическая информация</h2>
            {criticalInfo.map((info, index) => (
              <p key={index} style={infoTextStyle}>{info}</p>
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

const cardsContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  marginBottom: '20px',
  marginTop: '20px',
  flexWrap: 'wrap',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  padding: '15px',
  textAlign: 'center',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  flex: '1',
  margin: '0 10px',
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

const sectionStyle: React.CSSProperties = {
  margin: '20px 0',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  width: '100%',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  marginBottom: '10px',
};

const infoTextStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: '#e74c3c',
};


export default MainPage;
