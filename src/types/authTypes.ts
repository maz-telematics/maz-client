export interface AuthContextIntarface {
    isAuthenticated: boolean;
    token: string | null;
    logout: () => void;
    role: string | null;
  }
  export interface RegistrationForm {
    organizationName: string;
    phoneNumber: string;
    contactPerson: string;
    organizationAdress:string;
    email: string;
    password: string;
  }

  export interface User{
    id:number
    role:string,
    name:string,
    token:string
  }