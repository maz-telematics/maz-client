import { Dispatch, SetStateAction, ReactNode } from "react";

import { FormInstance } from "antd";
import { DefaultOptionType } from "antd/es/select";

export interface ColumnFilterProps<T> {
  setItems: Dispatch<SetStateAction<T[]>>;
  filterProperty: keyof T;
  initialItems: T[];
}

export interface QueryInputTableProps<T> {
  filterProperty: keyof T;
  fetchData: ({ page, limit }: UrlParameters) => void;
  placeholder?: string;
}

export interface UserProfileFormProps {
  userInfo: UserProfileData;
  userId: string;
  passwordIsResetting: boolean;
  setPasswordIsResetting: Dispatch<SetStateAction<boolean>>;
}

export interface FormValues {
  [key: string]: string | number;
}

export interface UserProfileRequestBody {
  [key: string]: string | UserProfileRoleOrStatus | undefined;
  email?: string;
  phone?: string;
  role?: UserProfileRoleOrStatus;
  status?: UserProfileRoleOrStatus;
}

export interface LinkFormProps {
  form: FormInstance;
  link: string;
}

export interface UsersTableProps {
  isLoading: boolean;
  url: string;
  users: UsersTableTypes[];
  setUsers: Dispatch<SetStateAction<UsersTableTypes[]>>;
  usersAmount?: number;
  setUsersAmount: Dispatch<SetStateAction<number>>;
  urlParameters: UrlParameters;
  set_urlParameters: Dispatch<SetStateAction<UrlParameters>>;
  blockUserTrigger: boolean;
  setBlockUserTrigger: Dispatch<SetStateAction<boolean>>;
}

export interface UserProfileRoleOrStatus {
  id: number;
}

export interface UsersTable {
  [key: string]: string | ReactNode | object;
  phone: string;
  email: string;
  role: string;
  status: Status;
  key: string;
  action: ReactNode;
  user: User;
}

type Status = "Active" | "Blocked" | "Inactive";

export interface UsersQueryResult {
  limit: number;
  page: number;
  total: number;
  users: User[];
}

export interface CompaniesQueryResult {
  limit: number;
  page: number;
  total: number;
  partners: Company[];
}

export interface UserQueryResult {
  firstName: string;
  lastName: string;
  phone: string;
  company: string;
  email: string;
  role: {
    name: string;
  };
  id: string;
  createdAt: string;
  status: {
    name: string;
    id: number;
  };
}

export interface User {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: {
    name: string;
  };
  status: {
    name: "Active" | "Blocked" | "Inactive";
  };
  id: string;
}

export interface ColumnSelectProps<T> {
  setItems: Dispatch<SetStateAction<T[]>>;
  filterProperty: keyof T;
  initialItems: T[];
  options: DefaultOptionType[];
}

export interface CompaniesTableTypes {
  id: string;
  name: ReactNode;
  phone: string;
  email: string;
  status: Status;
  key: string;
}

export interface Company {
  [key: string]: string | object | ReactNode;
  name: string;
  id: string;
  user: {
    id: string;
    email: string;
    phone: string;
    status: {
      name: Status;
    };
  };
}

export interface MobileCompaniesFilterBackendProps<T> {
  setUsers: React.Dispatch<React.SetStateAction<T[]>>;
  initialUsersState: T[];
  urlParameters: UrlParameters;
  set_urlParameters: React.Dispatch<React.SetStateAction<UrlParameters>>;
  url: string;
  filters: string[];
  type: "Users" | "Companies";
}

export interface UrlParameters {
  page: number;
  limit: number;
}

export interface CompaniesCardsProps {
  companies: CompaniesTableTypes[];
  setCompanies: Dispatch<SetStateAction<CompaniesTableTypes[]>>;
  initialCompanies: CompaniesTableTypes[];
  urlParameters: UrlParameters;
  set_urlParameters: Dispatch<SetStateAction<UrlParameters>>;
  setCompaniesAmount: Dispatch<SetStateAction<number>>;
  url: string;
  filters: string[];
}

