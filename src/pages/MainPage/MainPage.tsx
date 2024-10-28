// src/pages/MainPage/MainPage.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2'; // Если используете Chart.js
import { Chart, registerables } from 'chart.js';

// Регистрируем все компоненты Chart.js
Chart.register(...registerables);

const MainPage: React.FC = () => {
  // Данные для графика
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
    <div style={containerStyle}>
      <h1 style={headerStyle}>Главная страница</h1>

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
    </div>
  );
};

// Компонент карточки
const Card: React.FC<{ title: string; value: string }> = ({ title, value }) => {
  return (
    <div style={cardStyle}>
      <h3 style={cardTitleStyle}>{title}</h3>
      <p style={cardValueStyle}>{value}</p>
    </div>
  );
};

// Стили для компонентов
const containerStyle: React.CSSProperties = {
    padding: '2rem', 
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
};

const headerStyle = {
    fontSize: '2rem',
    color: '#1e40af',
    marginBottom: '2rem',
    justifyContent: 'left',
  };

const cardsContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  marginBottom: '20px',
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
