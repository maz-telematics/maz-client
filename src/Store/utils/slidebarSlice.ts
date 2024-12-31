import { createSlice } from "@reduxjs/toolkit";

interface SlidebarState {
  collapsedSlideBar: boolean;
}

const initialState: SlidebarState = {
  collapsedSlideBar: true,
};

export const slidebarSlice = createSlice({
  name: "slidebar",
  initialState,
  reducers: {
    toggleSlicebar: (state) => {
      state.collapsedSlideBar = !state.collapsedSlideBar;
    },
  },
});

export const { toggleSlicebar } = slidebarSlice.actions;

export default slidebarSlice.reducer;
