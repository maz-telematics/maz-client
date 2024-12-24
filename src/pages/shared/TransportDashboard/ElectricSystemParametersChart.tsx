import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { Card, Tabs, Tag, Progress, Tooltip as AntTooltip } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

interface ElectricSystemParametersChartProps {
  processedParameters: any[];
}

const ElectricSystemParametersChart: React.FC<ElectricSystemParametersChartProps> = ({ processedParameters }) => {
  // Подготовка данных для графиков
  const prepareData = (key: string) =>
    processedParameters.map((parameter, index) => {
      const time = new Date();
      // Генерация уникального времени для каждой точки данных
      const timeWithOffset = new Date(time.getTime() + index * 1000); // Смещение времени для уникальности
      return {
        time: timeWithOffset.toISOString(),
        value: parameter[key],
      };
    });

  // Пороговые значения для различных параметров
  const thresholds = {
    powerConsumptionHydraulic: 12,
    powerConsumptionAirCompressor: 12,
    powerConsumptionDcdc: 8,
    powerConsumptionEngine: 15,
  };

  return (
    <Card title="Графики расхода энергии">
      <Tabs type="card">
        <TabPane tab="Расход энергии гидроусилителем руля" key="hydraulic">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prepareData("powerConsumptionHydraulic")}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Расход энергии гидроусилителем"
              />
              <ReferenceLine y={thresholds.powerConsumptionHydraulic} label="Порог" stroke="red" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </TabPane>

        <TabPane tab="Расход энергии воздушным компрессором" key="airCompressor">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prepareData("powerConsumptionAirCompressor")}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
                name="Расход энергии воздушным компрессором"
              />
              <ReferenceLine y={thresholds.powerConsumptionAirCompressor} label="Порог" stroke="red" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </TabPane>

        <TabPane tab="Расход энергии DC-DC преобразователем" key="dcdc">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prepareData("powerConsumptionDcdc")}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ffc658"
                activeDot={{ r: 8 }}
                name="Расход энергии DC-DC преобразователем"
              />
              <ReferenceLine y={thresholds.powerConsumptionDcdc} label="Порог" stroke="red" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </TabPane>

        <TabPane tab="Расход энергии двигателем" key="engine">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prepareData("powerConsumptionEngine")}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
                name="Расход энергии двигателем"
              />
              <ReferenceLine y={thresholds.powerConsumptionEngine} label="Порог" stroke="red" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default ElectricSystemParametersChart;
