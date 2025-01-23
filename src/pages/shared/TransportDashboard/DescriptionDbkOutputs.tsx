import React from "react";
import { Table, Tag, Tooltip } from "antd";

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
      title: time,
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
            <Tooltip title={`Состояние: ${parameter.runningLightCommand === "on" ? "Активно" : "Неактивно"}`}>
              <Tag color={parameter.runningLightCommand === "on" ? "green" : "red"}>
                {parameter.runningLightCommand === "on" ? "Активно" : "Неактивно"}
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
            <Tooltip title={`Состояние: ${parameter.alternateBeamHeadLightCommand === "on" ? "Активно" : "Неактивно"}`}>
              <Tag color={parameter.alternateBeamHeadLightCommand === "on" ? "green" : "red"}>
                {parameter.alternateBeamHeadLightCommand === "on" ? "Активно" : "Неактивно"}
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
            <Tooltip title={`Состояние: ${parameter.lowBeamHeadLightCommand === "on" ? "Активно" : "Неактивно"}`}>
              <Tag color={parameter.lowBeamHeadLightCommand === "on" ? "green" : "red"}>
                {parameter.lowBeamHeadLightCommand === "on" ? "Активно" : "Неактивно"}
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
            <Tooltip title={`Состояние: ${parameter.highBeamHeadLightCommand === "on" ? "Активно" : "Неактивно"}`}>
              <Tag color={parameter.highBeamHeadLightCommand === "on" ? "green" : "red"}>
                {parameter.highBeamHeadLightCommand === "on" ? "Активно" : "Неактивно"}
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
            <Tooltip title={`Состояние: ${parameter.tractorFrontFogLightsCommand === "on" ? "Активно" : "Неактивно"}`}>
              <Tag color={parameter.tractorFrontFogLightsCommand === "on" ? "green" : "red"}>
                {parameter.tractorFrontFogLightsCommand === "on" ? "Активно" : "Неактивно"}
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
            <Tooltip title={`Состояние: ${parameter.rotatingBeaconLightCommand === "on" ? "Активно" : "Неактивно"}`}>
              <Tag color={parameter.rotatingBeaconLightCommand === "on" ? "green" : "red"}>
                {parameter.rotatingBeaconLightCommand === "on" ? "Активно" : "Неактивно"}
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
            <Tooltip title={`Состояние: ${parameter.rightTurnSignalLightsCommand === "on" ? "Активно" : "Неактивно"}`}>
              <Tag color={parameter.rightTurnSignalLightsCommand === "on" ? "green" : "red"}>
                {parameter.rightTurnSignalLightsCommand === "on" ? "Активно" : "Неактивно"}
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
            <Tooltip title={`Состояние: ${parameter.leftTurnSignalLightsCommand === "on" ? "Активно" : "Неактивно"}`}>
              <Tag color={parameter.leftTurnSignalLightsCommand === "on" ? "green" : "red"}>
                {parameter.leftTurnSignalLightsCommand === "on" ? "Активно" : "Неактивно"}
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
            <Tooltip title={`Состояние: ${parameter.centerStopLightCommand === "on" ? "Активно" : "Неактивно"}`}>
              <Tag color={parameter.centerStopLightCommand === "on" ? "green" : "red"}>
                {parameter.centerStopLightCommand === "on" ? "Активно" : "Неактивно"}
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
            <Tooltip title={`Состояние: ${parameter.rightStopLightCommand === "on" ? "Активно" : "Неактивно"}`}>
              <Tag color={parameter.rightStopLightCommand === "on" ? "green" : "red"}>
                {parameter.rightStopLightCommand === "on" ? "Активно" : "Неактивно"}
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
            <Tooltip title={`Состояние: ${parameter.leftStopLightCommand === "on" ? "Активно" : "Неактивно"}`}>
              <Tag color={parameter.leftStopLightCommand === "on" ? "green" : "red"}>
                {parameter.leftStopLightCommand === "on" ? "Активно" : "Неактивно"}
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
            <Tooltip title={`Состояние: ${parameter.implementClearanceLightCommand === "on" ? "Активно" : "Неактивно"}`}>
              <Tag color={parameter.implementClearanceLightCommand === "on" ? "green" : "red"}>
                {parameter.implementClearanceLightCommand === "on" ? "Активно" : "Неактивно"}
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
            <Tooltip title={`Состояние: ${parameter.tractorSideLowMountedWorkLightsCommand === "on" ? "Активно" : "Неактивно"}`}>
              <Tag color={parameter.tractorSideLowMountedWorkLightsCommand === "on" ? "green" : "red"}>
                {parameter.tractorSideLowMountedWorkLightsCommand === "on" ? "Активно" : "Неактивно"}
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
            <Tooltip title={`Состояние: ${parameter.implementOemOption1LightCommand === "on" ? "Активно" : "Неактивно"}`}>
              <Tag color={parameter.implementOemOption1LightCommand === "on" ? "green" : "red"}>
                {parameter.implementOemOption1LightCommand === "on" ? "Активно" : "Неактивно"}
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
            <Tooltip title={`Состояние: ${parameter.implementRightFacingWorkLightCommand === "on" ? "Активно" : "Неактивно"}`}>
              <Tag color={parameter.implementRightFacingWorkLightCommand === "on" ? "green" : "red"}>
                {parameter.implementRightFacingWorkLightCommand === "on" ? "Активно" : "Неактивно"}
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
            <Tooltip title={`Состояние: ${parameter.implementLeftFacingWorkLightCommand === "on" ? "Активно" : "Неактивно"}`}>
              <Tag color={parameter.implementLeftFacingWorkLightCommand === "on" ? "green" : "red"}>
                {parameter.implementLeftFacingWorkLightCommand === "on" ? "Активно" : "Неактивно"}
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
