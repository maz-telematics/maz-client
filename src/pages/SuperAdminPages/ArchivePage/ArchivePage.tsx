import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

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
  const [archivedTransports, setArchivedTransports] = useState<Transport[]>([]);
  const [archivedOrganizations, setArchivedOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
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

  const restoreTransport = (id: number) => {
    setArchivedTransports((prev) => prev.filter((transport) => transport.id !== id));
  };

  const deleteTransport = (id: number) => {
    setArchivedTransports((prev) => prev.filter((transport) => transport.id !== id));
  };

  const restoreOrganization = (id: number) => {
    setArchivedOrganizations((prev) => prev.filter((org) => org.id !== id));
  };

  const deleteOrganization = (id: number) => {
    setArchivedOrganizations((prev) => prev.filter((org) => org.id !== id));
  };
  const isMobile = window.innerWidth < 768;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#E1E1E1',
        height: '100vh',
      }}
    >
      <Row
        style={{
          padding: '0 40px',
          flex: '1',
        }}
      >
        <Col xs={24}>
          <Row justify="start" align="middle" style={{ marginBottom: 16 }}>
            <Col>
              <h1
                style={{
                  margin: 0,
                  fontSize: isMobile ? '24px' : '32px',
                }}
              >Архив</h1>
            </Col>
          </Row>
          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Архивированные транспортные средства</h2>
            <ul style={listStyle}>
              {archivedTransports.map((transport) => (
                <li key={transport.id} style={listItemStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{ ...itemTextStyle, marginRight: '1rem' }}> {/* Added marginRight */}
                      <strong>{transport.name}</strong> <br />
                      <span style={{ fontSize: '0.9rem', color: '#555' }}>
                        (архивировано: {transport.archivedDate})
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        icon={<RestoreOutlinedIcon />}
                        onClick={() => restoreTransport(transport.id)}
                        style={responsiveButtonStyle}
                      >
                          {!isMobile && 'Востановить транспорт'}
                      </Button>
                      <Button
                        icon={<DeleteOutlineOutlinedIcon />}
                        onClick={() => deleteTransport(transport.id)}
                        style={responsiveButtonStyle}
                      >  {!isMobile && 'Удалить транспорт'}</Button>
                    </div>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{ ...itemTextStyle, marginRight: '1rem' }}> {/* Added marginRight */}
                      <strong>{organization.name}</strong> <br />
                      <span style={{ fontSize: '0.9rem', color: '#555' }}>
                        (архивировано: {organization.archivedDate})
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        icon={<RestoreOutlinedIcon />}
                        onClick={() => restoreOrganization(organization.id)}
                        style={responsiveButtonStyle}
                      >
                            {!isMobile && 'Востановить организацию'}
                      </Button>
                      <Button
                        icon={<DeleteOutlineOutlinedIcon />}
                        onClick={() => deleteOrganization(organization.id)}
                        style={responsiveButtonStyle}
                      >  {!isMobile && 'Удалить организацию'}</Button>
                    </div>
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
const isMobile = window.innerWidth < 768;
const sectionStyle = {
  marginBottom: '2rem',
};

const sectionTitleStyle = {
 fontSize: isMobile ? '18px' : '24px',
  // color: '#374151',
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
  margin: 0,
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  marginBottom: '1rem',
  flexWrap: 'wrap' as const,
};

const itemTextStyle = {
  flex: '1 1 auto',
  marginBottom: '0.5rem',
};

const responsiveButtonStyle = {
  padding: '0.5rem',
  backgroundColor: '#3A5F73',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '0.5rem',
};

export default ArchivePage;