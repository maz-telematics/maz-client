export interface Location {
  latitude: number;
  longitude: number;
  id_transport: number;
  speed: number;
  date: string;
}

export type Parameters = {
  id: number;
  date: string;
  transportId: string;
  batteryParameters: BatteryParameters | {};
  powertrainSystemParameters: PowertrainSystemParameters | {};
  electricSystemParameters: ElectricSystemParameters | {};
  transportAirConditioning: TransportAirConditioning | {};
  transportLighting: TransportLighting | {};
  bzpCommands: BzpCommands | {};
  dbkOutputs: DbkOutputs | {};
};

type BzpCommands = {
  id: number,
  terminal15CcsToEcu: string,
  turnOnCabinPower: string,
  turnOnHeadlightsPower: string,
  turnOnRearLightsPower: string,
  turnOnAirDryerPower: string,
  turnOnLiquidHeaterPower: string,
  turnOnFuelFilterPreheaterCoarseFilter: string,
  turnOnFuelFilterPreheaterFineFilter: string,
  turnOnTrailerPower: string,
  turnOnTrailerPowerAbs: string,
};

type DbkOutputs = {
  id: number,
  runningLightCommand: string,
  alternateBeamHeadLightCommand: string,
  lowBeamHeadLightCommand: string,
  highBeamHeadLightCommand: string,
  tractorFrontFogLightsCommand: string,
  rotatingBeaconLightCommand: string,
  rightTurnSignalLightsCommand: string,
  leftTurnSignalLightsCommand: string,
  centerStopLightCommand: string,
  rightStopLightCommand: string,
  leftStopLightCommand: string,
  implementClearanceLightCommand: string,
  tractorSideLowMountedWorkLightsCommand: string,
  implementOemOption1LightCommand: string,
  implementRightFacingWorkLightCommand: string,
  implementLeftFacingWorkLightCommand: string,
}


type BatteryParameters = {
  id: number;
  batteryMinTemp: number;
  batteryMaxTemp: number;
  batterySoc: number;
  batteryVoltage: number;
  batteryCharging: boolean;
  transportDataId: number;
};

type PowertrainSystemParameters = {
  id: number;
  throttlePosition: number;
  engineTorque: number;
  engineRpm: number;
  gearboxOutputSpeed: number;
  transmissionStatus: boolean;
  vehicleOn: boolean;
  dcdcOn: boolean;
  batteryOn: boolean;
  hydraulicSensorLevel: number;
  coolantSensorLevel: number;
  powerSteeringOn: boolean;
  transportDataId: number;
};

type ElectricSystemParameters = {
  id: number;
  powerConsumptionHydraulic: number;
  powerConsumptionAirCompressor: number;
  powerConsumptionDcdc: number;
  powerConsumptionEngine: number;
  transportDataId: number;
};

type TransportAirConditioning = {
  id: number;
  acOn: string; // Возможно, лучше заменить на boolean, если строка всегда "true" или "false".
  frostSensor: string;
  pressureSensorOn: string;
  outsideAirTempSensor: number;
  airDamperPosition: string;
  transportDataId: number;
};

type TransportLighting = {
  id: number;
  daytimeRunningLights: string; // Аналогично, возможно, лучше заменить на boolean.
  lowBeam: string;
  highBeam: string;
  frontLogLights: string;
  rightTurnSignal: string;
  leftTurnSignal: string;
  sideMakerLights: string;
  rearFogLights: string;
  reverseLights: string;
  rightBrakeLights: string;
  leftBrakeLights: string;
  transportDataId: number;
};




export interface ErrorData {
  data: string;
  description: string;
  error_code: string;
  error_type: string;
  id: number;
  id_transport: number;
}
