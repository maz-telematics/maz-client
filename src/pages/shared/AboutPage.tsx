import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Row, Col, Button, Typography, Card, Image } from 'antd';

const { Title, Paragraph } = Typography;

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate('/'); // Переход на страницу входа
  };

  const handleAboutProject = () => {
    navigate('/about'); 
  };

  return (
    <div className="min-h-screen flex flex-col">
   <header className="bg-white fixed top-0 left-0 right-0 z-10 shadow-md">
      <div className="container mx-auto px-0 py-2 flex justify-between items-center">
        {/* max-w-6xl  */}
        <div className="flex items-center">
          <img
            src="/mazIcon1.svg"
            alt="Maz Icon"
            className="w-14 h-14 mr-4"
          />
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Телематика</h1>
            <h2 className="text-sm font-normal text-gray-600">
              отслеживание и мониторинг транспорта
            </h2>
          </div>
        </div>
        
        <div className="hidden md:flex space-x-4">
        <button
  onClick={handleAboutProject}
  className="px-5 py-2 text-base text-gray-600 bg-transparent rounded-md font-semibold hover:bg-gray-100 focus:outline-none focus:ring-0 transition-all duration-200 ease-in-out"
>
  О проекте
</button>
<button
  onClick={handleLogin}
  className="px-5 py-1.5 text-base bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 ease-in-out"
>
  Войти
</button>
        </div>

        <div className="md:hidden">
          <IconButton
            onClick={handleMenuOpen}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleAboutProject}>О проекте</MenuItem>
            <MenuItem onClick={handleLogin}>Войти</MenuItem>
          </Menu>
        </div>
      </div>
    </header>

      <main className="container mx-auto px-4 py-20 mt-10 flex-1 max-w-full lg:max-w-7xl xl:max-w-9xl 2xl:max-w-10xl">
        <div className="prose max-w-6xl mx-auto text-gray-800 space-y-3">
          <Row justify="center">
            <Col xs={24} sm={20} md={18} lg={18}>
              <Paragraph className="text-center text-2xl font-bold mb-6">
              Система телематики МАЗ отслеживает транспорт, его маршруты и технические параметры, обеспечивая реальную расшифровку ошибок.
              </Paragraph>
            </Col>
          </Row>

          <Row gutter={[16, 16]} justify="center" className="mt-8">
            <Col xs={24} sm={18} md={16} lg={22} className="flex justify-center">
              <Card className="w-full shadow-md mb-6">
                <Image
                  className="rounded-lg"
                  width="100%"
                  src="https://via.placeholder.com/800x400.png?text=Tracking+Route"
                  alt="Tracking Route"
                />
                {/* Увеличиваем размер текста в параграфах */}
                <Paragraph className="mt-4 text-xl">
                  Транспортные средства могут быть отслежены на интерактивной карте с точной локацией и историей маршрута.
                  Система обновляет данные в реальном времени, предоставляя актуальную информацию для диспетчеров и менеджеров.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={18} md={16} lg={22} className="flex justify-center">
              <Card className="w-full shadow-md mb-6">
                <Card.Meta
                  title="Основные параметры"
                  description={
                    <div className="text-xl">
                      <div><strong>Температура двигателя:</strong> +85°C</div>
                      <div><strong>Уровень топлива:</strong> 75%</div>
                      <div><strong>Скорость:</strong> 80 км/ч</div>
                      <div><strong>Ошибки:</strong> Проблемы с датчиком температуры</div>
                    </div>
                  }
                />
                <Paragraph className="mt-4 text-xl">
                  Система телематики собирает данные о параметрах работы транспортного средства,
                  таких как температура двигателя, уровень топлива, скорость. В случае возникновения ошибок,
                  система уведомляет оператора и расшифровывает их для принятия мер.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={18} md={16} lg={22} className="flex justify-center">
              <Card className="w-full shadow-md mb-6">
                <Paragraph className="text-xl">
                  Система предоставляет гибкие возможности для организаций, желающих интегрировать
                  телематику с их бизнес-процессами. Через безопасный веб-интерфейс можно настроить
                  доступ к данным, получать отчеты и анализировать эффективность работы транспорта.
                </Paragraph>
                <Paragraph className="text-xl">
                  Организации могут подключать свои транспортные средства и получать персонализированные
                  данные о техническом состоянии и маршрутах.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
