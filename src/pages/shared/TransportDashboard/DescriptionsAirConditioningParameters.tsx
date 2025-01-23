import React from "react";
import { Table, Tag, Tooltip } from "antd";
import { ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

// Тип данных для параметров кондиционера
interface AirConditioningParameter {
  time: string;
  acOn: string;
  frostSensor: string;
  pressureSensorOn: string;
  outsideAirTempSensor: number;
  airDamperPosition: string;
}

interface DescriptionsAirConditioningParametersProps {
  data: AirConditioningParameter[];
}

const DescriptionsAirConditioningParameters: React.FC<DescriptionsAirConditioningParametersProps> = ({ data }) => {
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
      parameter: "Состояние кондиционера",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={parameter.acOn}>
              {parameter.acOn === "on" ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  {parameter.acOn}
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.acOn}
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
      parameter: "Состояние датчика обморожения кондиционера",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={parameter.frostSensor}>
              {parameter.frostSensor === "needs_to_be_turned_off" ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  {parameter.frostSensor}
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.frostSensor}
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
      parameter: "Температура наружного воздуха",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: parameter.outsideAirTempSensor 
            ? `${parameter.outsideAirTempSensor}°C` // Если значение температуры есть, добавляем его с символом "°C"
            : "°C", // Если значения нет, показываем только "°C"
        }),
        {}
      ),
    },
    {
      key: "4",
      parameter: "Положение воздушной заслонки",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip title={parameter.airDamperPosition}>
              <Tag 
                color={
                  parameter.airDamperPosition === "windshield" 
                    ? "blue" // Цвет для 'windshield'
                    : parameter.airDamperPosition === "central"
                    ? "green" // Цвет для 'central'
                    : parameter.airDamperPosition === "upper-centra"
                    ? "orange" // Цвет для 'upper-centra'
                    : "default" // Цвет по умолчанию, если значение не совпадает
                }
              >
                {parameter.airDamperPosition}
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

export default DescriptionsAirConditioningParameters;
