import { useState } from "react";
import { Tabs, DatePicker, ConfigProvider } from "antd";
import dayjs, { Dayjs } from "dayjs";
import locale from "antd/es/locale/ru_RU";
import "dayjs/locale/ru";
import ParametersTable from "./ParametersTable";
import ErrorTable from "./ErrorsTable";
import Map from "./Map";

const TransportDashboard = () => {
    const [selectedDate, setSelectedDate] = useState<Dayjs>(() => {
    const storedDate = localStorage.getItem("selectedDate");
    return storedDate ? dayjs(storedDate) : dayjs(); // Текущая дата по умолчанию
  });

    const onSelectDate = async (date: Dayjs) => {
    setSelectedDate(date);
    localStorage.setItem("selectedDate", date.toISOString());
  };
  const disableFutureDates = (current: Dayjs | null): boolean => {
    return current ? current.isAfter(dayjs().endOf("day")) : false;
  };
  return (
    <div style={{ display: "flex", padding: "40px", overflowX: "hidden", flexDirection: "column", width: "100%", height:"90vh",backgroundColor: "#F0F4F8" }}>
               <ConfigProvider locale={locale}>
                 <DatePicker
                   placeholder="Выбрать дату"
                   format="YYYY-MM-DD"
                 value={selectedDate}
                  onChange={(date) => date && onSelectDate(date)}
                   style={{ width: "270px", marginTop: "10px" }}
                   disabledDate={disableFutureDates}
                 />
               </ConfigProvider>
      <Tabs defaultActiveKey="map" type="card" style={{ marginTop: "20px" }}>
        <Tabs.TabPane key="map" tab="Карта">
         
          <div style={{ width: "100%", height: "75vh", borderRadius: "8px", overflow: "hidden" }}>
          <Map selectedDate={selectedDate} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane key="params" tab="Параметры">
          <ParametersTable selectedDate={selectedDate} />
        </Tabs.TabPane>
        <Tabs.TabPane key="errors" tab="Ошибки">
          <ErrorTable selectedDate={selectedDate} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default TransportDashboard;
