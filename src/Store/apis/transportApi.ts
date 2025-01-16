import { TransportResponse } from "../utils/transportSlice";  // Убедитесь, что импорт правильный

const apiUrl = import.meta.env.VITE_API_URL;

// Функция для получения данных через WebSocket
export const fetchTransportData = (): Promise<TransportResponse[]> => {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(`${apiUrl.replace(/^http/, "ws")}/ws`);

    socket.onopen = () => {
      socket.send(JSON.stringify({
        messageType: 'mainVehicle',
        token: 'your-jwt-token-here',
      }));
    };

    socket.onmessage = (event) => {
      try {
        const response: TransportResponse[] = JSON.parse(event.data);
        resolve(response);  // Убедитесь, что ответ имеет тип TransportResponse[]
      } catch (error) {
        reject('Ошибка при парсинге данных');
      }
    };

    socket.onerror = (error) => {
      reject(error);
    };
  });
};
