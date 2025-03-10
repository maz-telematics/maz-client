import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance'; // Импортируем настроенный axios

interface ContainerListProps {
  onContainerSelect: (containerName: string) => void;
}

export const ContainerList: React.FC<ContainerListProps> = ({ onContainerSelect }) => {
  const [containers, setContainers] = useState<string[]>([]); // Динамический список контейнеров
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const response = await axiosInstance.get('/api/docker/containers'); // Запрос с использованием axiosInstance

        const apiContainers = response.data;
        setContainers(apiContainers); // Заполняем список контейнеров из API
      } catch (err) {
        setError('Ошибка загрузки списка контейнеров');
      }
    };

    fetchContainers();
  }, []);

  const handleContainerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedContainer = event.target.value;
    onContainerSelect(selectedContainer); // Вызываем колбэк с выбранным контейнером
    console.log('Выбран контейнер:', selectedContainer);
  };

  return (
    <div>
      <select
        onChange={handleContainerChange}
        className="text-lg w-[220px] h-[40px] rounded bg-white text-gray-800 border border-gray-300 p-2 custom-select hover:border-[#633737] focus:border-[#550000] focus:shadow-[0_0_5px_rgba(126,0,0,0.5)]"
      >
        <option value="">Выберите контейнер</option>
        {containers.map((container, index) => (
          <option key={index} value={container}>
            {container}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 font-semibold text-base mt-2 mb-4 error-message">{error}</p>}
    </div>
  );
};
