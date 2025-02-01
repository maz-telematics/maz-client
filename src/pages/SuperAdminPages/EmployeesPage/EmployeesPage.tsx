// import React, { useState, useEffect } from "react";
// import {
//     Table,
//     Button,
//     Modal,
//     Form,
//     Input,
//     Select,
//     Row, Col,
//     message,
//     Popconfirm,
//     Space,
// } from "antd";
// import { EditOutlined, DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
// import axios from "axios";
// import DownloadButton from "../../../Components/DownloadButton";
// import DownloadIcon from '@mui/icons-material/Download';
// import axiosInstance from "../../../services/axiosInstance";

// const { Option } = Select;

// interface Employee {
//     id: string;
//     name: string;
//     email: string;
//     phone: string;
//     role: string;
//     workplace: string;
//     status: "active" | "blocked";
// }

// const EmployeesPage: React.FC = () => {
//     const [employees, setEmployees] = useState<Employee[]>([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
//     const [form] = Form.useForm();

//     useEffect(() => {
//         fetchEmployees();
//     }, []);

//     const fetchEmployees = async () => {
//         try {
//             const response = await axiosInstance.get("/employees");
//             setEmployees(response.data);
//         } catch (error) {
//             message.error("Ошибка загрузки сотрудников");
//         }
//     };

//     const handleAdd = () => {
//         setEditingEmployee(null);
//         setIsModalOpen(true);
//     };

//     const handleEdit = (employee: Employee) => {
//         setEditingEmployee(employee);
//         setIsModalOpen(true);
//     };

//     const handleDelete = async (id: string) => {
//         try {
//             await axios.delete(`/api/employees/${id}`);
//             message.success("Сотрудник удален");
//             fetchEmployees();
//         } catch (error) {
//             message.error("Ошибка при удалении сотрудника");
//         }
//     };

//     const handleSave = async (values: any) => {
//         try {
//             // if (editingEmployee) {
//             //     // PUT запрос на обновление пользователя
//             //     await axiosInstance.post(`/${editingEmployee.id}`, values); // Используем обратные кавычки
//             //     message.success("Сотрудник обновлен");
//             // } else {
//             // POST запрос на создание пользователя
//             await axiosInstance.post("/employees/register", values);
//             message.success("Сотрудник добавлен");
//             // }
//             setIsModalOpen(false);
//             fetchEmployees();
//         } catch (error) {
//             message.error("Ошибка при сохранении данных");
//         }
//     };

//     const columns = [
//         {
//             title: "Имя",
//             dataIndex: "name",
//             key: "name",
//         },
//         {
//             title: "Телефон",
//             dataIndex: "phone",
//             key: "phone",
//         },
//         {
//             title: "Email",
//             dataIndex: "email",
//             key: "email",
//         },

//         {
//             title: "Роль",
//             dataIndex: "role",
//             key: "role",
//         },
//         {
//             title: "Организация",
//             dataIndex: "workplace",
//             key: "workplace",
//         },
//         {
//             title: "Статус",
//             dataIndex: "status",
//             key: "status",
//             render: (status: string) =>
//                 status === "active" ? "Активен" : "Заблокирован",
//         },
//         {
//             title: "Действия",
//             key: "actions",
//             render: (_: any, record: Employee) => (
//                 <Space>
//                     <Button
//                         icon={<EditOutlined />}
//                         onClick={() => handleEdit(record)}
//                     >
//                         Редактировать
//                     </Button>
//                     <Popconfirm
//                         title="Удалить сотрудника?"
//                         onConfirm={() => handleDelete(record.id)}
//                         okText="Да"
//                         cancelText="Нет"
//                     >
//                         <Button danger icon={<DeleteOutlined />}>
//                             Удалить
//                         </Button>
//                     </Popconfirm>
//                 </Space>
//             ),
//         },
//     ];
//     const isMobile = window.innerWidth < 768;
//     return (
//         <div style={{
//             display: "flex",
//             flexDirection: "column",
//             width: "100%",
//             // minHeight: '100vh',
//             backgroundColor: "#E1E1E1",
//         }}>
//             <Row style={{
//                 padding: "0 40px",
//             }}>
//                 <Col xs={24} >
//                     <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
//                         <Col>
//                             <h1
//                                 style={{
//                                     margin: 0,
//                                     fontSize: isMobile ? '24px' : '32px',
//                                 }}
//                             >Сотрудники</h1>
//                         </Col>
//                         <Col>
//                             <Row align="middle" wrap={false} style={{ gap: "10px" }}>
//                                 <DownloadButton
//                                     url="/api/employees/download"
//                                     filename="employees.pdf"
//                                     buttonText="Скачать таблицу"
//                                     icon={<DownloadIcon style={{ fontSize: 18, color: "white" }} />}
//                                     buttonProps={{
//                                         style: {
//                                             border: "none", // Убираем рамку
//                                             outline: "none", // Убираем обводку при фокусе
//                                             cursor: "pointer", // Курсор в виде указателя
//                                             backgroundColor: "#1B232A", // Исходный фон
//                                             color: "#fff", // Цвет текста
//                                             transition: "all 0.3s ease", // Плавный переход
//                                         },
//                                         onMouseOver: (e) => {
//                                             e.currentTarget.style.backgroundColor = "red"; // Красный фон при наведении
//                                         },
//                                         onMouseOut: (e) => {
//                                             e.currentTarget.style.backgroundColor = "#1B232A"; // Исходный фон при убирании мыши
//                                         },
//                                     }}
//                                 />

