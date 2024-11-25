import moment from "moment";
import { Parameters } from "../../../types/carTrackingTypes";
import { Table, Tabs, Row, Col, Tag, Tooltip, Progress } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined ,ClockCircleOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
interface ParametersProps {
  parameters: Parameters[];
}

const ParametersTable: React.FC<ParametersProps> = ({ parameters }) => {

  const transportLighting  = [
    {
      key: "1",
      time:"2024-11-21T15:30:00Z",
      daytime_running_lights: "Включен",
      low_beam: "Выключен",
      high_beam: "Включен",
      front_fog_lights: "Выключен",
      right_turn_signal: "Включен",
      left_turn_signal: "Выключен",
      side_marker_lights: "Включен",
      rear_fog_lights: "Выключен",
      reverse_lights: "Включен",
      right_brake_lights: 80,
      left_brake_lights: 60,
    },
  ];
  const transportAirConditioning  = [
    {
      key: "1",
      time:"2024-11-21T15:30:00Z",
      ac_on: "Включен",
      frost_sensor_on: "Выключен",
      pressure_sensor_on: "Включен",
      outside_air_temp_sensor: 23.5,
      air_damper_position: "Закрыта",
    },
  ];
  const powertrainSystemParameters  = [
    {
      key: "1",
      time:"2024-11-21T15:30:00Z",
      throttle_position: 75.5,
      engine_torque: 320.0,
      engine_rpm: 1500,
      gearbox_output_speed: 80,
      transmission_status: true,
      vehicle_on: true,
      dcdc_on: true,
      battery_on: false,
      hydraulic_sensor_level: 75.3,
      coolant_sensor_level: 60.5,
      power_steering_on: true,
    },
  ];
  const batteryParameters = [
    {
      key: "1",
      time:"2024-11-21T15:30:00Z",
      battery_min_temp: 15.2,
      battery_max_temp: 40.5,
      battery_soc: 80.0,
      battery_voltage: 48.5,
      battery_charging: true,
    },
  ];
  const electricSystemParameters = [
    {
      key: "1",
      time:"2024-11-21T15:30:00Z",
      power_consumption_hydraulic: 10.5,
      power_consumption_air_compressor: 12.3,
      power_consumption_dcdc: 8.7,
      power_consumption_engine: 15.6,
    },
  ];
  const bzpCommands = [
    {
      key: "1",
      time:"2024-11-21T15:30:00Z",
      bzp_command_1: 1,
      bzp_command_2: 0,
      bzp_command_3: 1,
      bzp_command_4: 0,
      bzp_command_5: 1,
      bzp_command_6: 1,
      bzp_command_7: 0,
      bzp_command_8: 1,
      bzp_command_9: 0,
      bzp_command_10: 1,
    },
  ];
 
  const columnsTransportLighting = [
    {
      title: "Время",
      dataIndex: "time",
      key: "time",
      render: (value: string) => {
        // Предположим, что `value` — это строка формата ISO, например, "2024-11-21T15:30:00Z"
        const time = new Date(value).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        
        return (
          <Tooltip title={`Время события: ${time}`}>
            <Tag icon={<ClockCircleOutlined />} color="processing">
              {time}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: "Дневное ходовое освещение",
      dataIndex: "daytime_running_lights",
      key: "daytime_running_lights",
      render: (value:string) => (
        <Tooltip title={value}>
          {value === "Включен" ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {value}
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              {value}
            </Tag>
          )}
        </Tooltip>
      ),
    },
    {
      title: "Ближний свет",
      dataIndex: "low_beam",
      key: "low_beam",
      render: (value:string) => (
        <Tooltip title={value}>
          {value === "Включен" ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {value}
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              {value}
            </Tag>
          )}
        </Tooltip>
      ),
    },
    {
      title: "Дальний свет",
      dataIndex: "high_beam",
      key: "high_beam",
      render: (value:string) => (
        <Tooltip title={value}>
          {value === "Включен" ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {value}
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              {value}
            </Tag>
          )}
        </Tooltip>
      ),
    },
    {
      title: "Передние противотуманные фонари",
      dataIndex: "front_fog_lights",
      key: "front_fog_lights",
      render: (value:string) => (
        <Tooltip title={value}>
          {value === "Включен" ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {value}
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              {value}
            </Tag>
          )}
        </Tooltip>
      ),
    },
    {
      title: "Правый поворотник",
      dataIndex: "right_turn_signal",
      key: "right_turn_signal",
      render: (value:string) => (
        <Tooltip title={value}>
          {value === "Включен" ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {value}
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              {value}
            </Tag>
          )}
        </Tooltip>
      ),
    },
    {
      title: "Левый поворотник",
      dataIndex: "left_turn_signal",
      key: "left_turn_signal",
      render: (value:string) => (
        <Tooltip title={value}>
          {value === "Включен" ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {value}
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              {value}
            </Tag>
          )}
        </Tooltip>
      ),
    },
    {
      title: "Габаритные фонари",
      dataIndex: "side_marker_lights",
      key: "side_marker_lights",
      render: (value:string) => (
        <Tooltip title={value}>
          {value === "Включен" ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {value}
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              {value}
            </Tag>
          )}
        </Tooltip>
      ),
    },
    {
      title: "Задние противотуманные фонари",
      dataIndex: "rear_fog_lights",
      key: "rear_fog_lights",
      render: (value:string) => (
        <Tooltip title={value}>
          {value === "Включен" ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {value}
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              {value}
            </Tag>
          )}
        </Tooltip>
      ),
    },
    {
      title: "Задний ход",
      dataIndex: "reverse_lights",
      key: "reverse_lights",
      render: (value:string) => (
        <Tooltip title={value}>
          {value === "Включен" ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {value}
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              {value}
            </Tag>
          )}
        </Tooltip>
      ),
    },
    {
      title: "Стоп сигнал правый",
      dataIndex: "right_brake_lights",
      key: "right_brake_lights",
      render: (value:string) => (
        <Tooltip title={value}>
          {value === "Включен" ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {value}
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              {value}
            </Tag>
          )}
        </Tooltip>
      ),
    },
    {
      title: "Стоп сигнал левый",
      dataIndex: "left_brake_lights",
      key: "left_brake_lights",
      render: (value:string) => (
        <Tooltip title={value}>
          {value === "Включен" ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {value}
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              {value}
            </Tag>
          )}
        </Tooltip>
      ),
    },
  ];
  const columnsTransportAirConditioning = [
    {
      title: "Время",
      dataIndex: "time",
      key: "time",
      render: (value: string) => {
        // Предположим, что `value` — это строка формата ISO, например, "2024-11-21T15:30:00Z"
        const time = new Date(value).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        
        return (
          <Tooltip title={`Время события: ${time}`}>
            <Tag icon={<ClockCircleOutlined />} color="processing">
              {time}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: "Состояние кондиционера",
      dataIndex: "ac_on",
      key: "ac_on",
      render: (value:string) => (
        <Tooltip title={value}>
          {value === "Включен" ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {value}
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              {value}
            </Tag>
          )}
        </Tooltip>
      ),
    },
    {
      title: "Состояние датчика обморожения кондиционера",
      dataIndex: "frost_sensor_on",
      key: "frost_sensor_on",
      render: (value:string) => (
        <Tooltip title={value}>
          {value === "Включен" ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {value}
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              {value}
            </Tag>
          )}
        </Tooltip>
      ),
    },
    {
      title: "Состояние датчика давления кондиционера",
      dataIndex: "pressure_sensor_on",
      key: "pressure_sensor_on",
      render: (value:string) => (
        <Tooltip title={value}>
          {value === "Включен" ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {value}
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              {value}
            </Tag>
          )}
        </Tooltip>
      ),
    },
    {
      title: "Температура наружного воздуха",
      dataIndex: "outside_air_temp_sensor",
      key: "outside_air_temp_sensor",
      render: (value:number) => (
        <Tooltip title={`Температура: ${value}°C`}>
          <Tag color={value < 0 ? "blue" : value < 25 ? "green" : "red"}>
            {value}°C
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Положение воздушной заслонки",
      dataIndex: "air_damper_position",
      key: "air_damper_position",
      render: (value:string) => (
        <Tooltip title={value}>
          <Tag color={value === "Закрыта" ? "error" : "success"}>{value}</Tag>
        </Tooltip>
      ),
    },
  ];
  const columnsPowertrainSystemParameters = [
    {
      title: "Время",
      dataIndex: "time",
      key: "time",
      render: (value: string) => {
        // Предположим, что `value` — это строка формата ISO, например, "2024-11-21T15:30:00Z"
        const time = new Date(value).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        
        return (
          <Tooltip title={`Время события: ${time}`}>
            <Tag icon={<ClockCircleOutlined />} color="processing">
              {time}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: "Положение дросселя (%)",
      dataIndex: "throttle_position",
      key: "throttle_position",
      render: (value:number) => (
        <Tooltip title={`Положение дросселя: ${value}%`}>
          <Tag color="blue">{value}%</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Момент двигателя (Nm)",
      dataIndex: "engine_torque",
      key: "engine_torque",
      render: (value:number) => (
        <Tooltip title={`Момент двигателя: ${value} Nm`}>
          <Tag color="green">{value} Nm</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Обороты двигателя (RPM)",
      dataIndex: "engine_rpm",
      key: "engine_rpm",
      render: (value:number) => (
        <Tooltip title={`Обороты двигателя: ${value} RPM`}>
          <Tag color="purple">{value} RPM</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Скорость на выходе КПП (км/ч)",
      dataIndex: "gearbox_output_speed",
      key: "gearbox_output_speed",
      render: (value:number) => (
        <Tooltip title={`Скорость КПП: ${value} км/ч`}>
          <Tag color="orange">{value} км/ч</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Состояние трансмиссии",
      dataIndex: "transmission_status",
      key: "transmission_status",
      render: (value:string) => (
        <Tooltip title={value ? "Трансмиссия включена" : "Трансмиссия выключена"}>
          {value ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Включена
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              Выключена
            </Tag>
          )}
        </Tooltip>
      ),
    },
    {
      title: "Состояние транспорта",
      dataIndex: "vehicle_on",
      key: "vehicle_on",
      render: (value:string) => (
        <Tooltip title={value ? "Транспорт включен" : "Транспорт выключен"}>
          {value ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Включен
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              Выключен
            </Tag>
          )}
        </Tooltip>
      ),
    },
    {
      title: "Состояние DC-DC преобразователя",
      dataIndex: "dcdc_on",
      key: "dcdc_on",
      render: (value:string) => (
        <Tooltip title={value ? "Преобразователь включен" : "Преобразователь выключен"}>
          {value ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Включен
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              Выключен
            </Tag>
          )}
        </Tooltip>
      ),
    },
    {
      title: "Состояние батареи",
      dataIndex: "battery_on",
      key: "battery_on",
      render: (value:string) => (
        <Tooltip title={value ? "Батарея включена" : "Батарея выключена"}>
          {value ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Включена
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              Выключена
            </Tag>
          )}
        </Tooltip>
      ),
    },
    {
      title: "Уровень гидравлики (%)",
      dataIndex: "hydraulic_sensor_level",
      key: "hydraulic_sensor_level",
      render: (value:number) => (
        <Tooltip title={`Уровень гидравлики: ${value}%`}>
          <Tag color="blue">{value}%</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Уровень охлаждающей жидкости (%)",
      dataIndex: "coolant_sensor_level",
      key: "coolant_sensor_level",
      render: (value:number) => (
        <Tooltip title={`Уровень охлаждающей жидкости: ${value}%`}>
          <Tag color="cyan">{value}%</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Состояние гидроусилителя руля",
      dataIndex: "power_steering_on",
      key: "power_steering_on",
      render: (value:string) => (
        <Tooltip title={value ? "Гидроусилитель включен" : "Гидроусилитель выключен"}>
          {value ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Включен
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              Выключен
            </Tag>
          )}
        </Tooltip>
      ),
    },
  ];
  const columnsBatteryParameters = [
    {
      title: "Время",
      dataIndex: "time",
      key: "time",
      render: (value: string) => {
        // Предположим, что `value` — это строка формата ISO, например, "2024-11-21T15:30:00Z"
        const time = new Date(value).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        
        return (
          <Tooltip title={`Время события: ${time}`}>
            <Tag icon={<ClockCircleOutlined />} color="processing">
              {time}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: "Минимальная критическая температура батареи (°C)",
      dataIndex: "battery_min_temp",
      key: "battery_min_temp",
      render: (value:number) => (
        <Tooltip title={`Минимальная температура: ${value}°C`}>
          <Tag color={value < 10 ? "error" : "green"}>{value}°C</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Максимальная критическая температура батареи (°C)",
      dataIndex: "battery_max_temp",
      key: "battery_max_temp",
      render: (value:number) => (
        <Tooltip title={`Максимальная температура: ${value}°C`}>
          <Tag color={value > 35 ? "error" : "green"}>{value}°C</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Уровень заряда батареи (%)",
      dataIndex: "battery_soc",
      key: "battery_soc",
      render: (value:number) => (
        <Tooltip title={`Уровень заряда: ${value}%`}>
          <Progress percent={value} status={value < 20 ? "exception" : "active"} />
        </Tooltip>
      ),
    },
    {
      title: "Напряжение батареи (V)",
      dataIndex: "battery_voltage",
      key: "battery_voltage",
      render: (value:number) => (
        <Tooltip title={`Напряжение батареи: ${value} V`}>
          <Tag color={value < 45 ? "error" : "green"}>{value} V</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Состояние зарядки",
      dataIndex: "battery_charging",
      key: "battery_charging",
      render: (value:string) => (
        <Tooltip title={value ? "Батарея заряжается" : "Батарея не заряжается"}>
          {value ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Заряжается
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error">
              Не заряжается
            </Tag>
          )}
        </Tooltip>
      ),
    },
  ];
  const columnsElectricSystemParameters = [
    {
      title: "Время",
      dataIndex: "time",
      key: "time",
      render: (value: string) => {
        // Предположим, что `value` — это строка формата ISO, например, "2024-11-21T15:30:00Z"
        const time = new Date(value).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        
        return (
          <Tooltip title={`Время события: ${time}`}>
            <Tag icon={<ClockCircleOutlined />} color="processing">
              {time}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: "Расход энергии гидроусилителем руля (кВт)",
      dataIndex: "power_consumption_hydraulic",
      key: "power_consumption_hydraulic",
      render: (value:number) => (
        <Tooltip title={`Расход энергии: ${value} кВт`}>
          <Progress
            percent={value}
            status={value > 12 ? "exception" : "active"}
            strokeColor={value > 12 ? "red" : "green"}
          />
        </Tooltip>
      ),
    },
    {
      title: "Расход энергии воздушным компрессором (кВт)",
      dataIndex: "power_consumption_air_compressor",
      key: "power_consumption_air_compressor",
      render: (value:number) => (
        <Tooltip title={`Расход энергии: ${value} кВт`}>
          <Progress
            percent={value}
            status={value > 12 ? "exception" : "active"}
            strokeColor={value > 12 ? "red" : "green"}
          />
        </Tooltip>
      ),
    },
    {
      title: "Расход энергии DC-DC преобразователем (кВт)",
      dataIndex: "power_consumption_dcdc",
      key: "power_consumption_dcdc",
      render: (value:number) => (
        <Tooltip title={`Расход энергии: ${value} кВт`}>
          <Progress
            percent={value}
            status={value > 8 ? "exception" : "active"}
            strokeColor={value > 8 ? "red" : "green"}
          />
        </Tooltip>
      ),
    },
    {
      title: "Расход энергии двигателем (кВт)",
      dataIndex: "power_consumption_engine",
      key: "power_consumption_engine",
      render: (value:number) => (
        <Tooltip title={`Расход энергии: ${value} кВт`}>
          <Progress
            percent={value}
            status={value > 15 ? "exception" : "active"}
            strokeColor={value > 15 ? "red" : "green"}
          />
        </Tooltip>
      ),
    },
  ];
  const columnsBzpCommands = [
    {
      title: "Время",
      dataIndex: "time",
      key: "time",
      render: (value: string) => {
        // Предположим, что `value` — это строка формата ISO, например, "2024-11-21T15:30:00Z"
        const time = new Date(value).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        
        return (
          <Tooltip title={`Время события: ${time}`}>
            <Tag icon={<ClockCircleOutlined />} color="processing">
              {time}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: "Команда 1",
      dataIndex: "bzp_command_1",
      key: "bzp_command_1",
      render: (value:number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда 2",
      dataIndex: "bzp_command_2",
      key: "bzp_command_2",
      render: (value:number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда 3",
      dataIndex: "bzp_command_3",
      key: "bzp_command_3",
      render: (value:number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда 4",
      dataIndex: "bzp_command_4",
      key: "bzp_command_4",
      render: (value:number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда 5",
      dataIndex: "bzp_command_5",
      key: "bzp_command_5",
      render: (value:number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда 6",
      dataIndex: "bzp_command_6",
      key: "bzp_command_6",
      render: (value:number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда 7",
      dataIndex: "bzp_command_7",
      key: "bzp_command_7",
      render: (value:number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда 8",
      dataIndex: "bzp_command_8",
      key: "bzp_command_8",
      render: (value:number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда 9",
      dataIndex: "bzp_command_9",
      key: "bzp_command_9",
      render: (value:number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда 10",
      dataIndex: "bzp_command_10",
      key: "bzp_command_10",
      render: (value:number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
  ];
  // const  columnsBzpCommands = [
    // {
    //   title: "Время",
    //   dataIndex: "time",
    //   key: "time",
    //   render: (value: string) => {
    //     // Предположим, что `value` — это строка формата ISO, например, "2024-11-21T15:30:00Z"
    //     const time = new Date(value).toLocaleTimeString("ru-RU", {
    //       hour: "2-digit",
    //       minute: "2-digit",
    //       second: "2-digit",
    //     });
        
    //     return (
    //       <Tooltip title={`Время события: ${time}`}>
    //         <Tag icon={<ClockCircleOutlined />} color="processing">
    //           {time}
    //         </Tag>
    //       </Tooltip>
    //     );
    //   },
    // },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "bzp_command_1",
  //     key: "bzp_command_1",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "bzp_command_2",
  //     key: "bzp_command_2",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "bzp_command_3",
  //     key: "bzp_command_3",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "bzp_command_4",
  //     key: "bzp_command_4",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "bzp_command_5",
  //     key: "bzp_command_5",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "bzp_command_6",
  //     key: "bzp_command_6",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "bzp_command_7",
  //     key: "bzp_command_7",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "bzp_command_8",
  //     key: "bzp_command_8",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "bzp_command_9",
  //     key: "bzp_command_9",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "bzp_command_10",
  //     key: "bzp_command_10",
  //   }
  // ]
  // const columnsBrkOutputs = [
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "brk_output_1",
  //     key: "brk_output_1",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "brk_output_2",
  //     key: "brk_output_2",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "brk_output_3",
  //     key: "brk_output_3",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "brk_output_4",
  //     key: "brk_output_4",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "brk_output_5",
  //     key: "brk_output_5",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "brk_output_6",
  //     key: "brk_output_6",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "brk_output_7",
  //     key: "brk_output_7",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "brk_output_8",
  //     key: "brk_output_8",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "brk_output_9",
  //     key: "brk_output_9",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "brk_output_10",
  //     key: "brk_output_10",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "brk_output_11",
  //     key: "brk_output_11",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "brk_output_12",
  //     key: "brk_output_12",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "brk_output_13",
  //     key: "brk_output_13b"
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "brk_output_14",
  //     key: "brk_output_14",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "brk_output_15",
  //     key: "brk_output_15",
  //   },
  //   {
  //     title: "Состояние батареи",
  //     dataIndex: "brk_output_16",
  //     key: "brk_output_16",
  //   }
  // ]

  return (
    <Tabs 
    defaultActiveKey="Transport_Status"
    tabPosition="top"
    type="card"
    style={{
      width: "100%", // Общая ширина для Tabs
    }}
    tabBarStyle={{
      display: "flex", // Flex-контейнер для выравнивания табов
      justifyContent: "space-between", // Распределение табов по ширине
    }}
    // defaultActiveKey="Transport_Status" tabPosition="top" type="card"  style={{ width: "100%" }} // Растягиваем Tabs
    // tabBarStyle={{ display: "flex", justifyContent: "space-evenly" }}
    >
      <TabPane key="transport_lighting " tab="Освещение транспорта">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Table
              bordered
              pagination={false}
              columns={columnsTransportLighting}
              dataSource={transportLighting}
            />
          </Col>
        </Row>
      </TabPane>
      <TabPane key="transport_air_conditioning "
      //  tab="Система кондиционирования транспорта">
        tab={
      <div
        style={{
          flexGrow: 1, // Таб растягивается
          textAlign: "center", // Выравниваем текст в центре
          width: "100%", // Устанавливаем одинаковую ширину
        }}
      >
       Система кондиционирования транспорта
      </div>
    }>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Table
              bordered
              pagination={false}
              columns={columnsTransportAirConditioning}
              dataSource={transportAirConditioning}
            />
          </Col>
        </Row>
      </TabPane>
      <TabPane key="battery_parameters "
      //  tab="Параметры батареи">
          tab={
      <div
        style={{
          flexGrow: 1, // Таб растягивается
          textAlign: "center", // Выравниваем текст в центре
          width: "100%", // Устанавливаем одинаковую ширину
        }}
      >
      Параметры батареи
      </div>
    }>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Table
              bordered
              pagination={false}
              columns={columnsBatteryParameters}
              dataSource={batteryParameters}
            />
          </Col>
        </Row>
      </TabPane>
      <TabPane key="electric_system_parameters" 
      // tab="Параметры электрической системы">
               tab={
      <div
        style={{
          flexGrow: 1, // Таб растягивается
          textAlign: "center", // Выравниваем текст в центре
          width: "100%", // Устанавливаем одинаковую ширину
        }}
      >
     Параметры электрической системы
      </div>
    }>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Table
              bordered
              pagination={false}
              columns={columnsElectricSystemParameters}
              dataSource={electricSystemParameters}
            />
          </Col>
        </Row>
      </TabPane>
      <TabPane key="powertrain_system_parameters "
      //  tab="Параметры силовой установки">
      tab={
        <div
          style={{
            flexGrow: 1, // Таб растягивается
            textAlign: "center", // Выравниваем текст в центре
            width: "100%", // Устанавливаем одинаковую ширину
          }}
        >
     Параметры силовой установки
        </div>
      }>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Table
              bordered
              pagination={false}
              columns={columnsPowertrainSystemParameters}
              dataSource={powertrainSystemParameters}
            />
          </Col>
        </Row>
      </TabPane>
      <TabPane key="bzp_commands " 
      // tab="Команды блока защиты питания">
      tab={
        <div
          style={{
            flexGrow: 1, // Таб растягивается
            textAlign: "center", // Выравниваем текст в центре
            width: "100%", // Устанавливаем одинаковую ширину
          }}
        >
    Команды блока защиты питания
        </div>
      }>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Table
              bordered
              pagination={false}
              columns={columnsBzpCommands}
              dataSource={bzpCommands}
            />
          </Col>
        </Row>
      </TabPane>
      {/* <TabPane
        key="brk_outputs"
        tab="Выходы блока рулевой колонки "
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Table
              bordered
              pagination={false}
              columns={columnsBrkOutputs}
              dataSource={parameters}
            />
          </Col>
        </Row>
      </TabPane> */}
    </Tabs>
  );
};

export default ParametersTable;