export interface Location {
  lantitude: number;
  longitude: number;
  id_transport: number;
  data: string;
}
export interface Parameters {
  main_brake_air_pressure_circuit_1: number;
  main_brake_air_pressure_circuit_2: number;
  data: string;
  id_transport: string;
  total_mileage_car: number;
  total_umber_engine_hours: number;
  fuel_consumption: number;
  fuel_level: string;
  percentage_torque: string;
  percentage_engine_load: string;
  engine_coolant_temperatures: string;
  ambient_air_temperature: string;
}

export interface ErrorData {
  data: string;
  description: string;
  error_code: string;
  error_type: string;
  id: number;
  id_transport: number;
}
