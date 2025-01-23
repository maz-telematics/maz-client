import {  Tag, Tooltip, Progress, Descriptions } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

export const columnsTransportLighting = [
    {
      title: "Время",
      dataIndex: "time",
      key: "time",
      render: (value: string) => {
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
      dataIndex: "daytimeRunningLights",
      key: "daytimeRunningLights",
      render: (value: string) => (
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
      dataIndex: "lowBeam",
      key: "lowBeam",
      render: (value: string) => (
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
      dataIndex: "highBeam",
      key: "highBeam",
      render: (value: string) => (
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
      dataIndex: "frontLogLights",
      key: "frontLogLights",
      render: (value: string) => (
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
      dataIndex: "rightTurnSignal",
      key: "rightTurnSignal",
      render: (value: string) => (
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
      dataIndex: "leftTurnSignal",
      key: "leftTurnSignal",
      render: (value: string) => (
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
      dataIndex: "sideMakerLights",
      key: "sideMakerLights",
      render: (value: string) => (
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
      dataIndex: "rearFogLights",
      key: "rearFogLights",
      render: (value: string) => (
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
      dataIndex: "reverseLights",
      key: "reverseLights",
      render: (value: string) => (
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
      dataIndex: "rightBrakeLights",
      key: "rightBrakeLights",
      render: (value: string) => (
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
      dataIndex: "leftBrakeLights",
      key: "leftBrakeLights",
      render: (value: string) => (
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
  export const columnsTransportAirConditioning = [
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
      dataIndex: "acOn",
      key: "acOn",
      render: (value: string) => (
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
      dataIndex: "frostSensor",
      key: "frostSensor",
      render: (value: string) => (
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
      dataIndex: "pressureSensorOn",
      key: "pressureSensorOn",
      render: (value: string) => (
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
      dataIndex: "outsideAirTempSensor",
      key: "outsideAirTempSensor",
      render: (value: number) => (
        <Tooltip title={`Температура: ${value}°C`}>
          <Tag color={value < 0 ? "blue" : value < 25 ? "green" : "red"}>
            {value}°C
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Положение воздушной заслонки",
      dataIndex: "airDamperPosition",
      key: "airDamperPosition",
      render: (value: string) => (
        <Tooltip title={value}>
          <Tag color={value === "Закрыта" ? "error" : "success"}>{value}</Tag>
        </Tooltip>
      ),
    },
  ];

  export const columnsPowertrainSystemParameters = [
    {
      title: "Время",
      dataIndex: "time",
      key: "time",
      render: (value: string) => {
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
      dataIndex: "throttlePosition",
      key: "throttlePosition",
      render: (value: number) => (
        <Tooltip title={`Положение дросселя: ${value}%`}>
          <Tag color="blue">{value}%</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Момент двигателя (Nm)",
      dataIndex: "engineTorque",
      key: "engineTorque",
      render: (value: number) => (
        <Tooltip title={`Момент двигателя: ${value} Nm`}>
          <Tag color="green">{value} Nm</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Обороты двигателя (RPM)",
      dataIndex: "engineRpm",
      key: "engineRpm",
      render: (value: number) => (
        <Tooltip title={`Обороты двигателя: ${value} RPM`}>
          <Tag color="purple">{value} RPM</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Скорость на выходе КПП (км/ч)",
      dataIndex: "gearboxOutputSpeed",
      key: "gearboxOutputSpeed",
      render: (value: number) => (
        <Tooltip title={`Скорость КПП: ${value} км/ч`}>
          <Tag color="orange">{value} км/ч</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Состояние трансмиссии",
      dataIndex: "transmissionStatus",
      key: "transmissionStatus",
      render: (value: string) => (
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
      dataIndex: "vehicleOn",
      key: "vehicleOn",
      render: (value: string) => (
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
      dataIndex: "dcdcOn",
      key: "dcdcOn",
      render: (value: string) => (
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
      dataIndex: "batteryOn",
      key: "batteryOn",
      render: (value: string) => (
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
      dataIndex: "hydraulicSensorLevel",
      key: "hydraulicSensorLevel",
      render: (value: number) => (
        <Tooltip title={`Уровень гидравлики: ${value}%`}>
          <Tag color="blue">{value}%</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Уровень охлаждающей жидкости (%)",
      dataIndex: "coolantSensorLevel",
      key: "coolantSensorLevel",
      render: (value: number) => (
        <Tooltip title={`Уровень охлаждающей жидкости: ${value}%`}>
          <Tag color="cyan">{value}%</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Состояние гидроусилителя руля",
      dataIndex: "powerSteeringOn",
      key: "powerSteeringOn",
      render: (value: string) => (
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
   
  export const columnsDbkOutputs = [
    {
      title: "Время",
      dataIndex: "time",
      key: "time",
      render: (value: string) => {
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
      title: "Команда габаритных огней",
      dataIndex: "runningLightCommand",
      key: "runningLightCommand ",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда альтернативного пучка фар",
      dataIndex: "alternateBeamHeadLightCommand",
      key: "alternateBeamHeadLightCommand ",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: " Команда ближнего света фар",
      dataIndex: "lowBeamHeadLightCommand",
      key: "lowBeamHeadLightCommand ",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда дальнего света фар",
      dataIndex: "highBeamHeadLightCommand",
      key: "highBeamHeadLightCommand ",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда передних противотуманных фар трактора",
      dataIndex: "tractorFrontFogLightsCommand",
      key: "tractorFrontFogLightsCommand ",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда вращающегося маяка",
      dataIndex: "rotatingBeaconLightCommand",
      key: "rotatingBeaconLightCommand ",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда правого указателя поворота",
      dataIndex: "rightTurnSignalLightsCommand",
      key: "rightTurnSignalLightsCommand ",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда левого указателя поворота",
      dataIndex: "leftTurnSignalLightsCommand",
      key: "leftTurnSignalLightsCommand ",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда центрального стоп-сигнала",
      dataIndex: "centerStopLightCommand",
      key: "centerStopLightCommand ",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда правого стоп-сигнала",
      dataIndex: "rightStopLightCommand",
      key: "rightStopLightCommand ",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },

    {
      title: "Команда левого стоп-сигнала",
      dataIndex: "leftStopLightCommand",
      key: "leftStopLightCommand  ",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда огня для обозначения габаритов оборудования",
      dataIndex: "implementClearanceLightCommand",
      key: "implementClearanceLightCommand",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда боковых низко размещенных рабочих огней",
      dataIndex: "tractorSideLowMountedWorkLightsCommand",
      key: "tractorSideLowMountedWorkLightsCommand",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда рабочего освещения, направленного вправо",
      dataIndex: "implementRightFacingWorkLightCommand",
      key: "implementRightFacingWorkLightCommand",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Команда рабочего освещения, направленного влево",
      dataIndex: "implementLeftFacingWorkLightCommand",
      key: "implementLeftFacingWorkLightCommand",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
  ];

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
  BarChart,
  Bar,
  LabelList,
  Dot
} from "recharts";
import { Card, Tabs } from "antd";
import { BatteryParameters } from "../../../types/carTrackingTypes";
const { TabPane } = Tabs;

interface BatteryParametersChartProps {
  processedParameters: BatteryParameters[];
}

const BatteryParametersChart: React.FC<BatteryParametersChartProps> = ({ processedParameters }) => {
  console.log('props', processedParameters);

  const prepareData = (key: keyof BatteryParameters) => {
    return processedParameters.map((parameter) => ({
      time: new Date(parameter.time),
      value: parameter[key],
    }));
  };


  const prepareChargingData = () =>
    processedParameters.map((parameter) => {
      let statusValue =1;
      if (String(parameter.batteryCharging) === "yes") {
        statusValue = 2; // Заряжается
      } else if (String(parameter.batteryCharging) === "false") {
        statusValue = 1; // Не заряжается
      } else if (String(parameter.batteryCharging) === "done") {
        statusValue = 4; // Зарядка завершена
      }
      return {
        time: new Date(parameter.time),
        statusValue, // Числовое значение для высоты столбика
        status: parameter.batteryCharging === "false"
          ? "Не заряжается"
          : parameter.batteryCharging === "yes"
          ? "Заряжается"
          : "Зарядка завершена",
      };
    });

  return (
    <Card title="Графики параметров батареи">
      <Tabs type="card">
        <TabPane tab="Температура батареи" key="temperature">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prepareData("batteryMinTemp")}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[-50, 125]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Минимальная температура"
                dot={{ r: 5 }}
              />
              {/* Выделение аномальных значений */}
              <ReferenceArea x1="2024-12-12T00:00:00Z" x2="2024-12-15T00:00:00Z" stroke="red" fill="red" fillOpacity={0.3} />
            </LineChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prepareData("batteryMaxTemp")}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[-50, 125]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
                name="Максимальная температура"
                dot={{ r: 5 }}
              />
              {/* Выделение аномальных значений */}
              <ReferenceArea x1="2024-12-12T00:00:00Z" x2="2024-12-15T00:00:00Z" stroke="red" fill="red" fillOpacity={0.3} />
            </LineChart>
          </ResponsiveContainer>
        </TabPane>

        <TabPane tab="Уровень заряда" key="soc">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prepareData("batterySoc")}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Уровень заряда"
                dot={{ r: 5 }}
              />
              <ReferenceLine y={20} label="Низкий" stroke="red" strokeDasharray="3 3" />
              <ReferenceLine y={80} label="Высокий" stroke="green" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </TabPane>

        <TabPane tab="Напряжение батареи" key="voltage">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prepareData("batteryVoltage")}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 15]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
                name="Напряжение"
                dot={{ r: 5 }}
              />
              <ReferenceArea x1="2024-12-12T00:00:00Z" x2="2024-12-15T00:00:00Z" stroke="red" fill="red" fillOpacity={0.3} />
            </LineChart>
          </ResponsiveContainer>
        </TabPane>

        <TabPane tab="Состояние зарядки" key="charging">
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={prepareChargingData()}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="time"
        tickFormatter={(time) => new Date(time).toLocaleTimeString()}
      />
      <YAxis
        type="number"
        domain={[0, 2]} // Диапазон от 0 до 2
        label={{ value: "Состояние", angle: -90, position: "insideLeft" }}
        tickFormatter={(value) => {
          switch (value) {
            case 0:
              return "Не заряжается";
            case 1:
              return "Заряжается";
            case 2:
              return "Зарядка завершена";
            default:
              return "";
          }
        }}
      />
      <Tooltip />
      <Legend />
      <Bar dataKey="statusValue" fill="#4e73df"> {/* Синий цвет столбиков */}
        <LabelList dataKey="status" position="top" />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</TabPane>
      </Tabs>
    </Card>
  );
};

export default BatteryParametersChart;

