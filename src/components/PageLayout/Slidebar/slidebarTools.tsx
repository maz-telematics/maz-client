
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import CommuteOutlinedIcon from '@mui/icons-material/CommuteOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

export const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => {
  return {
    label,
    key,
    icon,
    children,
  } as MenuItem;
};

export const superAdminItems: MenuItem[] = [
  getItem(
    <Link to="/master/main"  style={{color:"white" }}>Главная</Link>,
    "main",
    <DashboardIcon style={{ fontSize: 25,color:"white" }} />
  ),

  getItem(
    <Link to="/master/transports" style={{color:"white" }}>Транспорт</Link>,
    "transports",
    <CommuteOutlinedIcon style={{ fontSize: 25,color:"white"}} />
  ),
  getItem(
    <Link to="/master/organizations" style={{color:"white" }}>Организации</Link>,
    "organizations",
    <StoreOutlinedIcon style={{ fontSize: 25,color:"white"}} />
  ),
  getItem(
    <Link to="/master/employees" style={{color:"white" }}>Сотрудники</Link>,
    "empoyess",
    <PeopleAltOutlinedIcon style={{ fontSize: 25,color:"white"}} />
  ),
  getItem(
    <Link to="/master/reports" style={{color:"white" }}>Отчёты</Link>,
    "reports",
    <AssessmentOutlinedIcon style={{ fontSize: 25 ,color:"white"}} />
  ),
  getItem(
    <Link to="/master/archive" style={{color:"white" }}>Архив</Link>,
    "archive",
    <ArchiveOutlinedIcon style={{ fontSize: 25 ,color:"white"}} />
  ),
];
