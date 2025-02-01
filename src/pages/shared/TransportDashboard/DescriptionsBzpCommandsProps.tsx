import React from "react";
import { Table, Tooltip, Tag } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

// Тип данных для команд БЗП
interface BzpCommand {
  time: string;
  terminal15CcsToEcu: string;
  turnOnCabinPower: string;
  turnOnHeadlightsPower: string;
  turnOnRearLightsPower: string;
  turnOnAirDryerPower: string;
  turnOnLiquidHeaterPower: string;
  turnOnFuelFilterPreheaterCoarseFilter: string;
  turnOnFuelFilterPreheaterFineFilter: string;
  turnOnTrailerPower: string;
  turnOnTrailerPowerAbs: string;
}

interface DescriptionsBzpCommandsProps {
  data: BzpCommand[];
}

const DescriptionsBzpCommands: React.FC<DescriptionsBzpCommandsProps> = ({ data }) => {
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

  // Определяем колонки таблицы
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
      parameter: "Клемма 15 ЦКБ К ЭБУ",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={`Состояние: ${
                parameter.terminal15CcsToEcu === 'on'
                  ? "Активно"
                  : parameter.terminal15CcsToEcu === 'off'
                  ? "Неактивно"
                  : ""
              }`}
            >
              {parameter.terminal15CcsToEcu === 'on' ? (
                <Tag color="green">Активно</Tag>
              ) : parameter.terminal15CcsToEcu === 'off' ? (
                <Tag color="red">Неактивно</Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "2",
      parameter: "Включить питание кабины (Кл. 15)",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={`Состояние: ${
                parameter.turnOnCabinPower === 'on'
                  ? "Активно"
                  : parameter.turnOnCabinPower === 'off'
                  ? "Неактивно"
                  : ""
              }`}
            >
              {parameter.turnOnCabinPower === 'on' ? (
                <Tag color="green">Активно</Tag>
              ) : parameter.turnOnCabinPower === 'off' ? (
                <Tag color="red">Неактивно</Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "3",
      parameter: "Включить питание фар",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={`Состояние: ${
                parameter.turnOnHeadlightsPower === 'on'
                  ? "Активно"
                  : parameter.turnOnHeadlightsPower === 'off'
                  ? "Неактивно"
                  : ""
              }`}
            >
              {parameter.turnOnHeadlightsPower === 'on' ? (
                <Tag color="green">Активно</Tag>
              ) : parameter.turnOnHeadlightsPower === 'off' ? (
                <Tag color="red">Неактивно</Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "4",
      parameter: "Включить питание задних фонарей",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={`Состояние: ${
                parameter.turnOnRearLightsPower === 'on'
                  ? "Активно"
                  : parameter.turnOnRearLightsPower === 'off'
                  ? "Неактивно"
                  : ""
              }`}
            >
              {parameter.turnOnRearLightsPower === 'on' ? (
                <Tag color="green">Активно</Tag>
              ) : parameter.turnOnRearLightsPower === 'off' ? (
                <Tag color="red">Неактивно</Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "5",
      parameter: "Включить питание осушителя воздуха",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={`Состояние: ${
                parameter.turnOnAirDryerPower === 'on'
                  ? "Активно"
                  : parameter.turnOnAirDryerPower === 'off'
                  ? "Неактивно"
                  : ""
              }`}
            >
              {parameter.turnOnAirDryerPower === 'on' ? (
                <Tag color="green">Активно</Tag>
              ) : parameter.turnOnAirDryerPower === 'off' ? (
                <Tag color="red">Неактивно</Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "6",
      parameter: "Включить питание жидкостного подогревателя",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={`Состояние: ${
                parameter.turnOnLiquidHeaterPower === 'on'
                  ? "Активно"
                  : parameter.turnOnLiquidHeaterPower === 'off'
                  ? "Неактивно"
                  : ""
              }`}
            >
              {parameter.turnOnLiquidHeaterPower === 'on' ? (
                <Tag color="green">Активно</Tag>
              ) : parameter.turnOnLiquidHeaterPower === 'off' ? (
                <Tag color="red">Неактивно</Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "7",
      parameter: "Включить подогрев топливных фильтров грубой очистки",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={`Состояние: ${
                parameter.turnOnFuelFilterPreheaterCoarseFilter === 'on'
                  ? "Активно"
                  : parameter.turnOnFuelFilterPreheaterCoarseFilter === 'off'
                  ? "Неактивно"
                  : ""
              }`}
            >
              {parameter.turnOnFuelFilterPreheaterCoarseFilter === 'on' ? (
                <Tag color="green">Активно</Tag>
              ) : parameter.turnOnFuelFilterPreheaterCoarseFilter === 'off' ? (
                <Tag color="red">Неактивно</Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "8",
      parameter: "Включить подогрев топливных фильтров тонкой очистки",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={`Состояние: ${
                parameter.turnOnFuelFilterPreheaterFineFilter === 'on'
                  ? "Активно"
                  : parameter.turnOnFuelFilterPreheaterFineFilter === 'off'
                  ? "Неактивно"
                  : ""
              }`}
            >
              {parameter.turnOnFuelFilterPreheaterFineFilter === 'on' ? (
                <Tag color="green">Активно</Tag>
              ) : parameter.turnOnFuelFilterPreheaterFineFilter === 'off' ? (
                <Tag color="red">Неактивно</Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "9",
      parameter: "Включить питание прицепа",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={`Состояние: ${
                parameter.turnOnTrailerPower === 'on'
                  ? "Активно"
                  : parameter.turnOnTrailerPower === 'off'
                  ? "Неактивно"
                  : ""
              }`}
            >
              {parameter.turnOnTrailerPower === 'on' ? (
                <Tag color="green">Активно</Tag>
              ) : parameter.turnOnTrailerPower === 'off' ? (
                <Tag color="red">Неактивно</Tag>
              ) : (
                <Tag color="default"> </Tag> // Пустое значение
              )}
            </Tooltip>
          ),
        }),
        {}
      ),
    },
    {
      key: "10",
      parameter: "Включить питание прицепа (ABC)",
      ...sortedData.reduce(
        (acc, parameter, index) => ({
          ...acc,
          [`time${index}`]: (
            <Tooltip
              title={`Состояние: ${
                parameter.turnOnTrailerPowerAbs === 'on'
                  ? "Активно"
                  : parameter.turnOnTrailerPowerAbs === 'off'
                  ? "Неактивно"
                  : ""
              }`}
            >
              {parameter.turnOnTrailerPowerAbs === 'on' ? (
                <Tag color="green">Активно</Tag>
              ) : parameter.turnOnTrailerPowerAbs === 'off' ? (
                <Tag color="red">Неактивно</Tag>
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

export default DescriptionsBzpCommands;
