import React from "react";
import { Table, Tooltip, Tag } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

interface PowertrainSystemParameter {
  time:string;
  engineTorque?: number; // Крутящий момент двигателя (Нм)
  engineRpm?: number; // Частота вращения двигателя (об/мин)
  transmissionStatus?: string; // Статус трансмиссии (например, "ON" или "OFF")
  dcdcOn?: string; // Статус DC-DC преобразователя (например, "ON" или "OFF")
  hydraulicSensorLevel?: string; // Уровень датчика гидравлики (например, "Low" или "High")
  coolantSensorLevel?: string; // Уровень датчика охлаждающей жидкости (например, "Low" или "High")
  powerSteeringOn?: string; // Статус работы рулевого управления (например, "ON" или "OFF")
}


interface DescriptionsPowertrainSystemParametersProps {
  data: PowertrainSystemParameter[];
}

const DescriptionsPowertrainSystemParameters: React.FC<DescriptionsPowertrainSystemParametersProps> = ({ data }) => {
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
  // Определяем колонки таблицы
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

  const tableData = [
    {
      key: "1",
      parameter: "Крутящий момент двигателя (Нм)",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Крутящий момент двигателя: ${parameter.engineTorque !== undefined ? parameter.engineTorque : ''} Нм`}>
              <Tag color={parameter.engineTorque !== undefined && parameter.engineTorque > 1000 ? "error" : "green"}>
                {parameter.engineTorque !== undefined ? `${parameter.engineTorque} Нм` : "Нм"}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },    
    {
      key: "2",
      parameter: "Частота вращения двигателя (об/мин)",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Частота вращения двигателя: ${parameter.engineRpm !== undefined ? parameter.engineRpm : ''} об/мин`}>
              <Tag color={parameter.engineRpm !== undefined && parameter.engineRpm > 5000 ? "error" : "green"}>
                {parameter.engineRpm !== undefined ? `${parameter.engineRpm} об/мин` : "об/мин"}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },    
    {
      key: "3",
      parameter: "Статус трансмиссии",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Статус трансмиссии: ${parameter.transmissionStatus || 'неизвестно'}`}>
              <Tag color={
                parameter.transmissionStatus === "Neutral (N)" ? "blue" :
                parameter.transmissionStatus === "Reverse (R)" ? "error" :
                (["Drive 1 (D1)", "Drive 2 (D2)", "Drive 3 (D3)", "Drive 4 (D4)", "Drive 5 (D5)"].includes(parameter.transmissionStatus || '') ? "green" : "default")
              }>
                {parameter.transmissionStatus || "неизвестно"}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },    
    {
      key: "4",
      parameter: "Статус DC-DC",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Статус DC-DC: ${parameter.dcdcOn}`}>
              <Tag color={
                parameter.dcdcOn === "ready" ? "blue" :
                parameter.dcdcOn === "started" ? "green" :
                parameter.dcdcOn === "stopped" ? "red" :
                parameter.dcdcOn === "error" ? "error" :
                "default"
              }>
                {
                  parameter.dcdcOn === "ready" ? "Готов" :
                  parameter.dcdcOn === "started" ? "Запущен" :
                  parameter.dcdcOn === "stopped" ? "Остановлен" :
                  parameter.dcdcOn === "error" ? "Ошибка" :
                  "неизвестно"
                }
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },    
    {
      key: "5",
      parameter: "Уровень датчика ГУР",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Уровень гидравлического датчика: ${parameter.hydraulicSensorLevel}`}>
              <Tag color={
                parameter.hydraulicSensorLevel === "oil_present" ? "success" :
                parameter.hydraulicSensorLevel === "no_oil" ? "error" :
                "default"
              }>
                {
                  parameter.hydraulicSensorLevel === "oil_present" ? "Масло присутствует" :
                  parameter.hydraulicSensorLevel === "no_oil" ? "Нет масла" :
                  "неизвестно"
                }
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },    
    {
      key: "6",
      parameter: "Уровень датчика охлаждающей жидкости",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Уровень датчика охлаждающей жидкости: ${parameter.coolantSensorLevel}`}>
              <Tag color={
                parameter.coolantSensorLevel === "liquid_present" ? "success" :
                parameter.coolantSensorLevel === "no_liquid" ? "error" :
                "default"
              }>
                {
                  parameter.coolantSensorLevel === "liquid_present" ? "Жидкость присутствует" :
                  parameter.coolantSensorLevel === "no_liquid" ? "Нет жидкости" :
                  "неизвестно"
                }
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },    
    {
      key: "7",
      parameter: "Состояние гидроусилителя руля",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Статус рулевого управления: ${parameter.powerSteeringOn}`}>
              <Tag color={
                parameter.powerSteeringOn === "running" ? "success" :
                parameter.powerSteeringOn === "stopped" ? "error" :
                parameter.powerSteeringOn === "error" ? "warning" :
                "default"
              }>
                {
                  parameter.powerSteeringOn === "running" ? "Работает" :
                  parameter.powerSteeringOn === "stopped" ? "Остановлен" :
                  parameter.powerSteeringOn === "error" ? "Ошибка" :
                  "неизвестно"
                }
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    }
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

export default DescriptionsPowertrainSystemParameters;
