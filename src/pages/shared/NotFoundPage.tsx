import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom'; 

const NotFound: React.FC = () => {
  const navigate = useNavigate(); 
  return (
    <Result
     style={{
      height:'90vh', width:'100%',
      display:'flex',  
      flexDirection: "column",
    }}
      status="404"
      title="404"
      subTitle="Извините, страница не найдена."
      extra={<Button type="primary" onClick={() => navigate('/transports')}>Вернуться на главную</Button>}
    />
  );
};

export default NotFound;