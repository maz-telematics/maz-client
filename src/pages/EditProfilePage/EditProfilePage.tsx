import axios from 'axios';
import { useState,useEffect } from 'react';
import { Button, Modal, Row, Col,DatePicker, Form, Input, message,Select } from 'antd';
import dayjs from 'dayjs';
import Header from '../../components/Header';
const apiUrl = process.env.REACT_APP_API_URL;

export interface Organization {
    organization_name: string,
    contact_info: string,
    contact_person: string,
    email_contact_person: string,
    organization_address: string,
    registration_date:string
}

const EditProfile = () => {
const [form] = Form.useForm();
const [editableFields, setEditableFields] = useState<Organization >();
const [visible, setVisible] = useState(false);
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const handleOpenModal = () => {
  setVisible(true);
};
const handleCancel = () => {
  setVisible(false);
};
    const user = JSON.parse(localStorage.getItem('user') || '{"token":"","id":0}');
    const { id } = user;
  
    useEffect(() => {
      if (id) {
        axios.get(`${apiUrl}/organizations/${id}`)
          .then(response =>  setEditableFields(response.data[0]))
          .catch(error => console.error('Ошибка при получении данных:', error));
      }
    }, [id]);


    const handleSaveChanges = async () => {
      if (newPassword !== confirmPassword) {
        message.warning('Пароли не совпадают. Пожалуйста, проверьте введенные данные и попробуйте снова.');
        console.error('Passwords do not match');
        return;
      }
      const response = await fetch(`${apiUrl}/user/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newPassword,
        }),
      });
      if (response) {
        message.success('Пароль изменен успешно!');
        setVisible(false);
      } else {
        message.warning('Ошибка при изменении пароля');
      }
    };

  const handleDeleteAccount = () => {
    // onDeleteAccount();
  };


  const handleRenewSubscription = () => {
    // onRenewSubscription();
  };


  const onFinish = async (values: Pick<Organization, keyof Organization>) => {
    console.log(values)
    try {
      const changedFields = Object.keys(values).filter((key) => form.getFieldValue(key) !== undefined);
    const changedFieldValues = changedFields.map((key) => {
      return { name: key, value: form.getFieldValue(key) };
    });
      console.log(changedFieldValues)
      if (Object.keys(changedFieldValues).length > 0) {
        try {
          const response = await axios.patch(`${apiUrl}/organizations/${id}`, changedFieldValues);
          setEditableFields(response.data); // Update the carData state with the updated data
          message.success('Авто обновлено!');
          form.resetFields();
        } catch (error) {
          console.error(error);
        }
      } else {
        message.warning('Ничего не изменено');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const formatDate = (date: any) => dayjs(date).format('YYYY');
  return (
    <div style={{
      display: "flex", 
      flexDirection: "column", 
      width: "100%", 
      height: "100vh", 
      backgroundColor: "#F0F4F8",
      boxSizing: "border-box", // Чтобы отступы учитывались в общей высоте
      }}>
 <Header/>
 <Row style={{ display: 'flex',flexDirection:"column", marginTop:"40px", width: "100%"}}>
   <Col offset={1}  xs={10} sm={10} md={10} lg={10} xl={10} >

   <Form form={form} onFinish={onFinish}>
  <Form.Item
    label={<label style={{ width: '160px', fontSize: "14px", fontWeight: 'bold', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
      >Название организации</label>}
    name="organization_name"
  >
    <Input
      placeholder={editableFields?.organization_name}
      style={{ fontSize: '14px', width: '200px' }}
    />
  </Form.Item>
  <Form.Item
    label={<label style={{ width: '160px', fontSize: "14px", fontWeight: 'bold', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
      >Номер телефона</label>}
    name="contact_info"
  >
    <Input
      placeholder={editableFields?.contact_info}
      style={{ width: '200px' }}
    />
  </Form.Item>
  <Form.Item
    label={<label style={{ width: '160px', fontSize: "14px", fontWeight: 'bold', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
      >Контактное лицо</label>}
    name="contact_person"
  >
    <Input
      placeholder={editableFields?.contact_person}
      style={{ width: '200px' }}
    />
  </Form.Item>
  <Form.Item
    label={<label style={{ width: '160px', fontSize: "14px", fontWeight: 'bold', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
      >Электронная почта</label>}
    name="email_contact_person"
  >
    <Input
      placeholder={editableFields?.email_contact_person}
      style={{ width: '200px' }}
    />
  </Form.Item>
  <Form.Item
    label={<label style={{ width: '160px', fontSize: "14px", fontWeight: 'bold', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
      >Адрес</label>}
    name="organization_address"
  >
    <Input
      placeholder={editableFields?.organization_address}
      style={{ width: '200px' }}
    />
  </Form.Item>
  <Row style={{display:'flex', flexDirection:"row",justifyContent:'space-between', marginTop:'50px', marginBottom:'30px'}}>
<Button  type="primary" htmlType="submit" >
     Сохранить изменения
    </Button>
    <Button type="primary" onClick={handleDeleteAccount}>
    Удалить
    </Button>
    <Button type="primary" onClick={handleOpenModal}>
     Изменить Пароль
    </Button>
    <Button type="primary" onClick={handleRenewSubscription}>
    Продлить подписку
    </Button>
  </Row>
  
</Form>
    <p style={{fontSize:'18px'}}>
    Дата окончания срока действия подписки: {"15.08.2024"}, {"23"} дней до истечения срока подписки
    </p>
    </Col>
    </Row>
    <Modal
        title="Изменение пароля"
        visible={visible}
        onCancel={handleCancel}
        onOk={handleSaveChanges}
      >
        <Form>
          <Form.Item label="Новый пароль">
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Подтвердите новый пароль">
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            /> 
          </Form.Item>
        </Form>
      </Modal>
  </div>
  );
};

export default EditProfile;
