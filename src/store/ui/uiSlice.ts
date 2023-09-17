import { createSlice } from "@reduxjs/toolkit";
import { UiState } from "src/interfaces";

const initialState: UiState = {
  isLeftSidebarOpen: false,
  isFollowersModalOpen: false,
  isFollowingModalOpen: false,
  isRigthSidebarOpen: true,
  isLikeModalOpen: false,
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
    openLikesModal: (state) => {
      state.isLikeModalOpen = true;
    },
    closeLikesModal: (state) => {
      state.isLikeModalOpen = false;
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
  openLikesModal,
  closeLikesModal,
} = uiSlice.actions;
