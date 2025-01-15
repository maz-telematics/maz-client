import { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Table,
  Popconfirm,
} from "antd";
import { Car } from "../../../../types/transportListTypes";
import { Common } from "../../../../types/editCarTypes";
import dayjs from "dayjs";
import axiosInstance from "../../../../services/axiosInstance";
import { Parameter } from "../EditTransportPage/EditTransportPage";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';

const CreateTransportPage = () => {
  const [form] = Form.useForm();
  const [techniques, setTechniques] = useState<Common[]>([]);
  const [engines, setEngines] = useState<Common[]>([]);
  const [organizations, setOrganizations] = useState<Common[]>([]);
  const [parameters, setParameters] = useState<any[]>([]);
  const [editingKey, setEditingKey] = useState<number | null>(null);
  useEffect(() => {
    fetchEngines();
    fetchTechniques();
    fetchOrganizatios();

    function fetchTechniques() {
      axiosInstance.get(`/transport/types-engines`)
        .then((response) => setTechniques(response.data))
        .catch((error) => console.error(error));
    }

    function fetchEngines() {
      axiosInstance.get(`/transport/types-transport`)
        .then((response) => setEngines(response.data))
        .catch((error) => console.error(error));
    }

    function fetchOrganizatios() {
      axiosInstance.get(`/organizations`)
        .then((response) => setOrganizations(response.data))
        .catch((error) => console.error(error));
    }
  }, []);

  const onFinish = async (values: Car) => {
    try {
      const response = await axiosInstance.post(`/new-car`, values);
      if (response.status === 201) {
        message.success("Авто добавлено!");
        form.resetFields();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Произошла ошибка на сервере";
      message.error(errorMessage);
    }
  };

  const techniqueOptions = techniques.map((technique) => ({
    value: technique.id,
    label: technique.type,
  }));

  const engineOptions = engines.map((engine) => ({
    value: engine.id,
    label: engine.type,
  }));

  const organizationsOptions = organizations.map((organization) => ({
    value: organization.organization_id,
    label: organization.organization_name,
  }));

  const formatDate = (date: any) => dayjs(date).format("YYYY");

  const columns = [
    {
      title: "CAN номер (c)",
      dataIndex: "c",
      render: (_: any, record: any) => {
        return <span>{record.c}</span>;
      },
    },
    {
      title: "Message ID (i)",
      dataIndex: "i",
      render: (_: any, record: any) => {
        return <span>{record.i}</span>;
      },
    },
    {
      title: "Период (t)",
      dataIndex: "t",
      render: (_: any, record: any) => {
        return <span>{record.t}</span>;
      },
    },
    {
      title: "Название",
      dataIndex: "name",
      render: (_: any, record: any) => {
        return <span>{record.name}</span>;
      },
    },
    {
      title: "Действия",
      dataIndex: "actions",
      render: (_: any, record: Parameter) => {
        const editable = isEditing(record);
        return editable ? (
          <>
            <Button type="link" onClick={() => handleSave(record.key)}>
              Сохранить
            </Button>
            <Button type="link" onClick={handleCancel}>
              Отмена
            </Button>
          </>
        ) : (
          <>
            <Button type="link" onClick={() => handleEdit(record)}>
              Изменить
            </Button>
            <Popconfirm
              title="Удалить этот параметр?"
              onConfirm={() => handleDelete(record.key)}
            >
              <Button type="link" danger>
                Удалить
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const isEditing = (record: Parameter) => record.key === editingKey;

  const handleEdit = (record: Parameter) => {
    setEditingKey(record.key);
  };

  const handleSave = (key: number) => {
    const row = parameters.find((item) => item.key === key);
    if (row) {
      const newData = [...parameters];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        newData[index] = { ...row }; // Save changes here
        setParameters(newData);
        setEditingKey(null); // Reset editing mode
        message.success("Параметр обновлен");
      }
    }
  };

  const handleCancel = () => {
    setEditingKey(null);
  };

  const handleAdd = () => {
    const newKey = `${parameters.length + 1}`;
    const newParameter = {
      key: newKey,
      c: "",
      i: "",
      t: "",
      name: "",
    };
    setParameters((prev) => [...prev, newParameter]);
  };

  const handleDelete = (key: number) => {
    setParameters((prev) => prev.filter((item) => item.key !== key));
    message.success("Параметр удален");
  };
  const isMobile = window.innerWidth < 768;
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Row style={{ padding: "0 40px", flex: "1" }}>
        <Col xs={24}>
          <h1 style={{ margin: 0, fontSize: isMobile ? '24px' : '32px', marginBottom: 16 }}>Создание транспорта</h1>

<Form
  form={form}
  onFinish={onFinish}
  layout="horizontal"
  style={{ maxWidth: "600px" }} // Центрируем форму и задаем ширину
>
  <Form.Item
    label="Модель"
    name="model"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 16 }}
    rules={[{ required: true, message: "Введите модель автомобиля" }]}
    style={{ marginBottom: "16px" }}
  >
    <Input placeholder="Введите модель автомобиля" style={{ width: "100%" }} />
  </Form.Item>

  <Form.Item
    label="VIN номер"
    name="vin"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 16 }}
    rules={[
      { required: true, message: "Введите VIN автомобиля" },
      { len: 17, message: "VIN номер должен быть 17 символов" },
      {
        pattern: /^[A-HJ-NPR-Z0-9]{17}$/,
        message: "VIN номер должен содержать только буквы A-H, J-N, P-R и цифры",
      },
    ]}
    style={{ marginBottom: "16px" }}
  >
    <Input placeholder="Введите VIN автомобиля" style={{ width: "100%" }} />
  </Form.Item>

  

  <Form.Item
    label="Тип автомобиля"
    name="vehicle_type_id"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 16 }}
    rules={[{ required: true, message: "Выберите тип автомобиля" }]}
    style={{ marginBottom: "16px" }}
  >
    <Select
      placeholder="Выберите тип автомобиля"
      style={{ width: "100%" }}
      options={engineOptions}
    />
  </Form.Item>

  <Form.Item
    label="Тип двигателя"
    name="engine_type_id"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 16 }}
    rules={[{ required: true, message: "Выберите тип двигателя автомобиля" }]}
    style={{ marginBottom: "16px" }}
  >
    <Select
      placeholder="Выберите тип двигателя автомобиля"
      style={{ width: "100%" }}
      options={techniqueOptions}
    />
  </Form.Item>

  <Form.Item
    label="Год выпуска"
    name="year_release"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 16 }}
    rules={[{ required: true, message: "Выберите дату" }]}
    style={{ marginBottom: "16px" }}
  >
    <DatePicker
      format={formatDate}
      placeholder="YYYY"
      style={{ width: "100%" }}
    />
  </Form.Item>

  <Form.Item
    label="Организация"
    name="organization_id"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 16 }}
    rules={[{ required: true, message: "Выберите организацию" }]}
    style={{ marginBottom: "16px" }}
  >
    <Select
      placeholder="Выберите организацию"
      style={{ width: "100%" }}
      options={organizationsOptions}
    />
  </Form.Item>

  <Form.Item
  label="Блок телематики"
  name="state_block"
  labelCol={{ span: 6 }}
  wrapperCol={{ span: 16 }}
  rules={[
    {
      required: true,
      message: "Выберите название блока",
    },
  ]}
