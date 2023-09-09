import { createSlice } from "@reduxjs/toolkit";
import { CommentState } from "src/interfaces";
import { getComments } from "./comment-thunks";

const initialState: CommentState = {
  comments: [],
  isLoadingComments: false,
  error: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state) => {
      state.isLoadingComments = true;
    });
    builder.addCase(getComments.fulfilled, (state, { payload }) => {
      state.isLoadingComments = false;
      state.comments = payload;
    });
    builder.addCase(getComments.rejected, (state, { payload }) => {
      state.isLoadingComments = true;
      state.error = payload?.message;
    });
  },
});
