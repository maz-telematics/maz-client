import React, { useState } from "react";
import { ContainerList } from "./containersList";
import { DatePickerField } from './datePicker';
import MovingCar from "./movingCar";
import LogsTable from "./logsTable";
const mazIcon = "/mazIcon.png";

const App: React.FC = () => {
  const [containerName, setContainerName] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleContainerSelect = (name: string) => {
    setContainerName(name);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  return (
    <div className="bg-white font-sans min-h-screen relative">
      {/* Фоновая картинка скрывается при выборе контейнера */}
      {!containerName && (
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
      </div>
    </div>
  );
};

export default App;
