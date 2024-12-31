import { IntlShape } from "react-intl";

export enum UserRole {
  ADMIN = "Admin",
  USER = "User",
  DRIVER = "Driver",
  PARTNER = "Partner",
}

export const getRoleOptions = (intl: IntlShape) => {
  const roles = [
    { id: UserRole.ADMIN, defaultMessage: "Admin" },
    { id: UserRole.USER, defaultMessage: "User" },
    { id: UserRole.DRIVER, defaultMessage: "Driver" },
    { id: UserRole.PARTNER, defaultMessage: "Partner" },
  ];

  return roles.map((role) => ({
    label: intl.formatMessage({
      id: `userManagement.${role.id}`,
      defaultMessage: role.defaultMessage,
    }),
    value: role.defaultMessage,
  }));
};

export const getCompanyProfileFormItems = (intl: IntlShape) => {
  const items = [
    { id: "name", defaultMessage: "Name" },
    { id: "iban", defaultMessage: "Bank account" },
    { id: "email", defaultMessage: "Email" },
    { id: "address", defaultMessage: "Address" },
    { id: "phone", defaultMessage: "Phone" },
    { id: "city", defaultMessage: "City" },
    { id: "nip", defaultMessage: "NIP" },
    { id: "zip", defaultMessage: "ZIP code" },
    { id: "web", defaultMessage: "Website" },
  ];

  return items.map((item) => ({
    name: item.id,
    label: intl.formatMessage({
      id: `${item.id}`,
      defaultMessage: item.defaultMessage,
    }),
  }));
};

export const getUserProfileFormItems = (intl: IntlShape) => {
  const items = [
    { id: "phone", defaultMessage: "Phone" },
    { id: "company", defaultMessage: "Company" },
    { id: "email", defaultMessage: "Email" },
    { id: "role", defaultMessage: "Role" },
    { id: "createdAt", defaultMessage: "Registration date" },
    { id: "status", defaultMessage: "Status" },
    { id: "city", defaultMessage: "City" },
  ];

  return items.map((item) => ({
    name: item.id,
    label: intl.formatMessage({
      id: `${item.id}`,
      defaultMessage: item.defaultMessage,
    }),
  }));
};

export const getRoleName = (value: number) => {
  switch (value) {
    case 1:
      return "Admin";
    case 2:
      return "User";
    case 3:
      return "Driver";
    case 4:
      return "Partner";
  }
};

export const getRoleSelectValue = (name: string) => {
  switch (name) {
    case "Admin":
      return 1;
    case "User":
      return 2;
    case "Driver":
      return 3;
    case "Partner":
      return 4;
  }
};

export const getStatusName = (value: number) => {
  switch (value) {
    case 1:
      return "Active";
    case 2:
      return "Inactive";
  }
};

export const getStatusSelectValue = (value: string) => {
  switch (value) {
    case "Active":
      return 1;
    case "Inactive":
      return 2;
  }
};

export const getStatusOptions = (intl: IntlShape) => [
  {
    value: 1,
    label: intl.formatMessage({
      id: "Active",
      defaultMessage: "Active",
    }),
  },
  {
    value: 2,
    label: intl.formatMessage({
      id: "Inactive",
      defaultMessage: "Inactive",
    }),
  },
];

export const getFilterOptions = (intl: IntlShape, actualFilters: string[]) => {
  const filters = [
    { id: "companyProfile.name", defaultMessage: "Name" },
    { id: "userManagement.role", defaultMessage: "Role" },
    { id: "userManagement.phone", defaultMessage: "Phone" },
    { id: "userManagement.email", defaultMessage: "Email" },
  ];

  return filters
    .filter((filter) => actualFilters.includes(filter.defaultMessage))
    .map((filter) => ({
      label: intl.formatMessage({
        id: filter.id,
        defaultMessage: filter.defaultMessage,
      }),
      value: filter.defaultMessage,
    }));
};

export const getRoleOptionsById = (intl: IntlShape) => {
  const roleConfigs = [
    { value: 0, id: "userManagement.allUsers", defaultMessage: "All Users" },
    { value: 1, id: "userManagement.admin", defaultMessage: "Admin" },
    { value: 2, id: "userManagement.user", defaultMessage: "User" },
    { value: 3, id: "userManagement.driver", defaultMessage: "Driver" },
    {
      value: 4,
      id: "userManagement.partner",
      defaultMessage: "Partner",
    },
  ];

  return roleConfigs.map((role) => ({
    value: role.value,
    label: intl.formatMessage({
      id: role.id,
      defaultMessage: role.defaultMessage,
    }),
  }));
};

export const typesDocuments = ["Hiring", "Order", "Work", "ZUC"];
