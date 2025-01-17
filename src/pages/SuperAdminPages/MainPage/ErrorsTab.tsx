import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';

interface ErrorData {
  organizationId: number;
  errorTime: string;
  transportId: string;
  errorType: string;
  errorCode: string;
  errorId: number;
}
const apiUrl = import.meta.env.VITE_API_URL;
const ErrorsTab: React.FC = () => {
  const [errors, setErrors] = useState<ErrorData[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  useEffect(() => {
    const ws = new WebSocket(`${apiUrl.replace(/^http/, "ws")}/ws`);

    ws.onopen = () => {
      // Отправка сообщения с запросом ошибок
      ws.send(
        JSON.stringify({
          messageType: 'mainErrors',
          token: user.token,
        })
      );
    };

    ws.onmessage = (event) => {
      try {
        const data: ErrorData[] = JSON.parse(event.data);
        setErrors(data);
      } catch (err) {
        console.error('Ошибка обработки сообщения WebSocket:', err);
      }
    };

    ws.onerror = (error) => {
      console.error('Ошибка WebSocket:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket соединение закрыто');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <Row gutter={[16, 16]} justify="start" className="flex flex-col">
      {errors.length === 0 ? (
        <Col span={24}>
          <Card
            bordered={false}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '5px solid #4CAF50',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              marginBottom: '12px',
            }}
            bodyStyle={{ padding: '15px' }}
          >
            <h3 style={{ marginBottom: '5px', color: '#4CAF50' }}>
              Критических ошибок нет
            </h3>
          </Card>
        </Col>
      ) : (
        errors.map((error) => (
          <Col span={24} key={error.errorId}>
            <Card
              bordered={false}
              hoverable
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '5px solid rgb(255, 0, 0)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '12px',
              }}
              bodyStyle={{ padding: '15px' }}
            >
              <h3 style={{ marginBottom: '5px' }}>{`Ошибка ${error.errorType}`}</h3>
              <p style={{ fontWeight: 'bold', color: '#FF5733', marginBottom: '5px' }}>
                Код: {error.errorCode}
              </p>
              <p style={{ fontSize: '14px', color: '#555' }}>
                Время: {new Date(error.errorTime).toLocaleString()}
              </p>
              <p style={{ fontSize: '14px', color: '#555' }}>
                Транспорт: {error.transportId}
              </p>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
};

export default ErrorsTab;
