// import axios from "axios";
// import { useState, useEffect } from "react";
// import {
//   Button,
//   Row,
//   Col,
//   Collapse,
//   Form,
//   DatePicker,
//   Input,
//   message,
//   Modal,
// } from "antd";
// import { subscribe } from "diagnostics_channel";
// const { RangePicker } = DatePicker;
// const apiUrl = import.meta.env.VITE_API_URL;
// interface TransportFormValues {
//     vin: string;
//   }


// const CreateOrganizationPage = () => {
//     const [transportList, setTransportList] = useState<string[]>([]);
//     const [transportFormVisible, setTransportFormVisible] = useState(false);
//     const [transportForm] = Form.useForm<TransportFormValues>();
//     const [form] = Form.useForm();

//     const handleTransportFinish = (transportValues: TransportFormValues) => {
//         // Добавляем только VIN в transportList
//         setTransportList((prevList) => [...prevList, transportValues.vin]);
//         transportForm.resetFields(); // Сбрасываем поля формы для ввода нового транспорта
//         setTransportFormVisible(false);
//         message.success('Транспорт добавлен');
//       };

//   const handleAddTransport = () => {
//     setTransportFormVisible(true);
//   };

//   const handleRemoveTransport = (index: number) => {
//     setTransportList((prevList) => prevList.filter((_, i) => i !== index));
//   };

//   const onFinish = async (values: any) => {
//     // Подготовка данных для отправки
//     const dataToSend = {
//       organization_name: values.organization_name,
//       address: values.address,
//       contact_person: values.сontact_person,
//       number_phone: values.number_phone,
//       email: values.email,
//       password: values.password,
//       transport: transportList,
//       subscribe:{
//         start_date:values.subscribe[0].format("YYYY-MM-DD HH:MM:ss"),
//         end_date:values.subscribe[1].format(" YYYY-MM-DD HH:MM:ss")
//       }
//     };
//     console.log(dataToSend)
//     try {
//       const response = await axios.post(`${apiUrl}/organizations/new`, {params:dataToSend});
//       message.success('Организация успешно создана');
//       form.resetFields(); // очищаем форму
//       setTransportList([]); // очищаем список транспорта
//     } catch (error) {
//       message.error('Ошибка при создании организации');
//       console.error('Ошибка:', error);
//     }
//   };
//   return (
//     <div style={{
//       display: "flex", 
//       flexDirection: "column", 
//       width: "100%", 
//       height: "100vh", // Установить 100vh, чтобы занять всю высоту
//       backgroundColor: "#F0F4F8",
//       boxSizing: "border-box", // Чтобы отступы учитывались в общей высоте
//       }}>
//       <Row style={{ width: "80%", margin: "30px auto" }}>
//         <Col xs={12}>
//           <Form form={form} onFinish={onFinish}>
//             <Form.Item
//               label={
//                 <label
//                   style={{
//                     width: "170px",
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   Название организации
//                 </label>
//               }
//               name="organization_name"
//               rules={[{ required: true, message: "Укажите название организации" }]}
//             >
//               <Input
//                 placeholder="Введите название организации"
//                 style={{ width: "200px" }}
//               />
//             </Form.Item>
//             <Form.Item
//               label={
//                 <label
//                   style={{
//                     width: "170px",
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   Адрес
//                 </label>
//               }
//               name="address"
//               rules={[{ required: true, message: "Укажите адрес организации" }]}
//             >
//               <Input
//                 placeholder="Введите адрес организации"
//                 style={{ width: "200px" }}
//               />
//             </Form.Item>
//             <Form.Item
//               label={
//                 <label
//                   style={{
//                     width: "170px",
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   Контактное лицо
//                 </label>
//               }
//               name="сontact_person"
//               rules={[{ required: true, message: "Укажите контактное лицо" }]}
//             >
//               <Input
//                 placeholder="Введите модель автомобиля"
//                 style={{ width: "200px" }}
//               />
//             </Form.Item>
//             <Form.Item
//               label={
//                 <label
//                   style={{
//                     width: "170px",
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   Номер телефона
//                 </label>
//               }
//               name="number_phone"
//               rules={[
//                 {
//                   required: true,
//                   message: "Укажите номер телефона",
//                 },
//               ]}
//             >
//              <Input
//                 placeholder="Введите номер телефона"
//                 style={{ width: "200px" }}
//               />
//             </Form.Item>

