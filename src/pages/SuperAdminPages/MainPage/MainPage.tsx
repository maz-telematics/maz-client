import React, { useEffect, useRef, useState } from 'react';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Row, Col, Tabs, Carousel, Card, Button } from 'antd';
import 'leaflet/dist/leaflet.css';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SpeedIcon from '@mui/icons-material/Speed';
import ConstructionIcon from '@mui/icons-material/Construction';
import StoreIcon from '@mui/icons-material/Store';
import GroupIcon from '@mui/icons-material/Group';
import TabPane from 'rc-tabs/lib/TabPanelList/TabPane';
import dayjs from 'dayjs';
const MainPage: React.FC = () => {
  const { Meta } = Card;
   const mapRef = useRef<L.Map | null>(null);
   const [mapCenter, setMapCenter] = useState<[number, number] | null>(null); 
   const [mapZoom, setMapZoom] = useState<number>(10); 
   const transportData = {
    totalVehicles: 60,
    totalVehiclesMoving: 40,
    totalVehiclesStopped: 15,
    totalVehiclesMaintenance: 5,
    avgDelay: "12 минут",
    activeRoutes: 25,
    completedRoutes: 20,
  };
  const transportsInfo = {
    trucks: 50,
    trucksMoving: 30,
    trucksInMaintenance: 5,
    trucksInParking: 5,
  
    buses: 20,
    busesMoving: 10,
    busesInMaintenance: 2,
    busesInParking: 2,
  
    tractors: 15,
    tractorsMoving: 8,
    tractorsInMaintenance: 3,
    tractorsInParking: 3,

    electricVehicles: 10,
    electricVehiclesMoving: 7,
    electricVehiclesInMaintenance: 1,
    electricVehiclesInParking: 1,
  };
  const organizationsWithUsers = [
    {
      id: 1,
      name: "МАЗ",
      users: [
        { role: "Супер админ", count: 2 },
        { role: "Админ", count: 5 },
        { role: "Операторы", count: 10 },
      ],
    },
    {
      id: 2,
      name: "Организация 2",
      users: [
        { role: "Менеджер", count: 3 },
        { role: "Механик", count: 4 },
      ],
    },
    // Добавьте другие организации по аналогии
  ];
  const errors = [
    {
      id: 1,
      vehicle: {
        model: "КамАЗ",
        vin: "1HGBH41JXMN109186",
        organization: "МАЗ",
      },
      errorDetails: {
        block: "Двигатель",
        description: "Проблемы с системой охлаждения",
        date: "2025-01-10",
      },
    },
    {
      id: 2,
      vehicle: {
        model: "Газель",
        vin: "2HGBH41JXMN109187",
        organization: "ТрансГаз",
      },
      errorDetails: {
        block: "Трансмиссия",
        description: "Неисправность трансмиссии",
        date: "2025-01-12",
      },
    },
    // Добавьте другие ошибки по аналогии
  ];
  
  type TransportType = {
    name: string;
    count: number;
    movingCount: number;
    maintenanceCount: number;
    parkingCount:number;
  };
  
  const transportTypes: TransportType[] = [
    {
      name: 'Грузовики',
      count: transportsInfo.trucks,
      movingCount: transportsInfo.trucksMoving,
      maintenanceCount: transportsInfo.trucksInMaintenance,
      parkingCount:transportsInfo.trucksInParking
    },
    {
      name: 'Автобусы',
      count: transportsInfo.buses,
      movingCount: transportsInfo.busesMoving,
      maintenanceCount: transportsInfo.busesInMaintenance,
      parkingCount:transportsInfo.busesInParking
    },
    {
      name: 'Тягачи',
      count: transportsInfo.tractors,
      movingCount: transportsInfo.tractorsMoving,
      maintenanceCount: transportsInfo.tractorsInMaintenance,
      parkingCount:transportsInfo.tractorsInParking
    },
    {
      name: 'Электротранспорт',
      count: transportsInfo.electricVehicles,
      movingCount: transportsInfo.electricVehiclesMoving,
      maintenanceCount: transportsInfo.electricVehiclesInMaintenance,
      parkingCount: transportsInfo.electricVehiclesInParking
    },
  ];
  const organizations = [
    {
      id: 1,
      name: 'Организация 1',
      subscriptionEndDate: '2025-01-20',
      contact: 'Контактный телефон: +1234567890',
      address: 'Контактное лицо:',
    },
    {
      id: 2,
      name: 'Организация 2',
      subscriptionEndDate: '2025-01-15',
      contact: 'Контактный телефон: +0987654321',
      address: 'Контактное лицо:',
    },
    {
      id: 3,
      name: 'Организация 3',
      subscriptionEndDate: '2025-01-30',
      contact: 'Контактный телефон: +1122334455',
      address: 'Контактное лицо:',
    },
  ];

  const transportInfoData = [
    {
      icon: <LocalShippingIcon className="w-20 h-20 text-red-500" />, // Цвет иконки красный
      label: <span style={{ color: "#1B232A" }}>Транспорта</span>, // Цвет текста
      count: transportData.totalVehicles,
    },
    {
      icon: <SpeedIcon className="text-red-500" />, // Цвет иконки красный
      label: <span style={{ color: "#1B232A" }}>В движении</span>, // Цвет текста
      count: transportData.totalVehiclesMoving,
    },
    {
      icon: <LocalParkingIcon className="text-red-500" />, // Цвет иконки красный
      label: <span style={{ color: "#1B232A" }}>На остановке</span>, // Цвет текста
      count: transportData.totalVehiclesStopped,
    },
    {
      icon: <ConstructionIcon className="text-red-500" />, // Цвет иконки красный
      label: <span style={{ color: "#1B232A" }}>На ремонте</span>, // Цвет текста
      count: transportData.totalVehiclesMaintenance,
    },
    {
      icon: <StoreIcon className="text-red-500" />, // Цвет иконки красный
      label: <span style={{ color: "#1B232A" }}>Организаций</span>, // Цвет текста
      count: parseInt(transportData.avgDelay), // Преобразование строки в число
    },
    {
      icon: <GroupIcon className="text-red-500" />, // Цвет иконки красный
      label: <span style={{ color: "#1B232A" }}>Пользователей</span>, // Цвет текста
      count: transportData.completedRoutes,
    },
  
  ];
  const calculateRemainingTime = (endDate: string) => {
    const now = dayjs();
    const end = dayjs(endDate);
    const diffInDays = end.diff(now, 'day'); // Разница в днях
  
    if (diffInDays < 0) {
      return 'Подписка истекла';
    } else if (diffInDays <= 7) {
      return `${diffInDays} дней до окончания`;
    } else {
      return `Подписка действует до ${end.format('DD.MM.YYYY')}`;
    }
  };
  const OrganizationsTab: React.FC = () => {
    return (
      <Row gutter={[16, 16]} justify="start" style={{ flexDirection: 'column' }}>
        {organizations.map((org) => (
          <Col span={24} key={org.id}>
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
                <h3 style={{ marginBottom: '5px' }}>{org.name}</h3>
                <p
                  style={{
                    fontWeight: 'bold',
                    color: '#FF5733',
                    marginBottom: '5px',
                  }}
                >
                  {calculateRemainingTime(org.subscriptionEndDate)}
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#555',
                    marginBottom: '5px',
                  }}
                >
                  {org.address}
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#555',
                    marginBottom: '5px',
                  }}
                >
                  {org.contact}
                </p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };
  const TransportCard: React.FC<{ transport: TransportType }> = ({ transport }) => (
    <Col span={24}>
      <Card
        bordered={false}
        hoverable
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          borderLeft: `5px solid #2196F3`,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '12px',
        }}
        bodyStyle={{ padding: '15px' }}
      >
        <div className="flex items-center space-x-3">
            <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '5px' }}>{transport.name}</h3>
                <p
                  style={{
                    fontWeight: 'bold',
                    color: '#FF5733',
                    marginBottom: '5px',
                  }}
                >
                 Количество: {transport.count}
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#555',
                    marginBottom: '5px',
                  }}
                >
                 В движении:{transport.movingCount}
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#555',
                    marginBottom: '5px',
                  }}
                >
                  На ремонте: {transport.maintenanceCount}
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#555',
                    marginBottom: '5px',
                  }}
                >
                  На паркинге: {transport.parkingCount}
                </p>
              </div>
        </div>
      </Card>
    </Col>
  );
  const TransportTab: React.FC = () => (
    <TabPane tab="Транспорт" key="1" className='overflow-auto h'>
      <Row className="flex flex-col space-y-4">
        {transportTypes.map((transport, index) => (
          <TransportCard key={index} transport={transport} />
        ))}
      </Row>
    </TabPane>
  );
  const UsersTab: React.FC = () => {
    return (
      <Row gutter={[16, 16]} justify="start" className="flex flex-col">
        {organizationsWithUsers.map((org) => (
          <Col span={24} key={org.id}>
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
              <h3 style={{ marginBottom: '10px' }}>{org.name}</h3>
              {org.users.map((user, index) => (
                <p
                  key={index}
                  style={{
                    fontSize: '14px',
                    color: '#555',
                    marginBottom: '5px',
                  }}
                >
                  {user.role}: {user.count} человек
                </p>
              ))}
            </Card>
          </Col>
        ))}
      </Row>
    );
  };
  const ErrorsTab: React.FC = () => {
    return (
      <Row gutter={[16, 16]} justify="start" className="flex flex-col">
        {errors.map((error) => (
          <Col span={24} key={error.id}>
            <Card
              bordered={false}
              hoverable
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '5px solid rgb(182, 185, 4)',  // Цвет для ошибок (красный)
                boxShadow: '0 4px 8px rgba(194, 206, 32, 0.1)',
                marginBottom: '12px',
              }}
              bodyStyle={{ padding: '15px' }}
            >
              <h3 style={{ marginBottom: '10px' }}>
                {error.vehicle.model}
              </h3>
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>
              VIN: {error.vehicle.vin}
              </p>
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>
                Организация: {error.vehicle.organization}
              </p>
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>
              Тип ошибки: {error.errorDetails.block}
              </p>
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>
                Описание: {error.errorDetails.description}
              </p>
              <p style={{ fontSize: '14px', color: '#777' }}>
                Дата ошибки: {error.errorDetails.date}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };
  
  const InfoBlock: React.FC<{ icon: React.ReactNode; count: number; label: string }> = ({ icon, count, label }) => (
    <Row className="items-center  h-full">
        <Col span={1} className="flex items-center justify-center text-blue-500 text-4xl bg-gray-100 rounded-full">
        {icon}
      </Col>
      <Col span={20} className="flex flex-col justify-between h-full text-left max-w-full ml-3">
  <span className="text-2xl font-bold">{count}</span>
  <span className="text-sm text-gray-500">{label}</span>
</Col>
    </Row>
  );

    useEffect(() => {
      if (!mapRef.current) {
        const initialCenter = mapCenter || [53.9, 27.5667]; 
        mapRef.current = L.map("map", {
          center: initialCenter,
          zoom: mapZoom,
          attributionControl: false,
        });
  
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "",
        }).addTo(mapRef.current);
  
        mapRef.current.on("moveend", () => {
          if (mapRef.current) {
            const center = mapRef.current.getCenter();
            setMapCenter([center.lat, center.lng]);
          }
        });
  
        mapRef.current.on("zoomend", () => {
          if (mapRef.current) {
            const zoom = mapRef.current.getZoom();
            setMapZoom(zoom);
          }
        });
      }
    }, []);

    return (
<div className="flex flex-col w-full h-[91vh] bg-gray-200 custom-tabs">
  <Row className="w-full h-full">
  
    <Col span={5} className="bg-white px-5 py-2 border-gray-300 h-fullс custom-tabs">
      <Carousel dots={false} infinite>
        <Tabs
          defaultActiveKey="1"
          tabPosition="top"
          tabBarStyle={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
          tabBarExtraContent={null}
        >
          <TabPane tab="Ошибки" key="1">
            <ErrorsTab />
          </TabPane>
          <TabPane tab="Транспорт" key="2">
            <TransportTab />
          </TabPane>
          <TabPane tab="Подписки" key="3">
            <OrganizationsTab />
          </TabPane>
          <TabPane tab="Пользователи" key="4">
            <UsersTab />
          </TabPane>
        </Tabs>
      </Carousel>
    </Col>

   
    <Col span={19} className="flex flex-col h-full">
      
      <Row className="bg-white px-4 py-2 shadow-md justify-between items-center">
        {transportInfoData.map((item, index) => (
          <InfoBlock key={index} icon={item.icon} count={item.count} label={item.label} />
        ))}
      </Row>

     
      <Row className="flex-grow overflow-hidden">
        <div
          id="map"
          className="w-full h-full"
          style={{
            height:  '100%',
            width: '100%',
            overflow: 'hidden',
          }}
        ></div>
      </Row>
    </Col>
  </Row>
</div>
    );
};

export default MainPage;
