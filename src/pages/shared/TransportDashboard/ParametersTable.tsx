import { Table, Tabs, Row, Col } from "antd";
import moment from "moment";
import { Parameters } from "../../../types/carTrackingTypes";
const { TabPane } = Tabs;
interface ParametersProps {
  parameters: Parameters[];
}

const ParametersTable: React.FC<ParametersProps> = ({ parameters }) => {
  const columnsTransportStatus = [
    {
      title: "Дата",
      dataIndex: "data",
      key: "data",
      render: (text: string) => (
        <span>{moment(text).format("YYYY-MM-DD-HH:mm:ss")}</span>
      ),
    },
    {
      title: "Вкл/Выкл",
      dataIndex: "on_off",
      key: "on_off",
    },
    {
      title: "Состояние батареи",
      dataIndex: "battery_state",
      key: "battery_state",
    },
  ];
  const columnsTransportParameters = [
    {
      title: "Дата",
      dataIndex: "data",
      key: "data",
      render: (text: string) => (
        <span>{moment(text).format("YYYY-MM-DD-HH:mm:ss")}</span>
      ),
    },
    {
      title: "Низкое напряжение, В",
      dataIndex: "low_voltage_voltage",
      key: "low_voltage_voltage",
    },
    {
      title: "Максимальная критическая температура, °C",
      dataIndex: "critical_temperature_max",
      key: "critical_temperature_max",
    },
    {
      title: "Состояние LD",
      dataIndex: "ld_state",
      key: "ld_state",
    },
    {
      title: "Момент ускорителя, Nm",
      dataIndex: "accelerator_moment",
      key: "accelerator_moment",
    },
    {
      title: "Момент двигателя, Nm",
      dataIndex: "engine_moment",
      key: "engine_moment",
    },
    {
      title: "Скорость двигателя, об/мин",
      dataIndex: "engine_speed",
      key: "engine_speed",
    },
    {
      title: "Включен транзистор?",
      dataIndex: "transmission_enabled",
      key: "transmission_enabled",
    },
    {
      title: "Потребление мощности, кВтч",
      dataIndex: "power_consumption",
      key: "power_consumption",
    },
    {
      title: "Коммутация команды, строка",
      dataIndex: "enabling_com",
      key: "enabling_com",
    },
  ];
  const columnsBatteryCharging = [
    {
      title: "Дата",
      dataIndex: "data",
      key: "data",
      render: (text: string) => (
        <span>{moment(text).format("YYYY-MM-DD-HH:mm:ss")}</span>
      ),
    },
    {
      title: "Зарядка батареи",
      dataIndex: "charging_batteries",
      key: "charging_batteries",
    },
    {
      title: "Позиция MK",
      dataIndex: "mk_position",
      key: "mk_position",
    },
    {
      title: "Температура MK, °C",
      dataIndex: "mk_temperature",
      key: "mk_temperature",
    },
    {
      title: "Состояние заряда",
      dataIndex: "soc",
      key: "soc",
    },
    {
      title: "Подогрев батареи",
      dataIndex: "battery_heating_enabled",
      key: "battery_heating_enabled",
    },
  ];
  const columnsCoolingSystems = [
    {
      title: "Дата",
      dataIndex: "data",
      key: "data",
      render: (text: string) => (
        <span>{moment(text).format("YYYY-MM-DD-HH:mm:ss")}</span>
      ),
    },
    {
      title: "Тепловой насос",
      dataIndex: "heater_enabled",
      key: "heater_enabled",
    },
    {
      title: "Радиаторы вентиляторы",
      dataIndex: "radiator_fans_enabled",
      key: "radiator_fans_enabled",
    },
    {
      title: "Кондиционер",
      dataIndex: "air_conditioner_enabled",
      key: "air_conditioner_enabled",
    },
    {
      title: "Датчик морозостойкости кондиционера",
      dataIndex: "air_conditioner_frostbite_sensor_enabled",
      key: "air_conditioner_frostbite_sensor_enabled",
    },
    {
      title: "Датчик давления кондиционера",
      dataIndex: "air_conditioner_pressure_sensor_enabled",
      key: "air_conditioner_pressure_sensor_enabled",
    },
  ];
  const columnsAirSupply = [
    {
      title: "Дата",
      dataIndex: "data",
      key: "data",
      render: (text: string) => (
        <span>{moment(text).format("YYYY-MM-DD-HH:mm:ss")}</span>
      ),
    },
    {
      title: "Внешний воздух",
      dataIndex: "outdoor_air_supply",
      key: "outdoor_air_supply",
    },
    {
      title: "Включен ГУР",
      dataIndex: "gur_enabled",
      key: "gur_enabled",
    },
    {
      title: "Включение DC DC",
      dataIndex: "dc_dc_switched_on",
      key: "dc_dc_switched_on",
    },
    {
      title: "Компрессор воздуха",
      dataIndex: "air_compressor_enabled",
      key: "air_compressor_enabled",
    },
  ];
  const columnsSensors = [
    {
      title: "Дата",
      dataIndex: "data",
      key: "data",
      render: (text: string) => (
        <span>{moment(text).format("YYYY-MM-DD-HH:mm:ss")}</span>
      ),
    },
    {
      title: "Уровень датчика ГУР",
      dataIndex: "gur_level_sensor_enabled",
      key: "gur_level_sensor_enabled",
    },
    {
      title: "Уровень датчика уровня охлаждающей жидкости",
      dataIndex: "coolant_level_sensor_enabled",
      key: "coolant_level_sensor_enabled",
    },
  ];
  const columnsBZPCommandsDBKOutputs = [
    {
      title: "Дата",
      dataIndex: "data",
      key: "data",
      render: (text: string) => (
        <span>{moment(text).format("YYYY-MM-DD-HH:mm:ss")}</span>
      ),
    },
    {
      title: "Команды BZP",
      dataIndex: "bzp_commands",
      key: "bzp_commands",
    },
    {
      title: "Статус DBK-выводов",
      dataIndex: "dbk_outputs_status",
      key: "dbk_outputs_status",
    },
  ];
  const columnsTransportInfo = [
    {
      title: "Дата",
      dataIndex: "data",
      key: "data",
      render: (text: string) => (
        <span>{moment(text).format("YYYY-MM-DD-HH:mm:ss")}</span>
      ),
    },
    {
      title: "Температура кабины",
      dataIndex: "cabin_temperature",
      key: "cabin_temperature",
    },
  ];
  return (
    <Tabs defaultActiveKey="Transport_Status" tabPosition="left">
      <TabPane key="Transport_Status" tab="Статус Транспорта">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Table
              bordered
              pagination={false}
              columns={columnsTransportStatus}
              dataSource={parameters}
            />
          </Col>
        </Row>
      </TabPane>
      <TabPane key="Transport_Parameters" tab="Параметры Транспорта">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Table
              bordered
              pagination={false}
              columns={columnsTransportParameters}
              dataSource={parameters}
            />
          </Col>
        </Row>
      </TabPane>
      <TabPane key="Battery_Charging" tab="Зарядка Батареи">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Table
              bordered
              pagination={false}
              columns={columnsBatteryCharging}
              dataSource={parameters}
            />
          </Col>
        </Row>
      </TabPane>
      <TabPane key="Cooling_Systems" tab="Системы охлаждения">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Table
              bordered
              pagination={false}
              columns={columnsCoolingSystems}
              dataSource={parameters}
            />
          </Col>
        </Row>
      </TabPane>
      <TabPane key="Air_Supply" tab="Обеспечение воздухом">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Table
              bordered
              pagination={false}
              columns={columnsAirSupply}
              dataSource={parameters}
            />
          </Col>
        </Row>
      </TabPane>
      <TabPane key="Sensors" tab="Датчики">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Table
              bordered
              pagination={false}
              columns={columnsSensors}
              dataSource={parameters}
            />
          </Col>
        </Row>
      </TabPane>
      <TabPane
        key="BZP_Commands_and_DBK_Outputs"
        tab="Команды БДЗ и Выводы ДБК"
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Table
              bordered
              pagination={false}
              columns={columnsBZPCommandsDBKOutputs}
              dataSource={parameters}
            />
          </Col>
        </Row>
      </TabPane>
      <TabPane key="Transport_Info" tab="Информация о транспорте">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Table
              bordered
              pagination={false}
              columns={columnsTransportInfo}
              dataSource={parameters}
            />
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  );
};

export default ParametersTable;
