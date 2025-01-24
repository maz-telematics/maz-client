import { ErrorDataResponse } from "../../types/carTrackingTypes"; // Подразумевается, что вы определили интерфейс ErrorData

const apiUrl = import.meta.env.VITE_API_URL;

// Функция для получения ошибок через WebSocket
export const getErrors = (
  transportVin: string,
  pageNumber: number
): Promise<ErrorDataResponse> => {
  return new Promise((resolve, reject) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (!user.token) {
      console.error("Токен отсутствует");
      reject("Токен отсутствует");
      return;
    }

    if (!transportVin || !user.token) {
      reject("Не указан транспортный VIN или токен пользователя");
      return;
    }

    const socket = new WebSocket(`${apiUrl.replace(/^http/, "ws")}/ws`);

    socket.onopen = () => {
      const message = JSON.stringify({
        transportVin,
        messageType: "errors",
        pageNumber,
        token: user.token
      });

      console.log("WebSocket подключен. Отправляем сообщение:", message);
      socket.send(message);
    };

    socket.onmessage = (event) => {
      try {
        const response: ErrorDataResponse = JSON.parse(event.data);
        console.log("Получены ошибки:", response);
        resolve(response);
        socket.close();
      } catch (error) {
        reject("Ошибка при парсинге данных: " + error);
        socket.close();
      }
    };

    socket.onerror = (error) => {
      reject("Ошибка соединения WebSocket: " + error);
      socket.close();
    };

    socket.onclose = () => {
      console.log("WebSocket соединение закрыто");
    };
  });
};
