// import React, { useContext } from "react";

// import { MenuOutlined } from "@ant-design/icons";
// import { UserInfoContext } from "../../UserProvider/UserProvider";
// import { RootState } from "../../../Store/store";

// import { showSuperAdminArchive, showSuperAdminEmpoyess, showSuperAdminMain, showSuperAdminOrganizations, showSuperAdminReports, showSuperAdminTransports } from "../../../Store/utils/superAdminModuleViewSlice";
// import { toggleSlicebar } from "../../../Store/utils/slidebarSlice";
// import { Menu } from "antd";
// import { MenuInfo } from "rc-menu/lib/interface";
// import { useDispatch, useSelector } from "react-redux";

// import { OpenSlideBarButton } from "./slidebar.styles";
// import SlidebarHeader from "./SlidebarHeader/SlidebarHeader";
// import { superAdminItems} from "./slidebarTools";
// import { useUser } from "../../../services/auth";

// const Slidebar: React.FC = () => {
//   const { user, isLoading } = useUser();
//   const superAdminView = useSelector((state: RootState) => state.superAdminView.view);
//   const slidebarState = useSelector((state: RootState) => state.slidebar.collapsedSlideBar);
//   const userInfo = useContext(UserInfoContext);
 

//   let view;
//   const dispatch = useDispatch();

//   const toggleCollapsed = () => {
//     dispatch(toggleSlicebar());
//   };

//   let selectedKey = "";
//   // switch (userInfo?.role.name) {
//     switch (user?.role) {
//     case "ROLE_SUPERADMIN":
//       view = superAdminView;
//       break;
   
//   }
//   // switch (userInfo?.role.name) {
//     switch (user?.role) {
//     case "ROLE_SUPERADMIN":
//       switch (view) {
//         case "main":
//         case "transports":
//         case "organizations":
//         case "employees":
//         case "reports":
//         case "archive":
//       }
//       break;
//   }

//   const handleMenuClick = (e: MenuInfo) => {
//     // switch (userInfo?.role.name) {
//       switch (user?.role) {
//       case "ROLE_SUPERADMIN":
//         switch (e.key) {
//           case "main":
//             dispatch(showSuperAdminMain());
//             break;
//           case "transports":
//             dispatch(showSuperAdminTransports());
//             break;
//           case "organizations":
//             dispatch(showSuperAdminOrganizations());
//             break;
//           case "employees":
//             dispatch(showSuperAdminEmpoyess());
//             break;
//           case "reports":
//             dispatch(showSuperAdminReports());
//             break;
//           case "archive":
//             dispatch(showSuperAdminArchive());
//             break;
//         }
//         break;
//     }
//   };

//   const getSlidebarItems = () => {
//     // switch (userInfo?.role.name) {
//       switch (user?.role) {
//       case "ROLE_SUPERADMIN":
//         return superAdminItems;
//     }
//   };

//   return (
//     <div className="h-full flex flex-col">
//       {/* {slidebarState ? (
//         <OpenSlideBarButton onClick={toggleCollapsed} >
//           <MenuOutlined style={{ backgroundColor: "1B232A" }} />
//         </OpenSlideBarButton>
//       ) : (
//         <SlidebarHeader />
//         // <></>
//       )} */}
//       <Menu
//        style={{ backgroundColor: '#1B232A' }}
//         className="h-full m -6"
//         onClick={handleMenuClick}
//         mode="inline"
//         items={getSlidebarItems()}
//         selectedKeys={[selectedKey]}
//         activeKey={selectedKey}
//       />
//     </div>
//   );
// };

// export default Slidebar;
import React, { useContext, useState, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { UserInfoContext } from "../../UserProvider/UserProvider";
import { RootState } from "../../../Store/store";
import { showSuperAdminArchive, showSuperAdminEmpoyess, showSuperAdminMain, showSuperAdminOrganizations, showSuperAdminReports, showSuperAdminTransports } from "../../../Store/utils/superAdminModuleViewSlice";
import { toggleSlicebar } from "../../../Store/utils/slidebarSlice";
import { Menu } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import { useDispatch, useSelector } from "react-redux";
import { OpenSlideBarButton } from "./slidebar.styles";
import SlidebarHeader from "./SlidebarHeader/SlidebarHeader";
import { superAdminItems } from "./slidebarTools";
import { useUser } from "../../../services/auth";

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
        }
        break;
    }
  };

  const getSlidebarItems = () => {
    switch (user?.role) {
      case "ROLE_SUPERADMIN":
        return superAdminItems;
      default:
        return [];
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Menu
        style={{ backgroundColor: '#1B232A' }}
        className="h-full m -6"
        onClick={handleMenuClick}
        mode="inline"
        items={getSlidebarItems()}
        selectedKeys={[selectedKey]} // Применяем выбранный ключ
        activeKey={selectedKey} // Также можно использовать activeKey, но selectedKeys предпочтительнее для Ant Design
      />
    </div>
  );
};

export default Slidebar;
