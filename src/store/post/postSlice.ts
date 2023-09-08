import { createSlice } from "@reduxjs/toolkit";
import { PostState } from "src/interfaces";
import { createPost } from ".";

const initialState: PostState = {
  posts: [],
  isLoading: false,
  isLoadingPostForm: false,
  isNewPostFormVisible: false,
  successMessage: null,
  errorMessage: null,
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
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.isLoadingPostForm = true;
    });
    builder.addCase(createPost.fulfilled, (state, { payload }) => {
      state.isLoadingPostForm = false;
      state.successMessage = payload.message;
    });
    builder.addCase(createPost.rejected, (state, { payload }) => {
      state.isLoadingPostForm = false;
      state.errorMessage = payload?.message;
    });
  },
});

export const {
  openNewPostForm,
  closeNewPostForm,
  toggleNewPostFormVisibility,
} = postSlice.actions;
