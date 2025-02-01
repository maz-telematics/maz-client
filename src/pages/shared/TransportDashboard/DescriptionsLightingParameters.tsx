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
  const isMobile = window.innerWidth < 768;
  const columns = isMobile
    ? [
        {
          title: "Параметр",
          dataIndex: "parameter",
          key: "parameter",
          align: "left" as const,
          render: (text: string) => (
            <Tooltip title={text}>
              <div style={{ textAlign: "left" }}>{text}</div>
            </Tooltip>
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
              ) : parameter.daytimeRunningLights === "off" ? (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.daytimeRunningLights}
                </Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
            </Tooltip>
          ),
        }),
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
              ) : parameter.lowBeam === "off" ? (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.lowBeam}
                </Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
            </Tooltip>
          ),
        }),
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
              ) : parameter.highBeam === "off" ? (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.highBeam}
                </Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
            </Tooltip>
          ),
        }),
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
              ) : parameter.frontLogLights === "off" ? (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.frontLogLights}
                </Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
            </Tooltip>
          ),
        }),
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
              ) : parameter.rightTurnSignal === "off" ? (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.rightTurnSignal}
                </Tag>
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
              ) : parameter.leftTurnSignal === "off" ? (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.leftTurnSignal}
                </Tag>
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
              ) : parameter.sideMakerLights === "off" ? (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.sideMakerLights}
                </Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
            </Tooltip>
          ),
        }),
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
              ) : parameter.rearFogLights === "off" ? (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.rearFogLights}
                </Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
            </Tooltip>
          ),
        }),
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
              ) : parameter.reverseLights === "off" ? (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.reverseLights}
                </Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
            </Tooltip>
          ),
        }),
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
              ) : parameter.rightBrakeLights === "off" ? (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.rightBrakeLights}
                </Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
            </Tooltip>
          ),
        }),
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
              ) : parameter.leftBrakeLights === "off" ? (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.leftBrakeLights}
                </Tag>
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

export default DescriptionsLightingParameters;