//             <Form.Item
//               label={
//                 <label
//                   style={{
//                     width: "170px",
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   Электронная почта
//                 </label>
//               }
//               name="email"
//               rules={[{ required: true, message: "Укажите электронную почту" }]}
//             >
//              <Input
//                 placeholder="Введите электронную почту"
//                 style={{ width: "200px" }}
//               />
//             </Form.Item>
//             <Form.Item    label={
//                 <label
//                   style={{
//                     width: "170px",
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                    Подписка:
//                 </label>

//               }
//               name="subscribe"
//               rules={[{ required: true, message: "Укажите срок подписки" }]}>

//               <RangePicker/>
//             </Form.Item>
//             <Form.Item
//               label={
//                 <label
//                   style={{
//                     width: "170px",
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   Транспорт
//                 </label>
//               }
//               name="transport"

//             >

//          <Button  onClick={handleAddTransport} style={{ marginBottom:"20px"}}>
//         Добавить транспорт
//       </Button>

//       <Collapse>
//         {transportList.map((vin, index) => (
//           <Collapse.Panel header={`Транспортное средство ${index + 1}`} key={index}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <p style={{ margin: 0 }}>VIN: {vin}</p>
//               <Button type="link" onClick={() => handleRemoveTransport(index)}>Удалить</Button>
//             </div>
//           </Collapse.Panel>
//         ))}
//       </Collapse>

//             </Form.Item>
//             <Form.Item
//               label={
//                 <label
//                   style={{
//                     width: "170px",
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                  Пароль
//                 </label>
//               }
//               name="password"
//               rules={[{ required: true, message: "Укажите пароль" }]}
//             >
//              <Input
//                 placeholder="Введите пароль"
//                 style={{ width: "200px" }}
//               />
//             </Form.Item>
//             <Form.Item
//               label={
//                 <label
//                   style={{
//                     width: "170px",
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                  Подтвердите пароль
//                 </label>
//               }
//               name="confirmation_password"
//               rules={[{ required: true, message: "Подтвердите пароль" }]}
//             >
//              <Input
//                 placeholder="Подтвердите пароль"
//                 style={{ width: "200px" }}
//               />
//             </Form.Item>

//             <Button
//               style={{  marginTop: "30px" }}
//               type="primary"
//               htmlType="submit"
//             >
//               Создать организацию
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//       <Modal
//         title="Добавить транспорт"
//         visible={transportFormVisible}
//         onCancel={() => setTransportFormVisible(false)}
//         footer={null}
//       >
//         <Form form={transportForm} onFinish={handleTransportFinish}>
//           <Form.Item
//             label="VIN"
//             name="vin"
//             rules={[{ required: true, message: "Введите VIN" }]}
//           >
//             <Input placeholder="Введите VIN автомобиля" />
//           </Form.Item>
//           <Button type="primary" htmlType="submit">
//             Добавить транспорт
//           </Button>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default CreateOrganizationPage;


import React, { useState ,useEffect} from 'react';
import { Form, Input, Button,Row,Col, Steps, DatePicker, Select, message } from 'antd';
import type { FormInstance } from 'antd';
import { Rule } from 'antd/es/form';

const { Step } = Steps;

type OrganizationData = {
  companyInfo: { name: string; address: string } | null;
  employees: { id: string; name: string }[]; // Задайте корректный массив
  vehicles: { id: string; model: string }[];
  subscription: { period: string } | null;
};


