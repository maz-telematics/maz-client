import React, { useEffect, useState } from "react";
import { Table, Row, Col, Modal, Button, Descriptions, Form, Input, InputNumber } from "antd";
import { FirmwareParameter } from "../../../types/firmwareTypes"; // Тип данных прошивки
import DownloadButton from "../../../Components/DownloadButton";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import { v4 as uuidv4 } from 'uuid';

const FirmwareDetailsPage: React.FC = () => {
  const [firmwareData, setFirmwareData] = useState<FirmwareParameter[]>([]);
  const [selectedParameter, setSelectedParameter] = useState<FirmwareParameter | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // Для теста: используем несколько фиктивных данных
  useEffect(() => {
    const fetchFirmwareData = async () => {
      const testData: FirmwareParameter[] = [
        {
          id: "1",
          can: "0x01",
          bytes: 4,
          bits: 32,
          times: 1,
          offset: 0,
          coefficient: 1.0,
          mapping: "Mapping 1",
          name: "Engine Temperature",
          group: "Engine",
        },
        {
          id: "2",
          can: "0x02",
          bytes: 2,
          bits: 16,
          times: 1,
          offset: 100,
          coefficient: 1.5,
          mapping: "Mapping 2",
          name: "Battery Voltage",
          group: "Electrical",
        },
      ];
      setFirmwareData(testData);
    };

    fetchFirmwareData();
  }, []);

  const handleAddNew = () => {
    const newParameter: FirmwareParameter = {
      id: uuidv4(),
      can: "",
      bytes: 0,
      bits: 0,
      times: 0,
      offset: 0,
      coefficient: 1.0,
      mapping: "",
      name: "",
      group: "",
    };
    setFirmwareData([...firmwareData, newParameter]);
    setSelectedParameter(newParameter);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setFirmwareData(firmwareData.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedData = firmwareData.map((item) =>
          item.id === selectedParameter?.id ? { ...item, ...values } : item
        );
        setFirmwareData(updatedData);
        setIsModalOpen(false);
        setIsEditing(false);
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "CAN",
      dataIndex: "can",
      key: "can",
      render: (text: string, record: FirmwareParameter) => (
        <a onClick={() => {
          setSelectedParameter(record);
          setIsModalOpen(true);
        }}>{text}</a>
      ),
    },
    {
      title: "Bytes",
      dataIndex: "bytes",
      key: "bytes",
    },
    {
      title: "Bits",
      dataIndex: "bits",
      key: "bits",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: FirmwareParameter) => (
        <Button danger onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

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
              <h1 style={{ margin: 0 }}>Прошивка</h1>
            </Col>
            <Col>
              <Row align="middle" wrap={false} style={{ gap: "16px" }}>
                <Button
                  type="primary"
                  icon={<LibraryAddOutlinedIcon />}
                  onClick={handleAddNew}
                  style={{ backgroundColor: "#1B232A", border: "none" }}
                >
                  Добавить
                </Button>
                <DownloadButton
                  url="/api/transports/download"
                  filename="transports.pdf"
                  buttonText="Скачать таблицу"
                  icon={<DownloadIcon style={{ fontSize: 18, color: 'white' }} />}
                />
              </Row>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={firmwareData}
            rowKey="id"
            pagination={false}
          />
        </Col>
      </Row>

      <Modal
        title={isEditing ? "Редактировать параметр" : "Добавить параметр"}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={
          <Button type="primary" onClick={handleSave}>
            Сохранить
          </Button>
        }
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={selectedParameter || {}}
          onValuesChange={(changedValues, allValues) => {
            setSelectedParameter((prev) => ({ ...prev, ...allValues } as FirmwareParameter));
          }}
        >
          <Form.Item label="CAN" name="can" rules={[{ required: true, message: "Введите CAN" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Bytes" name="bytes" rules={[{ required: true, message: "Введите Bytes" }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Bits" name="bits" rules={[{ required: true, message: "Введите Bits" }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Введите Name" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FirmwareDetailsPage;
