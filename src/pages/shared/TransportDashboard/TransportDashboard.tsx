import { useState } from "react";
import { Radio, DatePicker, ConfigProvider } from "antd";
import dayjs, { Dayjs } from "dayjs";
import locale from "antd/es/locale/ru_RU";
import "dayjs/locale/ru";
import ParametersTable from "./ParametersTable";
import ErrorTable from "./ErrorsTable/ErrorsTable";
import Map from "./Map";

const TransportDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(() => {
    const storedDate = localStorage.getItem("selectedDate");
    return storedDate ? dayjs(storedDate) : dayjs();
  });

  const [activeTab, setActiveTab] = useState("map");

  const onTabChange = (e: any) => {
    setActiveTab(e.target.value);
  };

  const onSelectDate = async (date: Dayjs) => {
    setSelectedDate(date);
    localStorage.setItem("selectedDate", date.toISOString());
  };

  const disableFutureDates = (current: Dayjs | null): boolean => {
    return current ? current.isAfter(dayjs().endOf("day")) : false;
  };
  const isMobile = window.innerWidth <= 768;
  return (
    <div style={{ display: "flex", padding: "0 40px", overflowX: "hidden", flexDirection: "column", width: "100%",  backgroundColor: "#E1E1E1" }}>
      <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        flexDirection: isMobile ? "column" : "row", 
      }}
    >
      <Radio.Group
        value={activeTab}
        onChange={onTabChange}
        style={{
          display: "flex",
          flexWrap: isMobile ? "wrap" : "nowrap", 
          marginBottom: isMobile ? "10px" : "0", 
        }}
      >
        <Radio.Button
          value="map"
          style={{
            backgroundColor: activeTab === "map" ? "#1B232A" : "#F7F9FB",
            color: activeTab === "map" ? "#fff" : "#1B232A",
            borderColor: "#1B232A",
            borderRadius: "4px",
            margin: "0 5px",
            transition: "background-color 0.3s, color 0.3s",
            fontSize: isMobile ? "12px" : "14px", 
          }}
        >
          Карта
        </Radio.Button>
        <Radio.Button
          value="params"
          style={{
            backgroundColor: activeTab === "params" ? "#1B232A" : "#F7F9FB",
            color: activeTab === "params" ? "#fff" : "#1B232A",
            borderColor: "#1B232A",
            borderRadius: "4px",
            margin: "0 5px",
            transition: "background-color 0.3s, color 0.3s",
            fontSize: isMobile ? "12px" : "14px",
          }}
        >
          Параметры
        </Radio.Button>
        <Radio.Button
          value="errors"
          style={{
            backgroundColor: activeTab === "errors" ? "#1B232A" : "#F7F9FB",
            color: activeTab === "errors" ? "#fff" : "#1B232A",
            borderColor: "#1B232A",
            borderRadius: "4px",
            margin: "0 5px",
            transition: "background-color 0.3s, color 0.3s",
            fontSize: isMobile ? "12px" : "14px",
          }}
        >
          Ошибки
        </Radio.Button>
      </Radio.Group>
      <ConfigProvider locale={locale}>
        <DatePicker
          placeholder="Выбрать дату"
          format="YYYY-MM-DD"
          value={selectedDate}
          onChange={(date) => date && onSelectDate(date)}
          style={{
            width: isMobile ? "100%" : "270px", 
            fontSize: isMobile ? "12px" : "14px", 
          }}
          disabledDate={disableFutureDates}
        />
      </ConfigProvider>
    </div>
      {activeTab === "map" && (
        <div style={{ width: "100%", height: "75vh", borderRadius: "8px", overflow: "hidden" }}>
          <Map selectedDate={selectedDate} />
        </div>
      )}
      {activeTab === "params" && <ParametersTable selectedDate={selectedDate} />}
      {activeTab === "errors" && <ErrorTable selectedDate={selectedDate} />}
    </div>
  );
};

export default TransportDashboard;
