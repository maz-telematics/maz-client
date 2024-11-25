# Используем базовый образ Node.js для сборки
FROM node:18 AS build

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Собираем проект для продакшена
RUN npm run build

# Используем минимальный сервер для размещения статических файлов
FROM nginx:alpine

# Копируем пользовательский конфигурационный файл Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранные файлы в папку Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Экспонируем порт 80
EXPOSE 80

# Запускаем сервер Nginx
CMD ["nginx", "-g", "daemon off;"]
