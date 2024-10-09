export interface Car {
    id_transport: number;

    organization_id:number;
    model?: string;
    vin?: string;
    year_release?: string;
    engine_type?: string;
    vehicle_type?: string;
    organization?: string;
  }
  
  export interface Organization {
    registration_date: number;
    organization_id: number;
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
