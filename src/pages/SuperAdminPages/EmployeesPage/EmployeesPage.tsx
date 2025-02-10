import React, { useState, useEffect } from "react";
import { Button, Form, Input, message, Modal, Popconfirm, Select, Space } from "antd";
import EmployeesPage from "../../shared/EmployeesPage";
import { EditOutlined, DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import axios from "axios";
import axiosInstance from "../../../services/axiosInstance";
import { User } from "../../../pages/shared/TransportsPage";

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

const SuperAdminEmployeesPage = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [form] = Form.useForm();

    const storedUser = localStorage.getItem("user");
    const user: User | null = storedUser ? JSON.parse(storedUser) : null;

    const handleAdd = () => {
        setEditingEmployee(null);
        setIsModalOpen(true);
    };
    const handleEdit = (employee: Employee) => {
        console.log(employee)
        setEditingEmployee(employee);
        setIsModalOpen(true);
    };
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/employees/${id}`);
            message.success("Сотрудник удален");
            // fetchEmployees();
        } catch (error) {
            message.error("Ошибка при удалении сотрудника");
        }
    };

    const isMobile = window.innerWidth < 768;
    const extraControls = (
        <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={handleAdd}
            style={{
                backgroundColor: "#1B232A", // Исходный фон
                color: "#fff", // Цвет текста
                transition: "all 0.3s ease", // Плавный переход
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "red"; // Красный фон при наведении
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#1B232A"; // Исходный фон при убирании мыши
            }}
        >
            {!isMobile && "Добавить сотрудника"}
        </Button>
    );

    const extraActions = (record: any) => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
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
        </div>
    );

    const handleSave = async (values: any) => {
        try {
            // if (editingEmployee) {
            //     // PUT запрос на обновление пользователя
            //     await axiosInstance.post(`/${editingEmployee.id}`, values); // Используем обратные кавычки
            //     message.success("Сотрудник обновлен");
            // } else {
            // POST запрос на создание пользователя
            await axiosInstance.post("/employees/register", values);
            message.success("Сотрудник добавлен");
            // }
            setIsModalOpen(false);
            // fetchEmployees();
        } catch (error) {
            message.error("Ошибка при сохранении данных");
        }
    };
    useEffect(() => {
        if (editingEmployee) {
            form.setFieldsValue(editingEmployee); // Устанавливаем данные для редактирования
        } else {
            form.resetFields(); // Сбрасываем форму, если сотрудник не редактируется
        }
    }, [editingEmployee]); // Этот эффект сработает, когда изменится editingEmployee
    return <>
        <EmployeesPage extraControls={extraControls} extraActions={extraActions} />
        <Modal
            title={editingEmployee ? "Редактировать сотрудника" : "Добавить сотрудника"}
            visible={isModalOpen}
            onCancel={() => {
                form.resetFields(); // Сбрасываем форму при закрытии модального окна
                setIsModalOpen(false);
            }}
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
                    name="phoneNumber"
                    label="Телефон"
                    rules={[{ required: true, message: "Введите телефон" }]}
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
                    name="role"
                    label="Роль"
                    rules={[{ required: true, message: "Выберите роль" }]}
                >
                    {/* <Select>
                                         <Option value="Суперадминистратор">Суперадминистратор</Option>
                                         <Option value="Администратор">Администратор</Option>
                                         <Option value="Оператор">Оператор</Option>
                                     </Select> */}
                    <Select>
                        {user?.role === "ROLE_SUPERADMIN" ? (
                            <>
                                <Option value="Суперадминистратор">Суперадминистратор</Option>
                                <Option value="Администратор">Администратор</Option>
                                <Option value="Оператор">Оператор</Option>
                            </>
                        ) : user?.role === "ROLE_DIRECTOR" ? (
                            <>
                                <Option value="Директор">Директор</Option>
                                <Option value="Менеджер">Менеджер</Option>
                                <Option value="Рабочий">Рабочий</Option>
                            </>
                        ) : null}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="position"
                    label="Должность"
                    rules={[{ required: true, message: "Введите должность" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="workplace"
                    label="Организация"
                    rules={[{ required: true, message: "Введите место организации" }]}
                >
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </Form>
        </Modal></>;
};

export default SuperAdminEmployeesPage;
