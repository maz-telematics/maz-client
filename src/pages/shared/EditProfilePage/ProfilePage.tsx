import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Row, Col, Form, Input, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import axiosInstance from '../../../services/axiosInstance';

export interface Organization {
  organization_name: string; // Название организации (нельзя редактировать)
  contact_person: string; // Имя
  position: string; // Должность
  contact_info: string; // Телефон
  email_contact_person: string; // Email
  workplace: string; // Место работы
}

const ProfilePage = () => {
  const [form] = Form.useForm();
  const [editableFields, setEditableFields] = useState<Organization>();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{"token":"","id":0}');
  const { id } = user;

  useEffect(() => {
    axiosInstance
      .get('/user')
      .then((response) => {
        setEditableFields({
          organization_name: response.data.organizationName,
          contact_person: response.data.name,
          position: response.data.position || '',
          contact_info: response.data.phoneNumber || '',
          email_contact_person: response.data.username, // Email приходит в username
          workplace: response.data.workplace || '',
        });
        form.setFieldsValue({
          organization_name: response.data.organizationName,
          contact_person: response.data.name,
          position: response.data.position || '',
          contact_info: response.data.phoneNumber || '',
          email_contact_person: response.data.username,
          workplace: response.data.workplace || '',
        });
      })
      .catch((error) => console.error('Ошибка при получении данных пользователя:', error));
  }, [form]);

  const handleSavePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      message.warning('Пожалуйста, заполните все поля.');
      return;
    }

    if (newPassword !== confirmPassword) {
      message.warning('Пароли не совпадают.');
      return;
    }

    try {
      const response = await axios.patch(`/user/${id}/password`, {
        currentPassword,
        newPassword,
      });

      if (response.status === 200) {
        message.success('Пароль успешно изменен!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.error(error);
      message.error('Ошибка при изменении пароля.');
    }
  };

  const handleEditToggle = () => {
    // Если режим редактирования выключается, возвращаем исходные значения
    if (isEditing) {
      form.setFieldsValue(editableFields);
    }
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async (values: Pick<Organization, keyof Organization>) => {
    try {
      const response = await axios.patch(`/organizations/${id}`, values);
      setEditableFields(response.data);
      message.success('Данные успешно сохранены!');
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      message.error('Ошибка при сохранении данных.');
    }
  };

  const formatDate = (date: any) => dayjs(date).format('YYYY');
  const isMobile = window.innerWidth < 768;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#E1E1E1',
        padding: '0 20px', // уменьшены отступы
        overflowY: 'auto', // убирает вертикальный скролл
      }}
    >
      {/* Заголовок страницы */}
      <Row style={{ marginBottom: '20px' }}>
        <Col xs={24}>
          <h1
            style={{
              marginBottom: '10px', // уменьшены отступы
              fontSize: isMobile ? '24px' : '28px', // уменьшен размер шрифта
            }}
          >
            Настройки
          </h1>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Personal Details Block */}
        <Col xs={24} md={12}>
          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
              padding: '16px', // уменьшены отступы
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              maxHeight: '420px', // ограничена высота
            }}
          >
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
              Основная информация
            </h2>
            <Form
              form={form}
              initialValues={editableFields}
              onFinish={handleSaveChanges}
              layout="vertical"
            >
            <Form.Item label="Имя" name="contact_person">
  <Input placeholder="Введите ваше имя" disabled={!isEditing} />
</Form.Item>

<Form.Item label="Должность" name="position">
  <Input placeholder="Введите вашу должность" disabled={!isEditing} />
</Form.Item>

<Form.Item label="Организация" name="organization_name">
  <Input placeholder="Организация" disabled={true} />
</Form.Item>

              {isEditing ? (
                <>
                  <Button type="primary" htmlType="submit" style={{ marginTop: '12px' }}>
                    Сохранить изменения
                  </Button>
                  <Button
                    style={{ marginTop: '12px', marginLeft: '8px' }}
                    onClick={handleEditToggle}
                  >
                    Отменить
                  </Button>
                </>
              ) : (
                <Button style={{ marginTop: '12px' }} onClick={handleEditToggle}>
                  Редактировать
                </Button>
              )}
            </Form>
          </div>
        </Col>

        {/* Contact Details Block */}
        <Col xs={24} md={12}>
          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
              padding: '16px', // уменьшены отступы
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              height: '370px', // ограничена высота
            }}
          >
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
              Контактная информация
            </h2>
            <Form
              form={form}
              initialValues={editableFields}
              onFinish={handleSaveChanges}
              layout="vertical"
            >
           <Form.Item label="Электронная почта" name="email_contact_person">
  <Input placeholder="Введите email" disabled={!isEditing} />
</Form.Item>

<Form.Item label="Телефон" name="contact_info">
  <Input placeholder="Введите номер телефона" disabled={!isEditing} />
</Form.Item>

<Form.Item label="Место работы" name="workplace">
  <Input placeholder="Введите место работы" disabled={!isEditing} />
</Form.Item>
            </Form>
          </div>
        </Col>

        {/* Password Change Block */}
        <Col xs={24}>
          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
              padding: '16px', // уменьшены отступы
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              justifyContent: 'center',
              maxHeight: '400px', // ограничена высота
              overflowY: 'auto', // убирает лишний скролл
            }}
          >
            <div
              style={{
                fontSize: '48px', // уменьшен размер иконки
                marginRight: '16px',
                color: '#3A5F73',
                flex: '1 1 33%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <LockOutlined />
              <p style={{ fontSize: '12px', marginTop: '8px', color: '#3A5F73' }}>
                Безопасность аккаунта
              </p>
            </div>
            <div
              style={{
                flex: '2 1 67%',
                borderLeft: '2px solid #ccc',
                paddingLeft: '16px', // уменьшены отступы
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
                Изменение пароля
              </h2>
              <Form layout="vertical" style={{ width: '100%', maxWidth: '350px' }}>
                <Form.Item label="Текущий пароль">
                  <Input.Password
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    style={{ maxWidth: '350px' }}
                  />
                </Form.Item>
                <Form.Item label="Новый пароль">
                  <Input.Password
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ maxWidth: '350px' }}
                  />
                </Form.Item>
                <Form.Item label="Подтвердите новый пароль">
                  <Input.Password
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ maxWidth: '350px' }}
                  />
                </Form.Item>
                <Button type="primary" onClick={handleSavePassword}>
                  Изменить пароль
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
