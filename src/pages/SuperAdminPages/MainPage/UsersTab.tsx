import React from 'react';
import { Row, Col, Card, Empty } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store/store';

const UsersTab: React.FC = () => {
  const { roles } = useSelector((state: RootState) => state.roles);

  return (
    <Row gutter={[16, 16]} justify="start" className="flex flex-col">
      {roles.length === 0 ? (
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
              Нет данных по пользователям
            </h3>
          </Card>
        </Col>
      ) : (
        roles.map((org) => (
          <Col span={24} key={org.organizationName}>
            <Card
              bordered={false}
              hoverable
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '5px solid rgb(33, 14, 102)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '12px',
              }}
              bodyStyle={{ padding: '15px' }}
            >
              <h3 style={{ marginBottom: '10px' }}>{org.organizationName}</h3>
              {org.organizationName === 'MAZ' ? (
                <>
                  <p style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>
                    Суперадминистраторы: {org.superadmins} человек
                  </p>
                  <p style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>
                    Администраторы: {org.admins} человек
                  </p>
                  <p style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>
                    Операторы: {org.operators} человек
                  </p>
                </>
              ) : (
                <>
                  <p style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>
                    Директора: {org.directors} человек
                  </p>
                  <p style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>
                    Менеджеры: {org.managers} человек
                  </p>
                  <p style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>
                    Производители: {org.manufactorers} человек
                  </p>
                </>
              )}
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
};

export default UsersTab;
