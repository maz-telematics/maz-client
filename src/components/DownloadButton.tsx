import React from 'react';
import axios from 'axios';
import { Button, message } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import axiosInstance from '../services/axiosInstance';

type DownloadButtonProps = {
  url: string; // URL для запроса на сервер
  filename: string; // Имя файла для скачивания
  buttonText: string; // Текст кнопки
  icon?: React.ReactElement; // Иконка для кнопки
  buttonProps?: ButtonProps; // Дополнительные свойства кнопки
};

const DownloadButton: React.FC<DownloadButtonProps> = ({
  url,
  filename,
  buttonText,
  icon,
  buttonProps,
}) => {
  const handleDownload = async () => {
    try {
      // Добавляем уникальный параметр для предотвращения кеширования
      const uniqueUrl = `${url}?timestamp=${new Date().getTime()}`;

      // Отправляем запрос на сервер
      const response = await axiosInstance.get(uniqueUrl, {
        responseType: 'blob',
      });

      // Проверяем статус ответа и наличие данных
      if (response.status === 200 && response.data.size > 0) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const downloadUrl = window.URL.createObjectURL(blob);

        // Создаем ссылку и запускаем скачивание
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        message.success('Файл успешно скачан.');
      } else {
        // Сообщение, если файл не найден или пуст
        message.error('Файл не найден или пуст. Проверьте адрес сервера.');
      }
    } catch (error) {
      // Обработка ошибок
      console.error(`Ошибка при загрузке файла ${filename}:`, error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          message.error(
            `Ошибка сервера: ${error.response.status}. Попробуйте снова.`
          );
        } else if (error.request) {
          message.error('Не удалось подключиться к серверу. Проверьте адрес.');
        } else {
          message.error('Неизвестная ошибка при загрузке файла.');
        }
      } else {
        message.error('Ошибка при загрузке файла. Попробуйте снова.');
      }
    }
  };

  return (
    <Button
      type="primary"
      onClick={handleDownload}
      icon={icon}
      {...buttonProps}
    >
      {buttonText}
    </Button>
  );
};

export default DownloadButton;
