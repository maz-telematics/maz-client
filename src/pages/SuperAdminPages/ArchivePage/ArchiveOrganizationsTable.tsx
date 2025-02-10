import { Table, Button, message, Empty, Modal } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { UndoOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const ArchivedOrganizationsTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchArchivedOrganizations();
    }, []);

    const fetchArchivedOrganizations = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/archive/organization");
            setData(response.data);
        } catch (error) {
            console.error("Ошибка при загрузке архивированных организаций:", error);
            message.error("Не удалось загрузить данные");
        }
        setLoading(false);
    };

    const restoreOrganization = async (id: string) => {
        try {
            await axiosInstance.post(`/archive/unarchive/organization/${id}`);
            message.success("Организация успешно восстановлена");
            fetchArchivedOrganizations(); // Обновляем список
        } catch (error) {
            console.error("Ошибка при восстановлении организации:", error);
            message.error("Не удалось восстановить организацию");
        }
    };

    const deleteOrganization = async (id: string) => {
        try {
            await axiosInstance.delete(`archive/organization/${id}`);
            message.success("Организация удалена");
            fetchArchivedOrganizations(); // Обновляем список
        } catch (error) {
            console.error("Ошибка при удалении организации:", error);
            message.error("Не удалось удалить организацию");
        }
    };
    const confirmDeleteOrganization = (id: string) => {
        Modal.confirm({
            title: "Вы уверены, что хотите удалить организацию?",
            icon: <ExclamationCircleOutlined />,
            content: "Это действие необратимо!",
            okText: "Удалить",
            okType: "danger",
            cancelText: "Отмена",
            onOk: async () => await deleteOrganization(id), 
        });
    };
    const columns = [
        {
            title: " Название",
            dataIndex: "organizationName",
            key: "organizationName",
        },
        {
            title: "Контактное лицо",
            dataIndex: "contactPerson",
            key: "contactPerson",
        },
        {
            title: "Email",
            dataIndex: "emailContactPerson",
            key: "emailContactPerson",
        },
        {
            title: "Телефон",
            dataIndex: "contactInfo",
            key: "contactInfo",
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
                        onClick={() => restoreOrganization(record.id)}
                        icon={<UndoOutlined />}
                    >
                        Восстановить
                    </Button>
                    <Button
                        size="middle"
                        onClick={() => confirmDeleteOrganization(record.id)}
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
                <Empty description="Организаций в архиве нет" />
            )}
        </div>
    );
};

export default ArchivedOrganizationsTable;
