import { createSlice } from "@reduxjs/toolkit";
import { UiState } from "src/interfaces";

const initialState: UiState = {
  isLeftSidebarOpen: false,
  isFollowersModalOpen: false,
  isFollowingModalOpen: false,
  isRigthSidebarOpen: true,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleRightSidebar: (state) => {
      state.isRigthSidebarOpen = !state.isRigthSidebarOpen;
    },
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
  toggleRightSidebar,
  toggleLeftSidebar,
  closeLeftSidebar,
  openFollowersModal,
  closeFollowersModal,
  openFollowingModal,
  closeFollowingModal,
} = uiSlice.actions;
