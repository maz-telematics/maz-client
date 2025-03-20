import React, { useEffect, useState, useCallback } from "react";
import { Spin } from "antd"; 
import axiosInstance from "../../services/axiosInstance"; 

interface Log {
  timestamp: string;
  message: string;
}

interface TableProps {
  containerName: string;
  date: string | null;
}

const LogsTable: React.FC<TableProps> = ({ containerName, date }) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    if (!containerName) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/api/docker/logs/${containerName}`, {
        params: { date },
      });

      // Проверяем, что данные получены
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setLogs(response.data); // Обновляем логи данными из API
      } else {
        setError("Логи не найдены или пустые");
        setLogs([]); // Если данных нет, очищаем логи
      }
    } catch (err) {
      setError("Ошибка при загрузке логов");
      setLogs([]); // В случае ошибки очищаем логи
    } finally {
      setIsLoading(false);
    }
  }, [containerName, date]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  if (!containerName) return <p>Выберите контейнер для просмотра логов</p>;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="ml-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-4">
        Логи для контейнера: {containerName} {date}
      </h2>
      <table className="border-collapse w-full logs-table">
        <thead>
          <tr>
            <th className="p-[15px_30px] text-left border-b border-gray-300 min-w-[150px] text-xl">Время</th>
            <th className="p-[15px_30px] text-left border-b border-gray-300 text-xl">Текст сообщения</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td className="p-[15px_30px] border-b border-gray-300 min-w-[10px] text-lg">{log.timestamp}</td>
              <td className="p-[15px_30px] border-b border-gray-300 text-lg">{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p className="text-red-600 font-semibold text-base mt-4 error-message">{error}</p>}
    </div>
  );
};

export default LogsTable;
