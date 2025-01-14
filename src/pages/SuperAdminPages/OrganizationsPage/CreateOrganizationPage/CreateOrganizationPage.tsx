import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Steps, DatePicker, Select, message, InputNumber } from 'antd';
const { RangePicker } = DatePicker;
const { Step } = Steps;

type OrganizationData = {
  companyInfo: { name: string; address: string } | null;
  employees: {
    adminCount: number;
    managerCount: number;
    mechanicCount: number;
  };
  vehicles: { id: string; model: string }[];
  subscription: {
    startDate: string | null;  // Дата начала подписки
    type: string | null; // Тип подписки, например: "месяц", "квартал", "год"
  } | null;
};

const subscriptionOptions = [
  { label: 'Месяц', value: 'month' },
  { label: 'Квартал', value: 'quarter' },
  { label: 'Год', value: 'year' },
];

const CreateOrganization: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form] = Form.useForm();

  const showConfirmExtend = (dates: any) => {
    console.log(dates);
  };

  const disabledDate = (current: any) => {
    return current && current < Date.now();
  };

  const [organizationData, setOrganizationData] = useState<OrganizationData>({
    companyInfo: null,
    employees: { adminCount: 1, managerCount: 1, mechanicCount: 1 },
    vehicles: [],
    subscription: {
      startDate: null, // Начальное значение для даты начала подписки
      type: null, // Начальное значение для типа подписки
    },
  });

  const handleSubmit = async (values: any) => {
    const vehicles = values.vehicles || [];
    if (vehicles.length === 0) {
      message.error('Добавьте хотя бы одно транспортное средство');
      return;
    }

    try {
      const vehicleData = await Promise.all(
        vehicles.map(async (vin: string) => {
          const response = await fetch(`/api/vehicle/${vin}`);
          if (response.ok) {
            return await response.json();
          } else {
            message.error(`Не удалось найти транспорт для VIN: ${vin}`);
            return null;
          }
        })
      );
      console.log('Vehicle data:', vehicleData);

      message.success('Транспортные средства успешно добавлены');
    } catch (error) {
      message.error('Ошибка при обращении к серверу');
    }
  };

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      saveStepData(currentStep, values);

      // Отображение сообщения о добавлении организации
      message.success("Организация добавлена!");
      setIsSubmitted(true); // Устанавливаем состояние завершения
      setCurrentStep(4);
    } catch (error) {
      message.error("Пожалуйста, заполните все обязательные поля!");
    }
  };

  const nextStep = async () => {
    try {
      // Проверяем валидность текущих полей
      const values = await form.validateFields();
      // Сохраняем данные текущего шага
      saveStepData(currentStep, values);

      // Переходим к следующему шагу
      setCurrentStep((prev) => {
        const nextStep = prev + 1;

        // Загружаем данные для следующего шага
        form.resetFields();
        form.setFieldsValue(getStepData(nextStep));

        return nextStep;
      });
    } catch (error) {
      message.error("Пожалуйста, заполните все обязательные поля!");
    }
  };

  const prevStep = async () => {
    try {
      // Получаем текущие значения формы и сохраняем их
      const values = form.getFieldsValue();
      saveStepData(currentStep, values);

      // Переходим к предыдущему шагу
      setCurrentStep((prev) => {
        const previousStep = prev - 1;

        // Загружаем данные для предыдущего шага
        form.resetFields();
        form.setFieldsValue(getStepData(previousStep));

        return previousStep;
      });
    } catch (error) {
      message.error("Ошибка при сохранении данных перед возвратом!");
    }
  };

  const getStepData = (step: number) => {
    console.log()
    switch (step) {
      case 0:
        return organizationData.companyInfo;
      case 1:
        return organizationData.employees;
      case 2:
        return organizationData.vehicles ; 
      case 3:
        return organizationData.subscription || {};
      default:
        return {};
    }
  };

  const saveStepData = (step: number, data: any) => {
    console.log('Saving step data:', step, data); // Debugging line
    switch (step) {
      case 0:
        setOrganizationData((prev) => ({ ...prev, companyInfo: data }));
        break;
      case 1:
        setOrganizationData((prev) => ({
          ...prev,
          employees: {
            adminCount: data.adminCount,
            managerCount: data.managerCount,
            mechanicCount: data.mechanicCount,
          },
        }));
        break;
      case 2:
        setOrganizationData((prev) => ({
          ...prev,
          vehicles: [...prev.vehicles, data],
        }));
        break;
      case 3:
        setOrganizationData((prev) => ({
          ...prev,
          subscription: {
            startDate: data.startDate ? data.startDate.format("YYYY-MM-DD") : null,
            type: data.type,
          },
        }));
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
            <Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  name="name"
                  label="Название организации"
                  rules={[{ required: true, message: "Введите название организации!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  name="address"
                  label="Адрес"
                  rules={[{ required: true, message: "Введите адрес!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  name="email"
                  label="Электронная почта"
                  rules={[
                    { required: true, message: "Введите электронную почту!" },
                    { type: 'email', message: "Введите корректный адрес электронной почты!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  name="contact"
                  label="Контактный телефон"
                  rules={[
                    { required: true, message: "Введите контактный телефон!" },
                    {
                      pattern: /^\+375\s?(25|29|33|44)\s?\d{3}(-?\d{2}){2}$/,
                      message: "Введите корректный номер телефона в формате +375 XX XXX-XX-XX",
                    },
                  ]}
                >
                  <Input placeholder="+375 XX XXX-XX-XX" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  name="person"
                  label="Контактное лицо"
                  rules={[{ required: true, message: "Введите контактное лицо!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              {/* <Col xs={24} sm={12} md={8}>
                <Form.Item
                  name="password"
                  label="Пароль"
                  rules={[{ required: true, message: "Введите пароль!" }]}
                >
                  <Input.Password />
                </Form.Item>
              </Col> */}
            </Col>
          </Form>

        );
      case 1:
        return (
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="adminCount"
                  label="Количество администраторов"
                  rules={[
                    { required: true, message: "Введите количество администраторов!" },
                    {
                      type: "number",
                      min: 0,
                      message: "Количество должно быть неотрицательным числом!",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="1"
                    min={1}
                    style={{ width: "100%" }}
                    formatter={(value) => (value ? `${value}`.replace(/\D/g, "") : "")} // Убирает все символы, кроме цифр
                    onKeyPress={(event) => {
                      if (!/^\d$/.test(event.key)) {
                        event.preventDefault(); // Блокирует ввод символов, кроме цифр
                      }
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="managerCount"
                  label="Количество менеджеров"
                  rules={[
                    { required: true, message: "Введите количество менеджеров!" },
                    {
                      type: "number",
                      min: 1,
                      message: "Количество должно быть неотрицательным числом!",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="1"
                    min={0}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="mechanicCount"
                  label="Количество механиков"
                  rules={[
                    { required: true, message: "Введите количество механиков!" },
                    {
                      type: "number",
                      min: 0,
                      message: "Количество должно быть неотрицательным числом!",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="1"
                    min={1}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        );
      case 2:
        return (
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.List
              name="vehicles"
              initialValue={['']} // Начальное значение для одного VIN
              rules={[
                {
                  validator: async (_, vehicles) => {
                    if (!vehicles || vehicles.length < 1) {
                      return Promise.reject(new Error('Добавьте хотя бы одно транспортное средство'));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, fieldIndex }) => (
                    <Row gutter={16} key={key} align="middle">
                      <Col xs={24} sm={12}>
                        <Form.Item
                          {...(fieldKey ? { fieldKey } : {})}
                          name={[name, 'vin']}
                          label="VIN номер"
                          rules={[
                            { required: true, message: 'Введите VIN номер' },
                            {
                              pattern: /^[A-HJ-NPR-Z0-9]{17}$/,
                              message: 'VIN номер должен содержать 17 символов, цифры и латинские буквы в верхнем регистре!',
                            },
                          ]}
                        >
                          <Input placeholder="Введите VIN номер" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={1}>
                        <Button
                          type="link"
                          danger
                          onClick={() => remove(name)}
                          style={{ width: '100%', textAlign: 'right' }}
                        >
                          Удалить
                        </Button>
                      </Col>
                    </Row>
                  ))}

                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block style={{ width: '200px', margin: '0 auto' }}>
                      Добавить транспорт
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        );
      case 3:
        return (
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  name="subscriptionPeriod"
                  label="Период подписки"
                  rules={[{ required: true, message: "Выберите период подписки!" }]}
                >
                  <DatePicker
                    onChange={showConfirmExtend}
                    disabledDate={disabledDate}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  name="subscriptionType"
                  label="Тип подписки"
                  rules={[{ required: true, message: "Выберите тип подписки!" }]}
                >
                  <Select placeholder="Выберите тип подписки" style={{ width: "100%" }}>
                    {subscriptionOptions.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        );
    }
  };
  const isMobile = window.innerWidth < 768;
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      minHeight: '100vh',
      backgroundColor: "#E1E1E1",
    }}>
      <Row style={{
        padding: "0 40px",
        flex: "1",
      }}>
        <Col xs={24} >
          <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
            <Col>
              <h1 style={{ margin: 0, fontSize: isMobile ? '24px' : '32px', }}>Регистрация организации</h1>
            </Col>
          </Row>
          <Steps current={currentStep}  >
            <Step title="Информация о компании" />
            <Step title="Сотрудники" />
            <Step title="Транспорт" />
            <Step title="Подписка" />
          </Steps>
          <div style={{ marginTop: 20 }}>{renderForm()}</div>
          <div style={{ marginTop: 20 }}>
            {/* <Button disabled={currentStep === 0} onClick={prevStep} style={{ marginRight: 10 }}>
              Назад
            </Button>
            <Button type="primary" onClick={nextStep} style={{ backgroundColor: "#3A5F73" }}>
              {currentStep === 3 ? 'Завершить' : 'Далее'}
            </Button> */}
            {!isSubmitted && (
              <>
                <Button disabled={currentStep === 0} onClick={prevStep} style={{ marginRight: 10 }}>
                  Назад
                </Button>
                {currentStep === 3 ? (
                  <Button type="primary" onClick={handleFinish}>
                    Сохранить
                  </Button>
                ) : (
                  <Button type="primary" onClick={nextStep}>
                    Далее
                  </Button>
                )}
              </>
            )}
          </div>
        </Col></Row>
    </div>
  );
};

export default CreateOrganization;