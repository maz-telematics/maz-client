import { Table, TableProps, Tooltip, Modal, Row, Col, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { useState, useEffect } from "react";
import { ErrorData } from "../../../Types/carTrackingTypes";
import { Dayjs } from "dayjs";
import axiosInstance from "../../../services/axiosInstance";

interface ErrorsProps {
  selectedDate: Dayjs | null;
}

const { Title, Text } = Typography;

const ErrorTable: React.FC<ErrorsProps> = ({ selectedDate }) => {
  const [errors, setErrors] = useState<ErrorData[]>([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const id = sessionStorage.getItem("id");
  const isPlusUser = true; // sessionStorage.getItem("subscription") === "plus";

  // Открытие модального окна
  const showModal = (fmi: string) => {
    setModalContent(fmi);  // Устанавливаем данные fmi в модальное окно
    setIsModalOpen(true);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

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
      title: "Тип ошибки",
      dataIndex: "spn",
      key: "spn",
      render: (text: string, record: ErrorData) => (
        <span>
          {isPlusUser ? (  // Условие: только для пользователей с подпиской "плюс"
            <Tooltip title="Нажмите для подробностей">
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
                onClick={() => showModal(record.fmi || "")}
              >
                {text}
                <InfoCircleOutlined style={{ color: "#1890ff" }} />
              </span>
            </Tooltip>
          ) : (
            <span>{text}</span> 
          )}
        </span>
      ),
    },
  ];

  const testErrors: ErrorData[] = [
    {
      id: "1",
      data: "2025-01-08T12:00:00.000Z",
      spn: "1213/3038 - Низкий уровень топлива",
      fmi: "Техническое описание: Проблема с уровнем топлива в баке. Пожалуйста, проверьте датчик.",
    },
    {
      id: "2",
      data: "2025-01-08T14:00:00.000Z",
      spn: "623/3039 - Неисправность датчика",
      fmi: "Техническое описание: Неисправность датчика температуры. Требуется диагностика устройства.",
    },
    {
      id: "3",
      data: "2025-01-08T16:00:00.000Z",
      spn: "624/3040 - Проблема с тормозной системой",
      fmi: "Техническое описание: Ошибка в системе торможения. Пожалуйста, обратитесь к сервису.",
    },
    {
      id: "4",
      data: "2025-01-08T18:00:00.000Z",
      spn: "987/3041 - Низкое давление",
      fmi: "Техническое описание: Низкое давление в системе. Требуется проверка.",
    },
  ];

  // Вызов getErrors и обновление состояния
  useEffect(() => {
    const fetchErrors = async () => {
      if (!id) return;
      setErrors(testErrors);  // Устанавливаем тестовые данные
    };

    fetchErrors();
  }, [id, selectedDate]);

  // Функция для получения состояния лампы
  const getLampStatus = (spn: string): { color: string, label: string } => {
    switch (spn) {
      case "1213/3038":
        return { color: "green", label: "Включена" }; // Зеленая, Включена
      case "623/3039":
        return { color: "yellow", label: "Мигание" }; // Желтая, Мигание
      case "624/3040":
        return { color: "red", label: "Выключена" }; // Красная, Выключена
      case "987/3041":
        return { color: "grey", label: "Не используется" }; // Серая, Не используется
      default:
        return { color: "gray", label: "Неизвестно" }; // Для неизвестных spn
    }
  };

  return (
    <>
      {/* Заголовок для статуса ламп */}
      {/* <Title level={4} style={{ marginBottom: "16px" }}>
        Статус ламп
      </Title> */}

      {/* Блок с лампами и их обозначениями */}
      {/* <Row gutter={16} style={{ marginBottom: "16px" }}>
        {["1213/3038", "623/3039", "624/3040", "987/3041"].map((spn) => {
          const lampStatus = getLampStatus(spn);
          let lampDescription = "";
          switch (spn) {
            case "1213/3038":
              lampDescription = "Уровень топлива";
              break;
            case "623/3039":
              lampDescription = "Датчик температуры";
              break;
            case "624/3040":
              lampDescription = "Тормозная система";
              break;
            case "987/3041":
              lampDescription = "Давление в системе";
              break;
          }
          return (
            <Col span={6} key={spn}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "16px",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: lampStatus.color,
                  }}
                ></div>
                <span>{lampDescription}: {lampStatus.label}</span>
              </div>
            </Col>
          );
        })}
      </Row> */}

      <Table
        bordered
        columns={errorColumns}
        dataSource={errors}
        rowKey="id"
        pagination={false}
        components={{
          header: {
            cell: (props: any) => (
              <th
                {...props}
                style={{
                  backgroundColor: "#1B232A",
                  color: "#fff",
                  border: "none",
                }}
              >
                {props.children}
              </th>
            ),
          },
        }}
        scroll={{ x: "max-content" }}
      />
      
      {/* Модальное окно */}
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
