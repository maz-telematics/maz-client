import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { Card, Tabs, Tag, Tooltip as AntTooltip } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

interface ElectricSystemParametersChartProps {
    processedParameters: any[];
  }

const { TabPane } = Tabs;

const PowertrainParametersChart: React.FC<ElectricSystemParametersChartProps> = ({ processedParameters }) => {
  // Функция для подготовки данных для графиков
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
    throttlePosition: 100,
    engineTorque: 200,
    engineRpm: 3000,
    gearboxOutputSpeed: 150,
    hydraulicSensorLevel: 100,
    coolantSensorLevel: 100,
  };

  return (
    <Card title="Графики параметров системы привода">
      <Tabs type="card">
        {/* График для положения дросселя */}
        <TabPane tab="Положение дросселя (%)" key="throttlePosition">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prepareData("throttlePosition")}>
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
                name="Положение дросселя"
              />
              <ReferenceLine y={thresholds.throttlePosition} label="Порог" stroke="red" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </TabPane>

        {/* График для момента двигателя */}
        <TabPane tab="Момент двигателя (Nm)" key="engineTorque">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prepareData("engineTorque")}>
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
                name="Момент двигателя"
              />
              <ReferenceLine y={thresholds.engineTorque} label="Порог" stroke="red" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </TabPane>

        {/* График для оборотов двигателя */}
        <TabPane tab="Обороты двигателя (RPM)" key="engineRpm">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prepareData("engineRpm")}>
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
                name="Обороты двигателя"
              />
              <ReferenceLine y={thresholds.engineRpm} label="Порог" stroke="red" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </TabPane>

        {/* График для скорости на выходе КПП */}
        <TabPane tab="Скорость на выходе КПП (км/ч)" key="gearboxOutputSpeed">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prepareData("gearboxOutputSpeed")}>
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
                name="Скорость КПП"
              />
              <ReferenceLine y={thresholds.gearboxOutputSpeed} label="Порог" stroke="red" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </TabPane>

        {/* График для уровня гидравлики */}
        <TabPane tab="Уровень гидравлики (%)" key="hydraulicSensorLevel">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prepareData("hydraulicSensorLevel")}>
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
                name="Уровень гидравлики"
              />
              <ReferenceLine y={thresholds.hydraulicSensorLevel} label="Порог" stroke="red" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </TabPane>

        {/* График для уровня охлаждающей жидкости */}
        <TabPane tab="Уровень охлаждающей жидкости (%)" key="coolantSensorLevel">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prepareData("coolantSensorLevel")}>
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
                name="Уровень охлаждающей жидкости"
              />
              <ReferenceLine y={thresholds.coolantSensorLevel} label="Порог" stroke="red" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default PowertrainParametersChart;
