import React, { useContext, useState, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { UserInfoContext } from "../../UserProvider/UserProvider";
import { RootState } from "../../../Store/store";
import { showSuperAdminArchive, showSuperAdminEmpoyess, showSuperAdminFirmware, showSuperAdminMain, showSuperAdminOrganizations, showSuperAdminReports, showSuperAdminTransports, showSuperAdminLogs, showSuperAdminChangeLogs } from "../../../Store/utils/superAdminModuleViewSlice";
import { toggleSlicebar } from "../../../Store/utils/slidebarSlice";
import { Menu } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import { useDispatch, useSelector } from "react-redux";
import { adminItems, directorItems, superAdminItems } from "./slidebarTools";
import { useUser } from "../../../services/auth";
import { showDirectorMain, showDirectorTransports, showDirectorEmpoyess, showDirectorReports } from "../../../Store/utils/directorModuleViewSlice";

const Slidebar: React.FC = () => {
  const { user, isLoading } = useUser();
  const superAdminView = useSelector((state: RootState) => state.superAdminView.view);
  const slidebarState = useSelector((state: RootState) => state.slidebar.collapsedSlideBar);
  const userInfo = useContext(UserInfoContext);
  const dispatch = useDispatch();

  const [selectedKey, setSelectedKey] = useState<string>(""); // Добавляем состояние для выбранной вкладки

  const toggleCollapsed = () => {
    dispatch(toggleSlicebar());
  };

  let view;
  switch (user?.role) {
    case "ROLE_SUPERADMIN":
      view = superAdminView;
      break;
  }

  const handleMenuClick = (e: MenuInfo) => {
    // Обновляем выбранный ключ при клике
    setSelectedKey(e.key);

    switch (user?.role) {
      case "ROLE_SUPERADMIN":
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
          case "firmware":
            dispatch(showSuperAdminFirmware());
              break;
          case "logs":
            dispatch(showSuperAdminLogs());
            break;
          case "change-logs":
            dispatch(showSuperAdminChangeLogs());
            break;
        }
        case "ROLE_ADMIN":
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
            case "firmware":
              dispatch(showSuperAdminFirmware());
                break;
          }
        break;
        case "ROLE_DIRECTOR":
          switch (e.key) {
            case "main":
              dispatch(showDirectorMain());
              break;
            case "transports":
              dispatch(showDirectorTransports());
              break;
            case "employees":
              dispatch(showDirectorEmpoyess());
              break;
            case "reports":
              dispatch(showDirectorReports());
              break;
          }
          break;
    }
  };

  const getSlidebarItems = () => {
    switch (user?.role) {
      case "ROLE_SUPERADMIN":
        return superAdminItems();
        case "ROLE_ADMIN":
          return adminItems();
        case "ROLE_DIRECTOR":
        return directorItems();
      default:
        return [];
    }
  };
  useEffect(() => {
    const pathToKeyMap: Record<string, string> = {
      "/master/main": "main",
      "/master/transports": "transports",
      "/master/organizations": "organizations",
      "/master/employees": "employees",
      "/master/reports": "reports",
      "/master/archive": "archive",
      "/master/firmwares": "firmwares",
      "/master/logs": "logs",
      "/master/change-logs": "change-logs",
    };
    
    setSelectedKey(pathToKeyMap[location.pathname] || "main"); // Если путь не найден, ставим "main, ВОТ ТУТ ЛОГИКА ПЕРЕХОДА ЧИНАЗЕСА"
  }, [location.pathname]);
  return (
    <div className="h-full flex flex-col" style={{width: "94px", height: "100vh"}}>
      <Menu
        style={{ backgroundColor: '#1B232A' }}
        className="h-full pt-5"
        onClick={handleMenuClick}
        mode="inline"
        items={getSlidebarItems()} // Вызов функции
        selectedKeys={[selectedKey]} // Применяем выбранный ключ
        activeKey={selectedKey} // Также можно использовать activeKey, но selectedKeys предпочтительнее для Ant Design
      />
    </div>
  );
};

export default Slidebar;
