import React, { useState, useContext, useEffect } from "react";
import { Row, Menu, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { AuthContext } from "../services/auth";
import { AuthContextIntarface } from "../types/authTypes";
import { CarOutlined } from "@ant-design/icons";

const Header = () => {
  const { logout } = useContext(AuthContext) as AuthContextIntarface;
  const [visible, setVisible] = useState(false);

  const handleLogout = async () => {
    logout();
  };
  return (
    <Row
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "10vh",
        alignItems: "center",
        padding: "20px 40px",
        backgroundColor: "#3b82f6", // Потемненный цвет фона
        color:"white",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        position: "relative", // Позиция для управления вложенными элементами
      }}
    >
      <Col
        xs={6}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        style={{
          textAlign: "left",
          fontWeight: "bold",
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
          color:"white"
        }}
      >
        <CarOutlined style={{ fontSize: "30px", marginRight: "10px" }} />{" "}
        МАЗ Телематика
      </Col>

      <Col
        xs={3}
        sm={3}
        md={3}
        lg={3}
        xl={3}
        style={{
          textAlign: "center",
          position: "relative", // Указываем относительное позиционирование для колонки
          zIndex: 999,
        }}
      >
        <Button
          type="primary"
          onClick={() => setVisible(!visible)}
          style={{
            padding: "10px 15px",
            fontSize: "18px",
            backgroundColor: "#2196F3", // Новый цвет кнопки (синий)
            borderColor: "#2196F3", // Граница кнопки
            transition: "background-color 0.3s, transform 0.3s, color 0.3s",
            borderRadius: "5", // Убираем закругление
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLElement;
            target.style.color = "#FFFFFF"; // Белый текст
            target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLElement;
            target.style.color = "#FFFFFF"; // Возврат цвета текста
            target.style.transform = "scale(1)";
          }}
        >
          Профиль
        </Button>

        {visible && (
          <Menu
            style={{
              display: "block",
              width: "150px",
              position: "absolute", // Абсолютное позиционирование
              top: "100%", // Позиционирование под кнопкой
              left: "13%", // Установим его влево
              marginTop: "5px",
              borderRadius: "10px", // Убираем закругление
              border: "0.01px solid #2196F3",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#FFFFFF",
              height:'90px'
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
                    onClick={handleLogout}
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
