import { Table, TableProps } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import { ErrorData } from "../../../types/carTrackingTypes";
import { Dayjs } from "dayjs";
import axiosInstance from "../../../services/axiosInstance";

interface ErrorsProps {
  selectedDate: Dayjs | null;
}

const ErrorTable: React.FC<ErrorsProps> = ({ selectedDate }) => {
  const [errors, setErrors] = useState<ErrorData[]>([]);
  const id = sessionStorage.getItem("id");

  // Определение столбцов для таблицы
  const errorColumns: TableProps<ErrorData>["columns"] = [
    {
      title: "Дата и время",
      dataIndex: "data",
      key: "data",
      render: (text: string) => (
        <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
      ),
    },
    {
      title: "Код ошибки",
      dataIndex: "error_code",
      key: "error_code",
    },
    {
      title: "Тип ошибки",
      dataIndex: "error_type",
      key: "error_type",
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
    },
  ];

  // Функция получения данных об ошибках
  const getErrors = async (id: string): Promise<ErrorData[]> => {
    try {
      if (!selectedDate) return [];
      const dateStr = selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      const response = await axiosInstance.get(`/transport/errors/${id}`, {
        params: { date: dateStr },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  // Вызов getErrors и обновление состояния
  useEffect(() => {
    const fetchErrors = async () => {
      if (!id) return;
      const data = await getErrors(id);
      setErrors(data);
    };

    fetchErrors();
  }, [id, selectedDate]);

  return (
    <Table
      bordered
      columns={errorColumns}
      dataSource={errors}
      rowKey="id" // Уникальный ключ для каждой строки
      pagination={false}
    />
  );
};

export default ErrorTable;
