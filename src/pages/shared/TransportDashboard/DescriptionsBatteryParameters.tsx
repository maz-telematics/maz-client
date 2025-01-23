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
  battery_activation_status: string;
  min_battery_cell_voltage:number;
  max_battery_cell_voltage:number;
  battery_charge_error_counter:number;
  successful_battery_charging_counter:number;
  charging_low_voltage_batteries:string;
  charging_error_battery_not_enabled:string;
  charging_error_dcdc_not_enabled:string;
  charging_error_battery_not_disabled:string;
  charging_error_dcdc_not_disabled:string;
  error_counter_battery_not_enabled:number;
  error_counter_dcdc_not_enabled:number;
  error_counter_battery_not_disabled:number;
  error_counter_dcdc_not_disabled:number;
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
  const columns = [
    {
      title: "Параметры",
      dataIndex: "parameter",
      key: "parameter",
      fixed: "left" as const,
      render: (text: string) => <b>{text}</b>,
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
                  : "Батарея не заряжается"
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
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  Не заряжается
                </Tag>
              )}
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
              title={`Состояние активации: ${parameter.battery_activation_status === "on" ? "Включена" : "Выключена"}`}
            >
              {parameter.battery_activation_status === "on" ? (
                <Tag color="success">Включена</Tag>
              ) : (
                <Tag color="error">Выключена</Tag>
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
            <Tooltip title={`Минимальное напряжение ячейки: ${parameter.min_battery_cell_voltage ? parameter.min_battery_cell_voltage : "—"} V`}>
              <Tag color={parameter.min_battery_cell_voltage && parameter.min_battery_cell_voltage < 3.0 ? "error" : "green"}>
                {parameter.min_battery_cell_voltage ? `${parameter.min_battery_cell_voltage} V` : "— V"}
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
            <Tooltip title={`Максимальное напряжение ячейки: ${parameter.max_battery_cell_voltage ? parameter.max_battery_cell_voltage : "—"} V`}>
              <Tag color={parameter.max_battery_cell_voltage && parameter.max_battery_cell_voltage > 4.2 ? "error" : "green"}>
                {parameter.max_battery_cell_voltage ? `${parameter.max_battery_cell_voltage} V` : "— V"}
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
            <Tooltip title={`Ошибки зарядки батареи: ${parameter.battery_charge_error_counter ? parameter.battery_charge_error_counter : "—"}`}>
              <Tag color={parameter.battery_charge_error_counter && parameter.battery_charge_error_counter > 0 ? "error" : "green"}>
                {parameter.battery_charge_error_counter ? `${parameter.battery_charge_error_counter}` : "—"}
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
            <Tooltip title={`Успешные зарядки батареи: ${parameter.successful_battery_charging_counter ? parameter.successful_battery_charging_counter : "—"}`}>
              <Tag color={parameter.successful_battery_charging_counter && parameter.successful_battery_charging_counter > 0 ? "success" : "green"}>
                {parameter.successful_battery_charging_counter ? `${parameter.successful_battery_charging_counter}` : "—"}
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
            <Tooltip title={`Зарядка низковольтных батарей: ${parameter.charging_low_voltage_batteries === "on" ? "Включена" : "Отключена"}`}>
              {parameter.charging_low_voltage_batteries === "on" ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Включена
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  Отключена
                </Tag>
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
              {parameter.charging_error_battery_not_enabled === "on" && (
                <Tooltip title="Ошибка: Батарея не включена">
                  <Tag icon={<CloseCircleOutlined />} color="error">
                    Батарея не включена
                  </Tag>
                </Tooltip>
              )}
              {parameter.charging_error_dcdc_not_enabled === "on" && (
                <Tooltip title="Ошибка: DCDC не включен">
                  <Tag icon={<CloseCircleOutlined />} color="error">
                    DCDC не включен
                  </Tag>
                </Tooltip>
              )}
              {parameter.charging_error_battery_not_disabled === "on" && (
                <Tooltip title="Ошибка: Батарея не отключена">
                  <Tag icon={<CloseCircleOutlined />} color="error">
                    Батарея не отключена
                  </Tag>
                </Tooltip>
              )}
              {parameter.charging_error_dcdc_not_disabled === "on" && (
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
            <Tooltip title={`Счетчик ошибок: Батарея не включена - ${parameter.error_counter_battery_not_enabled}`}>
              <Tag color="error">
                {parameter.error_counter_battery_not_enabled !== undefined ? parameter.error_counter_battery_not_enabled : "0"}
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
            <Tooltip title={`Счетчик ошибок: DCDC не включен - ${parameter.error_counter_dcdc_not_enabled}`}>
              <Tag color="error">
                {parameter.error_counter_dcdc_not_enabled !== undefined ? parameter.error_counter_dcdc_not_enabled : "0"}
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
            <Tooltip title={`Счетчик ошибок: Батарея не отключена - ${parameter.error_counter_battery_not_disabled}`}>
              <Tag color="error">
                {parameter.error_counter_battery_not_disabled !== undefined ? parameter.error_counter_battery_not_disabled : "0"}
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
            <Tooltip title={`Счетчик ошибок: DCDC не отключен - ${parameter.error_counter_dcdc_not_disabled}`}>
              <Tag color="error">
                {parameter.error_counter_dcdc_not_disabled !== undefined ? parameter.error_counter_dcdc_not_disabled : "0"}
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
