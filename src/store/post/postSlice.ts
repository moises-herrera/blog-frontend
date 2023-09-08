import { createSlice } from "@reduxjs/toolkit";
import { PostState } from "src/interfaces";

const initialState: PostState = {
  posts: [],
  isLoading: false,
  isNewPostFormVisible: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    openNewPostForm: (state) => {
      state.isNewPostFormVisible = true;
    },
    closeNewPostForm: (state) => {
      state.isNewPostFormVisible = false;
    },
    toggleNewPostFormVisibility: (state) => {
      state.isNewPostFormVisible = !state.isNewPostFormVisible;
    },
  },
});

export const {
  openNewPostForm,
  closeNewPostForm,
  toggleNewPostFormVisibility,
} = postSlice.actions;
