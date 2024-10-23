import axios from "axios";
import { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Collapse,
  Form,
  DatePicker,
  Input,
  message,
  Modal,
} from "antd";
import Header from "../../components/Header";
import { subscribe } from "diagnostics_channel";
const { RangePicker } = DatePicker;
const apiUrl = process.env.REACT_APP_API_URL;
interface TransportFormValues {
    vin: string;
  }


const NewOrganization = () => {
    const [transportList, setTransportList] = useState<string[]>([]);
    const [transportFormVisible, setTransportFormVisible] = useState(false);
    const [transportForm] = Form.useForm<TransportFormValues>();
    const [form] = Form.useForm();
  
    const handleTransportFinish = (transportValues: TransportFormValues) => {
        // Добавляем только VIN в transportList
        setTransportList((prevList) => [...prevList, transportValues.vin]);
        transportForm.resetFields(); // Сбрасываем поля формы для ввода нового транспорта
        setTransportFormVisible(false);
        message.success('Транспорт добавлен');
      };

  const handleAddTransport = () => {
    setTransportFormVisible(true);
  };

  const handleRemoveTransport = (index: number) => {
    setTransportList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const onFinish = async (values: any) => {
    // Подготовка данных для отправки
    const dataToSend = {
      organization_name: values.organization_name,
      address: values.address,
      contact_person: values.сontact_person,
      number_phone: values.number_phone,
      email: values.email,
      password: values.password,
      transport: transportList,
      subscribe:{
        start_date:values.subscribe[0].format("YYYY-MM-DD HH:MM:ss"),
        end_date:values.subscribe[1].format(" YYYY-MM-DD HH:MM:ss")
      }
    };
    console.log(dataToSend)
    try {
      const response = await axios.post(`${apiUrl}/organizations/new`, {params:dataToSend});
      message.success('Организация успешно создана');
      form.resetFields(); // очищаем форму
      setTransportList([]); // очищаем список транспорта
    } catch (error) {
      message.error('Ошибка при создании организации');
      console.error('Ошибка:', error);
    }
  };
  return (
    <div style={{
      display: "flex", 
      flexDirection: "column", 
      width: "100%", 
      height: "100vh", // Установить 100vh, чтобы занять всю высоту
      backgroundColor: "#F0F4F8",
      boxSizing: "border-box", // Чтобы отступы учитывались в общей высоте
      }}>
      {/* <Header /> */}
      <Row style={{ width: "80%", margin: "30px auto" }}>
        <Col xs={12}>
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              label={
                <label
                  style={{
                    width: "170px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  Название организации
                </label>
              }
              name="organization_name"
              rules={[{ required: true, message: "Укажите название организации" }]}
            >
              <Input
                placeholder="Введите название организации"
                style={{ width: "200px" }}
              />
            </Form.Item>
            <Form.Item
              label={
                <label
                  style={{
                    width: "170px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  Адрес
                </label>
              }
              name="address"
              rules={[{ required: true, message: "Укажите адрес организации" }]}
            >
              <Input
                placeholder="Введите адрес организации"
                style={{ width: "200px" }}
              />
            </Form.Item>
            <Form.Item
              label={
                <label
                  style={{
                    width: "170px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  Контактное лицо
                </label>
              }
              name="сontact_person"
              rules={[{ required: true, message: "Укажите контактное лицо" }]}
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
                    width: "170px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  Номер телефона
                </label>
              }
              name="number_phone"
              rules={[
                {
                  required: true,
                  message: "Укажите номер телефона",
                },
              ]}
            >
             <Input
                placeholder="Введите номер телефона"
                style={{ width: "200px" }}
              />
            </Form.Item>

            <Form.Item
              label={
                <label
                  style={{
                    width: "170px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  Электронная почта
                </label>
              }
              name="email"
              rules={[{ required: true, message: "Укажите электронную почту" }]}
            >
             <Input
                placeholder="Введите электронную почту"
                style={{ width: "200px" }}
              />
            </Form.Item>
            <Form.Item    label={
                <label
                  style={{
                    width: "170px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                   Подписка:
                </label>
                
              }
              name="subscribe"
              rules={[{ required: true, message: "Укажите срок подписки" }]}>
                
              <RangePicker/>
            </Form.Item>
            <Form.Item
              label={
                <label
                  style={{
                    width: "170px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  Транспорт
                </label>
              }
              name="transport"

            >
         
         <Button  onClick={handleAddTransport} style={{ marginBottom:"20px"}}>
        Добавить транспорт
      </Button>
     
      <Collapse>
        {transportList.map((vin, index) => (
          <Collapse.Panel header={`Транспортное средство ${index + 1}`} key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ margin: 0 }}>VIN: {vin}</p>
              <Button type="link" onClick={() => handleRemoveTransport(index)}>Удалить</Button>
            </div>
          </Collapse.Panel>
        ))}
      </Collapse>

            </Form.Item>
            <Form.Item
              label={
                <label
                  style={{
                    width: "170px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                 Пароль
                </label>
              }
              name="password"
              rules={[{ required: true, message: "Укажите пароль" }]}
            >
             <Input
                placeholder="Введите пароль"
                style={{ width: "200px" }}
              />
            </Form.Item>
            <Form.Item
              label={
                <label
                  style={{
                    width: "170px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                 Подтвердите пароль
                </label>
              }
              name="confirmation_password"
              rules={[{ required: true, message: "Подтвердите пароль" }]}
            >
             <Input
                placeholder="Подтвердите пароль"
                style={{ width: "200px" }}
              />
            </Form.Item>

            <Button
              style={{  marginTop: "30px" }}
              type="primary"
              htmlType="submit"
            >
              Создать организацию
            </Button>
          </Form>
        </Col>
      </Row>
      <Modal
        title="Добавить транспорт"
        visible={transportFormVisible}
        onCancel={() => setTransportFormVisible(false)}
        footer={null}
      >
        <Form form={transportForm} onFinish={handleTransportFinish}>
          <Form.Item
            label="VIN"
            name="vin"
            rules={[{ required: true, message: "Введите VIN" }]}
          >
            <Input placeholder="Введите VIN автомобиля" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Добавить транспорт
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default NewOrganization;
