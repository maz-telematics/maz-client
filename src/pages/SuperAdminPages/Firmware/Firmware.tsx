import React, { useState, useEffect } from "react";
import {
    Table,
    Button,
    Row,
    Col,
    Popconfirm,
    Space,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import { useNavigate } from "react-router-dom";

const Firmware: React.FC = () => {
    const navigate = useNavigate();

    const [firmwares, setFirmwares] = useState([
        {
            id: "1",
            firmwareName: "Прошивка 1",
            createdAt: "2025-01-23",
            targetBlock: "Блок управления двигателем",
        },
    ]);

    const columns = [
        {
            title: "Название",
            dataIndex: "firmwareName",
            key: "firmwareName",
             render: (model: string, record) => (
                    <a
                      onClick={() => {
                        // Сохраняем VIN или id в sessionStorage
                        sessionStorage.setItem("id", record.id);
                        
                        // Перенаправляем на страницу
                        navigate(`/master/firmware?id=${record.id}`);
                      }}
                      style={{ color: "red", fontWeight: 500 }}
                    >
                      {model}
                    </a>
                  ),
        },
        {
            title: "Дата создания",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        {
            title: "Блок",
            dataIndex: "targetBlock",
            key: "targetBlock",
        },
        {
            title: "Действие",
            key: "actions",
            render: (_: any, record: any) => (
                <Popconfirm
                    title="Вы уверены, что хотите переместить эту прошивку в архив?"
                    onConfirm={() => handleArchive(record.id)}
                    okText="Да"
                    cancelText="Нет"
                >
                    <Button icon={<InboxOutlined />}>
                        В архив
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    const handleArchive = (id: string) => {
        setFirmwares((prev) => prev.filter((firmware) => firmware.id !== id));
    };

    const isMobile = window.innerWidth < 768;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                backgroundColor: "#E1E1E1",
            }}
        >
            <Row style={{ padding: "0 40px" }}>
                <Col xs={24}>
                    <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                        <Col>
                            <h1
                                style={{
                                    margin: 0,
                                    fontSize: isMobile ? "24px" : "32px",
                                }}
                            >
                                Прошивки
                            </h1>
                        </Col>
                        <Col>
                            <Button
                                type="primary"
                                onClick={() => navigate("/master/create-transport")}
                                icon={<LibraryAddOutlinedIcon />}
                                style={{
                                    backgroundColor: "#1B232A",
                                    border: "none",
                                }}
                            >
                                {!isMobile && "Создать прошивку"}
                            </Button>
                        </Col>
                    </Row>
                    <Table
                        columns={columns}
                        dataSource={firmwares}
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
                        pagination={false}
                        scroll={{ x: "max-content" }}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Firmware;
