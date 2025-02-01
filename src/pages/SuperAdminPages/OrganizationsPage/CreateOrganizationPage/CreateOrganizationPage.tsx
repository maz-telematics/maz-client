import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Row, Col, Select, DatePicker, Steps, notification, Space } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axiosInstance from "../../../../services/axiosInstance";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
const { Step } = Steps;

const subscriptionOptions = [
  { value: "basic", label: "Базовая" },
  { value: "extended", label: "Расширенная" },
  { value: "premium", label: "Премиум" },
];

const subscriptionPeriodOptions = [
  { value: "1_month", label: "Месяц" },
  { value: "3_months", label: "Три месяца" },
  { value: "quarter", label: "Квартал" },
  { value: "year", label: "Год" },
];

const CreateOrganization = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [vinStatus, setVinStatus] = useState<Record<string, boolean>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  // Проверка валидности текущего шага
  const isStepFormValid = () => {
    const formData = form.getFieldsValue();
    if (currentStep === 0) {
      return (
        formData.organizationName &&
        formData.organizationAddres &&
        formData.organizationEmail &&
        formData.organizationContactNumber &&
        formData.organizationContactPerson 
      );
    }
    if (currentStep === 1) {
      return (
        formData.adminCount !== undefined &&
        formData.managerCount !== undefined &&
        formData.mechanicCount !== undefined
      );
    }
    if (currentStep === 2) {
      const vehicles = form.getFieldValue("vehicles") || [];
      const hasVehicles = vehicles.length > 0;
      const allVinsValid = Object.values(vinStatus).length === vehicles.length && Object.values(vinStatus).every((status) => status === true);
      return hasVehicles && allVinsValid;
    }
    if (currentStep === 3) {
      return (
        formData.subscriptionPeriod &&
        formData.subscriptionType &&
        formData.subscriptionDuration
      );
    }
    return false;
  };

  // Проверка VIN номеров
  const validateVinNumbers = async (vinList: string[]) => {
    try {
      const response = await axiosInstance.post("/transport/check-organization", { transports: vinList });
      return response.data; // Объект с результатами проверки
    } catch (error) {
      notification.error({
        message: "Ошибка проверки VIN номеров",
        description: "Не удалось проверить VIN номера. Попробуйте снова.",
      });
      return {}; // Возвращаем пустой объект в случае ошибки
    }
  };

  const handleFinishVin = async () => {
    setLoading(true);
    const vehicles = form.getFieldValue("vehicles") || [];
    const vinList = vehicles.map((v: { vin: string }) => v.vin);

    if (vinList.length === 0) {
      setLoading(false);
      notification.warning({
        message: "Список VIN номеров пуст",
        description: "Добавьте хотя бы один VIN номер для проверки.",
      });
      return;
    }

    const validationResults = await validateVinNumbers(vinList);
    setVinStatus(validationResults); // Обновляем статусы VIN
    setLoading(false);

    const invalidVins = Object.entries(validationResults).filter(([_, isValid]) => !isValid);
    if (invalidVins.length > 0) {
      notification.warning({
        message: "Некоторые VIN номера недействительны",
        description: `Недействительные VIN: ${invalidVins.map(([vin]) => vin).join(", ")}`,
      });
    } else {
      notification.success({
        message: "Проверка завершена",
        description: "Все VIN номера действительны.",
      });
    }
  };

  const handleNextStep = () => {
    if (isFormValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = async () => {
    try {
      // Собираем данные из формы
      const formData = form.getFieldsValue();
      const vinList = form.getFieldValue("vehicles") || [];

      // Формируем тело запроса
      const requestData = {
        organization: {
          organizationName: formData.organizationName,
          organizationAddres: formData.organizationAddres,
          organizationEmail: formData.organizationEmail,
          organizationContactNumber: formData.organizationContactNumber,
          organizationContactPerson: formData.organizationContactPerson || "", // Если есть поле контактного лица
        },
        employees: {
          adminsQuantity: formData.adminCount,
          managersQuantity: formData.managerCount,
          mechanicsQuantity: formData.mechanicCount,
        },
        idTransports: vinList.map((vehicle: any) => vehicle.vin), // Получаем все VIN номера
        subscription: {
          startDate: formData.subscriptionPeriod ? formData.subscriptionPeriod.format("YYYY-MM-DD") : "", // Форматируем дату
          type: formData.subscriptionType, // Тип подписки (ежемесячно, ежегодно и т.д.)
        },
      };

      // Отправляем запрос
      const response = await axiosInstance.post("/organizations/create-organization", requestData);

      if (response.status === 200) {
        notification.success({
          message: "Регистрация завершена",
          description: "Организация успешно зарегистрирована!",
        });
        // Можно добавить дополнительные действия по завершению регистрации
      } else {
        notification.error({
          message: "Ошибка регистрации",
          description: "Не удалось зарегистрировать организацию. Попробуйте снова.",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      notification.error({
        message: "Ошибка",
        description: "Произошла ошибка при отправке данных. Попробуйте снова.",
      });
    }
  };


  useEffect(() => {
    setIsFormValid(isStepFormValid());
  }, [vinStatus, currentStep, form]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Регистрация организации</h1>
      <Steps current={currentStep}>
        <Step title="Информация о компании" />
        <Step title="Сотрудники" />
        <Step title="Транспорт" />
        <Step title="Подписка" />
      </Steps>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={() => setIsFormValid(isStepFormValid())}
        style={{ marginTop: 20 }}
      >
{currentStep === 0 && (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px", margin: "0" }}>
    <Form.Item
      name="organizationName"
      label="Название организации"
      rules={[{ required: true, message: "Введите название организации!" }]}
    >
      <Input style={{ width: "100%", maxWidth: "100%" }} />
    </Form.Item>
    <Form.Item
      name="organizationAddres"
      label="Адрес"
      rules={[{ required: true, message: "Введите адрес!" }]}
    >
      <Input style={{ width: "100%", maxWidth: "100%" }} />
    </Form.Item>
    <Form.Item
      name="organizationEmail"
      label="Электронная почта"
      rules={[{ required: true, type: "email", message: "Введите корректный email!" }]}
    >
      <Input style={{ width: "100%", maxWidth: "100%" }} />
    </Form.Item>
    <Form.Item
      name="organizationContactNumber"
      label="Контактный телефон"
      rules={[
        { required: true, message: "Введите контактный телефон!" },
        {
          pattern: /^\+375(29|33|44|25)[0-9]{7}$/,
          message: "Неверный формат телефона! Введите номер в формате +375XXXXXXXXX.",
        },
      ]}
    >
      <Input style={{ width: "100%", maxWidth: "100%" }} />
    </Form.Item>
    <Form.Item
      name="organizationContactPerson"
      label="Контактное лицо"
      rules={[{ required: true, message: "Введите имя контактного лица!" }]}
    >
      <Input style={{ width: "100%", maxWidth: "100%" }} />
    </Form.Item>
  </div>
)}
{currentStep === 1 && (
  <div style={{ maxWidth: "400px", width: "100%", margin: "0" }}>
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Form.Item
        name="adminCount"
        label="Администраторы"
        rules={[{ required: true, message: "Введите количество администраторов!" }]}
      >
        <InputNumber min={0} max={10} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="managerCount"
        label="Менеджеры"
        rules={[{ required: true, message: "Введите количество менеджеров!" }]}
      >
        <InputNumber min={0} max={10} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="mechanicCount"
        label="Механики"
        rules={[{ required: true, message: "Введите количество механиков!" }]}
      >
        <InputNumber min={0} max={10} style={{ width: "100%" }} />
      </Form.Item>
    </Space>
  </div>
)}
{currentStep === 2 && (
  <div style={{ maxWidth: "400px", width: "100%", margin: "0" }}>
    <Form.List name="vehicles" initialValue={[{ vin: "" }]}>
      {(fields, { add, remove }) => (
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          {fields.map(({ key, name }) => {
            const vin = form.getFieldValue(["vehicles", name, "vin"]);
            return (
              <Row key={key} gutter={8} align="middle" wrap>
                <Col span={20}>
                  <Form.Item
                    name={[name, "vin"]}
                    label="VIN номер"
                    rules={[{ required: true, message: "Введите VIN номер!" }]}
                  >
                    <Input style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={1}>
                  {vinStatus[vin] !== undefined &&
                    (vinStatus[vin] ? (
                      <CheckCircleOutlined style={{ color: "green" }} />
                    ) : (
                      <CloseCircleOutlined style={{ color: "red" }} />
                    ))}
                </Col>
                <Col span={2}>
                  <Button type="link" danger onClick={() => remove(name)}>
                    Удалить
                  </Button>
                </Col>
              </Row>
            );
          })}
          <Button
            type="dashed"
            onClick={add}
            block
            icon={<PlusOutlined />}
            style={{
              height: "32px",        // уменьшена высота
              fontSize: "12px",      // уменьшен размер шрифта
              padding: "0 10px",     // уменьшены отступы
              width: "220px",         // убрана фиксированная ширина
            }}
          >
            Добавить транспорт
          </Button>
        </Space>
      )}
    </Form.List>
    <Button
      type="primary"
      onClick={handleFinishVin}
      loading={loading}
      icon={<SearchOutlined />}
      style={{
        marginTop: "16px",
        height: "32px",         // уменьшена высота
        fontSize: "12px",       // уменьшен размер шрифта
        width: "220px",          // убрана фиксированная ширина
        padding: "0 10px",      // уменьшены отступы
      }}
    >
      Проверить VIN номера
    </Button>
  </div>
)}
      {currentStep === 3 && (
  <div style={{ maxWidth: "400px", width: "100%", margin: "0" }}>
    <Space direction="vertical" size="small" style={{ width: "100%" }}>
      <Form.Item
        name="subscriptionPeriod"
        label="Начало подписки"
        rules={[{ required: true, message: "Выберите начало подписки!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="subscriptionType"
        label="Тип подписки"
        rules={[{ required: true, message: "Выберите тип подписки!" }]}
      >
        <Select options={subscriptionOptions} placeholder="Выберите тип" />
      </Form.Item>
      <Form.Item
        name="subscriptionDuration"
        label="Период подписки"
        rules={[{ required: true, message: "Выберите период подписки!" }]}
      >
        <Select
          options={subscriptionPeriodOptions}
          placeholder="Выберите период"
          style={{ width: "100%" }}
        />
      </Form.Item>
    </Space>
  </div>
)}


      </Form>
      <div style={{ marginTop: 20 }}>
        <Button disabled={currentStep === 0} onClick={handlePrevStep} style={{ marginRight: 10 }}>
          Назад
        </Button>
        {currentStep === 3 ? (
          <Button type="primary" onClick={handleFinish} disabled={!isFormValid}>
            Завершить
          </Button>
        ) : (
          <Button type="primary" onClick={handleNextStep} disabled={!isFormValid}>
            Далее
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateOrganization;
