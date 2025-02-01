import React from "react";
import { Table, Tag, Tooltip } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
// Тип данных для параметров команды освещения
interface LightingCommand {
  implementOemOption1LightCommand: string;
  time: string;
  runningLightCommand: string;
  alternateBeamHeadLightCommand: string;
  lowBeamHeadLightCommand: string;
  highBeamHeadLightCommand: string;
  tractorFrontFogLightsCommand: string;
  rotatingBeaconLightCommand: string;
  rightTurnSignalLightsCommand: string;
  leftTurnSignalLightsCommand: string;
  centerStopLightCommand: string;
  rightStopLightCommand: string;
  leftStopLightCommand: string;
  implementClearanceLightCommand: string;
  tractorSideLowMountedWorkLightsCommand: string;
  implementRightFacingWorkLightCommand: string;
  implementLeftFacingWorkLightCommand: string;
}

interface DescriptionsDbkOutputsProps {
  data: LightingCommand[];
}

const DescriptionsDbkOutputs: React.FC<DescriptionsDbkOutputsProps> = ({ data }) => {
  // Получаем список уникальных временных меток
  const sortedData = [...data].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
console.log("data",data)
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

  // Создаем данные для таблицы
  const tableData = [
    {
      key: "1",
      parameter: "Команда габаритных огней",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние: ${
              parameter.runningLightCommand === "on" 
                ? "Активно" 
                : parameter.runningLightCommand === "off" 
                ? "Неактивно" 
                : ""
            }`}>
              <Tag color={parameter.runningLightCommand === "on" ? "green" : parameter.runningLightCommand === "off" ? "red" : "default"}>
                {parameter.runningLightCommand === "on" ? "Активно" : parameter.runningLightCommand === "off" ? "Неактивно" : " "}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "2",
      parameter: "Команда альтернативного пучка фар",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние: ${
              parameter.alternateBeamHeadLightCommand === "on" 
                ? "Активно" 
                : parameter.alternateBeamHeadLightCommand === "off" 
                ? "Неактивно" 
                : ""
            }`}>
              <Tag color={parameter.alternateBeamHeadLightCommand === "on" ? "green" : parameter.alternateBeamHeadLightCommand === "off" ? "red" : "default"}>
                {parameter.alternateBeamHeadLightCommand === "on" ? "Активно" : parameter.alternateBeamHeadLightCommand === "off" ? "Неактивно" : " "}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "3",
      parameter: "Команда ближнего света фар",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние: ${
              parameter.lowBeamHeadLightCommand === "on" 
                ? "Активно" 
                : parameter.lowBeamHeadLightCommand === "off" 
                ? "Неактивно" 
                : ""
            }`}>
              <Tag color={parameter.lowBeamHeadLightCommand === "on" ? "green" : parameter.lowBeamHeadLightCommand === "off" ? "red" : "default"}>
                {parameter.lowBeamHeadLightCommand === "on" ? "Активно" : parameter.lowBeamHeadLightCommand === "off" ? "Неактивно" : " "}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "4",
      parameter: "Команда дальнего света фар",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние: ${
              parameter.highBeamHeadLightCommand === "on" 
                ? "Активно" 
                : parameter.highBeamHeadLightCommand === "off" 
                ? "Неактивно" 
                : ""
            }`}>
              <Tag color={parameter.highBeamHeadLightCommand === "on" ? "green" : parameter.highBeamHeadLightCommand === "off" ? "red" : "default"}>
                {parameter.highBeamHeadLightCommand === "on" ? "Активно" : parameter.highBeamHeadLightCommand === "off" ? "Неактивно" : " "}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "5",
      parameter: "Команда передних противотуманных фар трактора",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние: ${
              parameter.tractorFrontFogLightsCommand === "on" 
                ? "Активно" 
                : parameter.tractorFrontFogLightsCommand === "off" 
                ? "Неактивно" 
                : ""
            }`}>
              <Tag color={parameter.tractorFrontFogLightsCommand === "on" ? "green" : parameter.tractorFrontFogLightsCommand === "off" ? "red" : "default"}>
                {parameter.tractorFrontFogLightsCommand === "on" ? "Активно" : parameter.tractorFrontFogLightsCommand === "off" ? "Неактивно" : " "}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "6",
      parameter: "Команда вращающегося маяка",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние: ${
              parameter.rotatingBeaconLightCommand === "on" 
                ? "Активно" 
                : parameter.rotatingBeaconLightCommand === "off" 
                ? "Неактивно" 
                : ""
            }`}>
              <Tag color={parameter.rotatingBeaconLightCommand === "on" ? "green" : parameter.rotatingBeaconLightCommand === "off" ? "red" : "default"}>
                {parameter.rotatingBeaconLightCommand === "on" ? "Активно" : parameter.rotatingBeaconLightCommand === "off" ? "Неактивно" : " "}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "7",
      parameter: "Команда правого указателя поворота",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние: ${
              parameter.rightTurnSignalLightsCommand === "on" 
                ? "Активно" 
                : parameter.rightTurnSignalLightsCommand === "off" 
                ? "Неактивно" 
                : ""
            }`}>
              <Tag color={parameter.rightTurnSignalLightsCommand === "on" ? "green" : parameter.rightTurnSignalLightsCommand === "off" ? "red" : "default"}>
                {parameter.rightTurnSignalLightsCommand === "on" ? "Активно" : parameter.rightTurnSignalLightsCommand === "off" ? "Неактивно" : " "}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "8",
      parameter: "Команда левого указателя поворота",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние: ${
              parameter.leftTurnSignalLightsCommand === "on" 
                ? "Активно" 
                : parameter.leftTurnSignalLightsCommand === "off" 
                ? "Неактивно" 
                : ""
            }`}>
              <Tag color={parameter.leftTurnSignalLightsCommand === "on" ? "green" : parameter.leftTurnSignalLightsCommand === "off" ? "red" : "default"}>
                {parameter.leftTurnSignalLightsCommand === "on" ? "Активно" : parameter.leftTurnSignalLightsCommand === "off" ? "Неактивно" : " "}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "9",
      parameter: "Команда центрального стоп-сигнала",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние: ${
              parameter.centerStopLightCommand === "on" 
                ? "Активно" 
                : parameter.centerStopLightCommand === "off" 
                ? "Неактивно" 
                : ""
            }`}>
              <Tag color={parameter.centerStopLightCommand === "on" ? "green" : parameter.centerStopLightCommand === "off" ? "red" : "default"}>
                {parameter.centerStopLightCommand === "on" ? "Активно" : parameter.centerStopLightCommand === "off" ? "Неактивно" : " "}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "10",
      parameter: "Команда правого стоп-сигнала",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние: ${
              parameter.rightStopLightCommand === "on" 
                ? "Активно" 
                : parameter.rightStopLightCommand === "off" 
                ? "Неактивно" 
                : ""
            }`}>
              <Tag color={parameter.rightStopLightCommand === "on" ? "green" : parameter.rightStopLightCommand === "off" ? "red" : "default"}>
                {parameter.rightStopLightCommand === "on" ? "Активно" : parameter.rightStopLightCommand === "off" ? "Неактивно" : " "}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "11",
      parameter: "Команда левого стоп-сигнала",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние: ${
              parameter.leftStopLightCommand === "on" 
                ? "Активно" 
                : parameter.leftStopLightCommand === "off" 
                ? "Неактивно" 
                : ""
            }`}>
              <Tag color={parameter.leftStopLightCommand === "on" ? "green" : parameter.leftStopLightCommand === "off" ? "red" : "default"}>
                {parameter.leftStopLightCommand === "on" ? "Активно" : parameter.leftStopLightCommand === "off" ? "Неактивно" : " "}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "12",
      parameter: "Команда освещенности площадки для орудий",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние: ${
              parameter.implementClearanceLightCommand === "on" 
                ? "Активно" 
                : parameter.implementClearanceLightCommand === "off" 
                ? "Неактивно" 
                : ""
            }`}>
              <Tag color={parameter.implementClearanceLightCommand === "on" ? "green" : parameter.implementClearanceLightCommand === "off" ? "red" : "default"}>
                {parameter.implementClearanceLightCommand === "on" ? "Активно" : parameter.implementClearanceLightCommand === "off" ? "Неактивно" : " "}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "13",
      parameter: "Команда боковых рабочих огней трактора",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние: ${
              parameter.tractorSideLowMountedWorkLightsCommand === "on" 
                ? "Активно" 
                : parameter.tractorSideLowMountedWorkLightsCommand === "off" 
                ? "Неактивно" 
                : ""
            }`}>
              <Tag color={parameter.tractorSideLowMountedWorkLightsCommand === "on" ? "green" : parameter.tractorSideLowMountedWorkLightsCommand === "off" ? "red" : "default"}>
                {parameter.tractorSideLowMountedWorkLightsCommand === "on" ? "Активно" : parameter.tractorSideLowMountedWorkLightsCommand === "off" ? "Неактивно" : " "}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "14",
      parameter: "Команда рабочего освещения орудия 1",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние: ${
              parameter.implementOemOption1LightCommand === "on" 
                ? "Активно" 
                : parameter.implementOemOption1LightCommand === "off" 
                ? "Неактивно" 
                : ""
            }`}>
              <Tag color={parameter.implementOemOption1LightCommand === "on" ? "green" : parameter.implementOemOption1LightCommand === "off" ? "red" : "default"}>
                {parameter.implementOemOption1LightCommand === "on" ? "Активно" : parameter.implementOemOption1LightCommand === "off" ? "Неактивно" : " "}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "15",
      parameter: "Команда рабочего освещения орудия 2 (справа)",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние: ${
              parameter.implementRightFacingWorkLightCommand === "on" 
                ? "Активно" 
                : parameter.implementRightFacingWorkLightCommand === "off" 
                ? "Неактивно" 
                : ""
            }`}>
              <Tag color={parameter.implementRightFacingWorkLightCommand === "on" ? "green" : parameter.implementRightFacingWorkLightCommand === "off" ? "red" : "default"}>
                {parameter.implementRightFacingWorkLightCommand === "on" ? "Активно" : parameter.implementRightFacingWorkLightCommand === "off" ? "Неактивно" : " "}
              </Tag>
            </Tooltip>
          ),
        }),
      ),
    },
    {
      key: "16",
      parameter: "Команда рабочего освещения орудия 3 (слева)",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={`Состояние: ${
              parameter.implementLeftFacingWorkLightCommand === "on" 
                ? "Активно" 
                : parameter.implementLeftFacingWorkLightCommand === "off" 
                ? "Неактивно" 
                : ""
            }`}>
              <Tag color={parameter.implementLeftFacingWorkLightCommand === "on" ? "green" : parameter.implementLeftFacingWorkLightCommand === "off" ? "red" : "default"}>
                {parameter.implementLeftFacingWorkLightCommand === "on" ? "Активно" : parameter.implementLeftFacingWorkLightCommand === "off" ? "Неактивно" : " "}
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

export default DescriptionsDbkOutputs;
