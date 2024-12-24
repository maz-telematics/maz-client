// import React, { useContext } from "react";
// import { Form, Input, notification, Button, Row, Col } from "antd";
// import { message } from "antd";
// import { useNavigate } from "react-router-dom";
// import { useUser } from '../../services/auth'
// import axiosInstance from '../../services/axiosInstance';

// interface LoginProps {
//   setToken: (token: string) => void;
//   setIsAuthenticated: (isAuth: boolean) => void;
//   setRole: (role: string) => void;
// }

// const LoginPage: React.FC<LoginProps> = ({ setToken, setIsAuthenticated }) => {
//   const navigate = useNavigate()
//   const { setRole } = useUser();
//   const login = async (username: string, password: string) => {
//     try {
//       const response = await axiosInstance.post(`/login`, {
//         username,
//         password,
//       });
//       if (response.status === 200) {
//         setToken(response.data.token);
//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             id: response.data.id,
//             role: response.data.role,
//             name: response.data.name,
//             token: response.data.token,
//           })
//         );
//         setIsAuthenticated(true);
//         setRole(response.data.role);
//         switch (response.data.role) {
//           case "ROLE_SUPERADMIN":
//             navigate("super-admin/main", { replace: true });
//             break;
//           case "ROLE_ADMIN":
//             navigate("admin/main", { replace: true });
//             break;
//           case "ROLE_OPERATOR":
//             navigate("/operator/main", { replace: true });
//             break;
//           case "ROLE_DIRECTOR":
//             navigate("/director/main", { replace: true });
//             break;
//           case "ROLE_MANAGER":
//             navigate("/manager/main", { replace: true });
//             break;
//           case "ROLE_MANUFACTURER":
//             navigate("/mechanic/main", { replace: true });
//             break;
//           default:
//             navigate("/", { replace: true });
//         }
//         return Number(200);
//       }
//     } catch (error: any) {
//       if (error.response.status == 302) {
//         return 302;
//       } else {
//         return 401;
//       }

//     }
//   };

//   const handleLogin = async (values: any) => {
//     try {
//       const { username, password } = values;
//       const result = await login(username, password);
//       if (result === null) {
//         message.error("Возникли проблемы при авторизации!");
//       } else if (result === 200) {
//         message.success("Авторизация успешна!");
//       } else if (result === 401) {
//         message.error("Не верный пароль или логин!");
//       } else if (result === 302) {
//         notification.error({
//           message: 'Срок подписки истек!',
//           description: 'Ваша подписка истекла. Для продолжения подписки, пожалуйста, свяжитесь с нашей службой поддержки по телефону: +375 (44) 44-44-444 или по электронной почте: support@example.com.',
//           duration: 10,
//         });
//       } else {
//         console.error("Возникли проблемы при авторизации!");
//       }
//     } catch (error) {
//       message.error("Проблема с подключением. Пожалуйста, попробуйте позже.");
//     }
//   };


//   const getIntersectionPoints = (lines: { x1: number; y1: number; x2: number; y2: number }[]) => {
//     const points: Set<string> = new Set();
//     lines.forEach(line => {
//       points.add(`${line.x1},${line.y1}`);
//       points.add(`${line.x2},${line.y2}`);
//     });

//     return Array.from(points).map(point => {
//       const [x, y] = point.split(',').map(Number);
//       return { x, y };
//     });
//   };

//   const generateRoadLines = (numLines: number): { x1: number; y1: number; x2: number; y2: number }[] => {
//     const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
//     const numSegments = 5;
//     for (let i = 0; i < numLines; i++) {
//       let x = Math.random() * window.innerWidth;
//       let y = Math.random() * window.innerHeight;

//       for (let j = 0; j < numSegments; j++) {
//         const newX = x + (Math.random() * 200 - 100);
//         const newY = y + (Math.random() * 200 - 100);
//         lines.push({ x1: x, y1: y, x2: newX, y2: newY });
//         x = newX;
//         y = newY;
//       }
//     }
//     return lines;
//   };

