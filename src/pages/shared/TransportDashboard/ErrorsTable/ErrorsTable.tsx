import { Table, Modal, Pagination } from "antd";
import { useState, useRef, useEffect } from "react";
import { ErrorData, ErrorDataResponse } from "../../../../types/carTrackingTypes";
import dayjs, { Dayjs } from "dayjs";
import axiosInstance from "../../../../services/axiosInstance";
import { getErrorColumns } from "./ErrorsColumns";
import { getErrors } from "../../../../Store/apis/transportError";

interface ErrorsProps {
  selectedDate: Dayjs | null;
}

const ErrorTable: React.FC<ErrorsProps> = ({ selectedDate }) => {
  const [errors, setErrors] = useState<ErrorData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const id = sessionStorage.getItem("id");
  const isPlusUser = true;

  const websocketRef = useRef<WebSocket | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

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

  const fetchErrors = async (id: string, date: Dayjs | null, page: number) => {
    try {
      if (!date) {
        console.warn("Дата не указана, запрос не будет выполнен.");
        return;
      }
      const dateStr = date.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      const response = await axiosInstance.get(`/transport/errors/${id}`, {
        params: { date: dateStr, page, size: pageSize },
      });
      setErrors(response.data.data);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error(error);
    }
  };

  const initializeWebSocket = (id: string) => {
    if (!id || websocketRef.current) return;

    websocketRef.current = new WebSocket(`${apiUrl.replace(/^http/, "ws")}/ws`);
    websocketRef.current.onmessage = (event) => {
      const data: ErrorData[] = JSON.parse(event.data);
      if (data) {
        setErrors((prev) => [...prev, ...data]);
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

    const message = JSON.stringify({
      transportVin: id,
      messageType: "errors",
      pageNumber: 1,
      token: user.token,
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
    if (!id) return;

    if (isCurrentDay(selectedDate)) {
      // if (!websocketRef.current) {
      // initializeWebSocket(id);
      // }
      getErrors(id, currentPage)
        .then((errorData) => {
          setErrors(errorData.data);
        })
    } else {
      // closeWebSocket();
      fetchErrors(id, selectedDate, currentPage);
    }

    // return () => {
    //   closeWebSocket();
    // };
  }, [selectedDate, currentPage]);

  const errorColumns = getErrorColumns(isPlusUser, showModal);
  console.log("errors", errors)
  return (
    <>
      <Table
        bordered
        columns={errorColumns}
        dataSource={errors}
        rowKey="id"
        pagination={false}
        components={{
          header: {
            cell: (props: any) => (
              <th {...props} className="bg-[#1B232A] text-white border-none">
                {props.children}
              </th>
            ),
          },
        }}
        scroll={{ x: "max-content" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
          paddingBottom: "16px",
        }}
      >
        {totalCount > pageSize && (
          <Pagination
            current={currentPage}
            total={totalCount}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
            style={{ marginTop: 16, textAlign: "right" }}
          />
        )}
      </div>
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
