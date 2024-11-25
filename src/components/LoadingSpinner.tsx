import { Spin } from 'antd';
import React from 'react';

// Inline стили
const spinnerStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width:"100%",
  backgroundColor: '#f0f2f5',
};

const LoadingSpinner: React.FC = () => {
  return (
    <div style={spinnerStyles}>
      <Spin size="large" tip="Загрузка..." />
    </div>
  );
};

export default LoadingSpinner;
