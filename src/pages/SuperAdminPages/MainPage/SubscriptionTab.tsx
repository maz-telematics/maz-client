import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import axiosInstance from '../../../services/axiosInstance';

interface SubscriptionData {
  phoneNumber: string;
  organizationName: string;
  endDate: string;
  contactPerson: string;
  emailContact: string;
}

const SubscriptionTab: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axiosInstance.get(`/main/subscriptions`);
        setSubscriptions(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных подписок:', error);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <Row gutter={[16, 16]} justify="start" style={{ flexDirection: 'column' }}>
      {subscriptions.length > 0 ? (
        subscriptions.map((subscription, index) => (
          <Col span={24} key={index}>
            <Card
              bordered={false}
              hoverable
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                borderLeft: '5px solid #4CAF50',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                marginBottom: '12px',
              }}
              bodyStyle={{ padding: '15px' }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '5px' }}>{subscription.organizationName}</h3>
                <p style={{ fontWeight: 'bold', color: '#4CAF50', marginBottom: '5px' }}>
                  Дата окончания: {new Date(subscription.endDate).toLocaleDateString()}
                </p>
                <p style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>
                  Контактное лицо: {subscription.contactPerson}
                </p>
                <p style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>
                  Email: {subscription.emailContact}
                </p>
                <p style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>
                  Телефон: {subscription.phoneNumber}
                </p>
              </div>
            </Card>
          </Col>
        ))
      ) : (
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
            Завершенных подписок нет
            </h3>

          </Card>
        </Col>
      )}
    </Row>
  );
};

export default SubscriptionTab;