const CreateOrganization: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const [organizationData, setOrganizationData] = useState<OrganizationData>({
    companyInfo: null,
    employees: [],
    vehicles: [],
    subscription: null,
  });

  const nextStep = async () => {
    try {
      const values = await form.validateFields();
      saveStepData(currentStep, values);
      setCurrentStep((prev) => prev + 1);
      form.resetFields();
      // При необходимости передавайте данные следующего шага
      form.setFieldsValue(getStepData(currentStep + 1));
    } catch (error) {
      message.error('Пожалуйста, заполните все обязательные поля!');
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => {
      const previousStep = prev - 1;
      // Восстановление данных из состояния
      form.setFieldsValue(getStepData(previousStep));
      return previousStep;
    });
  };
  const getStepData = (step: number) => {
    switch (step) {
      case 0:
        return organizationData.companyInfo;
      case 1:
        return { employees: organizationData.employees };
      case 2:
        return organizationData.vehicles[0] || {}; // Если несколько, обработайте массив
      case 3:
        return organizationData.subscription;
      default:
        return {};
    }
  };
  const saveStepData = (step: number, data: any) => {
    switch (step) {
      case 0:
        setOrganizationData((prev) => ({ ...prev, companyInfo: data }));
        break;
      case 1:
        setOrganizationData((prev) => ({
          ...prev,
          employees: [...prev.employees, ...data.employees], // Сохраняем список сотрудников
        }));
        break;
      case 2:
        setOrganizationData((prev) => ({
          ...prev,
          vehicles: [...prev.vehicles, data], // Добавляем транспорт
        }));
        break;
      case 3:
        setOrganizationData((prev) => ({ ...prev, subscription: data }));
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    form.setFieldsValue(getStepData(currentStep));
  }, [currentStep, form]);
  const renderForm = () => {
    switch (currentStep) {
      case 0: // Step 1: Company Info
        return (
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Название организации"
              rules={[{ required: true, message: 'Введите название организации!' }]}
            >
            <Input style={{ width: '30vw' }} />
            </Form.Item>
            <Form.Item
              name="address"
              label="Адрес"
              rules={[{ required: true, message: 'Введите адрес!' }]}
            >
            <Input style={{ width: '30vw' }} />
            </Form.Item>
            <Form.Item
              name="contact"
              label="Контактный телефон"
              rules={[{ required: true, message: 'Введите контактный телефон!' }]}
            >
           <Input style={{ width: '30vw' }} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Электронная почта"
              rules={[{ required: true, message: 'Введите электронную почту!' }]}
            >
           <Input style={{ width: '30vw' }} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Пароль"
              rules={[{ required: true, message: 'Введите пароль!' }]}
            >
           <Input style={{ width: '30vw' }} />
            </Form.Item>
          </Form>
        );
      case 1: // Step 2: Employees
        return (
          <Form form={form} layout="vertical">
  <Form.List name="employees">
    {(fields, { add, remove }) => (
      <>
        {fields.map((field) => (
          <div key={field.key} style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: 16 }}>
            <Form.Item
              {...field}
              name={[field.name, "name"]}
              fieldKey={[field.fieldKey ?? field.name, "name"]}
              label="Имя сотрудника"
              rules={[{ required: true, message: "Введите имя сотрудника!" }]}
            >
              <Input style={{ width: "30vw" }} placeholder="Введите имя сотрудника" />
            </Form.Item>
            <Form.Item
              {...field}
              name={[field.name, "role"]}
              fieldKey={[field.fieldKey ?? field.name, "role"]}
              label="Роль"
              rules={[{ required: true, message: "Введите роль сотрудника!" }]}
            >
              <Input style={{ width: "30vw" }} placeholder="Введите роль сотрудника" />
            </Form.Item>
            <Form.Item
              {...field}
              name={[field.name, "phone"]}
              fieldKey={[field.fieldKey ?? field.name, "phone"]}
              label="Телефон"
              rules={[
                { required: true, message: "Введите телефон!" },
                { pattern: /^\+?[0-9\s()-]+$/, message: "Введите корректный номер телефона!" },
              ]}
            >
              <Input style={{ width: "30vw" }} placeholder="Введите телефон" />
            </Form.Item>
            <Form.Item
              {...field}
              name={[field.name, "email"]}
              fieldKey={[field.fieldKey ?? field.name, "email"]}
              label="Электронная почта"
              rules={[
                { required: true, message: "Введите электронную почту!" },
                { type: "email", message: "Введите корректный email!" },
              ]}
            >
              <Input style={{ width: "30vw" }} placeholder="Введите email" />
            </Form.Item>
            <Form.Item
              {...field}
              name={[field.name, "password"]}
              fieldKey={[field.fieldKey ?? field.name, "password"]}
              label="Пароль"
              rules={[
                { required: true, message: "Введите пароль!" },
                { min: 6, message: "Пароль должен быть не менее 6 символов!" },
              ]}
            >
              <Input.Password style={{ width: "30vw" }} placeholder="Введите пароль" />
            </Form.Item>
            <Form.Item
              {...field}
              name={[field.name, "position"]}
              fieldKey={[field.fieldKey ?? field.name, "position"]}
              label="Должность"
              rules={[{ required: true, message: "Введите должность сотрудника!" }]}
            >
              <Input style={{ width: "30vw" }} placeholder="Введите должность сотрудника" />
            </Form.Item>
            <Button danger onClick={() => remove(field.name)}>
              Удалить
            </Button>
          </div>
        ))}
        <Button type="dashed" onClick={() => add()} style={{ width: "100%" }}>
          Добавить сотрудника
        </Button>
      </>
    )}
  </Form.List>
</Form>
        );
      case 2: // Step 3: Vehicles
        return (
          <Form form={form} layout="vertical">
            <Form.Item
              name="vehicleName"
              label="Название транспорта"
              rules={[{ required: true, message: 'Введите название транспорта!' }]}
            >
              <Input style={{ width: '30vw' }} />
            </Form.Item>
            <Form.Item
              name="vehicleType"
              label="Тип транспорта"
              rules={[{ required: true, message: 'Выберите тип транспорта!' }]}
            >
              <Select placeholder="Выберите тип"  style={{ width: '30vw' }}>
                <Select.Option value="car">Автомобиль</Select.Option>
                <Select.Option value="truck">Грузовик</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        );
      case 3: // Step 4: Subscription
        return (
          <Form form={form} layout="vertical">
            <Form.Item
              name="subscriptionPeriod"
              label="Период подписки"
              rules={[{ required: true, message: 'Выберите период подписки!' }]}
            >
              <DatePicker picker="month" />
            </Form.Item>
          </Form>
        );
      default:
        return <div>Спасибо! Все данные сохранены.</div>;
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      minHeight: '100vh',
      backgroundColor: "#F0F4F8",
    }}>
        <Row style={{
        margin: "30px 40px 30px 40px",
        flex: "1",
      }}>
        <Col xs={24} >
          <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
            <Col>
              <h1 style={{ margin: 0, color: '#1e40af', }}>Регистрация организации</h1>
            </Col>
            </Row>
      <Steps current={currentStep}>
        <Step title="Информация о компании" />
        <Step title="Сотрудники" />
        <Step title="Транспорт" />
        <Step title="Подписка" />
      </Steps>
      <div style={{ marginTop: 20 }}>{renderForm()}</div>
      <div style={{ marginTop: 20 }}>
        <Button disabled={currentStep === 0} onClick={prevStep} style={{ marginRight: 10 }}>
          Назад
        </Button>
        <Button type="primary" onClick={nextStep}>
          {currentStep === 3 ? 'Завершить' : 'Далее'}
        </Button>
      </div>
      </Col></Row>
    </div>
  );
};

export default CreateOrganization;