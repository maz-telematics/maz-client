// src/components/Navbar/Navbar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav style={{
      backgroundColor: "#5268b3",
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '200px',
      // height: '1000vh', // Занимает всю высоту страницы
    }}>
      <ul style={{
        listStyle: 'none' as const, // Используем 'as const' для TypeScript
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: '1.5rem',
        padding: '0',
        margin: '0',
      }}>
        <li style={{ fontSize: '1.2rem' }}>
          <NavLink
            to="/dashboard"
            style={({ isActive }) => ({
              textDecoration: 'none' as const,
              color: isActive ? '#3498db' : '#ecf0f1',
              fontWeight: 500,
              transition: 'color 0.3s ease',
              borderBottom: isActive ? '2px solid #3498db' : 'none',
            })}
          >
            Главная 
          </NavLink>
        </li>
        <li style={{ fontSize: '1.2rem' }}>
          <NavLink
            to="/transports"
            style={({ isActive }) => ({
              textDecoration: 'none' as const,
              color: isActive ? '#3498db' : '#ecf0f1',
              fontWeight: 500,
              transition: 'color 0.3s ease',
              borderBottom: isActive ? '2px solid #3498db' : 'none',
            })}
          >
            Транспорт
          </NavLink>
        </li>
        <li style={{ fontSize: '1.2rem' }}>
          <NavLink
            to="/organizations"
            style={({ isActive }) => ({
              textDecoration: 'none' as const,
              color: isActive ? '#3498db' : '#ecf0f1',
              fontWeight: 500,
              transition: 'color 0.3s ease',
              borderBottom: isActive ? '2px solid #3498db' : 'none',
            })}
          >
            Организации
          </NavLink>
        </li>
        <li style={{ fontSize: '1.2rem' }}>
          <NavLink
            to="/archive"
            style={({ isActive }) => ({
              textDecoration: 'none' as const,
              color: isActive ? '#3498db' : '#ecf0f1',
              fontWeight: 500,
              transition: 'color 0.3s ease',
              borderBottom: isActive ? '2px solid #3498db' : 'none',
            })}
          >
            Архив
          </NavLink>
        </li>
        <li style={{ fontSize: '1.2rem' }}>
          <NavLink
            to="/reports"
            style={({ isActive }) => ({
              textDecoration: 'none' as const,
              color: isActive ? '#3498db' : '#ecf0f1',
              fontWeight: 500,
              transition: 'color 0.3s ease',
              borderBottom: isActive ? '2px solid #3498db' : 'none',
            })}
          >
            Отчеты
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
