import { createSlice } from '@reduxjs/toolkit';
import { UiState } from 'src/interfaces';

const initialState: UiState = {
  isLeftSidebarOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleLeftSidebar: (state) => {
      state.isLeftSidebarOpen = !state.isLeftSidebarOpen;
    },
  },
});

export const { toggleLeftSidebar } = uiSlice.actions;
