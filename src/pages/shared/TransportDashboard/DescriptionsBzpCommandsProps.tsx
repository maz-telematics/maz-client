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
      title: "Команды",
      dataIndex: "command",
      key: "command",
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
        command: "Клемма 15 ЦКБ К ЭБУ",
        ...sortedData.reduce(
          (acc, command, index) => ({
            ...acc,
            [`time${index}`]: (
              <Tooltip
                title={`Состояние: ${
                  command.terminal15CcsToEcu === 'on' ? "Активно" : "Неактивно"
                }`}
              >
                <Tag color={command.terminal15CcsToEcu === 'on' ? "green" : "red"}>
                  {command.terminal15CcsToEcu === 'on' ? "Активно" : "Неактивно"}
                </Tag>
              </Tooltip>
            ),
          }),
          {}
        ),
      },
      {
        key: "2",
        command: "Включить питание кабины (Кл. 15)",
        ...sortedData.reduce(
          (acc, command, index) => ({
            ...acc,
            [`time${index}`]: (
              <Tooltip
                title={`Состояние: ${
                  command.turnOnCabinPower === 'on' ? "Активно" : "Неактивно"
                }`}
              >
                <Tag color={command.turnOnCabinPower === 'on' ? "green" : "red"}>
                  {command.turnOnCabinPower === 'on' ? "Активно" : "Неактивно"}
                </Tag>
              </Tooltip>
            ),
          }),
          {}
        ),
      },
      {
        key: "3",
        command: "Включить питание фар",
        ...sortedData.reduce(
          (acc, command, index) => ({
            ...acc,
            [`time${index}`]: (
              <Tooltip
                title={`Состояние: ${
                  command.turnOnHeadlightsPower === 'on' ? "Активно" : "Неактивно"
                }`}
              >
                <Tag color={command.turnOnHeadlightsPower === 'on' ? "green" : "red"}>
                  {command.turnOnHeadlightsPower === 'on' ? "Активно" : "Неактивно"}
                </Tag>
              </Tooltip>
            ),
          }),
          {}
        ),
      },
      {
        key: "4",
        command: "Включить питание задних фонарей",
        ...sortedData.reduce(
          (acc, command, index) => ({
            ...acc,
            [`time${index}`]: (
              <Tooltip
                title={`Состояние: ${
                  command.turnOnRearLightsPower === 'on' ? "Активно" : "Неактивно"
                }`}
              >
                <Tag color={command.turnOnRearLightsPower === 'on' ? "green" : "red"}>
                  {command.turnOnRearLightsPower === 'on' ? "Активно" : "Неактивно"}
                </Tag>
              </Tooltip>
            ),
          }),
          {}
        ),
      },
      {
        key: "5",
        command: "Включить питание осушителя воздуха",
        ...sortedData.reduce(
          (acc, command, index) => ({
            ...acc,
            [`time${index}`]: (
              <Tooltip
                title={`Состояние: ${
                  command.turnOnAirDryerPower === 'on' ? "Активно" : "Неактивно"
                }`}
              >
                <Tag color={command.turnOnAirDryerPower === 'on' ? "green" : "red"}>
                  {command.turnOnAirDryerPower === 'on' ? "Активно" : "Неактивно"}
                </Tag>
              </Tooltip>
            ),
          }),
          {}
        ),
      },
      {
        key: "6",
        command: "Включить питание жидкостного подогревателя",
        ...sortedData.reduce(
          (acc, command, index) => ({
            ...acc,
            [`time${index}`]: (
              <Tooltip
                title={`Состояние: ${
                  command.turnOnLiquidHeaterPower === 'on' ? "Активно" : "Неактивно"
                }`}
              >
                <Tag color={command.turnOnLiquidHeaterPower === 'on' ? "green" : "red"}>
                  {command.turnOnLiquidHeaterPower === 'on' ? "Активно" : "Неактивно"}
                </Tag>
              </Tooltip>
            ),
          }),
          {}
        ),
      },
      {
        key: "7",
        command: "Включить подогрев топливных фильтров грубой очистки",
        ...sortedData.reduce(
          (acc, command, index) => ({
            ...acc,
            [`time${index}`]: (
              <Tooltip
                title={`Состояние: ${
                  command.turnOnFuelFilterPreheaterCoarseFilter === 'on'
                    ? "Активно"
                    : "Неактивно"
                }`}
              >
                <Tag
                  color={
                    command.turnOnFuelFilterPreheaterCoarseFilter === 'on'
                      ? "green"
                      : "red"
                  }
                >
                  {command.turnOnFuelFilterPreheaterCoarseFilter === 'on'
                    ? "Активно"
                    : "Неактивно"}
                </Tag>
              </Tooltip>
            ),
          }),
          {}
        ),
      },
      {
        key: "8",
        command: "Включить подогрев топливных фильтров тонкой очистки",
        ...sortedData.reduce(
          (acc, command, index) => ({
            ...acc,
            [`time${index}`]: (
              <Tooltip
                title={`Состояние: ${
                  command.turnOnFuelFilterPreheaterFineFilter === 'on'
                    ? "Активно"
                    : "Неактивно"
                }`}
              >
                <Tag
                  color={
                    command.turnOnFuelFilterPreheaterFineFilter === 'on'
                      ? "green"
                      : "red"
                  }
                >
                  {command.turnOnFuelFilterPreheaterFineFilter === 'on'
                    ? "Активно"
                    : "Неактивно"}
                </Tag>
              </Tooltip>
            ),
          }),
          {}
        ),
      },
      {
        key: "9",
        command: "Включить питание прицепа",
        ...sortedData.reduce(
          (acc, command, index) => ({
            ...acc,
            [`time${index}`]: (
              <Tooltip
                title={`Состояние: ${
                  command.turnOnTrailerPower === 'on' ? "Активно" : "Неактивно"
                }`}
              >
                <Tag color={command.turnOnTrailerPower === 'on' ? "green" : "red"}>
                  {command.turnOnTrailerPower === 'on' ? "Активно" : "Неактивно"}
                </Tag>
              </Tooltip>
            ),
          }),
          {}
        ),
      },
      {
        key: "10",
        command: "Включить питание прицепа (ABC)",
        ...sortedData.reduce(
          (acc, command, index) => ({
            ...acc,
            [`time${index}`]: (
              <Tooltip
                title={`Состояние: ${
                  command.turnOnTrailerPowerAbs === 'on' ? "Активно" : "Неактивно"
                }`}
              >
                <Tag color={command.turnOnTrailerPowerAbs === 'on' ? "green" : "red"}>
                  {command.turnOnTrailerPowerAbs === 'on' ? "Активно" : "Неактивно"}
                </Tag>
              </Tooltip>
            ),
          }),
          {}
        ),
      },
    // Повторите аналогичную логику для остальных команд...
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
