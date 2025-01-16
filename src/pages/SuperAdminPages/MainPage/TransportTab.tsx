import React, { useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store/store'; // Путь к store
import { TransportResponse, Transport } from '../../../Store/utils/transportSlice'; // Типы для транспортов

const TransportTab: React.FC = () => {
  const { transports } = useSelector((state: RootState) => state.transports);
  const calculateTransportStats = (transports: Transport[]) => {
    const stats = {
      total: 0,
      moving: 0,
      maintenance: 0,
      parking: 0,
    };

    transports.forEach((transport) => {
      stats.total += 1;
      if (transport.status === 'в движении') {
        stats.moving += 1;
      } else if (transport.status === 'на ремонте') {
        stats.maintenance += 1;
      } else if (transport.status === 'на паркинге') {
        stats.parking += 1;
      }
    });

    return stats;
  };


  return (
    <Row gutter={[16, 16]} justify="start" className="flex flex-col">
      {transports.length === 0 ? (
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
              Нет данных по транспорту
            </h3>
          </Card>
        </Col>
      ) : (
        transports.map((transportResponse: TransportResponse) => {
          const stats = calculateTransportStats(transportResponse.transports);

          return (
            <Col span={24} key={transportResponse.name}>
              <Card
                bordered={false}
                hoverable
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderLeft: '5px solid #2196F3',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  marginBottom: '12px',
                }}
                bodyStyle={{ padding: '15px' }}
              >
                <h3 style={{ marginBottom: '10px' }}>{transportResponse.name}</h3>

                {transportResponse.transports.length === 0 ? (
                  <p>Нет доступных транспортных средств</p>
                ) : (
                  <>
                    <p><strong>Общее количество:</strong> {stats.total}</p>
                    <p><strong>В движении:</strong> {stats.moving}</p>
                    <p><strong>На ремонте:</strong> {stats.maintenance}</p>
                    <p><strong>На паркинге:</strong> {stats.parking}</p>
                  </>
                )}
              </Card>
            </Col>
          );
        })
      )}
    </Row>
  );
};

export default TransportTab;
