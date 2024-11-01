import React, { useState, useEffect } from "react";
import {
  Card,
  Modal,
  Table,
  Typography,
  Form,
  message,
  Switch,
  Input,
  Button,
  DatePicker,
  Row,
  Col,
  Tabs,
} from "antd";
import moment from "moment";
import dayjs, { Dayjs } from 'dayjs';
import { SubscriptionHistory } from "./subscriptionHistory";
import { Organization } from "../../../types/transportListTypes";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

export interface Vehicle {
  id_transport: number;
  vehicle_type: string;
  model: string;
  vin: string;
}

export interface OrgType {
  id: number;
  name: string;
  subscriptionStart: string;
  subscriptionEnd: string;
  isBlocked: boolean;
  registrationDate: string;
  vehicles: Vehicle[];
}
export interface Subscription{
  id:number;
  start_date:string;
  end_date:string;
  organization_id:number;
  status:string
}

const OrganizationDetails: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [subscriptionHistory, setSubscriptionHistory] = useState<Subscription[]>([]);
  const [idTransport, setIdTransport] = useState<string | null>(null);
  const [idOrganization, setIdOrganization] = useState<number>();
  const [organizationData, setOrganizationData] = useState<Organization>();
  const [visible, setVisible] = useState<boolean>(false);
  const [vin, setVin] = useState<string>();
  const fetchVehicles = async (id: number) => {
    try {
      const response = await axios.get(
        `${apiUrl}/transport/manufacturer/${id}`
      );
      setVehicles(response.data);
    } catch (error) {
      console.error("Ошибка при получении транспортных средств:", error);
    }
  };

  const fetchOrganization = async (id: number) => {
    try {
      const response = await axios.get(`${apiUrl}/organizations/${id}`);
      setOrganizationData(response.data[0]);
    } catch (error) {
      console.error("Ошибка при получении транспортных средств:", error);
    }
  };

  const fetchSubscriptionHistory = async (id: number) => {
    try {
      const response = await axios.get(`${apiUrl}/organizations/subscription/list/${id}`); // Убедитесь, что корректный адрес API
      setSubscriptionHistory(response.data);
      console.log(response)
    } catch (error) {
      console.error("Ошибка при получении истории подписок:", error);
    }
  };
  const id = sessionStorage.getItem("organization_id");

  useEffect(() => {
    if (id) {
      setIdTransport(id);
      fetchVehicles(Number(id));
      fetchSubscriptionHistory(Number(id));
      fetchOrganization(Number(id));
      console.log(id);
      setIdOrganization(Number(id));
    }
  }, [id]);


  const deleteVehicle = async (vehicleId: number) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/transport/organization/${vehicleId}`,
        {
          data: {
            id, // Передаем ID организации в теле запроса
          },
        }
      );
      setVehicles(response.data.cars);
    } catch (error) {
      console.error(`Ошибка: ${error}`);
    }
  };

  const confirmDeleteVehicle = (vehicleId: number) => {
    Modal.confirm({
      title: "Подтверждение удаления транспортного средства",
      content:
        "Вы уверены, что хотите удалить это транспортное средство? Это действие нельзя будет отменить.",
      onOk: async () => {
        try {
          await deleteVehicle(vehicleId);
          console.log(
            `Транспортное средство с ID: ${vehicleId} успешно удалено.`
          );
          // Здесь можно обновить состояние или интерфейс, чтобы отразить изменения
        } catch (error) {
          console.error(`Ошибка при удалении транспортного средства: ${error}`);
        }
      },
      onCancel() {
        console.log("Отмена удаления транспортного средства");
      },
    });
  };

  const showConfirmExtend = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null,
    dateStrings: [string, string]
  ) => {
    if (dates && dates[0] && dates[1]) {
      console.log(dates[0].format("YYYY-MM-DD"));
      let start_date = dates[0].format("YYYY-MM-DD");
      let end_date = dates[1].format("YYYY-MM-DD");
      Modal.confirm({
        title: "Подтверждение продления подписки",
        content: (
          <>
            <p>Вы уверены, что хотите продлить подписку с:</p>
            <p>
              {dates[0].format("YYYY-MM-DD")} по {dates[1].format("YYYY-MM-DD")}
              ?
            </p>
          </>
        ),
        onOk: async () => {
          const response = await axios.patch(
            `${apiUrl}/organizations/subscription/${idOrganization}`,
            {
              requestBody: {
                start_date: start_date,
                end_date: end_date,
              },
            }
          );
          if (response) {
            fetchOrganization(Number(id));
          }
        },
        onCancel() {
          console.log("Отмена прдления подписки");
        },
      });
    }
  };

  const showConfirmBlockAccess = (checked: boolean) => {
    const action = checked ? "разблокировать" : "заблокировать";
    Modal.confirm({
      title: `Подтверждение ${action} доступа к мониторингу`,
      content: `Вы уверены, что хотите ${action} доступ к мониторингу транспортных средств?`,
      onOk: async () => {
        const response = await axios.patch(
          `${apiUrl}/organizations/status/${idOrganization}`
        );
        if (response) {
          fetchOrganization(Number(id));
        }
      },
      onCancel() {
        console.log("Отмена изменения доступа");
      },
    });
  };

  const columnsVehicles = [
    {
      title: "Тип",
      dataIndex: "vehicle_type",
      key: "vehicle_type",
    },
    {
      title: "Модель",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "VIN",
      dataIndex: "vin",
      key: "vin",
    },
    {
      title: "Действия",
      key: "action",
      render: (text: any, vehicle: Vehicle) => (
        // !organization.isBlocked && (
        <Button
          type="link"
          onClick={() => confirmDeleteVehicle(vehicle.id_transport)}
        >
          Удалить
        </Button>
        // )
      ),
    },
  ];

  const columnsHistory = [
    {
      title: "Дата начала",
      dataIndex: "start_date",
      key: "start_date",
      render: (text: string) => moment(text).format("YYYY-MM-DD"), // Форматируем дату
    },
    {
      title: "Дата окончания",
      dataIndex: "end_date",
      key: "end_date",
      render: (text: string) => moment(text).format("YYYY-MM-DD"), // Форматируем дату
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (text: 'active' | 'completed') => (
        <span style={{ color: text === "active" ? "blue" : "black" }}>
          {text === "active" ? "Активная" : "Завершенная"}
        </span>
      ), // Преобразуем статус и добавляем цвет
    },
  ];
  const sortedData = subscriptionHistory.sort((a, b) => (a.status === "active" ? -1 : 1));

  const handleAddVehicle = async () => {
    try {
      const response = await axios.post(`${apiUrl}/transport/add-car/${vin}`, {
        data: {
          id: idTransport, // Передаем ID организации в теле запроса
        },
      });
  
      if (response) {
        setVehicles(response.data);
        message.success("Автомобиль успешно добавлен к организации!");
        setVisible(false); // Закрываем модальное окно
      } else {
        message.error("Произошла ошибка при добавлении автомобиля.");
      }
    } catch (error: unknown) {  // Указываем тип error как unknown
      console.error("Ошибка при добавлении автомобиля:", error);
  
      // Проверка на специфическую ошибку о конфликте VIN
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message;
  
        // Здесь предполагается, что сервер отправляет сообщение о конфликте VIN
        if (errorMessage.includes("VIN уже принадлежит другой организации")) {
          message.error("Транспорт с таким VIN номером принадлежит другой организации.");
        } else {
          message.error( errorMessage);
        }
      } else {
        message.error("Ошибка при добавлении автомобиля.");
      }
    }
  };

  const disabledDate = (current: Dayjs) => {
    if (!organizationData) return false; // Если organizationData отсутствует, разрешаем все даты
    // Разрешаем выбор только с subscription_end
    return current.isBefore(dayjs(organizationData.subscription_end), 'day');
  };
  console.log(organizationData);
  return (
   
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      backgroundColor: "#F0F4F8",
    }}>
    {/* <Header /> */}
    <Card
      title="Информация об организации"
      style={{
        backgroundColor: "#F7F9FB",
       width: "auto",
        margin: 40,
        borderRadius: 8,
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)' // Эффект тени
      }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Typography.Title level={4} style={{ color: '#4a4a4a' }}>
            {organizationData?.organization_name}
          </Typography.Title>

          <Typography.Paragraph>
            <strong>Дата начала подписки:</strong>{" "}
            {moment(organizationData?.subscription_start).format("YYYY-MM-DD")}
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Дата окончания подписки:</strong>{" "}
            {moment(organizationData?.subscription_end).format("YYYY-MM-DD")}
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Статус подписки:</strong>{" "}
            <span style={{fontWeight:500, color: organizationData?.status ? '#007bff' :  'red' }}>
              {organizationData?.status ? "Активна" : "Заблокирована"}
            </span>
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Дата регистрации:</strong>{" "}
            {moment(organizationData?.created_at).format("YYYY-MM-DD")}
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Доступ к мониторингу транспортных средств:</strong>
            <Switch
              style={{ marginLeft: "5px" }}
              checked={organizationData?.status}
              onChange={showConfirmBlockAccess}
            />
          </Typography.Paragraph>
                   <Row>
               <Col span={22}>
                 <Typography.Title level={5}>
                  Продлить доступ к системе:
                 </Typography.Title>
                 <RangePicker onChange={showConfirmExtend}     disabledDate={disabledDate}/>
               </Col>
             </Row>


          <Tabs defaultActiveKey="1" style={{ marginTop: 10 }}>
            <TabPane tab="Транспортные средства" key="1">
              <Table
                bordered
                dataSource={vehicles}
                columns={columnsVehicles}
                rowKey="id"
                pagination={false}
                style={{
                  marginTop: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Button
                style={{ marginTop: "20px", width:"300px", backgroundColor: '#007bff', color: '#fff', borderColor: '#007bff' }}
                onClick={() => setVisible(true)}
              >
                Добавить транспорт к организации
              </Button>

            </TabPane>
            <TabPane tab="История подписок" key="2">
              <Table
                bordered
                dataSource={sortedData}
                columns={columnsHistory}
                rowKey="id"
                style={{
                  marginTop: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Card>

    <Modal
      title="Добавить автомобиль"
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      style={{ borderRadius: '8px' }} // Угол модального окна
    >
      <Form onFinish={handleAddVehicle}>
        <Form.Item
          label="VIN-номер"
          name="vin"
          rules={[
            { required: true, message: "Пожалуйста, введите VIN-номер!" },
          ]}
        >
          <Input value={vin} onChange={(e) => setVin(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  </div>
  );
};

export default OrganizationDetails;

