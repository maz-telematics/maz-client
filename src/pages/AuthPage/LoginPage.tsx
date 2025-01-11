import React, { useEffect, useState } from "react";
import { Form, Input, notification, Button, Row, Col, message, Spin, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../services/auth";
import axiosInstance from "../../services/axiosInstance";

import Outputs1 from "../../../public/gruzovik_reverse.png";
import Outputs2 from "../../../public/mazx.png";
import Outputs3 from "../../../public/gruzovik.png";
import Outputs4 from "../../../public/tyagach_reverse.png";
import Outputs5 from "../../../public/tyagach.png";
import Outputs6 from "../../../public/avtub_reverse.png";
import Outputs7 from "../../../public/avtub.png";
import Outputs8 from "../../../public/chinarik.png";
import LogoImage from "../../../public/mazIcon.png";

interface LoginProps {
  setToken: (token: string) => void;
  setIsAuthenticated: (isAuth: boolean) => void;
}

const LoginPage: React.FC<LoginProps> = ({ setToken, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const images = [Outputs1, Outputs2, Outputs3, Outputs4, Outputs5, Outputs6, Outputs7, Outputs8];

  const preloadImages = (sources: string[]) => {
    return Promise.all(
      sources.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
        });
      })
    );
  };

  useEffect(() => {
    preloadImages(images).then(() => {
      setImagesLoaded(true);
    });
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/login`, {
        username,
        password,
      });
      if (response.status === 200) {
        setToken(response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.id,
            role: response.data.role,
            name: response.data.name,
            token: response.data.token,
          })
        );
        setIsAuthenticated(true);
        setUser(response.data);
        navigateBasedOnRole(response.data.role);
        return Number(200);
      }
    } catch (error: any) {
      if (error.response?.status === 302) {
        return 302;
      } else {
        return 401;
      }
    } finally {
      setLoading(false);
    }
  };

  const navigateBasedOnRole = (role: string) => {
    switch (role) {
      case "ROLE_SUPERADMIN":
        navigate("master/main", { replace: true });
        break;
      case "ROLE_ADMIN":
        navigate("admin/main", { replace: true });
        break;
      case "ROLE_OPERATOR":
        navigate("/operator/main", { replace: true });
        break;
      case "ROLE_DIRECTOR":
        navigate("/head/main", { replace: true });
        break;
      case "ROLE_MANAGER":
        navigate("/manager/main", { replace: true });
        break;
      case "ROLE_MANUFACTURER":
        navigate("/mechanic/main", { replace: true });
        break;
      default:
        navigate("/", { replace: true });
    }
  };

  const handleLogin = async (values: any) => {
    try {
      const { username, password } = values;
      const result = await login(username, password);
      if (result === null) {
        message.error("Возникли проблемы при авторизации!");
      } else if (result === 200) {
        message.success("Авторизация успешна!");
      } else if (result === 401) {
        message.error("Неверный пароль или логин!");
      } else if (result === 302) {
        notification.error({
          message: "Срок подписки истек!",
          description:
            "Ваша подписка истекла. Для продолжения подписки, пожалуйста, свяжитесь с нашей службой поддержки по телефону: +375 (44) 44-44-444 или по электронной почте: support@example.com.",
          duration: 10,
        });
      } else {
        console.error("Возникли проблемы при авторизации!");
      }
    } catch (error) {
      message.error("Проблема с подключением. Пожалуйста, попробуйте позже.");
    }
  };

  const imageSources = [
    { src: Outputs1, direction: "left", size: { width: "220px", height: "100px" } },
    { src: Outputs2, direction: "right", size: { width: "130px", height: "90px" } },
    { src: Outputs6, direction: "left", size: { width: "250px", height: "95px" } },
    { src: Outputs5, direction: "left", size: { width: "205px", height: "73px" } },
    { src: Outputs3, direction: "right", size: { width: "220px", height: "100px" } },
    { src: Outputs2, direction: "right", size: { width: "130px", height: "90px" } },
    { src: Outputs4, direction: "right", size: { width: "205px", height: "73px" } },
    { src: Outputs6, direction: "left", size: { width: "250px", height: "95px" } },
    { src: Outputs7, direction: "right", size: { width: "250px", height: "95px" } },
    { src: Outputs8, direction: "left", size: { width: "230px", height: "80px" } },
  ];

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        backgroundColor: "#E1E1E1",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'FontRegular', Arial, sans-serif",
      }}
    >
      {!imagesLoaded && (
        <Spin
          size="large"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {loading && !imagesLoaded && (
        <Spin
          size="large"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        {imagesLoaded &&
          imageSources.map((image, index) => {
            const duration = Math.random() * 15 + 5;
            const gap = 14;
            const topPosition = `${index * gap + 10}vh`;

            return (
              <img
                key={index}
                src={image.src}
                style={{
                  position: "absolute",
                  width: image.size.width,
                  height: image.size.height,
                  left: image.direction === "right" ? "100%" : "-200px",
                  top: `calc(${topPosition} - ${image.size.height} / 2)`,
                  animation: `moving-${image.direction} ${duration}s linear infinite`,
                }}
              />
            );
          })}
      </div>

      <Col
        xs={16}
        sm={12}
        md={8}
        lg={5}
        xl={5}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "auto", // Высота будет автоматически подстраиваться
          minHeight: "500px", // Минимальная высота, чтобы не растягивалось сильно
          backgroundColor: "#CDCDCD",
          opacity: "90%",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={LogoImage}
            alt="Logo"
            style={{
              width: "144px",
              height: "96px",
            }}
          />
        </div>
        <div
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#1B232A",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          Авторизация
        </div>
        <Form
          onFinish={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "300px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#333333",
              marginBottom: "10px",
            }}
          >
            Логин
          </div>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Введите email" }, { type: "email", message: "Введите корректный email" }]}
          >
            <Input
              placeholder="Введите ваш логин"
              style={{
                borderRadius: "15px",
                backgroundColor: "#f7f7f7",
                color: "#333",
              }}
            />
          </Form.Item>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#333333",
              marginBottom: "10px",
            }}
          >
            Пароль
          </div>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <Input.Password
              placeholder="Введите ваш пароль"
              style={{
                borderRadius: "15px",
                backgroundColor: "#f7f7f7",
                color: "#333",
              }}
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[{ required: true, message: "Необходимо согласие с условиями!" }]}
          >
            <Checkbox>
              Я согласен с{" "}
              <Link to="/privacy-policy"  className="text-blue-500 hover:text-blue-700">
                условиями обработки данных
              </Link>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                backgroundColor: "#FE0201",
                border: "none",
                color: "white",
                fontWeight: "bold",
                borderRadius: "15px",
                height: "50px",
                marginTop: "20px",
              }}
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Col>

      <style>
        {`
          @keyframes moving-right {
            0% { left: 100%; }
            100% { left: -200px; }
          }
          @keyframes moving-left {
            0% { left: -200px; }
            100% { left: 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
