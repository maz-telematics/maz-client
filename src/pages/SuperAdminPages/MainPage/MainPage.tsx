import React, { useEffect } from 'react';
import { Row, Col, Carousel, Tabs } from 'antd';
import ErrorsTab from './ErrorsTab';
import SubscriptionTab from './SubscriptionTab';
import { useAppDispatch } from '../../../Store/store';
import { fetchRoles } from '../../../Store/utils/rolesActions';
import { setTransports, TransportResponse } from '../../../Store/utils/transportSlice';
import { fetchTransportData } from '../../../Store/apis/transportApi';
import TransportTab from './TransportTab';
import UsersTab from './UsersTab';
import MapComponent from './Map';
import TransportInfo from './TransportInfo';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRoles());
    fetchTransportData()
      .then((data: TransportResponse[]) => {
        dispatch(setTransports(data));
      })
      .catch((error: Event | Error) => {
        console.error('Ошибка при получении данных о транспорте:', error);
      });
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full h-[91vh] bg-gray-200" style={{ margin: '-20px' }}>
      <Row className="w-full h-full">
        <Col span={5} className="bg-white px-5 py-2 border-gray-300 h-full">
          <Carousel dots={false} infinite>
            <Tabs
              defaultActiveKey="1"
              tabPosition="top"
              tabBarStyle={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                
              }}
              className="custom-tabs"  // Добавляем свой класс для кастомных стилей
            >
              <Tabs.TabPane tab="Ошибки" key="1">
                <ErrorsTab />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Транспорт" key="2">
                <TransportTab />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Подписки" key="3">
                <SubscriptionTab />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Пользователи" key="4">
                <UsersTab />
              </Tabs.TabPane>
            </Tabs>
          </Carousel>
        </Col>
        <Col span={19} className="flex flex-col h-full">
          <TransportInfo />
          <MapComponent />
        </Col>
      </Row>
    </div>
  );
};

export default MainPage;
