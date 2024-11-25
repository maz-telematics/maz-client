import React, { useState, useEffect } from "react";
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    Select,
    Row, Col,
    message,
    Popconfirm,
    Space,
} from "antd";
import { EditOutlined, DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

interface Employee {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    workplace: string;
    status: "active" | "blocked";
}

const EmployeesPage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Загрузка списка сотрудников
    const fetchEmployees = async () => {
        try {
            const response = await axios.get("/api/employees"); // Замените на ваш API
            setEmployees(response.data);
        } catch (error) {
            message.error("Ошибка загрузки сотрудников");
        }
    };

    // Добавление нового сотрудника
    const handleAdd = () => {
        setEditingEmployee(null);
        setIsModalOpen(true);
    };

    // Редактирование сотрудника
    const handleEdit = (employee: Employee) => {
        setEditingEmployee(employee);
        setIsModalOpen(true);
    };

    // Удаление сотрудника
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/employees/${id}`); // Замените на ваш API
            message.success("Сотрудник удален");
            fetchEmployees();
        } catch (error) {
            message.error("Ошибка при удалении сотрудника");
        }
    };

    // Сохранение данных (новый сотрудник или обновление)
    const handleSave = async (values: any) => {
        try {
            if (editingEmployee) {
                // Редактирование сотрудника
                await axios.put(`/api/employees/${editingEmployee.id}`, values); // Замените на ваш API
                message.success("Сотрудник обновлен");
            } else {
                // Добавление нового сотрудника
                await axios.post("/api/employees", values); // Замените на ваш API
                message.success("Сотрудник добавлен");
            }
            setIsModalOpen(false);
            fetchEmployees();
        } catch (error) {
            message.error("Ошибка при сохранении данных");
        }
    };

    // Колонки таблицы
    const columns = [
        {
            title: "Имя",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Телефон",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Роль",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Место работы",
            dataIndex: "workplace",
            key: "workplace",
        },
        {
            title: "Статус",
            dataIndex: "status",
            key: "status",
            render: (status: string) =>
                status === "active" ? "Активен" : "Заблокирован",
        },
        {
            title: "Действия",
            key: "actions",
            render: (_: any, record: Employee) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Редактировать
                    </Button>
                    <Popconfirm
                        title="Удалить сотрудника?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button danger icon={<DeleteOutlined />}>
                            Удалить
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height:"100vh",
            backgroundColor: "#F0F4F8",
        }}>
            <Row style={{
                margin: "30px 40px 30px 40px",
                flex: "1",
            }}>
                <Col xs={24} >
                    <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                        <Col>
                            <h1 style={{ margin: 0, color: '#1e40af' }}>Сотрудники</h1>
                        </Col>
                        <Col>
                            <Button
                                type="primary"
                                icon={<UserAddOutlined />}
                                onClick={handleAdd}
                                style={{ marginBottom: 16 }}
                            >
                                Добавить сотрудника
                            </Button>
                        </Col>
                    </Row>
                    <Table
                        //   dataSource={employees} 
                        columns={columns} rowKey="id" />
                    <Modal
                        title={editingEmployee ? "Редактировать сотрудника" : "Добавить сотрудника"}
                        visible={isModalOpen}
                        onCancel={() => setIsModalOpen(false)}
                        footer={null}
                    >
                        <Form
                            form={form}
                            onFinish={handleSave}
                            initialValues={editingEmployee || {}}
                        >
                            <Form.Item
                                name="name"
                                label="Имя"
                                rules={[{ required: true, message: "Введите имя" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: "Введите email" },
                                    { type: "email", message: "Некорректный email" },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                label="Телефон"
                                rules={[{ required: true, message: "Введите телефон" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="role"
                                label="Роль"
                                rules={[{ required: true, message: "Выберите роль" }]}
                            >
                                <Select>
                                    <Option value="manager">Менеджер</Option>
                                    <Option value="engineer">Инженер</Option>
                                    <Option value="admin">Администратор</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="workplace"
                                label="Место работы"
                                rules={[{ required: true, message: "Введите место работы" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Button type="primary" htmlType="submit">
                                Сохранить
                            </Button>
                        </Form>
                    </Modal> 
                </Col>
            </Row>
        </div>
    );
};

export default EmployeesPage;
