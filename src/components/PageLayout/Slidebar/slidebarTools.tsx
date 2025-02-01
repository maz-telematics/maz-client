import { useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import CommuteOutlinedIcon from "@mui/icons-material/CommuteOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import TuneIcon from '@mui/icons-material/Tune';
import type { MenuProps } from "antd";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showSuperAdminArchive, showSuperAdminEmpoyess, showSuperAdminMain, showSuperAdminOrganizations, showSuperAdminReports, showSuperAdminTransports } from "../../../Store/utils/superAdminModuleViewSlice";

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

export const superAdminItems = (): MenuItem[] => {
  const location = useLocation();
  const [view, setView] = useState("main");
  const [selectedKey, setSelectedKey] = useState(view); // начальный выбранный пункт

  const isActive = (path: string) => location.pathname === path;
  

  return [
    getItem(
      <Link to="/master/main" style={{ color: "white" }}>Главная</Link>,
      "main",
      <DashboardIcon
        style={{
          fontSize: 25,
          color: isActive("/master/main") ? "black" : "white",
        }}
      />
    ),
    
    getItem(
      <Link to="/master/transports" style={{ color: "white" }}>Транспорт</Link>,
      "transports",
      <CommuteOutlinedIcon
        style={{
          fontSize: 25,
          color: isActive("/master/transports") ? "black" : "white",
        }}
      />
    ),
    getItem(
      <Link to="/master/organizations" style={{ color: "white" }}>Организации</Link>,
      "organizations",
      <StoreOutlinedIcon
        style={{
          fontSize: 25,
          color: isActive("/master/organizations") ? "black" : "white",
        }}
      />
    ),
    getItem(
      <Link to="/master/employees" style={{ color: "white" }}>Сотрудники</Link>,
      "employees",
      <PeopleAltOutlinedIcon
        style={{
          fontSize: 25,
          color: isActive("/master/employees") ? "black" : "white",
        }}
      />
    ),
    getItem(
      <Link to="/master/reports" style={{ color: "white" }}>Отчёты</Link>,
      "reports",
      <AssessmentOutlinedIcon
        style={{
          fontSize: 25,
          color: isActive("/master/reports") ? "black" : "white",
        }}
      />
    ),
    getItem(
      <Link to="/master/archive" style={{ color: "white" }}>Архив</Link>,
      "archive",
      <ArchiveOutlinedIcon
        style={{
          fontSize: 25,
          color: isActive("/master/archive") ? "black" : "white",
        }}
      />
    ),
    getItem(
      <Link to="/master/firmwares" style={{ color: "white" }}>Прошивки</Link>,
      "firmwares",
      <TuneIcon
        style={{
          fontSize: 25,
          color: isActive("/master/firmware") ? "black" : "white",
        }}
      />
    ),
  ];
};

export const directorItems = (): MenuItem[] =>  [
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

export const adminItems = (): MenuItem[] => {
  const location = useLocation();
  const [view, setView] = useState("main");
  const isActive = (path: string) => location.pathname === path;
  return [
    getItem(
      <Link to="/admin/main" style={{ color: "white" }}>Главная</Link>,
      "main",
      <DashboardIcon
        style={{
          fontSize: 25,
          color: isActive("/admin/main") ? "black" : "white",
        }}
      />
    ),
    
    getItem(
      <Link to="/admin/transports" style={{ color: "white" }}>Транспорт</Link>,
      "transports",
      <CommuteOutlinedIcon
        style={{
          fontSize: 25,
          color: isActive("/admin/transports") ? "black" : "white",
        }}
      />
    ),
    getItem(
      <Link to="/admin/organizations" style={{ color: "white" }}>Организации</Link>,
      "organizations",
      <StoreOutlinedIcon
        style={{
          fontSize: 25,
          color: isActive("/admin/organizations") ? "black" : "white",
        }}
      />
    ),
    getItem(
      <Link to="/admin/employees" style={{ color: "white" }}>Сотрудники</Link>,
      "employees",
      <PeopleAltOutlinedIcon
        style={{
          fontSize: 25,
          color: isActive("/admin/employees") ? "black" : "white",
        }}
      />
    ),
    getItem(
      <Link to="/admin/reports" style={{ color: "white" }}>Отчёты</Link>,
      "reports",
      <AssessmentOutlinedIcon
        style={{
          fontSize: 25,
          color: isActive("/admin/reports") ? "black" : "white",
        }}
      />
    ),
    getItem(
      <Link to="/admin/archive" style={{ color: "white" }}>Архив</Link>,
      "archive",
      <ArchiveOutlinedIcon
        style={{
          fontSize: 25,
          color: isActive("/admin/archive") ? "black" : "white",
        }}
      />
    ),
    getItem(
      <Link to="/admin/firmwares" style={{ color: "white" }}>Прошивки</Link>,
      "firmwares",
      <TuneIcon
        style={{
          fontSize: 25,
          color: isActive("/admin/firmwares") ? "black" : "white",
        }}
      />
    ),
  ];
};