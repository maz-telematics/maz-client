// src/pages/Archive/ArchivePage.tsx
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
// Типы данных
interface Transport {
  id: number;
  name: string;
  archivedDate: string;
}

interface Organization {
  id: number;
  name: string;
  archivedDate: string;
}

const ArchivePage: React.FC = () => {
  // Состояния для архивированных транспортных средств и организаций
  const [archivedTransports, setArchivedTransports] = useState<Transport[]>([]);
  const [archivedOrganizations, setArchivedOrganizations] = useState<Organization[]>([]);

  // Загрузка данных из архива (могут быть получены с сервера)
  useEffect(() => {
    // Пример данных
    const fetchArchivedData = async () => {
      const transports: Transport[] = [
        { id: 1, name: 'Bus #23', archivedDate: '2024-09-12' },
        { id: 2, name: 'Truck #11', archivedDate: '2024-09-05' },
      ];
      const organizations: Organization[] = [
        { id: 1, name: 'Transport Company A', archivedDate: '2024-08-21' },
        { id: 2, name: 'Logistics Ltd.', archivedDate: '2024-07-14' },
      ];
      setArchivedTransports(transports);
      setArchivedOrganizations(organizations);
    };

    fetchArchivedData();
  }, []);

  // Функции для восстановления или удаления из архива
  const restoreTransport = (id: number) => {
    setArchivedTransports((prev) => prev.filter((transport) => transport.id !== id));
    // Восстановление транспорта на сервере
  };

  const deleteTransport = (id: number) => {
    setArchivedTransports((prev) => prev.filter((transport) => transport.id !== id));
    // Удаление транспорта на сервере
  };

  const restoreOrganization = (id: number) => {
    setArchivedOrganizations((prev) => prev.filter((org) => org.id !== id));
    // Восстановление организации на сервере
  };

  const deleteOrganization = (id: number) => {
    setArchivedOrganizations((prev) => prev.filter((org) => org.id !== id));
    // Удаление организации на сервере
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      backgroundColor: "#F0F4F8",
      height: "100vh"
    }}>
      <Row style={{
        margin: "30px 40px 30px 40px",
        flex: "1",
      }}>
        <Col xs={24} >
          <Row justify="start" align="middle" style={{ marginBottom: 16 }}>
            <Col>
              <h1 style={{ margin: 0, color: '#1e40af' }}>Архив</h1>
            </Col>
          </Row>
          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Архивированные транспортные средства</h2>
            <ul style={listStyle}>
              {archivedTransports.map((transport) => (
                <li key={transport.id} style={listItemStyle}>
                  <div>
                    <strong>{transport.name}</strong> (архивировано: {transport.archivedDate})
                  </div>
                  <div>
                    <button onClick={() => restoreTransport(transport.id)} style={buttonStyle}>
                      Восстановить
                    </button>
                    <button onClick={() => deleteTransport(transport.id)} style={deleteButtonStyle}>
                      Удалить
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Архивированные организации</h2>
            <ul style={listStyle}>
              {archivedOrganizations.map((organization) => (
                <li key={organization.id} style={listItemStyle}>
                  <div>
                    <strong>{organization.name}</strong> (архивировано: {organization.archivedDate})
                  </div>
                  <div>
                    <button onClick={() => restoreOrganization(organization.id)} style={buttonStyle}>
                      Восстановить
                    </button>
                    <button onClick={() => deleteOrganization(organization.id)} style={deleteButtonStyle}>
                      Удалить
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </Col>
      </Row>
    </div>
  );
};

const sectionStyle = {
  marginBottom: '2rem',
};

const sectionTitleStyle = {
  fontSize: '1.5rem',
  color: '#374151',
  marginBottom: '1rem',
};

const listStyle = {
  listStyleType: 'none' as const,
  padding: 0,
};

const listItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.75rem 1rem',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  marginBottom: '1rem',
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#3b82f6',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '0.5rem',
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#e11d48',
};

export default ArchivePage;
