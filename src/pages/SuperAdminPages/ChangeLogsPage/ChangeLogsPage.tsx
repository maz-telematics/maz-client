import { Row, Col } from "antd";
import React from "react";


const ChangeLogsPage: React.FC = () => {
    // return <h2 style={{ padding: "20px" }}>Журнал изменений</h2>;
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
                    padding: isMobile ? "0 20px" : "0 40px",
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
                </Col>
            </Row>
        </div>
    )
};

export default ChangeLogsPage;
