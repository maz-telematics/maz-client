import React, { useContext } from "react";
import { Form, Input,notification, Button, Row, Col } from "antd";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useUser} from '../../services/auth'
import SvgIcon from '@mui/material/SvgIcon';
const apiUrl = import.meta.env.VITE_API_URL;
interface Point {
  x: number;
  y: number;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
interface LoginProps {
  setToken: (token: string) => void;
  setIsAuthenticated: (isAuth: boolean) => void; 
  setRole: (role:string) => void; 
}

const LoginPage: React.FC<LoginProps> = ({ setToken,setIsAuthenticated }) => {
  const navigate = useNavigate()
  const { setRole } = useUser(); 
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        username,
        password,
      });
      console.log(response)
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
        switch (response.data.role) {
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
            navigate("/", { replace: true }); // начальная страница, если роль не распознана
        }
        // navigate("/main", { replace: true });
        return Number(200);
      }
    } catch (error:any) {
      console.log(error)
      if(error.response.status==302){
        return 302;
      }else{
         return 401;
      }
     
    }
  };

  const handleLogin = async (values: any) => {
    try {
      const { username, password } = values;
      const result = await login(username, password);
      // console.log(result)
      if (result === null) {
        message.error("Возникли проблемы при авторизации!");
      } else if (result === 200) {
        message.success("Автоизация успешна!");
      } else if (result === 401) {
        message.error("Не верный пароль или логин!");
      } else if (result === 302) {
        notification.error({
          message: 'Срок подписки истек!',
          description: 'Ваша подписка истекла. Для продолжения подписки, пожалуйста, свяжитесь с нашей службой поддержки по телефону: +375 (44) 44-44-444 или по электронной почте: support@example.com.',
          duration: 10,  // Продолжительность отображения уведомления (в секундах)
      });
      } else {
        console.error("Возникли проблемы при авторизации!");
      }
    } catch (error) {
      message.error("Ошибка");
    }
  };


  const getIntersectionPoints = (lines: { x1: number; y1: number; x2: number; y2: number }[]) => {
    const points: Set<string> = new Set();
    lines.forEach(line => {
      points.add(`${line.x1},${line.y1}`);
      points.add(`${line.x2},${line.y2}`);
    });

    return Array.from(points).map(point => {
      const [x, y] = point.split(',').map(Number);
      return { x, y };
    });
  };

  // Функция для генерации линий (дорог)
  const generateRoadLines = (numLines: number): { x1: number; y1: number; x2: number; y2: number }[] => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const numSegments = 5; // Количество сегментов на линию
    for (let i = 0; i < numLines; i++) {
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * window.innerHeight;

      for (let j = 0; j < numSegments; j++) {
        const newX = x + (Math.random() * 200 - 100); // Увеличиваем или уменьшаем X
        const newY = y + (Math.random() * 200 - 100); // Увеличиваем или уменьшаем Y
        lines.push({ x1: x, y1: y, x2: newX, y2: newY });
        x = newX;
        y = newY;
      }
    }
    return lines;
  };

  const numLines =55; // Количество дорожных линий
  const roadLines = generateRoadLines(numLines);
  const intersectionPoints = getIntersectionPoints(roadLines);
  
  return (

    <div
    style={{
      height: "100vh",
      display: "flex",
      backgroundColor: "#F0F4F8",
      justifyContent: "center",
      alignItems: "center",
      position: 'relative',
      overflow: 'hidden',
    }}
  >


<svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      >
        {/* Рисуем дороги */}
        {roadLines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#3B82F6"
            strokeWidth="4"
            strokeDasharray="5,5" // Пунктирные линии для дороги
          />
        ))}

        {/* Рисуем точки на пересечениях линий */}
        {intersectionPoints.map((point, index) => (
          <circle key={index} cx={point.x} cy={point.y} r="6" fill="#FF5722" />
        ))}
         <defs>
          <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#A3C1FF', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

    
        {Array.from({ length: 30 }).map((_, index) => (
          <rect key={index} x="-200" y={`${Math.random() * 100}vh`} width="150" height="10" fill="url(#signalGradient)">
            <animate attributeName="x" from="-200" to="100%" dur={`${Math.random() * 20 + 6}s`} repeatCount="indefinite" />
          </rect>
        ))}
      </svg>
    <Col
      xs={22}
      sm={16}
      md={12}
      lg={8}
      xl={6}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "380px",
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: "10px",
        padding: "30px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        position: 'relative',
        zIndex: 2,
      }}
    >
      <Row style={{ display:'flex',justifyContent:"center", fontSize: "2rem", fontWeight: "bold", marginBottom: "20px", color: "#3B82F6" }}>
        Войти
      </Row>
      
      <Form onFinish={handleLogin}>
        <Form.Item
          label={<label style={{ fontSize: "14px", width:"55px",textAlign:"left", fontWeight: "bold", color: "#333333" }}>Логин</label>}
          name="username"
          rules={[{ required: true, message: "Введите логин" }]}
        >
          <Input placeholder="Введите ваш логин" style={{ borderRadius: "5px",  backgroundColor: "#f7f7f7", color: "#333" }} />
        </Form.Item>
        <Form.Item
          label={<label style={{ fontSize: "14px",width:"55px", textAlign:"left",fontWeight: "bold", color: "#333333" }}>Пароль</label>}
          name="password"
          rules={[{required: true,   message: "Введите пароль" }]}
          style={{marginTop:"30px", }}
        >
          <Input.Password placeholder="Введите ваш пароль" style={{ borderRadius: "5px",  backgroundColor: "#f7f7f7", color: "#333" }} />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "center", marginTop:"35px" }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "200px",
              backgroundColor: "#3B82F6",
              border: "none",
              color: "white",
              fontWeight: "bold",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Войти
          </Button>
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Button disabled type="link" style={{ color: "#3B82F6" }}>
            Забыли пароль?
          </Button>
        </Form.Item>
      </Form>
    </Col>
  </div>
  );
};

export default LoginPage;
