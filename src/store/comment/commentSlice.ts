import { createSlice } from "@reduxjs/toolkit";
import { CommentState } from "src/interfaces";
import { getComments, createComment, deleteComment } from ".";

const initialState: CommentState = {
  comments: [],
  isLoadingComments: false,
  error: null,
  successMessage: null,
  isDeleteModalVisible: false,
  isLoadingDeleteComment: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    openDeleteModal: (state, { payload }) => {
      state.isDeleteModalVisible = true;
      state.deleteCommentId = payload;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalVisible = false;
      state.deleteCommentId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state) => {
      state.isLoadingComments = true;
    });
    builder.addCase(getComments.fulfilled, (state, { payload }) => {
      state.isLoadingComments = false;
      //state.comments = [...state.comments, ...payload];
      state.comments = payload;
    });
    builder.addCase(getComments.rejected, (state, { payload }) => {
      state.isLoadingComments = true;
      state.error = payload?.message;
    });

    builder.addCase(createComment.pending, (state) => {
      state.isLoadingComments = true;
    });
    builder.addCase(createComment.fulfilled, (state, { payload }) => {
      state.isLoadingComments = false;
      [...state.comments, payload];
    });
    builder.addCase(createComment.rejected, (state, { payload }) => {
      state.isLoadingComments = false;
      state.error = payload?.message;
    });

    builder.addCase(deleteComment.pending, (state) => {
      state.isLoadingComments = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
      state.isLoadingComments = false;
      state.successMessage = payload.message;
    });
    builder.addCase(deleteComment.rejected, (state, { payload }) => {
      state.isLoadingComments = false;
      state.error = payload?.message;
    });
  },
});

export const { openDeleteModal, closeDeleteModal } = commentSlice.actions;
