import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  view: "main",
};

export const superAdminModuleViewSlice = createSlice({
  name: "superAdminModuleView",
  initialState,
  reducers: {
    showSuperAdminMain: (state) => {
      state.view = "main";
    },
    showSuperAdminTransports: (state) => {
      state.view = "transports";
    },
    showSuperAdminOrganizations: (state) => {
      state.view = "organizations";
    },
    showSuperAdminEmpoyess: (state) => {
      state.view = "employees";
    },
    showSuperAdminReports: (state) => {
      state.view = "reports"
    },
    showSuperAdminArchive: (state) => {
      state.view = "archive"
    },
    showSuperAdminTransport: (state) => {
      state.view = "transport"
    },
    showSuperAdminEditTransport: (state) => {
      state.view = "edit-transport"
    },
    showSuperAdminCreateOrganization: (state) => {
      state.view = "create-organization"
    },
    showSuperAdminOrganization:(state) => {
      state.view = "organization"
    },
    showSuperAdminCreateTransport:(state) => {
      state.view = "create-transport"
    },
    showSuperAdminProfile:(state) => {
      state.view = "profile"
    },
    showSuperAdminFirmwares:(state) => {
      state.view = "firmwares"
    },
    showSuperAdminFirmware:(state) => {
      state.view = "firmware"
    },
    showSuperAdminLogs:(state) => {
      state.view = "logs"
    },
    showSuperAdminChangeLogs:(state) => {
      state.view = "change-logs"
    },
  },
});

export const {
    showSuperAdminMain,
    showSuperAdminTransports,
    showSuperAdminOrganizations,
    showSuperAdminEmpoyess,
    showSuperAdminReports,
    showSuperAdminArchive,
    showSuperAdminTransport,
    showSuperAdminEditTransport,
    showSuperAdminCreateOrganization,
    showSuperAdminOrganization,
    showSuperAdminCreateTransport,
    showSuperAdminProfile,
    showSuperAdminFirmwares,
    showSuperAdminFirmware,
    showSuperAdminLogs,
    showSuperAdminChangeLogs,
} = superAdminModuleViewSlice.actions;

export default superAdminModuleViewSlice.reducer;
