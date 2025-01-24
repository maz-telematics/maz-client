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

export interface ParametersResponce{
   data: Parameters[];
   totalPages: number;
   currentPage:number;
}

type BzpCommands = {
  id: number,
  time:string,
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


export type BatteryParameters = {
  id: number;
  time:string,
  batteryMinTemp: number;
  batteryMaxTemp: number;
  batterySoc: number;
  batteryVoltage: number;
  batteryCharging: string;
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
  acOn: string; 
  frostSensor: string;
  pressureSensorOn: string;
  outsideAirTempSensor: number;
  airDamperPosition: string;
  transportDataId: number;
};

type TransportLighting = {
  id: number;
  daytimeRunningLights: string; 
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


interface ErrorItem {
  id: number;
  parameterNumber: string;
  status: string;
  quantity: number;
  errorsPackage: number;
}

export interface ErrorData {
  errors: ErrorItem[];
  date: string | number; 
  device: string;
  lamp1: string;
  lamp2: string;
  lamp3: string;
  lamp4: string;
}
export interface ErrorDataResponse {
  data: ErrorData[];
  totalPages: number;
  currentPage: number;
}


