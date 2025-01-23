// import {Parameters } from "../../../types/carTrackingTypes";
// import { Tabs, Row, Col } from "antd";
// const { TabPane } = Tabs;
// import { useEffect, useState } from "react";
// import axiosInstance from "../../../services/axiosInstance";
// import { Dayjs } from "dayjs";
// import DescriptionsBatteryParameters from "./DescriptionsBatteryParameters";
// import DescriptionsElectricSystemParameters from "./DescriptionsElectricSystemParameters";
// import DescriptionsBzpCommands from "./DescriptionsBzpCommandsProps";
// import DescriptionsPowertrainSystemParameters from "./DescriptionsPowertrainSystemParameters";
// import DescriptionsAirConditioningParameters from "./DescriptionsAirConditioningParameters";
// import DescriptionsLightingParameters from "./DescriptionsLightingParameters";
// import DescriptionsDbkOutputs from "./DescriptionDbkOutputs";

// interface ParametersProps {
//   selectedDate: Dayjs | null;
// }

// const processParameters = (parameters: Parameters[]): Parameters[] => {
//   if (!parameters || parameters.length === 0) {
//     return [{
//       transportLighting: {},
//       transportAirConditioning: {},
//       batteryParameters: {}, 
//       electricSystemParameters: {},
//       powertrainSystemParameters: {},
//       bzpCommands: {},
//       id: 0,
//       date: "",
//       transportId: "",
//       dbkOutputs: {}
//     }];
//   }
//   return parameters.map(parameter => {
//     const { date } = parameter;
//     return {
//       ...parameter,
//       batteryParameters: { ...parameter.batteryParameters, time: date },
//       powertrainSystemParameters: { ...parameter.powertrainSystemParameters, time: date },
//       electricSystemParameters: { ...parameter.electricSystemParameters, time: date },
//       transportAirConditioning: { ...parameter.transportAirConditioning, time: date },
//       transportLighting: { ...parameter.transportLighting, time: date },
//       bzpCommands: { ...parameter.bzpCommands, time: date },
//     };
//   });
// };

// const filterParametersByGroup = <T extends Record<string, any>>(
//   parameters: Parameters[],
//   groupKey: keyof Parameters
// ): T[] => {
//   return parameters.map((parameter) => {
//     const groupData = parameter[groupKey];

//     if (typeof groupData === "object" && groupData !== null) {
//       return { ...groupData } as T; 
//     }

//     return {} as T;
//   });
// };


// const ParametersTable: React.FC<ParametersProps> = ({ selectedDate }) => {
//   const [processedParameters, setProcessedParameters] = useState<any[]>([]);
//   const id = sessionStorage.getItem("id");
//   const user = localStorage.getItem("user");


//   const getParameters = async (id: string, date: string): Promise<[]> => {
//     try {
//       if (!id || !date) return [];
//       const response = await axiosInstance.get(`/transport/parameters/${id}`, {
//         params: { date }
//       });
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       return [];
//     }
//   };

//   useEffect(() => {
//     const fetchAndProcessParameters = async () => {
//       if (!id || !selectedDate) return;

//       try {
//         const dateStr = selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
//         const data = await getParameters(id, dateStr);
//         const processed = processParameters(data);
//         const powertrainData = filterParametersByGroup(processed, "batteryParameters");

//         console.log("data",data)
//         console.log("processed",processed)
//         console.log("filter",powertrainData);
//         setProcessedParameters(processed);
//       } catch (error) {
//         console.error("Error fetching or processing parameters:", error);
//       }
//     };

//     fetchAndProcessParameters();
//   }, [user, selectedDate]); 

//   return (
//     <>
//       {processedParameters.length > 0 && (
//         <Tabs defaultActiveKey="transport_lighting" tabPosition="top" type="card" style={{ width: "100%" }}>
//           <TabPane key="transport_lighting" tab="Освещение транспорта">
//             <Row gutter={[16, 16]}>
//               <Col span={24}>
//                 <DescriptionsLightingParameters data={processedParameters.map(parameter => ({
//                     ...parameter.transportLighting,
//                     date: parameter.date,
//                   }))}/>
//               </Col>
//             </Row>
//           </TabPane>

