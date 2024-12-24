export interface Car {
    id: number;
    organization_id:number;
    model?: string;
    vin?: string;
    year_release?: string;
    engineType?: string;
    vehicleType?: string;
    organizationName?: string;
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
