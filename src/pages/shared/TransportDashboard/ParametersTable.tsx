import { Parameters } from "../../../types/carTrackingTypes";
import { Table, Tabs, Row, Col } from "antd";
import { columnsBatteryParameters, columnsBzpCommands, columnsDbkOutputs, columnsElectricSystemParameters, columnsPowertrainSystemParameters, columnsTransportAirConditioning, columnsTransportLighting, } from "./TransportColumns";
const { TabPane } = Tabs;
interface ParametersProps {
  parameters: Parameters[];
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
      batteryParameters: {
        ...parameter.batteryParameters,
        date,
      },
      powertrainSystemParameters: {
        ...parameter.powertrainSystemParameters,
        date,
      },
      electricSystemParameters: {
        ...parameter.electricSystemParameters,
        date,
      },
      transportAirConditioning: {
        ...parameter.transportAirConditioning,
        date,
      },
      transportLighting: {
        ...parameter.transportLighting,
        date,
      },
      bzpCommands: {
        ...parameter.bzpCommands,
        date,
      },
    };
  });
};

const ParametersTable: React.FC<ParametersProps> = ({ parameters }) => {
  const processedParameters = processParameters(parameters);
  return (
    <>
      {processedParameters.map((parameter: Parameters) => (
        <Tabs
          defaultActiveKey="Transport_Status"
          tabPosition="top"
          type="card"
          style={{
            width: "100%",
          }}
          tabBarStyle={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TabPane key="transport_lighting" tab="Освещение транспорта">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Table
                  bordered
                  pagination={false}
                  columns={columnsTransportLighting}
                  dataSource={[{ ...parameter.transportLighting, date: parameter.date }]}
                  scroll={{ x: 'max-content' }}
                  style={{ maxWidth: '100%', overflowX: 'auto' }} 
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
                  dataSource={[{ ...parameter.transportAirConditioning, date: parameter.date }]}
                  scroll={{ x: 'max-content' }} 
                  style={{ maxWidth: '100%', overflowX: 'auto' }} 
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
                  dataSource={[{ ...parameter.batteryParameters, date: parameter.date }]}
                  scroll={{ x: 'max-content' }} 
                  style={{ maxWidth: '100%', overflowX: 'auto' }} 
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
                  dataSource={[{ ...parameter.electricSystemParameters, date: parameter.date }]}
                  scroll={{ x: 'max-content' }} 
                  style={{ maxWidth: '100%', overflowX: 'auto' }} 
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
                  dataSource={[{ ...parameter.powertrainSystemParameters, date: parameter.date }]}
                  scroll={{ x: 'max-content' }} 
                  style={{ maxWidth: '100%', overflowX: 'auto' }} 
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
                  dataSource={[{ ...parameter.bzpCommands, date: parameter.date }]}
                  scroll={{ x: 'max-content' }} 
                  style={{ maxWidth: '100%', overflowX: 'auto' }} 
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
                  dataSource={[{ ...parameter.dbkOutputs, date: parameter.date }]}
                  scroll={{ x: 'max-content' }}
                  style={{ maxWidth: '100%', overflowX: 'auto' }} 
                />
              </Col>
            </Row>
          </TabPane>
        </Tabs>))}
    </>
  );
};

export default ParametersTable;