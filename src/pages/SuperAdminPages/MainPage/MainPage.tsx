import React, { useEffect } from 'react';
import { Row, Grid, Col, Carousel, Tabs } from 'antd';
import ErrorsTab from './ErrorsTab';
import SubscriptionTab from './SubscriptionTab';
import { useAppDispatch } from '../../../Store/store';
import { fetchRoles } from '../../../Store/utils/rolesActions';
import { setTransports, TransportResponse } from '../../../Store/utils/transportSlice';
import { fetchTransportData } from '../../../Store/apis/transportWebsocketApi';
import TransportTab from './TransportTab';
import UsersTab from './UsersTab';
import MapComponent from './Map';
import TransportInfo from './TransportInfo';
import { User } from "../../../pages/shared/TransportsPage";
const { useBreakpoint } = Grid;
const MainPage: React.FC = () => {


  const screen = useBreakpoint();
  return screen.xs ? (
    <ModileMainPage />
  ) : (
    <DestkopMainPage />
  );
};

const DestkopMainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;
  const isAdminOrSuperAdmin = user?.role === "ROLE_SUPERADMIN" || user?.role === "ROLE_ADMIN";
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: '90vh',
        flexGrow: 1,
      }}
    >
      <Row className="w-full flex">
        <Col span={5} className="bg-white px-5 py-2 border-gray-300">
          <Carousel dots={false} infinite>
            <Tabs
              defaultActiveKey="1"
              tabPosition="top"
              tabBarStyle={{
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              className="custom-tabs"
            >
              <Tabs.TabPane tab="Ошибки" key="1">
                <div className="h-[calc(100vh-100px)] p-4 custom-scrollbar">
                  <ErrorsTab />
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Транспорт" key="2">
                <div className="h-[calc(100vh-100px)] p-4 custom-scrollbar">
                  <TransportTab />
                </div>
              </Tabs.TabPane>
              {/* <Tabs.TabPane tab="Подписки" key="3">
                <div className="h-[calc(100vh-100px)] p-4 custom-scrollbar">
                  <SubscriptionTab />
                </div>
              </Tabs.TabPane> */}
              {isAdminOrSuperAdmin && (
                <Tabs.TabPane tab="Подписки" key="3">
                  <div className="h-[calc(100vh-100px)] p-4 custom-scrollbar">
                    <SubscriptionTab />
                  </div>
                </Tabs.TabPane>
              )}
              <Tabs.TabPane tab="Пользователи" key="4">
                <div className="h-[calc(100vh-100px)] p-4 custom-scrollbar">
                  <UsersTab />
                </div>
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


const ModileMainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;
  const isAdminOrSuperAdmin = user?.role === "ROLE_SUPERADMIN" || user?.role === "ROLE_ADMIN";
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: '90vh',
        flexGrow: 1,
      }}
    >
      <Row className="w-full flex">
        <Col span={24} className="bg-white px-5 py-2 border-gray-300">
          <TransportInfo />
          <Carousel dots={false} infinite>
            <Tabs
              defaultActiveKey="1"
              tabPosition="top"
              tabBarStyle={{
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              className="custom-tabs"
            >
              <Tabs.TabPane tab="Ошибки" key="1">
                <div className="h-[calc(100vh-200px)] p-4 custom-scrollbar">
                  <ErrorsTab />
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Транспорт" key="2">
                <div className="h-[calc(100vh-200px)] p-4 custom-scrollbar">
                  <TransportTab />
                </div>
              </Tabs.TabPane>
              {/* <Tabs.TabPane tab="Подписки" key="3">
                <div className="h-[calc(100vh-200px)] p-4 custom-scrollbar">
                  <SubscriptionTab />
                </div>
              </Tabs.TabPane> */}
              {isAdminOrSuperAdmin && (
                <Tabs.TabPane tab="Подписки" key="3">
                  <div className="h-[calc(100vh-100px)] p-4 custom-scrollbar">
                    <SubscriptionTab />
                  </div>
                </Tabs.TabPane>
              )}
              <Tabs.TabPane tab="Пользователи" key="4">
                <div className="h-[calc(100vh-200px)] p-4 custom-scrollbar">
                  <UsersTab />
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Карта" key="5">
                <div className="h-[calc(100vh-200px)] p-4 custom-scrollbar">
                  <MapComponent />
                </div>
              </Tabs.TabPane>
            </Tabs>
          </Carousel>
        </Col>
      </Row>
    </div>
  );
};
export default MainPage;

