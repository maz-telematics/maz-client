import { Parameters } from "../../../types/carTrackingTypes";
import { ParametersResponce } from "../../../types/carTrackingTypes";
import { Pagination, Tabs, Row, Col } from "antd";
const { TabPane } = Tabs;
import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import DescriptionsDbkOutputs from "./DescriptionDbkOutputs";
import DescriptionsAirConditioningParameters from "./DescriptionsAirConditioningParameters";
import DescriptionsBatteryParameters from "./DescriptionsBatteryParameters";
import DescriptionsBzpCommands from "./DescriptionsBzpCommandsProps";
import DescriptionsElectricSystemParameters from "./DescriptionsElectricSystemParameters";
import DescriptionsLightingParameters from "./DescriptionsLightingParameters";
import DescriptionsPowertrainSystemParameters from "./DescriptionsPowertrainSystemParameters";
import dayjs, { Dayjs } from "dayjs";
import { fetchTransportParameters } from "../../../Store/apis/transportParameter";
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
  const [totalPages, setTotalPages] = useState<number>(0); 
  const [currentPage, setCurrentPage] = useState(1); 
  const id = sessionStorage.getItem("id");
  const isCurrentDay = (date: Dayjs | null): boolean => {
    return date ? date.isSame(dayjs(), "day") : false;
  };
  
  const getParameters = async (
    id: string,
    date: string,
    page: number
  ): Promise<ParametersResponce> => {
    try {
      // Проверяем наличие id и date
      if (!id || !date) {
        return { data: [], totalPages: 0, currentPage: 0 };
      }
  
      // Указываем тип данных, ожидаемых от axios
      const response = await axiosInstance.get<ParametersResponce>(
        `/transport/parameters/${id}`,
        {
          params: { date, page },
        }
      );
      // Возвращаем данные в формате ParametersResponce
      return response.data;
    } catch (error) {
      console.error("Error fetching parameters:", error);
  
      // Возвращаем пустой объект ParametersResponce в случае ошибки
      return { data: [], totalPages: 0, currentPage: 0 };
    }
  };
  
  const fetchAndProcessParameters = async () => {
    if (!id || !selectedDate) return;
  
    try {
      const dateStr = selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  
      // Используем состояние currentPage
      const { data, totalPages } = await getParameters(id, dateStr, currentPage);
  
      console.log("data", data);
      console.log("totalPages", totalPages);
  
      setTotalPages(totalPages); // Обновляем общее количество страниц
      const processed = processParameters(data); // Обрабатываем данные
      setProcessedParameters(processed);
      console.log("processedParameters", processed);
    } catch (error) {
      console.error("Error fetching or processing parameters:", error);
    }
  };
  
  useEffect(() => {
    if (!id) return;
  
    if (isCurrentDay(selectedDate)) {
      fetchTransportParameters(currentPage, id)
        .then((data) => {
          setTotalPages(data.totalPages);
          const processed = processParameters(data.data);
          console.log("data",data)
          setProcessedParameters(processed);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      fetchAndProcessParameters();
    }
  }, [id, selectedDate, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page); 
  };

  return (
    <>
      {processedParameters.length > 0 && (
        <Tabs defaultActiveKey="transport_lighting" tabPosition="top" type="card" style={{ width: "100%" }} className="custom-tabs">
          
          <TabPane key="transport_lighting" tab="Освещение транспорта">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <DescriptionsLightingParameters
                  data={processedParameters.map(parameter => ({
                    ...parameter.transportLighting,
                    date: parameter.date,
                  }))} />
              </Col>
            </Row>
          </TabPane>

          <TabPane key="transport_air_conditioning" tab="Система кондиционирования транспорта">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <DescriptionsAirConditioningParameters
                  data={processedParameters.map(parameter => ({
                    ...parameter.transportAirConditioning,
                    date: parameter.date,
                  }))} />
              </Col>
            </Row>
          </TabPane>

          <TabPane key="battery_parameters" tab="Параметры батареи">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <DescriptionsBatteryParameters
                  data={processedParameters.map(parameter => ({
                    ...parameter.batteryParameters,
                    date: parameter.date,
                  }))} />
              </Col>
            </Row>
          </TabPane>

          <TabPane key="electric_system_parameters" tab="Параметры электрической системы">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <DescriptionsElectricSystemParameters
                  data={processedParameters.map(parameter => ({
                    ...parameter.electricSystemParameters,
                    date: parameter.date,
                  }))} />
              </Col>
            </Row>
          </TabPane>

          <TabPane key="powertrain_system_parameters" tab="Параметры силовой установки">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <DescriptionsPowertrainSystemParameters
                  data={processedParameters.map(parameter => ({
                    ...parameter.powertrainSystemParameters,
                    date: parameter.date,
                  }))} />
              </Col>
            </Row>
          </TabPane>

          <TabPane key="bzp_commands" tab="Команды блока защиты питания">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <DescriptionsBzpCommands
                  data={processedParameters.map(parameter => ({
                    ...parameter.bzpCommands,
                    date: parameter.date,
                  }))} />
              </Col>
            </Row>
          </TabPane>

          <TabPane key="dbk_outputs" tab="Блок рулевой колонки">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <DescriptionsDbkOutputs
                  data={processedParameters.map(parameter => ({
                    ...parameter.dbkOutputs,
                    date: parameter.date,
                  }))} />
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
          paddingBottom: "16px",
        }}
      >
       <Pagination
  current={currentPage}
  total={totalPages * 10}
  onChange={handlePageChange}
  pageSize={10}
  style={{ marginTop: 20, textAlign: "center" }}
/>
      </div>
    </>
  );
};

export default ParametersTable;
