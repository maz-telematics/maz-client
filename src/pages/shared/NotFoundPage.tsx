import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Result
      style={{
        height: '90vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      status="404"
      title="404"
      subTitle={`Извините, страница ${location.pathname} не найдена.`}
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          Вернуться назад
        </Button>
      }
    />
  );
};

export default NotFound;
