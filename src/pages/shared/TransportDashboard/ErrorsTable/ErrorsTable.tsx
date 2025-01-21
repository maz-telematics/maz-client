import { Table,  Modal } from "antd";
import { useState, useRef, useEffect } from "react";
import { ErrorData, ErrorDataResponse } from "../../../../types/carTrackingTypes";
import dayjs, { Dayjs } from "dayjs";
import axiosInstance from "../../../../services/axiosInstance";
import { getErrorColumns } from "./ErrorsColumns";
interface ErrorsProps {
  selectedDate: Dayjs | null;
}

const ErrorTable: React.FC<ErrorsProps> = ({ selectedDate }) => {
  const [errors, setErrors] = useState<ErrorDataResponse>({
    data: [],
    totalPages: 0,
    currentPage: 0,
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const id = sessionStorage.getItem("id");
  const isPlusUser = true;

  const showModal = (fmi: string) => {
    setModalContent(fmi);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const isCurrentDay = (date: Dayjs | null): boolean => {
    return date ? date.isSame(dayjs(), "day") : false;
  };
  const websocketRef = useRef<WebSocket | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const getErrors = async (id: string, date: Dayjs | null): Promise<ErrorDataResponse[]> => {
    try {
      if (!date) {
        console.warn("Дата не указана, запрос не будет выполнен.");
        return [];
      }
      const dateStr = date.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      const response = await axiosInstance.get(`/transport/errors/${id}`, {
        params: { date: dateStr },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const initializeWebSocket = (id: string) => {
    if (!id || websocketRef.current) return;

    websocketRef.current = new WebSocket(`${apiUrl.replace(/^http/, "ws")}/ws`);
    websocketRef.current.onmessage = (event) => {
      const data: ErrorData[] = JSON.parse(event.data);
      console.log("Полученные данные:", data);
      if (data) {
        setErrors((prev) => {
          if (!prev) {
            return { data, totalPages: 1, currentPage: 1 }; // или другие значения
          }
          return {
            ...prev,
            data: [...prev.data, ...data],
          };
        });
      }
    };

    websocketRef.current.onerror = (error) => console.error("WebSocket Error:", error);

    websocketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
      websocketRef.current = null;
    };

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.token) {
      console.error("Токен отсутствует");
      return;
    }

    const message =  JSON.stringify({
      transportVin: id,
      messageType: "errors",
      pageNumber: 1,
      token: user.token
   });
    websocketRef.current.onopen = () => {
      console.log("WebSocket подключен", message);
      websocketRef.current?.send(message);
    };
  };

  const closeWebSocket = () => {
    if (websocketRef.current) {
      websocketRef.current.close();
      websocketRef.current = null;
    }
  };

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    console.log("работаем")
    if (!id) return;

    if (isCurrentDay(selectedDate)) {
      if (!websocketRef.current) {
        initializeWebSocket(id);
      }
    } else {
      closeWebSocket();
      getErrors(id, selectedDate).then((errorsData) => {
        const formattedData: ErrorDataResponse = {
          data: errorsData.map((error) => error.data).flat(), 
          totalPages: errorsData.length,
          currentPage: 1, 
        };

        setErrors((prev) => ({
          ...prev,
          ...formattedData,
        }));
      });
    }


    return () => {
      closeWebSocket();
    };
  }, [ selectedDate]);

  const errorColumns = getErrorColumns(isPlusUser, showModal);
  return (
    <>
      <Table
        bordered
        columns={errorColumns}
        dataSource={errors?.data}
        rowKey="id"
        pagination={false}
        components={{
          header: {
            cell: (props: any) => (
              <th
                {...props}
                className="bg-[#1B232A] text-white border-none"
              >
                {props.children}
              </th>
            ),
          },
        }}
        scroll={{ x: "max-content" }}
      />
      <Modal
        title="Детали ошибки"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <p>{modalContent}</p>
      </Modal>
    </>
  );
};

export default ErrorTable;