export interface CompaniesTableTypes {
  id: string;
  name: ReactNode;
  phone: string;
  email: string;
  status: Status;
  key: string;
}

export interface CompaniesSearchProps<T> {
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  initialItems: T[];
  filter: string;
  urlParameters: UrlParameters;
  set_urlParameters: React.Dispatch<React.SetStateAction<UrlParameters>>;
  url: string;
}

export interface CompaniesTableProps {
  isLoading: boolean;
  setCompaniesAmount: Dispatch<SetStateAction<number>>;
  urlParameters: UrlParameters;
  set_urlParameters: Dispatch<SetStateAction<UrlParameters>>;
  actualCompanies: CompaniesTableTypes[];
  setActualCompanies: Dispatch<SetStateAction<CompaniesTableTypes[]>>;
  initialCompanies: CompaniesTableTypes[];
  companiesAmount: number;
}

export interface MobileUsersFilterFrontendProps {
  tableDrivers: UsersTable[];
  setTableDrivers: Dispatch<SetStateAction<UsersTable[]>>;
  initialDrivers: UsersTable[];
  filters: string[];
  setBlockUserTrigger: Dispatch<SetStateAction<boolean>>;
  blockUserTrigger: boolean;
}

export interface DriverCardsProps {
  tableDrivers: UsersTable[];
  setTableDrivers: Dispatch<SetStateAction<UsersTable[]>>;
  initialDrivers: UsersTable[];
  filters: string[];
  blockUserTrigger: boolean;
  setBlockUserTrigger: Dispatch<SetStateAction<boolean>>;
}

export interface CompanyProfileFormProps {
  tableCompanyInfo: TableCompanyInfo;
  companyId: string | undefined;
}

export interface TableCompanyInfo {
  [key: string]: string | undefined;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  zip: string;
  iban: string;
  nip: string;
  key: string;
}

export interface CompanyProfileFormMobileProps {
  formItems: {
    name: string;
    label: string;
  }[];
  tableCompanyInfo: TableCompanyInfo;
}

export interface Driver {
  id: string;
  pesel: string;
  city: string;
  iban: string;
  user: User;
}

export interface UsersTableTypes {
  [key: string]: string | object | ReactNode;
  phone: string;
  email?: string;
  role: string;
  action: ReactNode;
  status: Status;
  key: string;
}

export interface MobileUsersSortProps<T> {
  setUsers: React.Dispatch<React.SetStateAction<T[]>>;
  initialUsersState: T[];
  urlParameters: UrlParameters;
  set_urlParameters: React.Dispatch<React.SetStateAction<UrlParameters>>;
  url: string;
  filters: string[];
  blockUserTrigger: boolean;
  setBlockUserTrigger: Dispatch<SetStateAction<boolean>>;
}

export interface ColumnTitleProps<T> {
  id: string;
  defaultMessage: string;
  children?: React.ReactElement<ChildrenWithProps<T>> | null;
}

export interface UserProfileData {
  [key: string]: string;
  name: string;
  phone: string;
  company: string;
  email: string;
  role: string;
  createdAt: string;
  status: string;
  key: string;
}

export interface ChildrenWithProps<T> {
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  initialItems: T[];
  options: {
    value: number;
    label: string;
  }[];
  filter: string;
  urlParameters: UrlParameters;
  set_urlParameters: React.Dispatch<React.SetStateAction<UrlParameters>>;
}

export interface UserDataProps {
  drivers: Driver[] | undefined;
  setDrivers: Dispatch<SetStateAction<Driver[] | undefined>>;
}

export interface UsersFilterSelectProps<T> {
  setUsers: React.Dispatch<React.SetStateAction<T[]>>;
  filter: string;
  urlParameters: UrlParameters;
  set_urlParameters: React.Dispatch<React.SetStateAction<UrlParameters>>;
  blockUserTrigger: boolean;
  setBlockUserTrigger: Dispatch<SetStateAction<boolean>>;
  setUsersAmount: Dispatch<SetStateAction<number>>;
}

