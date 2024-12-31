import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { roleRoutes } from '../../Routes/roleRoutes';
import { useUser } from "../../services/auth";

const Navbar: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  const { roleUser } = useUser();
  const routes = roleRoutes[roleUser || ''] || [];

  const defaultTab = routes.find((route) => route.label === "Главная")?.path || routes[0]?.path || '';

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('activeTab') || defaultTab;
  });

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  return (
    <nav 
    style={style}
    >
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
              onClick={() => setActiveTab(route.path)}
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