//   const numLines = 55;
//   const roadLines = generateRoadLines(numLines);
//   const intersectionPoints = getIntersectionPoints(roadLines);

//   return (

//     <div
//       style={{
//         height: "100vh",
//         display: "flex",
//         backgroundColor: "#F0F4F8",
//         justifyContent: "center",
//         alignItems: "center",
//         position: 'relative',
//         overflow: 'hidden',
//       }}
//     >


//       <svg
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           zIndex: 1,
//         }}
//       >
//         {roadLines.map((line, index) => (
//           <line
//             key={index}
//             x1={line.x1}
//             y1={line.y1}
//             x2={line.x2}
//             y2={line.y2}
//             stroke="#3B82F6"
//             strokeWidth="4"
//             strokeDasharray="5,5"
//           />
//         ))}
//         {intersectionPoints.map((point, index) => (
//           <circle key={index} cx={point.x} cy={point.y} r="6" fill="#FF5722" />
//         ))}
//         <defs>
//           <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
//             <stop offset="100%" style={{ stopColor: '#A3C1FF', stopOpacity: 1 }} />
//           </linearGradient>
//         </defs>
//         {Array.from({ length: 30 }).map((_, index) => (
//           <rect key={index} x="-200" y={`${Math.random() * 100}vh`} width="150" height="10" fill="url(#signalGradient)">
//             <animate attributeName="x" from="-200" to="100%" dur={`${Math.random() *          20 + 6}s`} repeatCount="indefinite" />
//           </rect>
//         ))}
//       </svg>
//       <Col
//         xs={16}
//         sm={16}
//         md={12}
//         lg={8}
//         xl={6}
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           width: "100%",
//           maxWidth: "380px",
//           backgroundColor: "rgb(255, 255, 255)",
//           borderRadius: "10px",
//           padding: "30px",
//           boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
//           position: 'relative',
//           zIndex: 2,
//         }}
//       >
//         <Row style={{ display: 'flex', justifyContent: "center", fontSize: "2rem", fontWeight: "bold", marginBottom: "20px", color: "#3B82F6" }}>
//           Войти
//         </Row>

