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

  
  export interface Organization {
    registration_date: number;
    id: number;
    contact_person: string;
    organization_address: string;
    organization_name: string;
    email_contact_person: string;
    contact_info: string;
    status:boolean;
    created_at: string;
    subscription_start: string;
    subscription_end: string;
  }    