//           <TabPane key="transport_air_conditioning" tab="Система кондиционирования транспорта">
//             <Row gutter={[16, 16]}>
//               <Col span={24}>
//                 <DescriptionsAirConditioningParameters data={processedParameters.map(parameter => ({
//                     ...parameter.transportAirConditioning,
//                     date: parameter.date,
//                   }))}/>
//               </Col>
//             </Row>
//           </TabPane>

//           <TabPane key="battery_parameters" tab="Параметры батареи">
//             <Row gutter={[16, 16]}>
//               <Col span={24}>
//                 <DescriptionsBatteryParameters data={processedParameters.map(parameter => ({
//                     ...parameter.batteryParameters,
//                     date: parameter.date,
//                   }))} />
//               </Col>
//             </Row>
//           </TabPane>

//           <TabPane key="electric_system_parameters" tab="Параметры электрической системы">
//             <Row gutter={[16, 16]}>
//               <Col span={24}>
//                  <DescriptionsElectricSystemParameters data={processedParameters.map(parameter => ({
//                     ...parameter.electricSystemParameters,
//                     date: parameter.date,
//                   }))} />
//               </Col>
//             </Row>
//           </TabPane>

//           <TabPane key="powertrain_system_parameters" tab="Параметры силовой установки">
//             <Row gutter={[16, 16]}>
//               <Col span={24}>
//                 <DescriptionsPowertrainSystemParameters data={processedParameters.map(parameter => ({
//                     ...parameter.powertrainSystemParameters,
//                     date: parameter.date,
//                   }))}/>
//               </Col>
//             </Row>
//           </TabPane>

//           <TabPane key="bzp_commands" tab="Команды блока защиты питания">
//             <Row gutter={[16, 16]}>
//               <Col span={24}>
//                   <DescriptionsBzpCommands data={processedParameters.map(parameter => ({
//                     ...parameter.bzpCommands,
//                     date: parameter.date,
//                   }))} />
//               </Col>
//             </Row>
//           </TabPane>

//           <TabPane key="dbk_outputs" tab="Блок рулевой колонки">
//             <Row gutter={[16, 16]}>
//               <Col span={24}>
//                 <DescriptionsDbkOutputs data={processedParameters.map(parameter => ({
//                     ...parameter.dbkOutputs,
//                     date: parameter.date,
//                   }))}/>
//               </Col>
//             </Row>
//           </TabPane>
//         </Tabs>
//       )}
//     </>
//   );
// };

// export default ParametersTable;

import { Parameters } from "../../../types/carTrackingTypes";
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
import { Dayjs } from "dayjs";
// Импорт остальных компонентов и библиотек

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
  const [totalPages, setTotalPages] = useState(0); // Общее количество страниц
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const id = sessionStorage.getItem("id");

  const getParameters = async (id: string, date: string, page: number): Promise<{ data: Parameters[], totalPages: number }> => {
    try {
      if (!id || !date) return { data: [], totalPages: 0 };
      const response = await axiosInstance.get(`/transport/parameters/${id}`, {
        params: { date, page }
      });
      return {
        data: response.data,
        totalPages: response.data.totalPages, // Общее количество страниц
      };
    } catch (error) {
      console.error(error);
      return { data: [], totalPages: 0 };
    }
  };

  useEffect(() => {
    const fetchAndProcessParameters = async () => {
      if (!id || !selectedDate) return;

      try {
        const dateStr = selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
        const { data, totalPages } = await getParameters(id, dateStr, currentPage);
        const processed = processParameters(data);
        setProcessedParameters(processed);
        setTotalPages(totalPages); // Устанавливаем общее количество страниц
      } catch (error) {
        console.error("Error fetching or processing parameters:", error);
      }
    };

    fetchAndProcessParameters();
  }, [id, selectedDate, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Меняем текущую страницу
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
          total={totalPages} 
          onChange={handlePageChange}
          pageSize={10} // Размер страницы
          style={{ marginTop: 20, textAlign: "center" }}
        />
      </div>
    </>
  );
};

export default ParametersTable;
