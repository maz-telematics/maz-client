import React, { useState, useContext } from "react";
import { DownOutlined } from "@ant-design/icons";
import { logout as clearLocalStorage } from "../../../middlewares/authProvider";
import { UserRole } from "../../../shared/constants";
import { useGetCurrentUserQuery, useLogoutMutation } from "../../../Store/apis/authApi";
import { Button, Dropdown, MenuProps, Space, Spin } from "antd";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import { AuthContext, useUser } from "../../../services/auth";
import { AuthContextIntarface } from "../../../types/authTypes";

interface MenuItem {
  id: string;
  defaultMessage: string;
  key: string;
  requiredRole?: UserRole;
  path?: string;
  onClick?: () => void;
}

const HeaderMenu = () => {
  const { user } = useUser();
  const { logout } = useContext(AuthContext) as AuthContextIntarface;
  const { data: userData, isLoading: isFetchingUser } = useGetCurrentUserQuery();
  const [logoutMutation] = useLogoutMutation();
  const intl = useIntl();

  const logOut = () => {
    logoutMutation();
    clearLocalStorage();
  };

  const menuItems: MenuItem[] = [
    {
      id: "driverProfile.inviteDriver",
      defaultMessage: "Invite driver",
      key: "invite-driver",
      requiredRole: UserRole.DRIVER,
      path: "/invite-driver",
    },
    {
      id: "profilePage",
      defaultMessage: "Профиль", 
      key: "profile",
      path: "/master/profile", 
    },
    {
      id: "driverProfile.logOut",
      defaultMessage: "Выйти",  
      key: "log-out",
      onClick: logout,
    },
  ];

  const items: MenuProps["items"] = menuItems
    .filter(
      (item) => !item.requiredRole || userData?.role.name === item.requiredRole
    )
    .map((item) => {
      const message = intl.formatMessage({
        id: item.id,
        defaultMessage: item.defaultMessage,
      });

      const label = item.path ? (
        <Link to={item.path} className="font-rubik text-text">
          {message}
        </Link>
      ) : (
        <span className="font-rubik text-text">Выйти</span>
      );

      return {
        label,
        key: item.key,
        onClick: item.onClick,
      };
    });

  return (
    <Dropdown menu={{ items }} trigger={["click"]} className="font-rubik">
      <Button block>
        {isFetchingUser ? (
          <Spin />
        ) : (
          <Space>
            {`${user?.name}`}
            <DownOutlined />
          </Space>
        )}
      </Button>
    </Dropdown>
  );
};

export default HeaderMenu;
