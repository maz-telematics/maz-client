import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  view: "main",
};

export const directorModuleViewSlice = createSlice({
  name: "directorModuleView",
  initialState,
  reducers: {
    showDirectorMain: (state) => {
      state.view = "main";
    },
    showDirectorTransports: (state) => {
      state.view = "transports";
    },
    showDirectorEmpoyess: (state) => {
      state.view = "employees";
    },
    showDirectorReports: (state) => {
      state.view = "reports"
    },
    showDirectorTransport: (state) => {
      state.view = "transport"
    },
    showDirectorProfile:(state) => {
      state.view = "profile"
    },
  },
});

export const {
    showDirectorMain,
    showDirectorTransports,
    showDirectorEmpoyess,
    showDirectorReports,
    showDirectorTransport,
    showDirectorProfile,
} = directorModuleViewSlice.actions;

export default directorModuleViewSlice.reducer;
