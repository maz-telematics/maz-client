import React, { useState, useContext } from "react";
import { Row, Menu, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { AuthContext } from "../services/auth";
import { AuthContextIntarface } from "../Types/authTypes";
import { CarOutlined } from "@ant-design/icons";

const Header: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  const { logout } = useContext(AuthContext) as AuthContextIntarface;
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Проверка ширины экрана для определения мобильного устройства
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleLogout = async () => {
    logout();
    setVisible(false); // Скрыть меню
  };

  const handleProfileClick = () => {
    setVisible(false); // Скрыть меню
  };

  return (
    <Row
      style={{
        display: "flex",
        flexWrap: "wrap", // Позволяет перенос элементов
        justifyContent: "space-between",
        alignItems: "center",
        height: "10vh",
        width: "100%",
        padding: isMobile ? "10px 15px" : "10px 20px", // Адаптивный padding
        backgroundColor: "#3b82f6",
        color: "white",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Col
        style={{
          display: "flex",
          alignItems: "center",
          flex: "1 1 auto",
          textAlign: isMobile ? "center" : "left", // Центрируем текст на мобильных
        }}
      >
        <CarOutlined
          style={{
            fontSize: isMobile ? "24px" : "30px", // Уменьшаем размер иконки на мобильных
            marginRight: "10px",
          }}
        />
        <span
          style={{
            fontWeight: "bold",
            fontSize: isMobile ? "16px" : "18px", // Уменьшаем размер текста на мобильных
            color: "white",
            whiteSpace: "nowrap", // Предотвращает перенос текста
          }}
        >
          МАЗ Телематика
        </span>
      </Col>

      <Col
        style={{
          flex: "0 1 auto",
          textAlign: "right",
          position: "relative",
          zIndex: 999,
        }}
      >
        <Button
          type="primary"
          onClick={() => setVisible(!visible)}
          style={{
            padding: "8px 12px",
            fontSize: isMobile ? "14px" : "16px", // Уменьшаем размер кнопки на мобильных
            backgroundColor: "#2196F3",
            borderColor: "#2196F3",
            borderRadius: "5px",
          }}
        >
          Профиль
        </Button>

        {visible && (
          <Menu
            style={{
              display: "block",
              width: "150px",
              position: "absolute",
              top: "100%",
              right: "0",
              marginTop: "5px",
              borderRadius: "10px",
              border: "0.01px solid #2196F3",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#FFFFFF",
              height: "90px",
            }}
            items={[
              {
                key: "1",
                label: (
                  <Link
                    to="/edit-profile"
                    style={{
                      display: "block",
                      color: "#333",
                    }}
                    onClick={handleProfileClick} // Закрытие меню
                  >
                    Профиль
                  </Link>
                ),
              },
              {
                key: "2",
                label: (
                  <a
                    href="/"
                    onClick={handleLogout} // Закрытие меню
                    style={{
                      display: "block",
                      color: "#333",
                    }}
                  >
                    Выйти
                  </a>
                ),
              },
            ]}
          />
        )}
      </Col>
    </Row>
  );
};

export default Header;