export interface UsersSearchProps<T> {
  type: "Users" | "Companies";
  setUsers: React.Dispatch<React.SetStateAction<T[]>>;
  filter: string;
  urlParameters: UrlParameters;
  set_urlParameters: React.Dispatch<React.SetStateAction<UrlParameters>>;
  setUsersAmount: React.Dispatch<React.SetStateAction<number>>;
  blockUserTrigger?: boolean;
  setBlockUserTrigger?: Dispatch<SetStateAction<boolean>>;
}

export interface UsersCardsProps {
  users: UsersTableTypes[];
  setUsers: React.Dispatch<React.SetStateAction<UsersTableTypes[]>>;
  initialUsersState: UsersTableTypes[];
  urlParameters: UrlParameters;
  set_urlParameters: React.Dispatch<React.SetStateAction<UrlParameters>>;
  url: string;
  filters: string[];
  blockUserTrigger: boolean;
  setBlockUserTrigger: Dispatch<SetStateAction<boolean>>;
}

export interface GeneretionLinkModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addNewUserTrigger: boolean;
  setAddNewUserTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface RoleInfo {
  id: number | null | undefined;
  name: string;
}

export interface UsersQueryParams {
  page: number;
  limit: number;
  role?: number;
  name?: string;
  phone?: string;
}

export interface CompaniesQueryParams {
  page: number;
  limit: number;
  name?: string;
  phone?: string;
  email?: string;
}

export interface BlockUserBody {
  id: string;
  body: {
    status: {
      id: number;
      name: Status;
    };
  };
}

export interface AddNewUserBody {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  password: string;
  role: RoleInfo;
  status: {
    id: number;
    name: Status;
  };
}

export interface InvitationLinkBody {
  email: string;
  expiredAt: string;
}

export interface ErrorResponse {
  data: {
    errors: Record<string, string>;
  };
}

export interface Driver {
  id: string;
  role: {
    name: string;
  };
  phone: string;
  email: string;
  status: {
    name: string;
  };
}

export interface PartnerQueryResult {
  id: string;
  name: string;
  email: string;
  phone: string;
  nip: string;
  web: string;
  iban: string;
  address: string;
  city: string;
  zip: string;
  drivers: Driver[];
}

export interface ICarPartner {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  web?: string;
  iban?: string;
  nip?: string;
  city?: string;
  address?: string;
  zip?: string;
  createdAt?: string;
}

export interface ISingleCar {
  id?: string;
  vendor?: string;
  model?: string;
  VIN?: string;
  regNumber?: string;
  regDate?: string;
  seats?: number;
  keys?: number;
  fuel?: string;
  owner?: string;
  tyer?: string;
  city?: string;
  partner?: ICarPartner;
  driver?: { id?: string };
  plateNumber?: string;
}

export interface ISingleCarInsurance {
  id?: number;
  company?: string;
  policy?: string;
  type?: string;
  createdAt?: string;
  expiredAt?: string;
  car?: string;
  __entity?: string;
}

export interface ICarDataDriver {
  name: string;
  id?: string;
  defaultMessage?: string;
  form: FormInstance;
  value?: string | undefined;
  editDriverBtn?: boolean;
  isDisabled?: boolean;
  currentCarId?: string;
  currentDriverId?: string;
  copyButton?: boolean;
}

export interface CarDataFormInputTypes {
  name: string;
  id?: string;
  defaultMessage?: string;
  form: FormInstance;
  value?: string | undefined;
  dateValue?: string | undefined;
  selectValue?: string | undefined;
  copyButton?: boolean;
  label?: boolean;
  options?: { value: string; label: string }[];
  isDisabled?: boolean;
}

export interface TaximeterFormItemTypes {
  name: string;
  id?: string;
  defaultMessage?: string;
  form: FormInstance;
  disableInput?: boolean;
}

export interface InsuranceFormItemProps {
  name: string;
  id?: string;
  defaultMessage?: string;
  form?: FormInstance;
  isDisabled?: boolean;
  value?: string;
  defaultValue?: string;
}

export interface TableDataTypes {
  key: string;
  driver: string;
  odometer: string;
  period: string;
}
