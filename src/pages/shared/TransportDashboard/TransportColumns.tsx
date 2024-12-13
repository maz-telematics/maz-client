import {  Tag, Tooltip, Progress } from "antd";
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
  export const columnsBatteryParameters = [
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
      title: "Минимальная критическая температура батареи (°C)",
      dataIndex: "batteryMinTemp",
      key: "batteryMinTemp",
      render: (value: number) => (
        <Tooltip title={`Минимальная температура: ${value}°C`}>
          <Tag color={value < 10 ? "error" : "green"}>{value}°C</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Максимальная критическая температура батареи (°C)",
      dataIndex: "batteryMaxTemp",
      key: "batteryMaxTemp",
      render: (value: number) => (
        <Tooltip title={`Максимальная температура: ${value}°C`}>
          <Tag color={value > 35 ? "error" : "green"}>{value}°C</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Уровень заряда батареи (%)",
      dataIndex: "batterySoc",
      key: "batterySoc",
      render: (value: number) => (
        <Tooltip title={`Уровень заряда: ${value}%`}>
          <Progress percent={value} status={value < 20 ? "exception" : "active"} />
        </Tooltip>
      ),
    },
    {
      title: "Напряжение батареи (V)",
      dataIndex: "batteryVoltage",
      key: "batteryVoltage",
      render: (value: number) => (
        <Tooltip title={`Напряжение батареи: ${value} V`}>
          <Tag color={value < 45 ? "error" : "green"}>{value} V</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Состояние зарядки",
      dataIndex: "batteryCharging",
      key: "batteryCharging",
      render: (value: string) => (
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
  export const columnsElectricSystemParameters = [
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
      title: "Расход энергии гидроусилителем руля (кВт)",
      dataIndex: "powerConsumptionHydraulic",
      key: "powerConsumptionHydraulic",
      render: (value: number) => (
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
      dataIndex: "powerConsumptionAirCompressor",
      key: "powerConsumptionAirCompressor",
      render: (value: number) => (
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
      dataIndex: "powerConsumptionDcdc",
      key: "powerConsumptionDcdc",
      render: (value: number) => (
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
      dataIndex: "powerConsumptionEngine",
      key: "powerConsumptionEngine",
      render: (value: number) => (
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
  export const columnsBzpCommands = [
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
      title: " Клемма 15 ЦКБ К ЭБУ",
      dataIndex: "terminal15CcsToEcu",
      key: "terminal15CcsToEcu",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Включить питание кабины (Кл. 15)",
      dataIndex: "turnOnCabinPower",
      key: "turnOnCabinPower",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Включить питание фар",
      dataIndex: "turnOnHeadlightsPower",
      key: "turnOnHeadlightsPower",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Включить питание задних фонарей",
      dataIndex: "turnOnRearLightsPower",
      key: "turnOnRearLightsPower",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Включить питание осушителя воздуха",
      dataIndex: "turnOnAirDryerPower",
      key: "turnOnAirDryerPower",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Включить питание жидкостного подогревателя",
      dataIndex: "turnOnLiquidHeaterPower",
      key: "turnOnLiquidHeaterPower",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Включить подогрев топливных фильтров грубой очистки",
      dataIndex: "turnOnFuelFilterPreheaterCoarseFilter",
      key: "turnOnFuelFilterPreheaterCoarseFilter",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Включить подогрев топливных фильтров тонкой очистки",
      dataIndex: "turnOnFuelFilterPreheaterFineFilter",
      key: "turnOnFuelFilterPreheaterFineFilter",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Включить питание прицепа",
      dataIndex: "turnOnTrailerPower",
      key: "turnOnTrailerPower",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Включить питание прицепа (ABC)",
      dataIndex: "turnOnTrailerPowerAbs",
      key: "turnOnTrailerPowerAbs",
      render: (value: number) => (
        <Tooltip title={`Состояние: ${value === 1 ? "Активно" : "Неактивно"}`}>
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Активно" : "Неактивно"}
          </Tag>
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