import React, { useEffect, useState } from "react";
import { Button, Form, Input, Table, message, Popconfirm, Col, Row, DatePicker, Select } from "antd";
import { Common } from "../../../../types/editCarTypes";
import { Car } from "../../../../types/transportListTypes";
import dayjs from "dayjs";
import axiosInstance from "../../../../services/axiosInstance";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';

export interface Parameter {
  key: number; // Уникальный ключ для рендера
  c: number; // CAN номер
  i: number; // Message ID
  t: number; // Период сообщения
  name: string; // Имя параметра
}

const EditTransportPage = () => {
  const [parameters, setParameters] = useState<Parameter[]>([
    { key: 1, c: 100, i: 1, t: 10, name: "Engine Speed" },
    { key: 2, c: 101, i: 2, t: 15, name: "Fuel Level" },
  ]);
  const [data, setData] = useState<Car>();
  const [techniques, setTechniques] = useState<Common[]>([]);
  const [engines, setEngines] = useState<Common[]>([]);
  const [organizations, setOrganizations] = useState<Common[]>([]);
  const [idTransport, setIdTransport] = useState<number>(
    Number(sessionStorage.getItem("id"))
  );
  const [editingKey, setEditingKey] = useState<number | null>(null);

  const dateValue = data?.yearRelease
    ? dayjs(data.yearRelease).format("YYYY")
    : null;

  useEffect(() => {
    const fetchData = async () => {
      fetchEngines();
      fetchTechniques();
      fetchOrganizatios();
      if (idTransport) {
        fetchTransportData();
      }
    };

    fetchData();

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

    function fetchTransportData() {
      axiosInstance.get(`/transport/car/${idTransport}`)
        .then((response) => setData(response.data[0]))
        .catch((error) => console.error(error));
    }

    function fetchOrganizatios() {
      axiosInstance.get(`/organizations`)
        .then((response) => setOrganizations(response.data))
        .catch((error) => console.error(error));
    }
  }, [idTransport]);

  const [form] = Form.useForm();

  const isValidKey = (key: string): key is keyof typeof data => {
    if (!data) return false;
    return Object.keys(data).includes(key);
  };

  const saveAllChanges = async () => {
    try {
      const response = await axiosInstance.post(`/transport/parameters/${idTransport}`, {
        parameters,
      });
      if (response.status === 200) {
        message.success("Параметры успешно сохранены!");
      }
    } catch (error) {
      console.error("Ошибка при сохранении параметров: ", error);
      message.error("Не удалось сохранить параметры. Попробуйте еще раз.");
    }
  };

  const onFinish = async (values: Pick<Car, keyof Car>) => {
    try {
      const changedFields = Object.keys(values).filter(
        (key) => form.getFieldValue(key) !== undefined
      );

      const changedFieldValues = changedFields.map((key) => {
        return { name: key, value: form.getFieldValue(key) };
      });

      if (changedFieldValues.length > 0) {
        try {
          const response = await axiosInstance.patch(`/transport/${idTransport}`,
            changedFieldValues
          );
          setData(response.data);
          message.success("Авто обновлено!");
          form.resetFields();
        } catch (error: any) {
          console.error(error);
          const errorMessage =
            error.response?.data?.error ||
            "Произошла ошибка при обновлении данных";
          message.error(errorMessage);
        }
      } else {
        message.warning("Ничего не изменено");
      }
    } catch (error) {
      console.error(error);
      message.error("Произошла общая ошибка");
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

  const isEditing = (record: Parameter) => record.key === editingKey;

  const handleEdit = (record: Parameter) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const save = async (key: number) => {
    try {
      const row = (await form.validateFields()) as Omit<Parameter, "key">;
      const newParameters = [...parameters];
      const index = newParameters.findIndex((item) => key === item.key);
      if (index > -1) {
        newParameters[index] = { ...row, key };
        setParameters(newParameters);
        setEditingKey(null);
        message.success("Параметр обновлен!");
      }
    } catch (error) {
      console.error("Ошибка при сохранении: ", error);
      message.error("Ошибка валидации!");
    }
  };

  const cancel = () => setEditingKey(null);

  const handleDelete = (key: number) => {
    setParameters(parameters.filter((item) => item.key !== key));
    message.success("Параметр удален!");
  };

  const handleAdd = () => {
    const newKey = parameters.length
      ? Math.max(...parameters.map((p) => p.key)) + 1
      : 1;

    const emptyRow: Parameter = {
      key: newKey,
      c: 0,
      i: 0,
      t: 0,
      name: "",
    };

    setParameters([...parameters, emptyRow]);
    setEditingKey(newKey);
  };

  const columns = [
    {
      title: "CAN номер (c)",
      dataIndex: "c",
      render: (_: any, record: Parameter) => {
        return isEditing(record) ? (
          <Form.Item
            name="c"
            rules={[{ required: true, message: "Введите CAN номер!" }]}>
            <Input />
          </Form.Item>
        ) : (
          <span onClick={() => handleEdit(record)}>{record.c}</span>
        );
      },
    },
    {
      title: "Message ID (i)",
      dataIndex: "i",
      render: (_: any, record: Parameter) => {
        return isEditing(record) ? (
          <Form.Item
            name="i"
            rules={[{ required: true, message: "Введите Message ID!" }]}>
            <Input />
          </Form.Item>
        ) : (
          <span onClick={() => handleEdit(record)}>{record.i}</span>
        );
      },
    },
    {
      title: "Период (t)",
      dataIndex: "t",
      render: (_: any, record: Parameter) => {
        return isEditing(record) ? (
          <Form.Item
            name="t"
            rules={[{ required: true, message: "Введите Период!" }]}>
            <Input />
          </Form.Item>
        ) : (
          <span onClick={() => handleEdit(record)}>{record.t}</span>
        );
      },
    },
    {
      title: "Название",
      dataIndex: "name",
      render: (_: any, record: Parameter) => {
        return isEditing(record) ? (
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Введите название параметра!" }]}>
            <Input />
          </Form.Item>
        ) : (
          <span onClick={() => handleEdit(record)}>{record.name}</span>
        );
      },
    },
    {
      title: "Действия",
      dataIndex: "actions",
      render: (_: any, record: Parameter) => {
        const editable = isEditing(record);
        return editable ? (
          <>
            <Button type="link" onClick={() => save(record.key)}>
              Сохранить
            </Button>
            <Button type="link" onClick={cancel}>
              Отмена
            </Button>
          </>
        ) : (
          <>
        {/* Возможность редактирования параметра */}
        <Button type="link" onClick={() => handleEdit(record)}>
          Редактировать
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
      <Row style={{ width: "100%", padding: isMobile ? "0 16px" : "0 40px" }}>
        <Col xs={24}>
          <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
            <Col>
              <h1 style={{ margin: 0, fontSize: isMobile ? '24px' : '32px', }}>Настройки транспорта</h1>
            </Col>
          </Row>
          <Form
  form={form}
  onFinish={onFinish}
  layout="horizontal"
  style={{ maxWidth: "600px"}} // Центрируем форму и задаем ширину
>
  {[
    { label: "Модель", name: "model", placeholder: data?.model },
    { label: "VIN номер", name: "vin", placeholder: data?.id },
    
      // component: (
      //   <Select
      //     placeholder={data?.vehicleType}
      //     options={engineOptions}
      //     style={{ width: "100%" }}
      //   />
      // ),
     
    {
      label: "Тип транспорта",
      name: "vehicle_type_id",
      component: (
        <Select
          placeholder={data?.vehicleType}
          options={engineOptions}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      label: "Тип двигателя",
      name: "engine_type_id",
      component: (
        <Select
          placeholder={data?.engineType}
          options={techniqueOptions}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      label: "Дата выпуска",
      name: "year_release",
      component: (
        <DatePicker
          value={dateValue}
          format="YYYY"
          placeholder="Выберите год"
          style={{ width: "100%" }}
        />
      ),
    },
    
    
    {
      label: "Организация",
      name: "organization_id",
      component: (
        <Select
          placeholder={data?.organizationName}
          options={organizationsOptions}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      label: "Блок телематики",
      name: "block",
      component: (
        <Select
          placeholder={data?.telemetryBlock || "Выберите блок"}
          options={[
            { value: "Агат", label: "Агат" },
            { value: "Проток", label: "Проток" },
          ]}
          style={{ width: "100%" }}
        />
      ),
    },
    
  ].map((field, index) => (
    <Form.Item
      key={index}
      label={field.label}
      name={field.name}
      labelCol={{ span: 5 }} // Сетку для лейблов
      wrapperCol={{ span: 12 }} // Сетку для полей ввода
      style={{ marginBottom: "16px" }}
    >
      {field.component || (
        <Input
          
          style={{ width: "100%" }}
        />
      )}
    </Form.Item>
  ))}
  
  {/* <Form.Item style={{ textAlign: "center", marginTop: "20px" }}>
    <Button
      type="primary"
      htmlType="submit"
      style={{ backgroundColor: "#3A5F73" }}
      icon={<ModeEditOutlinedIcon />}
    >
      Изменить данные автомобиля
    </Button>
  </Form.Item> */}
</Form>
          <Row justify="space-between" style={{ marginBottom: "15px", marginTop:"30px", alignItems: 'flex-end' }}>
            <h2 style={{margin:0, fontSize: isMobile ? '18px' : '24px'}}>Редактирование параметров</h2>
            <Button
                type="primary"
                onClick={handleAdd}
                disabled={!!editingKey}
                style={{ backgroundColor: "#3A5F73" }}
                icon={<LibraryAddOutlinedIcon />}
              >
               {!isMobile && 'Добавить параметр'}
              </Button>
          </Row>
          <Form form={form} component={false}>
            <Table
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
              dataSource={parameters}
              columns={columns}
              rowClassName="editable-row"
              pagination={false}
              scroll={{ x: 'max-content' }}
            />
          </Form>
          <Row gutter={16} style={{ marginTop: "20px", justifyContent: "flex-end" }}>
            <Col>
              <Button
                type="primary"
                onClick={saveAllChanges}
                disabled={!parameters.length}
                style={{ backgroundColor: "#3A5F73" }}
                icon={<SaveAltOutlinedIcon />}
              >
                Сохранить все изменения
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default EditTransportPage;
