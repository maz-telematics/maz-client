import { ParametersResponce } from "../../types/carTrackingTypes";
const apiUrl = import.meta.env.VITE_API_URL;

export const fetchTransportParameters = (
  pageNumber:number,
  transportVin: string,
): Promise<ParametersResponce> => {
  return new Promise((resolve, reject) => {
     const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.token) {
      console.error("Токен отсутствует");
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
        messageType: "parameters",
        token: user.token,
        pageNumber: pageNumber
      });

      console.log("WebSocket подключен. Отправляем сообщение:", message);
      socket.send(message);
    };

    socket.onmessage = (event) => {
      try {
        const response: ParametersResponce = JSON.parse(event.data);
        console.log("Получены данные:", response);
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