>
  <Select placeholder="Выберите блок">
    <Select.Option value="Агат">Агат</Select.Option>
    <Select.Option value="Проток">Проток</Select.Option>
  </Select>
</Form.Item>


</Form>
          <Row justify="space-between" style={{ marginBottom: "15px", marginTop:"30px", alignItems: 'flex-end' }}>
            <h2 style={{margin:0, fontSize: isMobile ? '18px' : '24px'}}>Параметры мониторинга</h2>
            <Button icon={<LibraryAddOutlinedIcon />} type="primary" onClick={handleAdd} style={{ backgroundColor: "#3A5F73", }}>
              {!isMobile && 'Добавить параметр'}
            </Button>
          </Row>
          <Table
            components={{
              header: {
                cell: (props: any) => (
                  <th {...props} style={{ backgroundColor: "#1B232A", color: "#fff", border: "none" }}>
                    {props.children}
                  </th>
                ),
              },
            }}
            dataSource={parameters}
            columns={columns}
            rowClassName="editable-row"
            pagination={false}
            scroll={{ x: 'max-content' }}
          />
             <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
  <Button style={{  backgroundColor: "#3A5F73" }} type="primary" htmlType="submit">
              Добавить новый автомобиль
            </Button>
            </div>
        </Col>
      </Row>
    </div>
  );
};

export default CreateTransportPage;
