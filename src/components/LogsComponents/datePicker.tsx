import React, { useState, useCallback } from "react";
import { Table, Card, DatePicker, Row, Col, Select, Button } from 'antd';

interface DatePickerFieldProps {
  onDateSelect: (date: Date) => void;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    setSelectedDate(dateValue);

    if (dateValue) {
      const dateObject = new Date(dateValue);
      onDateSelect(dateObject); // Вызываем функцию при выборе даты
    }
  }, [onDateSelect]);

  return (
    <div>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="text-lg w-[220px] h-[40px] rounded bg-white text-gray-800 border border-gray-300 p-2 cursor-pointer appearance-none hover:border-[#633737] focus:border-[#550000] focus:shadow-[0_0_5px_rgba(126,0,0,0.5)]"
      />
    </div>
  );
};