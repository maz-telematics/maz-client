import { Parameters } from "../../../types/carTrackingTypes";
import { ParametersResponce } from "../../../types/carTrackingTypes";
import { Pagination, Tabs, Row, Col, Checkbox, Spin } from "antd";
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
      dbkOutputs: { ...parameter.dbkOutputs, time: date },
    };
  });
};


const ParametersTable: React.FC<ParametersProps> = ({ selectedDate }) => {
  const [processedParameters, setProcessedParameters] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const id = sessionStorage.getItem("id");
  const [loading, setLoading] = useState<boolean>(false);
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
      return { transportData: [], totalPages: 0, currentPage: 0 };
    }
  };

  const fetchAndProcessParameters = async () => {
    if (!id || !selectedDate) return;
    setLoading(true);
    try {
      const dateStr = selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");

      // Используем состояние currentPage
      const { transportData, totalPages } = await getParameters(id, dateStr, currentPage);

      console.log("data", transportData);
      console.log("totalPages", totalPages);

      setTotalPages(totalPages); // Обновляем общее количество страниц
      const processed = processParameters(transportData); // Обрабатываем данные
      setProcessedParameters(processed);
      console.log("processedParameters", processed);
    } catch (error) {
      console.error("Error fetching or processing parameters:", error);
    }finally {
      setLoading(false); // Завершаем загрузку
    }
  };

  // useEffect(() => {
  //   if (!id) return;

  //   if (isCurrentDay(selectedDate)) {
      
  //     fetchTransportParameters(currentPage, id)
  //       .then((data) => {
  //         setTotalPages(data.totalPages);
  //         const processed = processParameters(data.transportData);
  //         console.log("data", data)
  //         setProcessedParameters(processed);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   } else {
  //     fetchAndProcessParameters();
  //   }
  // }, [id, selectedDate, currentPage]);

  useEffect(() => {
    if (!id) return;
  
    setLoading(true); // Включаем спиннер при начале загрузки
  
    const fetchData = async () => {
      try {
        if (isCurrentDay(selectedDate)) {
          const data = await fetchTransportParameters(currentPage, id);
          setTotalPages(data.totalPages);
          const processed = processParameters(data.transportData);
          console.log("data", data);
          setProcessedParameters(processed);
        } else {
          await fetchAndProcessParameters(); // Ожидаем выполнения другой асинхронной функции
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Отключаем спиннер после завершения загрузки
      }
    };
  
    fetchData(); // Запуск функции для получения данных
  }, [id, selectedDate, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const isMobile = window.innerWidth < 768;
  return (
    <>{loading ? ( // Отображаем спиннер, если загрузка идет
      <Spin
        size="large"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          width: "100%",
        }}
      />
    ) : 
    (<>
      {processedParameters.length > 0 && (
        <Tabs
          defaultActiveKey="battery_parameters"
          tabPosition="top"
          type="card"
          style={{ width: "100%", overflowX: isMobile ? "auto" : "visible" }}
          className="custom-tabs"
          tabBarStyle={{
            fontSize: isMobile ? "12px" : "14px",
            whiteSpace: isMobile ? "nowrap" : "normal",
            overflowX: isMobile ? "auto" : "visible",
          }}
        >
          <TabPane key="battery_parameters" tab="Параметры батареи">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <DescriptionsBatteryParameters
                  data={processedParameters.map(parameter => ({
                    ...parameter.batteryParameters,
                    date: parameter.date,
                  }))}
                />
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
                  }))}
                />
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
                  }))}
                />
              </Col>
            </Row>
          </TabPane>

          <TabPane key="transport_lighting" tab="Освещение транспорта">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <DescriptionsLightingParameters
                  data={processedParameters.map(parameter => ({
                    ...parameter.transportLighting,
                    date: parameter.date,
                  }))}
                />
              </Col>
            </Row>
          </TabPane>

          <TabPane key="transport_air_conditioning" tab="Система кондиционирования">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <DescriptionsAirConditioningParameters
                  data={processedParameters.map(parameter => ({
                    ...parameter.transportAirConditioning,
                    date: parameter.date,
                  }))}
                />
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
                  }))}
                />
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
                  }))}
                />
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
          width: "100%",
        }}
      >
        <Pagination
          current={currentPage}
          total={totalPages * 10}
          onChange={handlePageChange}
          pageSize={10}
          showSizeChanger={false}
          style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: isMobile ? "12px" : "14px", // Уменьшаем шрифт на мобильных
          }}
          responsive={true} // Адаптивный режим
          showLessItems={isMobile} // Меньше кнопок на мобильных
          itemRender={(page, type, originalElement) => {
            if (isMobile) {
              if (type === "prev") return <span>«</span>;
              if (type === "next") return <span>»</span>;
            }
            return originalElement;
          }}
        />
      </div>
    </>
 )}
</>
  );
};

export default ParametersTable;
