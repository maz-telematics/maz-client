import React from "react";
import { Table, Tag, Tooltip } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

// Тип данных для параметров освещения
interface LightingParameter {
  time: string | number | Date;
  daytimeRunningLights: string;
  lowBeam: string;
  highBeam: string;
  frontLogLights: string;
  rightTurnSignal: string;
  leftTurnSignal: string;
  sideMakerLights: string;
  rearFogLights: string;
  reverseLights: string;
  rightBrakeLights: string;
  leftBrakeLights: string;
}

interface DescriptionsLightingParametersProps {
  data: LightingParameter[];
}

const DescriptionsLightingParameters: React.FC<DescriptionsLightingParametersProps> = ({ data }) => {
  // Сортируем данные по времени (от позднего к раннему)
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
      parameter: "Дневное ходовое освещение",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={parameter.daytimeRunningLights}>
              {parameter.daytimeRunningLights === "on" ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  {parameter.daytimeRunningLights}
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.daytimeRunningLights}
                </Tag>
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "2",
      parameter: "Ближний свет",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={parameter.lowBeam}>
              {parameter.lowBeam === "on" ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  {parameter.lowBeam}
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.lowBeam}
                </Tag>
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "3",
      parameter: "Дальний свет",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={parameter.highBeam}>
              {parameter.highBeam === "on" ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  {parameter.highBeam}
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.highBeam}
                </Tag>
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "4",
      parameter: "Передние противотуманные фонари",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={parameter.frontLogLights}>
              {parameter.frontLogLights === "on" ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  {parameter.frontLogLights}
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.frontLogLights}
                </Tag>
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "5",
      parameter: "Правый поворотник",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={parameter.rightTurnSignal}>
              {parameter.rightTurnSignal === "on" ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  {parameter.rightTurnSignal}
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.rightTurnSignal}
                </Tag>
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "6",
      parameter: "Левый поворотник",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={parameter.leftTurnSignal}>
              {parameter.leftTurnSignal === "on" ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  {parameter.leftTurnSignal}
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.leftTurnSignal}
                </Tag>
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "7",
      parameter: "Габаритные фонари",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={parameter.sideMakerLights}>
              {parameter.sideMakerLights === "on" ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  {parameter.sideMakerLights}
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.sideMakerLights}
                </Tag>
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "8",
      parameter: "Задние противотуманные фонари",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={parameter.rearFogLights}>
              {parameter.rearFogLights === "on" ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  {parameter.rearFogLights}
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.rearFogLights}
                </Tag>
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "9",
      parameter: "Задний ход",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={parameter.reverseLights}>
              {parameter.reverseLights === "on" ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  {parameter.reverseLights}
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.reverseLights}
                </Tag>
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "10",
      parameter: "Стоп сигнал правый",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={parameter.rightBrakeLights}>
              {parameter.rightBrakeLights === "on" ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  {parameter.rightBrakeLights}
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.rightBrakeLights}
                </Tag>
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "11",
      parameter: "Стоп сигнал левый",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={parameter.leftBrakeLights}>
              {parameter.leftBrakeLights === "on" ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  {parameter.leftBrakeLights}
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.leftBrakeLights}
                </Tag>
              )}
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

export default DescriptionsLightingParameters;
