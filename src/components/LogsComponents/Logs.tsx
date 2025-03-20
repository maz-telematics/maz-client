import React, { useState } from "react";
import { ContainerList } from "./containersList";
import { DatePickerField } from './datePicker';
import MovingCar from "./movingCar";
import LogsTable from "./logsTable";
import DownloadButton from "../DownloadButton"; 
import DownloadIcon from "@mui/icons-material/Download"; // Импорт иконки
import axiosInstance from "../../services/axiosInstance"; 

const mazIcon = "/mazIcon.png";

const App: React.FC = () => {
  const [containerName, setContainerName] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleContainerSelect = (name: string) => {
    setContainerName(name);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  return (
    <div className="flex flex-col w-full bg-[#E1E1E1]">
      {!containerName && (
        <img
          src={mazIcon}
          alt="Background"
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 w-[400px] h-auto"
        />
      )}
      <div className="flex flex-row gap-[60px] mb-4 ml-8 bg-[#E1E1E1] w-full items-center">
        <div className="containerList"> 
          <h1 className="!text-[32px] font-bold text-gray-800 mb-2">Docker Контейнеры</h1>
          <ContainerList onContainerSelect={handleContainerSelect} />
        </div>
        <div className="datePicker">
          <h1 className="!text-[32px] font-bold text-gray-800 mb-2">Выберите дату</h1>
          <DatePickerField onDateSelect={handleDateSelect} />
        </div>
        <MovingCar/>

        {/* Кнопка для скачивания логов */}
        <DownloadButton
          url=""  // Здесь мы передаем пустую строку, так как параметры теперь передаются через `params` в компоненте DownloadButton
          filename={`logs_${containerName}_${selectedDate || "latest"}.txt`}
          buttonText="Скачать логи"
          icon={<DownloadIcon style={{ fontSize: 18, color: "white" }} />}
          buttonProps={{
            style: {
              border: "none",
              outline: "none",
              cursor: "pointer",
              backgroundColor: "#1B232A",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease",
              marginRight: 50,
            },
            onMouseOver: (e) => {
              e.currentTarget.style.backgroundColor = "red";
            },
            onMouseOut: (e) => {
              e.currentTarget.style.backgroundColor = "#1B232A";
            },
            onClick: async () => {
              try {
                // Формируем параметры для запроса
                const params = selectedDate ? { date: selectedDate } : {};

                // Отправляем запрос на сервер для скачивания логов
                const response = await axiosInstance.get(`/api/docker/logs/download/${containerName}`, {
                  params, // Передаем параметры как объект
                  responseType: 'blob', // Ожидаем ответ в виде blob (например, текстовый файл)
                });

                // Проверка на успешность запроса
                if (response.status === 200 && response.data) {
                  const blob = new Blob([response.data], { type: 'text/plain' });
                  const downloadUrl = window.URL.createObjectURL(blob);

                  // Создание временной ссылки для скачивания
                  const link = document.createElement('a');
                  link.href = downloadUrl;
                  link.setAttribute('download', `logs_${containerName}_${selectedDate || "latest"}.txt`);
                  document.body.appendChild(link);
                  link.click();
                  link.parentNode?.removeChild(link);
                }
              } catch (error) {
                console.error("Ошибка при скачивании логов", error);
              }
            },
          }}
        />
      </div>
      <hr className="border-t-2 border-red-500 w-full" />
      <div className="mb-[20px]">
        {containerName && <LogsTable containerName={containerName} date={selectedDate} />}
      </div>
    </div>
  );
};

export default App;
