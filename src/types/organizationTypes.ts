export interface Car {
  id: string; // VIN номер
  model: string; // Модель
  year_release: number; // Год выпуска
  organizationName: string; // Организация
  vehicleType: string; // Тип транспорта
  engineType: string; // Тип двигателя
  organization_id: number; // ID организации
  connectionStatus?: boolean; // Состояние (наличие связи)
  telemetryBlock?: string; // Блок телематики
}
