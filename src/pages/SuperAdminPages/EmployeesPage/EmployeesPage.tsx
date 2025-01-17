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
import DownloadButton from "../../../Components/DownloadButton";
import DownloadIcon from '@mui/icons-material/Download';

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

    const fetchEmployees = async () => {
        try {
            const response = await axios.get("/api/employees");
            setEmployees(response.data);
        } catch (error) {
            message.error("Ошибка загрузки сотрудников");
        }
    };

    const handleAdd = () => {
        setEditingEmployee(null);
        setIsModalOpen(true);
    };

    const handleEdit = (employee: Employee) => {
        setEditingEmployee(employee);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/employees/${id}`);
            message.success("Сотрудник удален");
            fetchEmployees();
        } catch (error) {
            message.error("Ошибка при удалении сотрудника");
        }
    };

    const handleSave = async (values: any) => {
        try {
            if (editingEmployee) {
                await axios.put(`/api/employees/${editingEmployee.id}`, values);
                message.success("Сотрудник обновлен");
            } else {
                await axios.post("/api/employees", values);
                message.success("Сотрудник добавлен");
            }
            setIsModalOpen(false);
            fetchEmployees();
        } catch (error) {
            message.error("Ошибка при сохранении данных");
        }
    };

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
    const isMobile = window.innerWidth < 768;
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            // minHeight: '100vh',
            backgroundColor: "#E1E1E1",
        }}>
            <Row style={{
                padding: "0 40px",
            }}>
                <Col xs={24} >
                    <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                        <Col>
                            <h1
                                style={{
                                    margin: 0,
                                    fontSize: isMobile ? '24px' : '32px',
                                }}
                            >Сотрудники</h1>
                        </Col>
                        <Col>
                            <Row align="middle" wrap={false} style={{ gap: "16px" }}>
                                <Button
                                    //   disabled={true}
                                    type="primary"
                                    icon={<UserAddOutlined />}
                                    onClick={handleAdd}
                                    style={{ backgroundColor: "#1B232A", }}
                                >
                                    {!isMobile && 'Добавить сотрудника'}
                                </Button>
                                <DownloadButton
                                    url="/api/employees/download"
                                    filename="employees.pdf"
                                    buttonText="Скачать таблицу"
                                    icon={<DownloadIcon style={{ fontSize: 18, color: 'white' }} />}
                                    buttonProps={{ className: 'bg-[#1B232A] text-white hover:bg-[#1B232A]' }}
                                />
                            </Row>
                        </Col>
                    </Row>
                    <Table
                        //   dataSource={employees} 
                        components={{
                            header: {
                                cell: (props: any) => (
                                    <th {...props} style={{ backgroundColor: "#1B232A", color: "#fff", border: "none", }}>
                                        {props.children}
                                    </th>
                                ),
                            },
                        }}
                        style={{
                            borderRadius: "8px",
                            overflow: "hidden",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#1B232A",
                        }}
                        scroll={{ x: 'max-content' }}
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
                            <Button type="primary" htmlType="submit" >
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
