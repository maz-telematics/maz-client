import { useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import CommuteOutlinedIcon from "@mui/icons-material/CommuteOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
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
  
  const handleMenuClick = (e: { key: string }) => {
    setSelectedKey(e.key); // Обновляем выбранный пункт
    setView(e.key); // Обновляем состояние view
    const dispatch = useDispatch();
    switch (e.key) {
      case "main":
        dispatch(showSuperAdminMain());
        break;
      case "transports":
        dispatch(showSuperAdminTransports());
        break;
      case "organizations":
        dispatch(showSuperAdminOrganizations());
        break;
      case "employees":
        dispatch(showSuperAdminEmpoyess());
        break;
      case "reports":
        dispatch(showSuperAdminReports());
        break;
      case "archive":
        dispatch(showSuperAdminArchive());
        break;
    }
  };

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
  ];
};

