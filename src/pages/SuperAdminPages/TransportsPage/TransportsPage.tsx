import { useState } from "react";
import TransportsPage from "../../shared/TransportsPage";
import { Button, Modal, message, Form, Input, Select, DatePicker } from "antd";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useAddCarMutation, useUpdateCarMutation } from "../../../Store/apis/transportApi"
import dayjs from "dayjs";
import { useGetCarsQuery } from "../../../Store/apis/transportApi"; // Import for refetch
import axiosInstance from "../../../services/axiosInstance";

const { Option } = Select;

const SuperAdminTransportsPage = () => {
  const isMobile = window.innerWidth < 768;
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteVin, setDeleteVin] = useState<string | null>(null);
  const [editingTransport, setEditingTransport] = useState<any>(null);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  const { data, error, isLoading, refetch } = useGetCarsQuery({ page: 1, size: 10 });

  const [addCar] = useAddCarMutation();
  const [updateCar] = useUpdateCarMutation();

  const handleArchive = (vin: string) => {
    setDeleteVin(vin);
    setDeleteModalVisible(true);
  };

  const handleEdit = (record: any) => {
    setEditingTransport(record);
    form.setFieldsValue({
      ...record,
      yearRelease: dayjs(record.yearRelease),
    });
    setEditModalVisible(true);
  };
  const archiveTransport = async () => {
    try {
      const response = await axiosInstance.post(`archive/archive/transport/${deleteVin}`);

      if (response.status !== 200) {
        throw new Error("Ошибка при архивировании транспорта");
      }
      refetch();
      message.success("Транспорт успешно перемещен в архив");
    } catch (error) {
      console.error("Ошибка:", error);
      message.error("Не удалось архивировать транспорт");
    }
  };


  const handleSaveEdit = async (values: any) => {
    try {
      await updateCar({
        ...values,
        id: editingTransport.id, // передаем id транспорта для обновления
        yearRelease: values.yearRelease.format("YYYY-MM-DD"),
      }).unwrap();
      message.success("Данные успешно обновлены!");
      setEditModalVisible(false);
      refetch();  // Refetch the data after edit
    } catch (error) {
      console.error(error);
      message.error("Ошибка при сохранении данных.");
    }
  };

  const handleAddTransport = async (values: any) => {
    try {
      await addCar({
        ...values,
        yearRelease: values.yearRelease.format("YYYY-MM-DD"),
      }).unwrap();
      message.success("Транспорт успешно добавлен!");
      setAddModalVisible(false);
      addForm.resetFields();
      refetch();  // Refetch the data after adding
    } catch (error) {
      console.error(error);
      message.error("Ошибка при добавлении транспорта.");
    }
  };

  const extraControls = (
    <Button
      type="primary"
      onClick={() => setAddModalVisible(true)}
      icon={<LibraryAddOutlinedIcon />}
      style={{ backgroundColor: "#1B232A", border: "none" }}
    >
      {!isMobile && "Добавить транспорт"}
    </Button>
  );
  const extraActions = (record: any) => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Button size="middle" onClick={() => handleEdit(record)} icon={<ModeEditOutlinedIcon />}>
        Изменить
      </Button>
      <Button size="middle" onClick={() => handleArchive(record.id)} icon={<ArchiveOutlinedIcon />}>
        Переместить в архив
      </Button>
    </div>
  );

  return (
    <>
      <TransportsPage extraControls={extraControls} extraActions={extraActions} />
      <Modal
        title="Подтверждение архивирования"
        open={deleteModalVisible}
        onOk={() => {
          archiveTransport();
          setDeleteModalVisible(false);
        }}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Подтвердить"
        cancelText="Отмена"
      >
        <p>Вы действительно хотите хотите переместить транспорт в архив? Это действие нельзя отменить.</p>
      </Modal>

      {/* Модальное окно для добавления */}
      <Modal
        title="Добавление транспорта"
        open={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        footer={null}
      >
        <Form form={addForm} layout="vertical" onFinish={handleAddTransport}>
          <Form.Item label="VIN" name="id" rules={[{ required: true, pattern: /^[A-Z0-9]{17}$/, message: "VIN должен содержать 17 символов (заглавные буквы и цифры)" }]}>
            <Input maxLength={17} />
          </Form.Item>
          <Form.Item label="Модель" name="model" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Год выпуска" name="yearRelease" rules={[{ required: true }]}>
            <DatePicker
              picker="year"
              style={{ width: "100%" }}
              disabledDate={(current) => current && current.year() > dayjs().year()} // Ограничиваем выбор годом, не более текущего
            />
          </Form.Item>
          <Form.Item label="Организация" name="organizationName">
            <Input />
          </Form.Item>
          <Form.Item label="Тип двигателя" name="engineType" rules={[{ required: true }]}>
            <Select>
              <Option value="Электрический">Электрический</Option>
              <Option value="Бензиновый">Бензиновый</Option>
              <Option value="Дизельный">Дизельный</Option>
              <Option value="Газовый">Газовый</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Тип транспортного средства" name="vehicleType" rules={[{ required: true }]}>
            <Select>
              <Option value="Грузовик">Грузовик</Option>
              <Option value="Тягач">Тягач</Option>
              <Option value="Электротранспорт">Электротранспорт</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Тип блока" name="blockType" rules={[{ required: true }]}>
            <Select>
              <Option value="АГАТ">АГАТ</Option>
              <Option value="ПРОТОК">ПРОТОК</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">Добавить</Button>
        </Form>
      </Modal>
      {/* Модальное окно для редактирования */}
      <Modal
        title="Редактирование транспорта"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveEdit}>
          <Form.Item label="Модель" name="model" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Год выпуска" name="yearRelease" rules={[{ required: true }]}>
            <DatePicker
              picker="year"
              style={{ width: "100%" }}
              disabledDate={(current) => current && current.year() > dayjs().year()} // Ограничиваем выбор годом, не более текущего
            />
          </Form.Item>
          <Form.Item label="Организация" name="organizationName">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Тип двигателя" name="engineType" rules={[{ required: true }]}>
            <Select>
              <Option value="Электрический">Электрический</Option>
              <Option value="Бензиновый">Бензиновый</Option>
              <Option value="Дизельный">Дизельный</Option>
              <Option value="Газовый">Газовый</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Тип транспортного средства" name="vehicleType" rules={[{ required: true }]}>
            <Select>
              <Option value="Грузовик">Грузовик</Option>
              <Option value="Тягач">Тягач</Option>
              <Option value="Электротранспорт">Электротранспорт</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Тип блока" name="blockType" rules={[{ required: true }]}>
            <Select>
              <Option value="АГАТ">АГАТ</Option>
              <Option value="ПРОТОК">ПРОТОК</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">Сохранить</Button>
        </Form>
      </Modal>
    </>
  );
};

export default SuperAdminTransportsPage;
