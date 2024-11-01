import React from 'react';
import { NavLink } from 'react-router-dom';
import { roleRoutes } from '../../routes/roleRoutes';
import { useUser } from "../../services/auth";

const Navbar: React.FC = () => {
  // const role = useUserRole();
  const { roleUser } = useUser();
  const routes = roleRoutes[roleUser || ''] || [];

  return (
    <nav style={{
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
              style={({ isActive }) => ({
              textDecoration: 'none' as const,
              color: isActive ? '#3498db' : '#ecf0f1',
              fontWeight: 500,
              transition: 'color 0.3s ease',
              borderBottom: isActive ? '2px solid #3498db' : 'none',
            })}
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
