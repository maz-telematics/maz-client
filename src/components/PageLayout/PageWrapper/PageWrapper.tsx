
import React, { useState } from "react";
import { Grid, Col, Row, Layout, Divider, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import Slidebar from "../Slidebar/Slidebar";
import { RootState } from "../../../Store/store";
import { MenuInfo } from "rc-menu/lib/interface";
import { useUser } from "../../../services/auth";
import { showSuperAdminMain, showSuperAdminTransports, showSuperAdminOrganizations, showSuperAdminEmpoyess, showSuperAdminReports, showSuperAdminArchive } from "../../../Store/utils/superAdminModuleViewSlice";
import { superAdminItems } from "../Slidebar/slidebarTools";

interface FormWrapperProps {
  children: React.ReactNode;
  menu: boolean;
}
const { Content, Sider, Header } = Layout;
const { useBreakpoint } = Grid;

const PageWrapper: React.FC<FormWrapperProps> = ({ children, menu }) => {
  const screen = useBreakpoint();

  return screen.xs ? (
    <MobileWrapper children={children} menu={menu} />
  ) : (
    <DestkopWrapper children={children} menu={menu} />
  );
};


const DestkopWrapper: React.FC<FormWrapperProps> = ({ children, menu }) => {
  const slidebarState = useSelector((state: RootState) => state.slidebar.collapsedSlideBar);
  
  const dispatch = useDispatch();
  const [selectedKey, setSelectedKey] = useState<string>("")
  const { user, isLoading } = useUser();
  
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
    <Layout
      style={{
        backgroundColor: "#E1E1E1",
        minHeight: '100vh', // Обеспечиваем минимальную высоту для Layout
      }}
    >
      <Header
        style={{
          backgroundColor: 'white',
          padding: '0 20px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        {menu && (
          <Row style={{ width: '100%', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Col sm={20} md={12} lg={10} xl={10} xxl={10} style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/mazIcon1.svg"
                alt="Maz Icon"
                style={{
                  width: '64px',
                  height: '64px',
                  marginRight: '10px',
                  flexShrink: 0,
                }}
              />
              <div>
                <h1
                  style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#1B232A',
                    margin: 0,
                    letterSpacing: '1px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: '1.2',
                  }}
                >
                  Телематика
                </h1>
                <h2
                  style={{
                    fontSize: '16px',
                    fontWeight: '400',
                    color: '#666',
                    margin: 0,
                    letterSpacing: '0.5px',
                    lineHeight: '1.2',
                  }}
                >
                  отслеживание и мониторинг транспорта
                </h2>
              </div>
            </Col>
            <Col sm={9} md={6} lg={5} xl={4} xxl={3}>
              <HeaderMenu />
            </Col>
          </Row>
        )}
      </Header>
{/* <Header
  style={{
    backgroundColor: 'white',
    padding: '0 20px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  }}
>
  <Row style={{ width: '100%', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
 
    <Col sm={20} md={12} lg={10} xl={10} xxl={10} style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src="/mazIcon1.svg"
        alt="Maz Icon"
        style={{
          width: '64px',
          height: '64px',
          marginRight: '10px',
          flexShrink: 0,
        }}
      />
      <div>
        <h1
          style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#1B232A',
            margin: 0,
            letterSpacing: '1px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '1.2',
          }}
        >
          Телематика
        </h1>
        <h2
          style={{
            fontSize: '16px',
            fontWeight: '400',
            color: '#666',
            margin: 0,
            letterSpacing: '0.5px',
            lineHeight: '1.2',
          }}
        >
          отслеживание и мониторинг транспорта
        </h2>
      </div>
    </Col>

    <Col sm={9} md={12} lg={14} xl={14} xxl={14} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <div
        style={{
          display: 'flex',
          width: '100%', // Заполняем ширину родителя
          justifyContent: 'space-between', // Распределяем вкладки равномерно
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        {[  
          { label: "Главная", key: "main" },
          { label: "Транспорты", key: "transports" },
          { label: "Организации", key: "organizations" },
          { label: "Сотрудники", key: "employees" },
          { label: "Отчеты", key: "reports" },
          { label: "Архив", key: "archive" },
        ].map((tab) => (
          <div
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            style={{
              flex: 1, // Растягиваем вкладку равномерно
              textAlign: 'center', // Центрируем текст
              color: 'black',
              fontWeight: selectedKey === tab.key ? '600' : '400',
              cursor: 'pointer',
              borderBottom: selectedKey === tab.key ? '2px solid #E1E1E1' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </Col>
  </Row>
</Header>  */}


      <Divider style={{ margin: 0, backgroundColor: "#C6C6C6" }} />
      <Layout
        style={{
          backgroundColor: "#E1E1E1",
          marginTop: 66, // Высота Header
        }}
      >
        <Sider
          width={250}
          collapsed={slidebarState}
          theme="light"
          style={{
            backgroundColor: '#1B232A',
            minHeight: '100%', 
            height: 'auto',
            position: 'fixed',
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
            marginLeft: slidebarState ? 80 : 250, // Учитываем ширину Sider
            overflow: 'hidden', // Убираем лишний скролл
            backgroundColor: '#E1E1E1',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

const isMobile = window.innerWidth < 768;

const MobileWrapper: React.FC<FormWrapperProps> = ({ children,menu }) => {
  const slidebarState = useSelector((state: RootState) => state.slidebar.collapsedSlideBar);
  return (
    <Layout style={{ height: "auto", minHeight: "100vh" }}>
      <div>
         <Header
        style={{
          backgroundColor: 'white',
          padding: '0 20px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        {menu && (
          <Row style={{ width: '100%', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Col sm={20} md={12} lg={10} xl={10} xxl={10} style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/mazIcon1.svg"
                alt="Maz Icon"
                style={{
                  width: '64px',
                  height: '64px',
                  marginRight: '10px',
                  flexShrink: 0,
                }}
              />
              <div>
                <h1
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1B232A',
                    margin: 0,
                    letterSpacing: '1px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: '1.2',
                  }}
                >
                  Телематика
                </h1>
                <h2
                  style={{
                    fontSize: '10px',
                    fontWeight: '400',
                    color: '#666',
                    margin: 0,
                    // letterSpacing: '0.5px',
                    lineHeight: '1.2',
                  }}
                >
                  
                  {!isMobile && 'отслеживание и мониторинг транспорта'}
                </h2>
              </div>
            </Col>
            <Col sm={9} md={6} lg={5} xl={4} xxl={3}>
              <HeaderMenu />
            </Col>
          </Row>
        )}
      </Header>
        <Divider style={{ margin: 0, backgroundColor: "#C6C6C6" }} />
      </div>
      <Layout >
        <Sider collapsed={slidebarState} theme="light" defaultCollapsed={true} style={{
            backgroundColor: '#1B232A',
            minHeight: '100%', 
            height: 'auto',
            position: 'fixed',
            top: 66,
            left: 0,
            zIndex: 99,
        }}>
          <Slidebar />
        </Sider>
        <Content style={{  
            paddingTop: 80,
            marginLeft: slidebarState ? 80 : 250, // Учитываем ширину Sider
            overflow: 'hidden', // Убираем лишний скролл
            backgroundColor: '#E1E1E1',
           }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default PageWrapper;
