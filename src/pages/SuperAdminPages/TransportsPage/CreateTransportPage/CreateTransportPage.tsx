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
} from "antd";
import { Car } from "../../../../types/transportListTypes";
import { Common } from "../../../../types/editCarTypes";
import dayjs from "dayjs";
import axiosInstance from "../../../../services/axiosInstance";

const CreateTransportPage = () => {
  const [form] = Form.useForm();
  const [techniques, setTechniques] = useState<Common[]>([]);
  const [engines, setEngines] = useState<Common[]>([]);
  const [organizations, setOrganizations] = useState<Common[]>([]);

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
  return (

    <div style={{
      display: "flex", 
      flexDirection: "column", 
      width: "100%", 
      height: "100vh", 
      backgroundColor: "#F0F4F8",
      boxSizing: "border-box", 
      }}>
      <Row style={{ width: "80%", margin: "30px auto" }}>
        <Col xs={12}>
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              label={
                <label
                  style={{
                    width: "120px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  Модель
                </label>
              }
              name="model"
              rules={[{ required: true, message: "Введите модель автомобиля" }]}
            >
              <Input
                placeholder="Введите модель автомобиля"
                style={{ width: "200px" }}
              />
            </Form.Item>
            <Form.Item
              label={
                <label
                  style={{
                    width: "120px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  VIN номер
                </label>
              }
              name="vin"
              rules={[
                { required: true, message: "Введите VIN автомобиля" },
                { 
                  len: 17,
                  message: "VIN номер должен быть 17 символов",
                },
                {
                  pattern: /^[A-HJ-NPR-Z0-9]{17}$/,
                  message: "VIN номер должен содержать только буквы A-H, J-N, P-R и цифры",
                },
              ]}
            >
              <Input
                placeholder="Введите VIN автомобиля"
                style={{ width: "200px" }}
              />
            </Form.Item>
            <Form.Item
              label={
                <label
                  style={{
                    width: "120px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  Дата
                </label>
              }
              name="year_release"
              rules={[{ required: true, message: "Выберите дату" }]}
            >
              <DatePicker
                style={{ width: "200px" }}
                format={formatDate}
                placeholder="YYYY"
              />
            </Form.Item>
            <Form.Item
              label={
                <label
                  style={{
                    width: "120px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  Выбор двигателя
                </label>
              }
              name="engine_type_id"
              rules={[
                {
                  required: true,
                  message: "Выберите тип двигателя автомобиля",
                },
              ]}
            >
              <Select
                placeholder="Выберите тип двигателя автомобиля"
                style={{ width: "200px" }}
                options={techniqueOptions}
              />
            </Form.Item>

            <Form.Item
              label={
                <label
                  style={{
                    width: "120px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  Тип автомобиля
                </label>
              }
              name="vehicle_type_id"
              rules={[{ required: true, message: "Выберите тип автомобиля" }]}
            >
              <Select
                placeholder="Выберите тип автомобиля"
                style={{ width: "200px" }}
                options={engineOptions}
              />
            </Form.Item>
            <Form.Item
              label={
                <label
                  style={{
                    width: "120px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  Организация
                </label>
              }
              name="organization_id"
              rules={[{ required: true, message: "Выберите организацию" }]}
            >
              <Select
                placeholder="Выберите организацию"
                style={{ width: "200px" }}
                options={organizationsOptions}
              />
            </Form.Item>
            <Button
              style={{  marginTop: "30px" }}
              type="primary"
              htmlType="submit"
            >
              Добавить новый автомобиль
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default CreateTransportPage;
