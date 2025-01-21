import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import CommuteOutlinedIcon from '@mui/icons-material/CommuteOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import TuneIcon from '@mui/icons-material/Tune';
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
  getItem(
    <Link to="/master/firmware" style={{color:"white" }}>Прошивка</Link>,
    "firmware",
    <TuneIcon  style={{ fontSize: 25 ,color:"white"}} />
  ),
];



export const directorItems: MenuItem[] = [
  getItem(
    <Link to="/director/main"  style={{color:"white" }}>Главная</Link>,
    "main",
    <DashboardIcon style={{ fontSize: 25,color:"white" }} />
  ),
  getItem(
    <Link to="/director/transports" style={{color:"white" }}>Транспорт</Link>,
    "transports",
    <CommuteOutlinedIcon style={{ fontSize: 25,color:"white"}} />
  ),
  getItem(
    <Link to="/director/employees" style={{color:"white" }}>Сотрудники</Link>,
    "empoyess",
    <PeopleAltOutlinedIcon style={{ fontSize: 25,color:"white"}} />
  ),
  getItem(
    <Link to="/director/reports" style={{color:"white" }}>Отчёты</Link>,
    "reports",
    <AssessmentOutlinedIcon style={{ fontSize: 25 ,color:"white"}} />
  ),

];