import { ReactNode } from "react";

export interface UserProviderProps {
  children: ReactNode;
}

export interface Role {
  id: number;
  name: string;
  __entity: string;
}

export interface Status {
  id: number;
  name: string;
  __entity: string;
}
export interface UserInfo {
  id: string;
  email: string;
  phone: string;
  provider: string;
  socialId: null | string;
  firstName: string;
  lastName: string;
  createdAt: string;
  role: Role;
  status: Status;
  __entity: string;
 
  updateUserInfo: () => Promise<void>;
}
