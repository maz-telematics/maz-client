import React from "react";
import { Table, Tooltip, Tag, Progress } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

// Тип данных для параметров электрической системы
interface ElectricSystemParameter {
  gurPowerConsumption: string;
  enablingTransportTerminal15: string;
  mainPowerOnRelay2Status: string;
  mainPowerOnRelay1Status: string;
  time: string;
  powerConsumptionHydraulic: number;
  powerConsumptionAirCompressor: number;
  powerConsumptionDcdc: number;
  powerConsumptionEngine: number;
}

interface DescriptionsElectricSystemParametersProps {
  data: ElectricSystemParameter[];
}

const DescriptionsElectricSystemParameters: React.FC<DescriptionsElectricSystemParametersProps> = ({
  data,
}) => {
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

  // Подготавливаем данные для таблицы
  const tableData = [
    {
      key: "1",
      parameter: "Расход энергии гидроусилителем руля (кВт)",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={`Расход энергии гидроусилителем руля: ${parameter.powerConsumptionHydraulic !== undefined ? parameter.powerConsumptionHydraulic : ''} кВт`}
            >
              <Tag color={parameter.powerConsumptionHydraulic && parameter.powerConsumptionHydraulic > 12 ? "error" : "green"}>
                {parameter.powerConsumptionHydraulic !== undefined ? `${parameter.powerConsumptionHydraulic} кВт` : "кВт"}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "2",
      parameter: "Расход энергии воздушным компрессором (кВт)",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={`Расход энергии воздушным компрессором: ${parameter.powerConsumptionAirCompressor !== undefined ? parameter.powerConsumptionAirCompressor : ''} кВт`}
            >
              <Tag color={parameter.powerConsumptionAirCompressor && parameter.powerConsumptionAirCompressor > 12 ? "error" : "green"}>
                {parameter.powerConsumptionAirCompressor !== undefined ? `${parameter.powerConsumptionAirCompressor} кВт` : "кВт"}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },    
    {
      key: "3",
      parameter: "Расход энергии DC-DC преобразователем (кВт)",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={`Расход энергии DC-DC преобразователем: ${parameter.powerConsumptionDcdc !== undefined ? parameter.powerConsumptionDcdc : ''} кВт`}
            >
              <Tag color={parameter.powerConsumptionDcdc && parameter.powerConsumptionDcdc > 8 ? "error" : "green"}>
                {parameter.powerConsumptionDcdc !== undefined ? `${parameter.powerConsumptionDcdc} кВт` : "кВт"}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "4",
      parameter: "Расход энергии двигателем (кВт)",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Расход энергии двигателем: ${parameter.powerConsumptionEngine || 'неизвестно'} кВт`}>
              <Tag color={parameter.powerConsumptionEngine && parameter.powerConsumptionEngine > 15 ? "error" : "green"}>
                {parameter.powerConsumptionEngine !== undefined ? `${parameter.powerConsumptionEngine} кВт` : "неизвестно"}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "5",
      parameter: "Состояние реле питания 1",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние реле питания 1: ${parameter.mainPowerOnRelay1Status || 'неизвестно'}`}>
              <Tag color={parameter.mainPowerOnRelay1Status === "on" ? "success" : "error"}>
                {parameter.mainPowerOnRelay1Status || "неизвестно"}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "6",
      parameter: "Состояние реле питания 2",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние реле питания 2: ${parameter.mainPowerOnRelay2Status || 'неизвестно'}`}>
              <Tag color={parameter.mainPowerOnRelay2Status === "on" ? "success" : "error"}>
                {parameter.mainPowerOnRelay2Status || "неизвестно"}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "7",
      parameter: "Состояние терминала транспорта",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние терминала транспорта 15: ${parameter.enablingTransportTerminal15 || 'неизвестно'}`}>
              <Tag color={parameter.enablingTransportTerminal15 === "on" ? "success" : "error"}>
                {parameter.enablingTransportTerminal15 || "неизвестно"}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "8",
      parameter: "Расход энергии ГУР",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Расход энергии ГУР: ${parameter.gurPowerConsumption || 'неизвестно'} кВт`}>
              <Tag color={parameter.gurPowerConsumption ? "green" : "error"}>
                {parameter.gurPowerConsumption ? `${parameter.gurPowerConsumption} кВт` : "неизвестно"}
              </Tag>
            </Tooltip>
          ),
        }),
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

export default DescriptionsElectricSystemParameters;
