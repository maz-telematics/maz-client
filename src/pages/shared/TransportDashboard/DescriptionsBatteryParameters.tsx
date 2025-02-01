import React from "react";
import { Row, Col, Table, Tag, Tooltip, Progress } from "antd";
import { ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

// Тип данных для параметров батареи
interface BatteryParameter {
  time: string;
  batteryMinTemp: number;
  batteryMaxTemp: number;
  batterySoc: number;
  batteryVoltage: number;
  batteryCharging: string;
  batteryActivationStatus: string;
  minBatteryCellVoltage:number;
  maxBatteryCellVoltage:number;
  batteryChargeErrorCounter:number;
  successfulBatteryChargingCounter:number;
  chargingLowVoltageBatteries:string;
  chargingErrorBatteryNotEnabled:string;
  chargingErrorDcDcNotEnabled:string;
  chargingErrorBatteryNotDisabled:string;
  chargingErrorDcDcNotDisabled:string;
  errorCounterBatteryNotEnabled:number;
  errorCounterDcDcNotEnabled:number;
  errorCounterBatteryNotDisabled:number;
  errorCounterDcDcNotDisabled:number;
}

interface DescriptionsBatteryParametersProps {
  data: BatteryParameter[];
}

const DescriptionsBatteryParameters: React.FC<DescriptionsBatteryParametersProps> = ({ data }) => {
  // Получаем список уникальных временных меток
  const sortedData = [...data].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  // Получаем список уникальных временных меток
  const times = sortedData.map((parameter) =>
    new Date(parameter.time).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );


  // Создаем колонки для таблицы
    const isMobile = window.innerWidth < 768;
    const columns= isMobile
  ? [
      {
        title: "Параметр",
        dataIndex: "parameter",
        key: "parameter",
        align: "left" as const,
        render: (text: string) => (
          <div style={{ textAlign: "left" }}>{text}</div>
        ),
        onCell: () => ({ style: { textAlign: "left" } }) as React.TdHTMLAttributes<HTMLTableCellElement>,
      },
      ...times.map((time, index) => ({
        title: (
          <Tag icon={<ClockCircleOutlined />} color="processing">
            {time}
          </Tag>
        ),
        dataIndex: `time${index}`,
        key: `time${index}`,
        align: "center" as const,
      })),
    ]
  : [
      {
        title: "Параметры",
        dataIndex: "parameter",
        key: "parameter",
        fixed: "left" as const,
        render: (text: string) => (
          <b style={{ textAlign: "left", display: "block" }}>{text}</b>
        ),
        onCell: () => ({ style: { textAlign: "left" } }) as React.TdHTMLAttributes<HTMLTableCellElement>,
      },
      ...times.map((time, index) => ({
        title: (
          <Tag icon={<ClockCircleOutlined />} color="processing">
            {time}
          </Tag>
        ),
        dataIndex: `time${index}`,
        key: `time${index}`,
        align: "center" as const,
      })),
    ];


  // Создаем данные для таблицы
  const tableData = [
    {
      key: "1",
      parameter: "Минимальная температура (°C)",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Минимальная температура: ${parameter.batteryMinTemp !== undefined ? parameter.batteryMinTemp : "Неизвестно"}°C`}>
              <Tag 
                color={parameter.batteryMinTemp !== undefined && parameter.batteryMinTemp < 10 ? "error" : "green"}
              >
                {parameter.batteryMinTemp !== undefined ? `${parameter.batteryMinTemp}°C` : "°C"}
              </Tag>
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "2",
      parameter: "Максимальная температура (°C)",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Максимальная температура: ${parameter.batteryMaxTemp !== undefined ? parameter.batteryMaxTemp : "Неизвестно"}°C`}>
              <Tag 
                color={parameter.batteryMaxTemp !== undefined && parameter.batteryMaxTemp > 35 ? "error" : "green"}
              >
                {parameter.batteryMaxTemp !== undefined ? `${parameter.batteryMaxTemp}°C` : "°C"}
              </Tag>
            </Tooltip>
          ),
        }),
        {}
      ),
    },    
    {
      key: "3",
      parameter: "Уровень заряда (%)",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Уровень заряда: ${parameter.batterySoc !== undefined ? parameter.batterySoc : "Неизвестно"}%`}>
              <Progress
                percent={parameter.batterySoc !== undefined ? Math.min(Math.max(parameter.batterySoc, 0), 100) : 0}
                status={parameter.batterySoc !== undefined && parameter.batterySoc < 20 ? "exception" : "active"}
                width={80}
              />
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "4",
      parameter: "Напряжение (V)",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Напряжение батареи: ${parameter.batteryVoltage !== undefined ? parameter.batteryVoltage : ""} V`}>
              <Tag color={parameter.batteryVoltage !== undefined && parameter.batteryVoltage < 45 ? "error" : "green"}>
                {parameter.batteryVoltage !== undefined ? `${parameter.batteryVoltage} V` : "V"}
              </Tag>
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "5",
      parameter: "Состояние зарядки",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={
                parameter.batteryCharging === "charging"
                  ? "Батарея заряжается"
                  : parameter.batteryCharging === "completed"
                  ? "Зарядка завершена"
                  : parameter.batteryCharging === "not charging"
                  ? "Батарея не заряжается"
                  : "" 
              }
            >
              {parameter.batteryCharging === "charging" ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Заряжается
                </Tag>
              ) : parameter.batteryCharging === "completed" ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Зарядка завершена
                </Tag>
              ) : parameter.batteryCharging === "not charging" ? (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  Не заряжается
                </Tag>
              ) : null} 
            </Tooltip>
          ),
        }),
      ),
    },    
    {
      key: "6",
      parameter: "Состояние активации батареи",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={`Состояние активации: ${
                parameter.batteryActivationStatus === "on"
                  ? "Включена"
                  : parameter.batteryActivationStatus === "off"
                  ? "Выключена"
                  : ""
              }`}
            >
              {parameter.batteryActivationStatus === "on" ? (
                <Tag color="success">Включена</Tag>
              ) : parameter.batteryActivationStatus === "off" ? (
                <Tag color="error">Выключена</Tag>
              ) : (
                <Tag color="default"> </Tag> 
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "7",
      parameter: "Минимальное напряжение ячейки батареи",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Минимальное напряжение ячейки: ${parameter.minBatteryCellVoltage ? parameter.minBatteryCellVoltage : "—"} V`}>
              <Tag color={parameter.minBatteryCellVoltage && parameter.minBatteryCellVoltage < 3.0 ? "error" : "green"}>
                {parameter.minBatteryCellVoltage ? `${parameter.minBatteryCellVoltage} V` : "— V"}
              </Tag>
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "8",
      parameter: "Максимальное напряжение ячейки батареи",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Максимальное напряжение ячейки: ${parameter.maxBatteryCellVoltage ? parameter.maxBatteryCellVoltage : "—"} V`}>
              <Tag color={parameter.maxBatteryCellVoltage && parameter.maxBatteryCellVoltage > 4.2 ? "error" : "green"}>
                {parameter.maxBatteryCellVoltage ? `${parameter.maxBatteryCellVoltage} V` : "— V"}
              </Tag>
            </Tooltip>
          ),
        }),
        {}
      ),
    },   
    {
      key: "9",
      parameter: "Счетчик ошибок зарядки батареи",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Ошибки зарядки батареи: ${parameter.batteryChargeErrorCounter ? parameter.batteryChargeErrorCounter : "—"}`}>
              <Tag color={parameter.batteryChargeErrorCounter && parameter.batteryChargeErrorCounter > 0 ? "error" : "green"}>
                {parameter.batteryChargeErrorCounter ? `${parameter.batteryChargeErrorCounter}` : "—"}
              </Tag>
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "10",
      parameter: "Счетчик успешных зарядок батареи",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Успешные зарядки батареи: ${parameter.successfulBatteryChargingCounter ? parameter.successfulBatteryChargingCounter : "—"}`}>
              <Tag color={parameter.successfulBatteryChargingCounter && parameter.successfulBatteryChargingCounter > 0 ? "success" : "green"}>
                {parameter.successfulBatteryChargingCounter ? `${parameter.successfulBatteryChargingCounter}` : "—"}
              </Tag>
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "11",
      parameter: "Зарядка низковольтных батарей",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={`Зарядка низковольтных батарей: ${
                parameter.chargingLowVoltageBatteries === "on"
                  ? "Включена"
                  : parameter.chargingLowVoltageBatteries === "off"
                  ? "Отключена"
                  : "" 
              }`}
            >
              {parameter.chargingLowVoltageBatteries === "on" ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Включена
                </Tag>
              ) : parameter.chargingLowVoltageBatteries === "off" ? (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  Отключена
                </Tag>
              ) : (
                <Tag color="default"> </Tag> 
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },    
    {
      key: "12",
      parameter: "Ошибка зарядки батарей",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <div>
              {parameter.chargingErrorBatteryNotEnabled === "on" && (
                <Tooltip title="Ошибка: Батарея не включена">
                  <Tag icon={<CloseCircleOutlined />} color="error">
                    Батарея не включена
                  </Tag>
                </Tooltip>
              )}
              {parameter.chargingErrorDcDcNotEnabled === "on" && (
                <Tooltip title="Ошибка: DCDC не включен">
                  <Tag icon={<CloseCircleOutlined />} color="error">
                    DCDC не включен
                  </Tag>
                </Tooltip>
              )}
              {parameter.chargingErrorBatteryNotDisabled === "on" && (
                <Tooltip title="Ошибка: Батарея не отключена">
                  <Tag icon={<CloseCircleOutlined />} color="error">
                    Батарея не отключена
                  </Tag>
                </Tooltip>
              )}
              {parameter.chargingErrorDcDcNotDisabled === "on" && (
                <Tooltip title="Ошибка: DCDC не отключен">
                  <Tag icon={<CloseCircleOutlined />} color="error">
                    DCDC не отключен
                  </Tag>
                </Tooltip>
              )}
            </div>
          ),
        }),
      ),
    },
    {
      key: "13",
      parameter: "Ошибка зарядки: Батарея не включена",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Счетчик ошибок: Батарея не включена - ${parameter.errorCounterBatteryNotEnabled}`}>
              <Tag color="error">
                {parameter.errorCounterBatteryNotEnabled !== undefined ? parameter.errorCounterBatteryNotEnabled : "0"}
              </Tag>
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    
    {
      key: "14",
      parameter: "Ошибка зарядки: DCDC не включен",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Счетчик ошибок: DCDC не включен - ${parameter.errorCounterDcDcNotEnabled}`}>
              <Tag color="error">
                {parameter.errorCounterDcDcNotEnabled !== undefined ? parameter.errorCounterDcDcNotEnabled : "0"}
              </Tag>
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    
    {
      key: "15",
      parameter: "Ошибка зарядки: Батарея не отключена",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Счетчик ошибок: Батарея не отключена - ${parameter.errorCounterBatteryNotDisabled}`}>
              <Tag color="error">
                {parameter.errorCounterBatteryNotDisabled !== undefined ? parameter.errorCounterBatteryNotDisabled : "0"}
              </Tag>
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    
    {
      key: "16",
      parameter: "Ошибка зарядки: DCDC не отключен",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Счетчик ошибок: DCDC не отключен - ${parameter.errorCounterDcDcNotDisabled}`}>
              <Tag color="error">
                {parameter.errorCounterDcDcNotDisabled !== undefined ? parameter.errorCounterDcDcNotDisabled : "0"}
              </Tag>
            </Tooltip>
          ),
        }),
        {}
      ),
    },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        bordered
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default DescriptionsBatteryParameters;
