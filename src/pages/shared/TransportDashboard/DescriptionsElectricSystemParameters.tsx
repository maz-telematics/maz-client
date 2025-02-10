import React from "react";
import { Table, Tooltip, Tag, Progress } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

// Тип данных для параметров электрической системы
interface ElectricSystemParameter {
  enablingTransportTerminal15: string;
  mainPowerOnRelay1Status: string;
  mainPowerOnRelay2Status: string;
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
  console.log("data",data)
  const sortedData = [...data].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  // Получаем список уникальных временных меток
  const times = sortedData.map((parameter) =>
    new Date(parameter.time).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

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
  // Подготавливаем данные для таблицы
  const tableData = [
    {
      key: "1",
      parameter: "Расход энергии гидроусилителем руля (Ампер)",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={`Расход энергии гидроусилителем руля: ${parameter.powerConsumptionHydraulic !== null ? parameter.powerConsumptionHydraulic : ''} Ампер`}
            >
              <Tag color={parameter.powerConsumptionHydraulic && parameter.powerConsumptionHydraulic > 12 ? "error" : "green"}>
                {parameter.powerConsumptionHydraulic !== null ? `${parameter.powerConsumptionHydraulic} Ампер` : "Ампер"}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "2",
      parameter: "Расход энергии воздушным компрессором (Ампер)",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={`Расход энергии воздушным компрессором: ${parameter.powerConsumptionAirCompressor !== null ? parameter.powerConsumptionAirCompressor : ''} Ампер`}
            >
              <Tag color={parameter.powerConsumptionAirCompressor && parameter.powerConsumptionAirCompressor > 12 ? "error" : "green"}>
                {parameter.powerConsumptionAirCompressor !== null ? `${parameter.powerConsumptionAirCompressor} Ампер` : "Ампер"}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },    
    {
      key: "3",
      parameter: "Расход энергии DC-DC преобразователем (Ампер)",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={`Расход энергии DC-DC преобразователем: ${parameter.powerConsumptionDcdc !== null ? parameter.powerConsumptionDcdc : ''} Ампер`}
            >
              <Tag color={parameter.powerConsumptionDcdc && parameter.powerConsumptionDcdc > 8 ? "error" : "green"}>
                {parameter.powerConsumptionDcdc !== null ? `${parameter.powerConsumptionDcdc} Ампер` : "Ампер"}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "4",
      parameter: "Расход энергии двигателем (Ампер)",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Расход энергии двигателем: ${parameter.powerConsumptionEngine || 'неизвестно'} Ампер`}>
              <Tag color={parameter.powerConsumptionEngine && parameter.powerConsumptionEngine > 15 ? "error" : "green"}>
                {parameter.powerConsumptionEngine !== null ? `${parameter.powerConsumptionEngine} Ампер` : "неизвестно"}
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
              {parameter.mainPowerOnRelay1Status === "on" ? (
                <Tag color="success">Активно</Tag>
              ) : parameter.mainPowerOnRelay1Status === "off" ? (
                <Tag color="error">Неактивно</Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
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
              {parameter.mainPowerOnRelay2Status === "on" ? (
                <Tag color="success">Активно</Tag>
              ) : parameter.mainPowerOnRelay2Status === "off" ? (
                <Tag color="error">Неактивно</Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "7",
      parameter: "Состояние клемы 15",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние клемы 15: ${parameter.enablingTransportTerminal15 || 'неизвестно'}`}>
              {parameter.enablingTransportTerminal15 === "on" ? (
                <Tag color="success">Активно</Tag>
              ) : parameter.enablingTransportTerminal15 === "off" ? (
                <Tag color="error">Неактивно</Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
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
