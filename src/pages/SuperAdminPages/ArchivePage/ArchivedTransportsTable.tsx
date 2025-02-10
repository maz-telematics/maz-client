import { Table, Button, message, Empty, Modal } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { UndoOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
const ArchivedTransportsTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchArchivedTransports();
    }, []);

    const fetchArchivedTransports = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/archive/transport");
            setData(response.data);
        } catch (error) {
            console.error("Ошибка при загрузке архивированных транспортов:", error);
            message.error("Не удалось загрузить данные");
        }
        setLoading(false);
    };

    const restoreTransport = async (id: string) => {
        try {
            await axiosInstance.post(`/archive/unarchive/transport/${id}`);
            message.success("Транспорт успешно восстановлен");
            fetchArchivedTransports(); // Обновляем список
        } catch (error) {
            console.error("Ошибка при восстановлении транспорта:", error);
            message.error("Не удалось восстановить транспорт");
        }
    };

    const deleteTransport = async (id: string) => {
        try {
            await axiosInstance.delete(`archive/transport/${id}`);
            message.success("Транспорт удален");
            fetchArchivedTransports(); // Обновляем список
        } catch (error) {
            console.error("Ошибка при удалении транспорта:", error);
            message.error("Не удалось удалить транспорт");
        }
    };
    const confirmDeleteTransport = (id: string) => {
        Modal.confirm({
            title: "Вы уверены, что хотите удалить транспорт?",
            icon: <ExclamationCircleOutlined />,
            content: "Это действие необратимо!",
            okText: "Удалить",
            okType: "danger",
            cancelText: "Отмена",
            onOk: async () => await deleteTransport(id), // async/await исправляет ошибку с ожиданием выполнения
        });
    };
    const columns = [
        {
            title: "VIN",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Модель",
            dataIndex: "model",
            key: "model",
        },
        {
            title: "Организация",
            dataIndex: "organizationName",
            key: "organizationName",
        },
        {
            title: "Дата архивирования",
            dataIndex: "archivingDate",
            key: "archivingDate",
            render: (text: string) => new Date(text).toLocaleString(),
        },
        {
            title: "Действия",
            key: "actions",
            render: (_: any, record: any) => (
                <>
                    <Button
                        size="middle"
                        onClick={() => restoreTransport(record.id)}
                        icon={<UndoOutlined />}
                    >
                        Восстановить
                    </Button>
                    <Button
                        size="middle"
                        onClick={() => confirmDeleteTransport(record.id)}
                        icon={<DeleteOutlined />}
                    >
                        Удалить
                    </Button>
                </>
            ),
        }, 
    ];

    return (
        <div>
            {loading ? (
                <p>Загрузка...</p>
            ) : data.length > 0 ? (
                <Table dataSource={data}
                    columns={columns}
                    rowKey={(record) => record.id}
                    components={{
                        header: {
                            cell: (props: any) => (
                                <th {...props} style={{ backgroundColor: "#1B232A", color: "#fff", border: "none" }}>
                                    {props.children}
                                </th>
                            ),
                        },
                    }}
                    bordered
                    style={{
                        backgroundColor: "#F7F9FB",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    scroll={{ x: "max-content" }}
                    pagination={false} />
            ) : (
                <Empty description="Транспорта в архиве нет" />
            )}
        </div>
    );
};

export default ArchivedTransportsTable;
