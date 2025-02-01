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

  const [activeTab, setActiveTab] = useState("params");
  const [hoveredButton, setHoveredButton] = useState<string | null>(null); // Состояние для наведения на кнопки

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

  // Функция для определения фона кнопки
  const getButtonBackgroundColor = (value: string) => {
    if (hoveredButton === value) return "#FF0000"; // Красный при наведении
    if (activeTab === value) return "#FF0000"; // Красный, если кнопка активна
    return "#1B232A"; // Стандартный фон
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "0 40px",
        overflowX: "hidden",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#E1E1E1",
      }}
    >
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
    flexDirection: isMobile ? "column" : "row", // Вертикально на мобильных, горизонтально на больших
    width: "100%",
    marginBottom: isMobile ? "10px" : "0",
    gap: isMobile ? "10px" : "0", // Отступы между кнопками на мобильных
  }}
>
  {["params", "map", "errors"].map((tab) => (
    <Radio.Button
      key={tab}
      value={tab}
      style={{
        backgroundColor: getButtonBackgroundColor(tab),
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        margin: isMobile ? "0" : "0 5px", // Убираем боковые отступы на мобильных
        transition: "background-color 0.3s, color 0.3s",
        fontSize: isMobile ? "12px" : "14px",
        width: isMobile ? "100%" : "auto", // Кнопки занимают всю ширину только на мобильных
        textAlign: "center",
        height: "40px", // Фиксированная высота для лучшего вида
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={() => setHoveredButton(tab)}
      onMouseLeave={() => setHoveredButton(null)}
    >
      {tab === "params" ? "Параметры" : tab === "map" ? "Карта" : "Ошибки"}
    </Radio.Button>
  ))}
</Radio.Group>


        {/* <Radio.Group
          value={activeTab}
          onChange={onTabChange}
          style={{
            display: "flex",
            flexWrap: isMobile ? "wrap" : "nowrap",
            marginBottom: isMobile ? "10px" : "0",
          }}
        >
          <Radio.Button
            value="params"
            style={{
              backgroundColor: getButtonBackgroundColor("params"),
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              margin: "0 5px",
              transition: "background-color 0.3s, color 0.3s",
              fontSize: isMobile ? "12px" : "14px",
            }}
            onMouseEnter={() => setHoveredButton("params")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Параметры
          </Radio.Button>

          <Radio.Button
            value="map"
            style={{
              backgroundColor: getButtonBackgroundColor("map"),
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              margin: "0 5px",
              transition: "background-color 0.3s, color 0.3s",
              fontSize: isMobile ? "12px" : "14px",
            }}
            onMouseEnter={() => setHoveredButton("map")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Карта
          </Radio.Button>

          <Radio.Button
            value="errors"
            style={{
              backgroundColor: getButtonBackgroundColor("errors"),
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              margin: "0 5px",
              transition: "background-color 0.3s, color 0.3s",
              fontSize: isMobile ? "12px" : "14px",
            }}
            onMouseEnter={() => setHoveredButton("errors")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Ошибки
          </Radio.Button>
        </Radio.Group> */}

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
