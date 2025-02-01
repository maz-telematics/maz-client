import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  view: "main",
};

export const adminModuleViewSlice = createSlice({
  name: "adminModuleView",
  initialState,
  reducers: {
    showAdminMain: (state) => {
      state.view = "main";
    },
    showAdminTransports: (state) => {
      state.view = "transports";
    },
    showAdminOrganizations: (state) => {
      state.view = "organizations";
    },
    showAdminEmpoyess: (state) => {
      state.view = "employees";
    },
    showAdminReports: (state) => {
      state.view = "reports"
    },
    showAdminArchive: (state) => {
      state.view = "archive"
    },
    showAdminTransport: (state) => {
      state.view = "transport"
    },
    showAdminOrganization:(state) => {
      state.view = "organization"
    }, 
    showAdminFirmwares:(state) => {
      state.view = "firmwares"
    },
    showAdminProfile:(state) => {
      state.view = "profile"
    },

    showAdminFirmware:(state) => {
      state.view = "firmware"
    },
  },
});

export const {
    showAdminMain,
    showAdminTransports,
    showAdminOrganizations,
    showAdminEmpoyess,
    showAdminReports,
    showAdminArchive,
    showAdminTransport,
    showAdminOrganization,
    showAdminProfile,
    showAdminFirmwares,
    showAdminFirmware,
} = adminModuleViewSlice.actions;

export default adminModuleViewSlice.reducer;
