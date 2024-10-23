import { useState, useEffect } from "react";
import {
  Button,
  Row,
  DatePicker,
  Col,
  Form,
  Select,
  Spin,
  Input,
  message,
} from "antd";
import axios from "axios";
import { Car } from "../../types/transportListTypes";
import dayjs from "dayjs";
import Header from "../../components/Header";
import { Common } from "../../types/editCarTypes";
const apiUrl = process.env.REACT_APP_API_URL;
const EditCar = () => {
  const [data, setData] = useState<Car>();
  const [techniques, setTechniques] = useState<Common[]>([]);
  const [engines, setEngines] = useState<Common[]>([]);
  const [organizations, setOrganizations] = useState<Common[]>([]);
  const [idTransport, setIdTransport] = useState<number>(
    Number(sessionStorage.getItem("id"))
  );

  const dateValue = data?.year_release
    ? dayjs(data.year_release).format("YYYY")
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
      axios
        .get(`${apiUrl}/transport/types-engines`)
        .then((response) => setTechniques(response.data))
        .catch((error) => console.error(error));
    }

    function fetchEngines() {
      axios
        .get(`${apiUrl}/transport/types-transport`)
        .then((response) => setEngines(response.data))
        .catch((error) => console.error(error));
    }

    function fetchTransportData() {
      axios
        .get(`${apiUrl}/transport/car/${idTransport}`)
        .then((response) => setData(response.data[0]))
        .catch((error) => console.error(error));
    }
    function fetchOrganizatios() {
      axios
        .get(`${apiUrl}/organizations`)
        .then((response) => setOrganizations(response.data))
        .catch((error) => console.error(error));
    }
  }, [idTransport]);

  const [form] = Form.useForm();

  const isValidKey = (key: string): key is keyof typeof data => {
    if (!data) return false;
    return Object.keys(data).includes(key);
  };
  const onFinish = async (values: Pick<Car, keyof Car>) => {
    try {
      const changedFields = Object.keys(values).filter(
        (key) => form.getFieldValue(key) !== undefined
      );

      const changedFieldValues = changedFields.map((key) => {
        return { name: key, value: form.getFieldValue(key) };
      });

      console.log(changedFieldValues);

      if (changedFieldValues.length > 0) {
        // Изменено для проверки на массив
        try {
          const response = await axios.patch(
            `${apiUrl}/transport/${idTransport}`,
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
          message.error(errorMessage); // Отображение ошибки
        }
      } else {
        message.warning("Ничего не изменено");
      }
    } catch (error) {
      console.error(error);
      message.error("Произошла общая ошибка"); // Обрабатываем общую ошибку
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

  return (
    <div
      style={{
        display: "flex", 
      flexDirection: "column", 
      width: "100%", 
      height: "100vh", // Установить 100vh, чтобы занять всю высоту
      backgroundColor: "#F0F4F8",
      boxSizing: "border-box",
      }}
    >
      {/* <Header /> */}
      <Row style={{ width: "80%", margin: "30px auto" }}>
        <Col xs={24}>
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
            >
              <Input placeholder={data?.model} style={{ width: "200px" }} />
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
                {
                  len: 17,
                  message: "VIN номер должен быть 17 символов",
                },
                {
                  pattern: /^[A-HJ-NPR-Z0-9]{17}$/,
                  message:
                    "VIN номер должен содержать только буквы A-H, J-N, P-R и цифры",
                },
              ]}
            >
              <Input placeholder={data?.vin} style={{ width: "200px" }} />
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
            >
              <DatePicker
                style={{ width: "200px" }}
                value={dateValue}
                format="YYYY"
                placeholder="Выберите год"
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
            >
              <Select
                placeholder={data?.engine_type}
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
            >
              <Select
                placeholder={data?.vehicle_type}
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
            >
              <Select
                placeholder={data?.organization}
                style={{ width: "200px" }}
                options={organizationsOptions}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Изменить данные автомобиля
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default EditCar;