//         <Form onFinish={handleLogin}>
//           <Form.Item
//             label={
//               <label
//                 style={{
//                   fontSize: "14px",
//                   width: "55px",
//                   textAlign: "left",
//                   fontWeight: "bold",
//                   color: "#333333",
//                 }}
//               >
//                 Логин
//               </label>
//             }
//             name="username"
//             rules={[
//               { required: true, message: "Введите email" },
//               {
//                 type: "email",
//                 message: "Введите корректный email",
//               },
//             ]}
//           >
//             <Input placeholder="Введите ваш логин" style={{ borderRadius: "5px", backgroundColor: "#f7f7f7", color: "#333" }} />
//           </Form.Item>
//           <Form.Item
//             label={<label style={{ fontSize: "14px", width: "55px", textAlign: "left", fontWeight: "bold", color: "#333333" }}>Пароль</label>}
//             name="password"
//             rules={[{ required: true, message: "Введите пароль" }]}
//             style={{ marginTop: "30px", }}
//           >
//             <Input.Password placeholder="Введите ваш пароль" style={{ borderRadius: "5px", backgroundColor: "#f7f7f7", color: "#333" }} />
//           </Form.Item>
//           <Form.Item style={{ display: "flex", justifyContent: "center", marginTop: "35px" }}>
//             <Button
//               type="primary"
//               htmlType="submit"
//               style={{
//                 width: "200px",
//                 backgroundColor: "#3B82F6",
//                 border: "none",
//                 color: "white",
//                 fontWeight: "bold",
//                 padding: "10px",
//                 borderRadius: "5px",
//               }}
//             >
//               Войти
//             </Button>
//           </Form.Item>
//         </Form>
//       </Col>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useEffect, useState } from "react";
import { Form, Input, notification, Button, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../services/auth";
import axiosInstance from "../../services/axiosInstance";

// Импортируем изображения из папки public
import Outputs1 from "../../../public/gruzovik_reverse.png";
import Outputs2 from "../../../public/mazx.png";
import Outputs3 from "../../../public/gruzovik.png";
import Outputs4 from "../../../public/tyagach_reverse.png";
import Outputs5 from "../../../public/tyagach.png";
import Outputs6 from "../../../public/avtub_reverse.png";
import Outputs7 from "../../../public/avtub.png";
import Outputs8 from "../../../public/chinarik.png";
import LogoImage from "../../../public/МАЗ_Логотип_без_рамки.png";

interface LoginProps {
  setToken: (token: string) => void;
  setIsAuthenticated: (isAuth: boolean) => void;
}

const LoginPage: React.FC<LoginProps> = ({ setToken, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { setRole } = useUser();

  const [imagesLoaded, setImagesLoaded] = useState(false);

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
        setRole(response.data.role);
        navigateBasedOnRole(response.data.role);
        return Number(200);
      }
    } catch (error: any) {
      if (error.response?.status === 302) {
        return 302;
      } else {
        return 401;
      }
    }
  };

  const navigateBasedOnRole = (role: string) => {
    switch (role) {
      case "ROLE_SUPERADMIN":
        navigate("super-admin/main", { replace: true });
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
        fontFamily: "'FontRegular', Arial, sans-serif", // Применяем шрифт здесь
      }}
    >
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

            return (
              <img
                key={index}
                src={image.src}
                style={{
                  position: "absolute",
                  width: image.size.width,
                  height: image.size.height,
                  left: image.direction === "right" ? "100%" : "-200px",
                  top: `${(index + 1) * (100 / (imageSources.length + 1)) - 5}vh`,
                  animation: `moving-${image.direction} ${duration}s linear infinite`,
                }}
              />
            );
          })}
      </div>

      <Col
        xs={16}
        sm={16}
        md={12}
        lg={8}
        xl={6}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "380px",
          height: "500px",
          backgroundColor: "#CDCDCD",
          opacity:"90%",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: "auto", paddingTop: "20px" }}
        >
          <img
            src={LogoImage}
            alt="Logo"
            style={{
              width: "132px",
              height: "84px",
            }}
          />
        </div>
        <div>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "40px",
              color: "#1B232A",
            }}
          >
            Авторизация
          </Row>

          <Form onFinish={handleLogin}>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#333333",
                marginBottom: "10px",
                marginLeft: "50px", // Сдвигаем заголовки на 10px влево
              }}
            >
              Логин
            </div>
            <Form.Item
              name="username"
              rules={[{ message: "Введите email" }, { type: "email", message: "Введите корректный email" }]}
            >
              <Input
                placeholder="Введите ваш логин"
                style={{
                  borderRadius: "15px",
                  backgroundColor: "#f7f7f7",
                  color: "#333",
                  marginLeft: "44px",
                  marginRight: "auto",
                  width: "250px", // Поле по центру
                }}
              />
            </Form.Item>

            <div
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#333333",
                marginBottom: "5px",
                marginTop: "10px",
                marginLeft: "50px", // Сдвигаем заголовки на 10px влево
              }}
            >
              Пароль
            </div>
            <Form.Item name="password" rules={[{ message: "Введите пароль" }]}>
              <Input.Password
                placeholder="Введите ваш пароль"
                style={{
                  borderRadius: "15px",
                  backgroundColor: "#f7f7f7",
                  color: "#333",
                  marginLeft: "44px",
                  marginRight: "auto",
                  width: "250px", // Поле по центру
                }}
              />
            </Form.Item>

            <Form.Item
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "75px",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  margin: "-10px",
                  width: "250px",
                  justifyContent: "center",
                  backgroundColor: "#FE0201",
                  border: "none",
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px",
                  borderRadius: "15px",
                  height: "50px",
                }}
              >
                Войти
              </Button>
            </Form.Item>
          </Form>
        </div>

        
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
