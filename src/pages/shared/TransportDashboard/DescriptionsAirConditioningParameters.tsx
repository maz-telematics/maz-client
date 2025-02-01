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
  // const columns = [
  //   {
  //     title: "Параметры",
  //     dataIndex: "parameter",
  //     key: "parameter",
  //     fixed: "left" as const,
  //     render: (text: string) => <b>{text}</b>,
  //   },
  //   ...times.map((time, index) => ({
  //     title: (
  //       <Tag icon={<ClockCircleOutlined />} color="processing">
  //         {time}
  //       </Tag>
  //     ),
  //     dataIndex: `time${index}`,
  //     key: `time${index}`,
  //     align: "center" as const,
  //   })),
  // ];
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
              ) : parameter.acOn === "off" ? (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {parameter.acOn}
                </Tag>
              ) : (
                <Tag color="default">
                  {" "}
                </Tag> // Пустое значение, если не "on" и не "off"
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
              ) : parameter.frostSensor === "turn_on" ? (
                <Tag icon={<CheckCircleOutlined />} color="processing">
                  {parameter.frostSensor}
                </Tag>
              ) : (
                <Tag color="default">
                  {" "}
                </Tag> // Пустое значение, если не "on", "off" или "turn_on"
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

