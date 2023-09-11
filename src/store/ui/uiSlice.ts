import { createSlice } from "@reduxjs/toolkit";
import { UiState } from "src/interfaces";

const initialState: UiState = {
  isLeftSidebarOpen: false,
  isFollowersModalOpen: false,
  isFollowingModalOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleLeftSidebar: (state) => {
      state.isLeftSidebarOpen = !state.isLeftSidebarOpen;
    },
    closeLeftSidebar: (state) => {
      state.isLeftSidebarOpen = false;
    },
    openFollowersModal: (state) => {
      state.isFollowersModalOpen = true;
    },
    closeFollowersModal: (state) => {
      state.isFollowersModalOpen = false;
    },
    openFollowingModal: (state) => {
      state.isFollowingModalOpen = true;
    },
    closeFollowingModal: (state) => {
      state.isFollowingModalOpen = false;
    },
  },
});

export const {
  toggleLeftSidebar,
  closeLeftSidebar,
  openFollowersModal,
  closeFollowersModal,
  openFollowingModal,
  closeFollowingModal,
} = uiSlice.actions;
