import { Row, Col, Typography } from "antd";
import { AppstoreAddOutlined } from '@ant-design/icons';

const FirmwaresPage: React.FC = () => {

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
              >
                Прошивки
              </h1>
            </Col>
          </Row>
          <Row justify="center" align="middle" style={{ marginTop: 20 }}>
            <Col>
              <Typography.Text
                style={{
                  fontSize: '20px',
                  color: '#333',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <AppstoreAddOutlined
                  style={{
                    marginRight: 12,
                    fontSize: '48px',
                    color: '#f39c12',
                    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
                    borderRadius: '50%',
                    padding: '10px',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                />
                Страница находится в разработке
              </Typography.Text>
            </Col>
          </Row>

        </Col>
      </Row>
    </div>
  );
};

export default FirmwaresPage;
