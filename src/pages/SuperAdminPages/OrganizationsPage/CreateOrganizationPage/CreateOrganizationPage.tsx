import React, { useState ,useEffect} from 'react';
import { Form, Input, Button,Row,Col, Steps, DatePicker, Select, message } from 'antd';

const { Step } = Steps;

type OrganizationData = {
  companyInfo: { name: string; address: string } | null;
  employees: { id: string; name: string }[]; 
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
      form.setFieldsValue(getStepData(currentStep + 1));
    } catch (error) {
      message.error('Пожалуйста, заполните все обязательные поля!');
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => {
      const previousStep = prev - 1;
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
        return organizationData.vehicles[0] || {}; 
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
          employees: [...prev.employees, ...data.employees],
        }));
        break;
      case 2:
        setOrganizationData((prev) => ({
          ...prev,
          vehicles: [...prev.vehicles, data], 
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
      case 0: 
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
      case 1:
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
      case 2: 
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
      case 3:
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