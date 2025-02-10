import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { Radio } from "antd";
import ArchivedTransportsTable from './ArchivedTransportsTable';
import ArchivedOrganizationsTable from './ArchiveOrganizationsTable';

const ArchivePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("transports");
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const onTabChange = (e: any) => {
    setActiveTab(e.target.value);
  };
  const getButtonBackgroundColor = (value: string) => {
    if (hoveredButton === value) return "#FF0000"; 
    if (activeTab === value) return "#FF0000";
    return "#1B232A"; 
  };


  const isMobile = window.innerWidth < 768;
  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      backgroundColor: "#E1E1E1",
    }}
    >
      <Row
        style={{
          padding: isMobile ? "0 20px" : "0 40px" ,
          flex: '1',
        }}
      >
        <Col xs={24}>
        <Row justify="space-between" style={{ marginBottom: 16, alignItems: 'flex-end' }}>
            <Col>
              <h1
                style={{
                  margin: 0,
                  fontSize: isMobile ? '24px' : '32px',
                }}
              >Архив</h1>
            </Col>
          </Row>
          <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Radio.Group
          value={activeTab}
          onChange={onTabChange}
          style={{
            display: "flex",
            flexWrap: isMobile ? "wrap" : "nowrap",
            flexDirection: isMobile ? "column" : "row", 
            width: "100%",
            marginBottom: isMobile ? "10px" : "0",
            gap: isMobile ? "10px" : "0", 
          }}
        >
          {["transports", "organizations", "employees"].map((tab) => (
            <Radio.Button
              key={tab}
              value={tab}
              style={{
                backgroundColor: getButtonBackgroundColor(tab),
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                margin: isMobile ? "0" : "0 5px",
                transition: "background-color 0.3s, color 0.3s",
                fontSize: isMobile ? "12px" : "14px",
                width: isMobile ? "100%" : "auto", 
                textAlign: "center",
                height: "40px", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={() => setHoveredButton(tab)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {tab === "transports" ? "Транспорт" : tab === "organizations" ? "Организации" : "Сотрудники"}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
      {activeTab === "transports" && 
       <ArchivedTransportsTable/>
      }
      {activeTab === "organizations" &&   <ArchivedOrganizationsTable/>}
      {activeTab === "employees" &&   <></>}
        </Col>
      </Row>
    </div>
  );
};

export default ArchivePage;