//                                 <Button
//                                     type="primary"
//                                     icon={<UserAddOutlined />}
//                                     onClick={handleAdd}
//                                     style={{
//                                         backgroundColor: "#1B232A", // Исходный фон
//                                         color: "#fff", // Цвет текста
//                                         transition: "all 0.3s ease", // Плавный переход
//                                     }}
//                                     onMouseOver={(e) => {
//                                         e.currentTarget.style.backgroundColor = "red"; // Красный фон при наведении
//                                     }}
//                                     onMouseOut={(e) => {
//                                         e.currentTarget.style.backgroundColor = "#1B232A"; // Исходный фон при убирании мыши
//                                     }}
//                                 >
//                                     {!isMobile && "Добавить сотрудника"}
//                                 </Button>
//                             </Row>
//                         </Col>
//                     </Row>
//                     <Table
//                         dataSource={employees}
//                         columns={columns}
//                         rowKey={(record) => record.id}
//                         components={{
//                             header: {
//                                 cell: (props: any) => (
//                                     <th {...props} style={{ backgroundColor: "#1B232A", color: "#fff", border: "none" }}>
//                                         {props.children}
//                                     </th>
//                                 ),
//                             },
//                         }}
//                         bordered
//                         style={{
//                             backgroundColor: "#F7F9FB",
//                             borderRadius: "8px",
//                             boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//                         }}
//                         pagination={false}
//                         scroll={{ x: "max-content" }} />
//                     <Modal
//                         title={editingEmployee ? "Редактировать сотрудника" : "Добавить сотрудника"}
//                         visible={isModalOpen}
//                         onCancel={() => setIsModalOpen(false)}
//                         footer={null}
//                     >
//                         <Form
//                             form={form}
//                             onFinish={handleSave}
//                             initialValues={editingEmployee || {}}
//                         >
//                             <Form.Item
//                                 name="name"
//                                 label="Имя"
//                                 rules={[{ required: true, message: "Введите имя" }]}
//                             >
//                                 <Input />
//                             </Form.Item>
//                             <Form.Item
//                                 name="phoneNumber"
//                                 label="Телефон"
//                                 rules={[{ required: true, message: "Введите телефон" }]}
//                             >
//                                 <Input />
//                             </Form.Item>
//                             <Form.Item
//                                 name="email"
//                                 label="Email"
//                                 rules={[
//                                     { required: true, message: "Введите email" },
//                                     { type: "email", message: "Некорректный email" },
//                                 ]}
//                             >
//                                 <Input />
//                             </Form.Item>
//                             <Form.Item
//                                 name="role"
//                                 label="Роль"
//                                 rules={[{ required: true, message: "Выберите роль" }]}
//                             >
//                                 <Select>
//                                     <Option value="Суперадминистратор">Суперадминистратор</Option>
//                                     <Option value="Администратор">Администратор</Option>
//                                     <Option value="Оператор">Оператор</Option>
//                                 </Select>
//                             </Form.Item>
//                             <Form.Item
//                                 name="position"
//                                 label="Должность"
//                                 rules={[{ required: true, message: "Введите должность" }]}
//                             >
//                                 <Input />
//                             </Form.Item>
//                             <Form.Item
//                                 name="workplace"
//                                 label="Организация"
//                                 rules={[{ required: true, message: "Введите место организации" }]}
//                             >
//                                 <Input />
//                             </Form.Item>
//                             <Button type="primary" htmlType="submit">
//                                 Сохранить
//                             </Button>
//                         </Form>
//                     </Modal>
//                 </Col>
//             </Row>
//         </div>
//     );
// };

// export default EmployeesPage;

import React, { useState, useEffect } from "react";
import { Button, Form, Input,message, Modal, Popconfirm, Select, Space } from "antd";
import EmployeesPage from "../../shared/EmployeesPage";
import { EditOutlined, DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import form from "antd/es/form";
import axios from "axios";
import axiosInstance from "../../../services/axiosInstance";

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

    return <>
    <EmployeesPage extraControls={extraControls} extraActions={extraActions} />
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
                                     <Select>
                                         <Option value="Суперадминистратор">Суперадминистратор</Option>
                                         <Option value="Администратор">Администратор</Option>
                                         <Option value="Оператор">Оператор</Option>
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

