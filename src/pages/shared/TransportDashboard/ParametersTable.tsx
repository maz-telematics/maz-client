import { Parameters } from "../../../types/carTrackingTypes";
import { Table, Tabs, Row, Col } from "antd";
import { columnsBatteryParameters, columnsBzpCommands, columnsDbkOutputs, columnsElectricSystemParameters, columnsPowertrainSystemParameters, columnsTransportAirConditioning, columnsTransportLighting } from "./TransportColumns";
const { TabPane } = Tabs;
import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { Dayjs } from "dayjs";

interface ParametersProps {
  selectedDate: Dayjs | null;
}

const processParameters = (parameters: Parameters[]): Parameters[] => {
  if (!parameters || parameters.length === 0) {
    return [{
      transportLighting: {},
      transportAirConditioning: {},
      batteryParameters: {},
      electricSystemParameters: {},
      powertrainSystemParameters: {},
      bzpCommands: {},
      id: 0,
      date: "",
      transportId: "",
      dbkOutputs: {}
    }];
  }
  return parameters.map(parameter => {
    const { date } = parameter;
    return {
      ...parameter,
      batteryParameters: { ...parameter.batteryParameters, time: date },
      powertrainSystemParameters: { ...parameter.powertrainSystemParameters, time: date },
      electricSystemParameters: { ...parameter.electricSystemParameters, time: date },
      transportAirConditioning: { ...parameter.transportAirConditioning, time: date },
      transportLighting: { ...parameter.transportLighting, time: date },
      bzpCommands: { ...parameter.bzpCommands, time: date },
    };
  });
};

const ParametersTable: React.FC<ParametersProps> = ({ selectedDate }) => {
  const [processedParameters, setProcessedParameters] = useState<any[]>([]);
  const id = sessionStorage.getItem("id");

  const getParameters = async (id: string, date: string): Promise<[]> => {
    try {
      if (!id || !date) return [];
      const response = await axiosInstance.get(`/transport/parameters/${id}`, {
        params: { date }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  // useEffect для перезапроса параметров при изменении selectedDate
  useEffect(() => {
    const fetchAndProcessParameters = async () => {
      if (!id || !selectedDate) return;

      try {
        const dateStr = selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
        const data = await getParameters(id, dateStr);
        const processed = processParameters(data);
        setProcessedParameters(processed);
      } catch (error) {
        console.error("Error fetching or processing parameters:", error);
      }
    };

    fetchAndProcessParameters();
  }, [id, selectedDate]); // Зависимости - обновление при изменении selectedDate

  return (
    <>
      {processedParameters.length > 0 && (
        <Tabs defaultActiveKey="transport_lighting" tabPosition="top" type="card" style={{ width: "100%" }}>
          <TabPane key="transport_lighting" tab="Освещение транспорта">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Table
                  bordered
                  pagination={false}
                  columns={columnsTransportLighting}
                  dataSource={processedParameters.map(parameter => ({
                    ...parameter.transportLighting,
                    date: parameter.date,
                  }))}
                  scroll={{ x: "max-content" }}
                  style={{ maxWidth: "100%", overflowX: "auto" }}
                />
              </Col>
            </Row>
          </TabPane>

          <TabPane key="transport_air_conditioning" tab="Система кондиционирования транспорта">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Table
                  bordered
                  pagination={false}
                  columns={columnsTransportAirConditioning}
                  dataSource={processedParameters.map(parameter => ({
                    ...parameter.transportAirConditioning,
                    date: parameter.date,
                  }))}
                  scroll={{ x: "max-content" }}
                  style={{ maxWidth: "100%", overflowX: "auto" }}
                />
              </Col>
            </Row>
          </TabPane>

          <TabPane key="battery_parameters" tab="Параметры батареи">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Table
                  bordered
                  pagination={false}
                  columns={columnsBatteryParameters}
                  dataSource={processedParameters.map(parameter => ({
                    ...parameter.batteryParameters,
                    date: parameter.date,
                  }))}
                  scroll={{ x: "max-content" }}
                  style={{ maxWidth: "100%", overflowX: "auto" }}
                />
              </Col>
            </Row>
          </TabPane>

          <TabPane key="electric_system_parameters" tab="Параметры электрической системы">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Table
                  bordered
                  pagination={false}
                  columns={columnsElectricSystemParameters}
                  dataSource={processedParameters.map(parameter => ({
                    ...parameter.electricSystemParameters,
                    date: parameter.date,
                  }))}
                  scroll={{ x: "max-content" }}
                  style={{ maxWidth: "100%", overflowX: "auto" }}
                />
              </Col>
            </Row>
          </TabPane>

          <TabPane key="powertrain_system_parameters" tab="Параметры силовой установки">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Table
                  bordered
                  pagination={false}
                  columns={columnsPowertrainSystemParameters}
                  dataSource={processedParameters.map(parameter => ({
                    ...parameter.powertrainSystemParameters,
                    date: parameter.date,
                  }))}
                  scroll={{ x: "max-content" }}
                  style={{ maxWidth: "100%", overflowX: "auto" }}
                />
              </Col>
            </Row>
          </TabPane>

          <TabPane key="bzp_commands" tab="Команды блока защиты питания">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Table
                  bordered
                  pagination={false}
                  columns={columnsBzpCommands}
                  dataSource={processedParameters.map(parameter => ({
                    ...parameter.bzpCommands,
                    date: parameter.date,
                  }))}
                  scroll={{ x: "max-content" }}
                  style={{ maxWidth: "100%", overflowX: "auto" }}
                />
              </Col>
            </Row>
          </TabPane>

          <TabPane key="dbk_outputs" tab="Блок рулевой колонки">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Table
                  bordered
                  pagination={false}
                  columns={columnsDbkOutputs}
                  dataSource={processedParameters.map(parameter => ({
                    ...parameter.dbkOutputs,
                    date: parameter.date,
                  }))}
                  scroll={{ x: "max-content" }}
                  style={{ maxWidth: "100%", overflowX: "auto" }}
                />
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      )}
    </>
  );
};

export default ParametersTable;
