import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { roleRoutes } from '../../routes/roleRoutes';
import { useUser } from "../../services/auth";

const Navbar: React.FC = () => {
  const { roleUser } = useUser();
  const routes = roleRoutes[roleUser || ''] || [];

  // Состояние активной вкладки
  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('activeTab') || routes[0]?.path || '';
  });

  // Сохраняем выбранную вкладку в localStorage
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  return (
    <nav style={{
            // position: "fixed",
            // top: "0",
            // left: "0",
            // zIndex:"998",
            // height:"100%",
            backgroundColor: "#5268b3",
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '200px',
          }}>
      <ul style={{
        listStyle: 'none' as const,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: '1.5rem',
        padding: '0',
        margin: '0',
      }}>
        {routes.map((route) => (
          <li key={route.path} style={{ fontSize: '1.2rem' }}>
            <NavLink
              to={route.path}
              style={{
                textDecoration: 'none',
                color: activeTab === route.path ? '#3498db' : '#ecf0f1',
                fontWeight: 500,
                transition: 'color 0.3s ease',
                borderBottom: activeTab === route.path ? '2px solid #3498db' : 'none',
              }}
              onClick={() => setActiveTab(route.path)} // Меняем активную вкладку при клике
            >
              {route.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
