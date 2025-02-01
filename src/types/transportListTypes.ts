// transportListTypes.ts
export interface Car {
  id: string;
  model: string;
  yearRelease: string; // Год выпуска
  connectionStatus: boolean;
  vehicleType: string;
  engineType: string;
  organizationName: string;
  telemetryBlock?: string;
  organization_id: number;
}

export interface Subscription {
  id: number;
  startDate: string;
  endDate: string;
  status: string;
  type: string;
  id_organization: number;
}

export interface Organization {
  id: number;
  organizationAddress: string;
  contactInfo: string;
  contactPerson: string;
  organizationName: string;
  emailContactPerson: string;
  registrationDate: string; // формат даты в виде строки
  subscriptions: Subscription[]; // массив подписок
}
