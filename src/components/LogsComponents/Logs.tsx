import React, { useState } from "react";
import { ContainerList } from "./containersList";
import { DatePickerField } from './datePicker';
import MovingCar from "./movingCar";
import LogsTable from "./logsTable";
import { Row, Col } from "antd";
const mazIcon = "/mazIcon.png";

const Logs: React.FC = () => {
  const [containerName, setContainerName] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleContainerSelect = (name: string) => {
    setContainerName(name);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
  };
  const isMobile = window.innerWidth < 768;
  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      backgroundColor: "#E1E1E1",
    }}
    >
        <Row
              style={{
                padding: isMobile ? "0 20px" : "0 40px" ,
                flex: '1',
              }}
            >
              <Col xs={24}>
              <Row justify="space-between" style={{ marginBottom: 16, alignItems: 'flex-end' }}>
                  <Col>
                    <h1
                      style={{
                        margin: 0,
                        fontSize: isMobile ? '24px' : '32px',
                      }}
                    >Логи</h1>
                  </Col>
                </Row>
      {/* Фоновая картинка скрывается при выборе контейнера */}


      {/* {!containerName && (
        <img
          src={mazIcon}
          alt="Background"
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 w-[400px] h-auto"
        />
      )}

      <div className="fixed bg-white w-full top-0 left-0">
        <div className="flex flex-row gap-[70px] justify-between relative main_structure pt-6 pl-8 mb-4">
          <div className="containerList">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Docker Контейнеры</h1>
            <ContainerList onContainerSelect={handleContainerSelect} />
          </div>
          <div className="datePicker">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Выберите дату</h1>
            <DatePickerField onDateSelect={handleDateSelect} />
          </div>
          <MovingCar />
        </div>
        <hr className="border-t-2 border-red-500 w-full" />
      </div>

      <div className="mt-[180px] mb-[20px]">
        {containerName && <LogsTable containerName={containerName} date={selectedDate} />}
      </div> */}

      </Col>
          </Row>
    </div>
      
  );
};

export default Logs;
