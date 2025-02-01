import { useState } from "react";
import { Button, Input, Modal, message, Form, Select, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { LibraryAddOutlined, ArchiveOutlined, EditOutlined } from "@mui/icons-material";
import axiosInstance from "../../../services/axiosInstance";
import OrganizationsPage from "../../shared/OrganizationsPage";
import { Organization } from "../../../types/transportListTypes";
import dayjs from "dayjs";  // Если у вас не установлен dayjs, установите его с помощью npm

const SuperAdminOrganizationsPage = () => {
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatedOrganization, setUpdatedOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(false); // добавляем состояние для загрузки
  const [form] = Form.useForm(); // Создаем экземпляр формы
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;

  const handleEditOrganization = (organization: Organization) => {
    setCurrentOrganization(organization);
    setUpdatedOrganization({ ...organization });
    form.setFieldsValue({
      organizationName: organization.organizationName,
      contactInfo: organization.contactInfo,
      contactPerson: organization.contactPerson,
      organizationAddress: organization.organizationAddress,
      emailContactPerson: organization.emailContactPerson,
      registrationDate: organization.registrationDate ? dayjs(organization.registrationDate) : null,
    });
    setIsModalVisible(true);
  };

  const handleDeleteOrganization = async (idOrganization: number) => {
    Modal.confirm({
      title: "Подтверждение архивирования",
      content: "Вы уверены, что хотите переместить организацию в архив?",
      okText: "Переместить в архив",
      okType: "danger",
      cancelText: "Отмена",
      onOk: async () => {
        try {
          const response = await axiosInstance.delete(`/organizations/${idOrganization}`);
          if (response.status === 200) {
            message.success("Организация перемещена в архив успешно!");
          }
        } catch (error) {
          console.error("Ошибка при архивировании:", error);
          message.error("Не удалось переместить организацию в архив.");
        }
      },
    });
  };

  const navigateToNewOrganization = () => {
    navigate("/master/create-organization");
  };

  const handleSaveChanges = async () => {
    if (updatedOrganization) {
      setLoading(true); // включаем загрузку
      try {
        const response = await axiosInstance.patch(
          `/organizations/${updatedOrganization.id}`,
          updatedOrganization
        );
        if (response.status === 200) {
          message.success("Данные организации успешно обновлены!");
          setIsModalVisible(false);
        }
      } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
        message.error("Не удалось обновить данные организации.");
      } finally {
        setLoading(false); // выключаем загрузку
      }
    }
  };

  const handleValuesChange = (changedValues: any) => {
    setUpdatedOrganization((prevState) => ({
      ...prevState,
      ...changedValues,
    }));
  };

  const extraControls = (
    <Button
      type="primary"
      onClick={navigateToNewOrganization}
      icon={<LibraryAddOutlined />}
      className="add-transport-btn"
    >
      {!isMobile && "Создать организацию"}
    </Button>
  );

  const extraActions = (record: any) => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button
        style={{
          backgroundColor: "#1B232A",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          transition: "all 0.3s ease",
        }}
        size="middle"
        onClick={() => handleEditOrganization(record)}
        icon={<EditOutlined />}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "red";
          e.currentTarget.style.borderColor = "red";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#1B232A";
          e.currentTarget.style.borderColor = "#1B232A";
        }}
      >
        Изменить
      </Button>
      <Button
        disabled={true}
        size="middle"
        onClick={() => handleDeleteOrganization(record.id)}
        style={{
          backgroundColor: "#1B232A",
          color: "#fff",
        }}
        icon={<ArchiveOutlined />}
      >
        Переместить в архив
      </Button>
    </div>
  );

  return (
    <>
      <OrganizationsPage extraControls={extraControls} extraActions={extraActions} />
      <Modal
        title="Изменить организацию"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSaveChanges}
        footer={null}
      >
        {updatedOrganization && (
          <Form
            form={form} // Привязка формы
            layout="vertical"
            onFinish={handleSaveChanges}
            onValuesChange={handleValuesChange} // Добавляем обработчик изменения значений
          >
            <Form.Item
              label="Название организации"
              name="organizationName"
              rules={[{ required: true, message: 'Пожалуйста, введите название организации!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Номер телефона"
              name="contactInfo"
              rules={[{ required: true, message: 'Пожалуйста, введите номер телефона!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Контактное лицо"
              name="contactPerson"
              rules={[{ required: true, message: 'Пожалуйста, введите контактное лицо!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Адрес"
              name="organizationAddress"
              rules={[{ required: true, message: 'Пожалуйста, введите адрес!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Электронная почта"
              name="emailContactPerson"
              rules={[{ type: 'email', message: 'Пожалуйста, введите корректный email!' }]}
            >
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Сохранить
            </Button>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default SuperAdminOrganizationsPage;
