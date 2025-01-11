import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate('/'); 
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
    <main className="container mx-auto px-4 py-20 mt-8 flex-1 max-w-full lg:max-w-7xl xl:max-w-9xl 2xl:max-w-10xl">
        <div className="prose max-w-6xl mx-auto text-gray-800 space-y-3">
          <p>
            <strong className="text-xl">Политика конфиденциальности для Maz_telematika.by</strong>
          </p>
          <p>
            На Maz_telemantika, доступном по адресу maz_telematika.by, одной из наших основных приоритетов является конфиденциальность наших посетителей. Этот документ Политики конфиденциальности содержит информацию о типах данных, которые собираются и записываются Recadent, а также о том, как мы их используем.
          </p>
          <p>
            Если у вас есть дополнительные вопросы или требуется больше информации о нашей Политике конфиденциальности, не стесняйтесь связаться с нами.
          </p>
          <p>
            Эта Политика конфиденциальности применима только к нашей онлайн-деятельности и действует для посетителей нашего веб-сайта в отношении информации, которую они предоставляют и/или собирают на Recadent. Эта политика не применяется к любой информации, собранной оффлайн или через каналы, не связанные с этим веб-сайтом.
          </p>
          <p>
            <strong className="text-xl">Согласие</strong>
          </p>
          <p>
            Используя наш веб-сайт, вы тем самым соглашаетесь с нашей Политикой конфиденциальности и ее условиями.
          </p>
          <p>
            <strong className="text-xl">Информация, которую мы собираем</strong>
          </p>
          <p>
            Личная информация, которую вам может быть предложено предоставить, и причины, по которым вам нужно будет ее предоставить, будут разъяснены вам в момент запроса о предоставлении ваших данных.
          </p>
          <p>
            Если вы свяжетесь с нами напрямую, мы можем получить дополнительную информацию о вас, такую как ваше имя, адрес электронной почты, номер телефона, содержание сообщения и/или вложений, которые вы отправите нам, а также любую другую информацию, которую вы решите предоставить.
          </p>
          <p>
            При регистрации учетной записи мы можем запросить вашу контактную информацию, включая такие данные, как имя, название компании, адрес, электронная почта и номер телефона.
          </p>
          <p>
            <strong className="text-xl">Как мы используем вашу информацию</strong>
          </p>
          <p>
            Мы используем информацию, которую мы собираем, различными способами, включая:
          </p>
          <ul>
            <li>Предоставление, эксплуатацию и обслуживание нашего веб-сайта;</li>
            <li>Улучшение, персонализация и расширение нашего веб-сайта;</li>
            <li>Понимание и анализ того, как вы используете наш веб-сайт;</li>
            <li>Разработка новых продуктов, услуг, функций и возможностей;</li>
            <li>Общение с вами, как напрямую, так и через наших партнеров, включая службу поддержки, для предоставления вам обновлений и другой информации, относящейся к веб-сайту, а также для маркетинга и рекламных целей;</li>
            <li>Отправка вам электронных писем;</li>
            <li>Поиск и предотвращение мошенничества.</li>
          </ul>
          <p>
            <strong className="text-xl">Файлы журналов</strong>
          </p>
          <p>
            Recadent использует стандартную процедуру работы с файлами журналов. Эти файлы регистрируют визиты пользователей на веб-сайты. Все хостинговые компании делают это в рамках аналитики их услуг хостинга. Информация, собранная файлами журналов, включает в себя IP-адреса, тип браузера, провайдеров интернета (ISP), метки времени, страницы, с которых пришел пользователь, и страницы, с которых он вышел, а также возможно количество кликов. Эти данные не связаны с персонально идентифицируемой информацией. Целью сбора данных является анализ тенденций, администрирование сайта, отслеживание перемещений пользователей по сайту и сбор демографической информации.
          </p>
          <p>
            <strong className="text-xl">Cookies и веб-маяки</strong>
          </p>
          <p>
            Как и любой другой веб-сайт, Recadent использует "cookies". Эти файлы cookie используются для хранения информации, включая предпочтения посетителей и страницы, которые они посетили на нашем сайте. Информация используется для оптимизации пользовательского опыта путем настройки содержания веб-страницы в зависимости от типа браузера посетителя и/или другой информации.
          </p>
          <p>
            <strong className="text-xl">Конфиденциальность рекламных партнеров</strong>
          </p>
          <p>
            Вы можете ознакомиться с этой <a href="#">списком</a>, чтобы найти Политику конфиденциальности для каждого из рекламных партнеров Recadent.
          </p>
          <p>
            <strong className="text-xl">Права конфиденциальности CCPA (Не продавайте мои личные данные)</strong>
          </p>
          <p>
            В соответствии с CCPA, среди прочего, потребители имеют право:
          </p>
          <ul>
            <li>Запросить, чтобы компания, которая собирает личные данные потребителей, раскрыл категории и конкретные элементы личных данных, которые он собрал;</li>
            <li>Запросить, чтобы компания удалила любые личные данные о потребителе, которые были собраны;</li>
            <li>Запросить, чтобы компания, которая продает личные данные потребителя, не продавал их.</li>
          </ul>
          <p>
            <strong className="text-xl">Права защиты данных GDPR</strong>
          </p>
          <p>
            Мы хотели бы убедиться, что вы полностью осведомлены о всех своих правах на защиту данных. Каждый пользователь имеет следующие права:
          </p>
          <ul>
            <li>Право на доступ;</li>
            <li>Право на исправление;</li>
            <li>Право на удаление;</li>
            <li>Право на ограничение обработки;</li>
            <li>Право на возражение против обработки;</li>
            <li>Право на переносимость данных.</li>
          </ul>
          <p>
            Если вы хотите воспользоваться этими правами, пожалуйста, свяжитесь с нами.
          </p>
          <p>
            <strong className="text-xl">Изменения в Политике конфиденциальности</strong>
          </p>
          <p>
            Мы можем обновлять нашу Политику конфиденциальности время от времени. Рекомендуем периодически проверять эту страницу на предмет изменений. Все изменения вступают в силу немедленно после их публикации на этой странице.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
