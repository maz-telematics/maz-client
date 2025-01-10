import React, { useState, useContext } from "react";
import { Grid, Col, Row, Layout, Divider, Badge, Spin } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../Store/store";
import { useGetCurrentUserQuery, useLogoutMutation } from "../../../Store/apis/authApi";
import { UserRole } from "../../../shared/constants";
import Slidebar from "../Slidebar/Slidebar";
import { AuthContext, useUser } from "../../../services/auth";
import { AuthContextIntarface } from "../../../Types/authTypes";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Импортируем иконку для выхода
import '../../../App.css'; // Убедитесь, что путь правильный

const { Content, Sider, Header } = Layout;
const { useBreakpoint } = Grid;

interface FormWrapperProps {
  children: React.ReactNode;
  menu: boolean;
}

const PageWrapper: React.FC<FormWrapperProps> = ({ children, menu }) => {
  const screen = useBreakpoint();

  return screen.xs ? (
    <MobileWrapper children={children} menu={menu} />
  ) : (
    <DestkopWrapper children={children} menu={menu} />
  );
};

const DestkopWrapper: React.FC<FormWrapperProps> = ({ children, menu }) => {
  const slidebarState = useSelector(
    (state: RootState) => state.slidebar.collapsedSlideBar
  );
  const { user } = useUser();
  const { data: userData, isLoading: isFetchingUser } = useGetCurrentUserQuery();
  const [logoutMutation] = useLogoutMutation();
  const { logout } = useContext(AuthContext) as AuthContextIntarface;
  const navigate = useNavigate();

  const logOut = () => {
    logout();
    logoutMutation();
  };

  return (
    <Layout style={{ backgroundColor: "#E1E1E1", minHeight: "100vh" }}>
      <Header
        style={{
          backgroundColor: "1B232A",
          padding: "0 20px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        {menu && (
          <Row
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Col
              sm={20}
              md={12}
              lg={10}
              xl={10}
              xxl={10}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Link to="/master/main">
                <img
                  src="/mazIcon1.svg"
                  alt="Maz Icon"
                  style={{
                    width: "64px",
                    height: "64px",
                    marginRight: "10px",
                    flexShrink: 0,
                    cursor: "pointer",
                  }}
                />
              </Link>
              <div>
                <h1
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "white",
                    margin: 0,
                    letterSpacing: "1px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: "1.2",
                  }}
                >
                  Телематика
                </h1>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: "white",
                    margin: 0,
                    letterSpacing: "0.5px",
                    lineHeight: "1.2",
                  }}
                >
                  отслеживание и мониторинг транспорта
                </h2>
              </div>
            </Col>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                gap: "25px", // Отступ между иконками
              }}
            >
              <Badge count={0} showZero>
                <MessageOutlined style={{ fontSize: "24px", color: "white" }} />
              </Badge>
             
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px", // Отступ между иконкой профиля и именем пользователя
                }}
              >
                <Link
                  className="icon-hover profile"
                  to='/master/profile' // Переход в профиль при клике
                >
                  <AccountBoxIcon
                    style={{ fontSize: "40px", color: "white" }}
                  />
                </Link>
                <span
                  style={{
                    fontSize: "14px",
                    color: "white",
                    lineHeight: "1.2",
                  }}
                >
                  {user?.name || "Никитка "}
                </span>
              </div>
              {/* Кнопка для выхода без раскрывающегося меню */}
              <div
                className="icon-hover exit"
                onClick={logOut}
              >
                <ExitToAppIcon 
                  style={{ fontSize: "36px", color: "white" }} 
                />
              </div>
            </Col>
          </Row>
        )}
      </Header>
      <Divider style={{ margin: 0, backgroundColor: "#C6C6C6" }} />
      <Layout style={{ backgroundColor: "#E1E1E1", marginTop: 66 }}>
        <Sider
          width={250}
          collapsed={slidebarState}
          theme="light"
          style={{
            backgroundColor: "#1B232A",
            minHeight: "100%",
            height: "auto",
            position: "fixed",
            top: 66,
            left: 0,
            zIndex: 99,
          }}
        >
          <Slidebar />
        </Sider>
        <Content
          style={{
            padding: 20,
            marginLeft: slidebarState ? 80 : 250,
            overflow: "hidden",
            backgroundColor: "#E1E1E1",
          }}
        >
          {isFetchingUser ? <Spin /> : children}
        </Content>
      </Layout>
    </Layout>
  );
};

const MobileWrapper: React.FC<FormWrapperProps> = ({ children, menu }) => {
  const slidebarState = useSelector(
    (state: RootState) => state.slidebar.collapsedSlideBar
  );
  return (
    <Layout style={{ height: "auto", minHeight: "100vh" }}>
      <div>
        <Header
          style={{
            backgroundColor: "white",
            padding: "0 20px",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
          }}
        >
          {menu && (
            <Row
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Col
                sm={20}
                md={12}
                lg={10}
                xl={10}
                xxl={10}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Link to="/master/main">
                  <img
                    src="/mazIcon1.svg"
                    alt="Maz Icon"
                    style={{
                      width: "64px",
                      height: "64px",
                      marginRight: "10px",
                      flexShrink: 0,
                      cursor: "pointer",
                    }}
                  />
                </Link>
                <div>
                  <h1
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#1B232A",
                      margin: 0,
                      letterSpacing: "1px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      lineHeight: "1.2",
                    }}
                  >
                    Телематика
                  </h1>
                  <h2
                    style={{
                      fontSize: "10px",
                      fontWeight: "400",
                      color: "#666",
                      margin: 0,
                    }}
                  >
                    отслеживание и мониторинг транспорта
                  </h2>
                </div>
              </Col>
            </Row>
          )}
        </Header>
      </div>
    </Layout>
  );
};

export default PageWrapper;
