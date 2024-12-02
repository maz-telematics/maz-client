
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Row, Col } from 'antd';

Chart.register(...registerables);

const MainPage: React.FC = () => {
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
        <Col xs={24} >
          <h1 style={{ margin: 0, color: '#1e40af' }}>Главная страница</h1>

          <div style={cardsContainerStyle}>
            <Card title="Активные транспортные средства" value="50" />
            <Card title="Неактивные транспортные средства" value="10" />
            <Card title="Организации" value="20 (активные: 18, неактивные: 2)" />
            <Card title="Пользователи" value="100 (Администраторы: 5, Операторы: 20)" />
          </div>

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Критическая информация</h2>
            <p style={infoTextStyle}>Обнаружены проблемы с транспортом #23: ошибка датчика температуры.</p>
            <p style={infoTextStyle}>Организация "Transport Company A" не активна с 2024-10-01.</p>
            <p style={infoTextStyle}>Проблемы с маршрутом #12: задержка на 30 минут.</p>
          </section>

          <div style={chartContainerStyle}>
            <h2 style={chartTitleStyle}>График активности транспорта</h2>
            <Bar data={data} options={chartOptions} />
          </div>
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
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  padding: '15px',
  textAlign: 'center',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  flex: '1',
  margin: '0 10px',
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

const chartContainerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '600px',
  margin: '20px auto',
};

const chartTitleStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  textAlign: 'center',
};

const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default MainPage;
