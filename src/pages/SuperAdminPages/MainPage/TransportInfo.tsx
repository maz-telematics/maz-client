import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store/store';
import { Row, Col } from 'antd';  // Обязательно импортируем Col
import InfoBlock from './InfoBlock'; 
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; 
import SpeedIcon from '@mui/icons-material/Speed'; 
import LocalParkingIcon from '@mui/icons-material/LocalParking'; 
import ConstructionIcon from '@mui/icons-material/Construction'; 
import StoreIcon from '@mui/icons-material/Store'; 
import GroupIcon from '@mui/icons-material/Group'; 
import { Transport } from '../../../Store/utils/transportSlice';
import { User } from "../../../pages/shared/TransportsPage";

const TransportInfo: React.FC = () => {
  const { transports } = useSelector((state: RootState) => state.transports);
  const { roles } = useSelector((state: RootState) => state.roles);
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  const calculateTransportStatus = (transports: { transports: Transport[] }[]) => {
    let movingCount = 0;
    let parkedCount = 0;
    let maintenanceCount = 0;

    transports.forEach((category) => {
      category.transports.forEach((transport: Transport) => {
        if (transport.status === 'has move') {
          movingCount++;
        } else if (!transport.status && !transport.lastLocation) {
          maintenanceCount++;
        } else if (!transport.status && transport.lastLocation) {
          parkedCount++;
        }
      });
    });

    return {
      totalVehicles: movingCount + parkedCount + maintenanceCount,
      totalVehiclesMoving: movingCount,
      totalVehiclesStopped: parkedCount,
      totalVehiclesMaintenance: maintenanceCount
    };
  };

  const transportData = calculateTransportStatus(transports);
  const organizationsCount = roles.length;

  const usersCount = roles.reduce((total, role) => {
    return total +
      (role.directors || 0) +
      (role.managers || 0) +
      (role.manufactorers || 0) +
      (role.superAdmins || 0) +
      (role.admins || 0) +
      (role.operators || 0);
  }, 0);

  const transportInfoData = [
    { icon: <LocalShippingIcon className="w-10 h-10" />, label: 'Транспорта', count: transportData.totalVehicles },
    { icon: <SpeedIcon className="w-10 h-10" />, label: 'В движении', count: transportData.totalVehiclesMoving },
    { icon: <LocalParkingIcon className="w-10 h-10" />, label: 'На остановке', count: transportData.totalVehiclesStopped },
    { icon: <ConstructionIcon className="w-10 h-10" />, label: 'На ремонте', count: transportData.totalVehiclesMaintenance },
    // { icon: <StoreIcon className="w-10 h-10" />, label: 'Организаций', count: organizationsCount },
    { icon: <GroupIcon className="w-10 h-10" />, label: 'Пользователей', count: usersCount },
  ];

  if (user?.role === "ROLE_SUPERADMIN" || user?.role === "ROLE_ADMIN") {
    transportInfoData.push({ icon: <StoreIcon className="w-10 h-10" />, label: "Организаций", count: organizationsCount });
  }

  return (
    <Row className="bg-white px-4 py-2 justify-between items-center">
      {transportInfoData.map((item, index) => (
        <Col xs={8} sm={4} md={4} lg={4} key={index}> {/* Используем Col для управления шириной на разных экранах */}
          <InfoBlock icon={item.icon} count={item.count} label={item.label} />
        </Col>
      ))}
    </Row>
  );
};

export default TransportInfo;