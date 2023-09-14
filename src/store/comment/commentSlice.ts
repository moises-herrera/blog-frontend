import { createSlice } from "@reduxjs/toolkit";
import { CommentState } from "src/interfaces";
import { getComments, createComment, deleteComment } from ".";

const initialState: CommentState = {
  comments: [],
  isLoadingComments: false,
  error: null,
  successMessage: null,
  isCommentsModalVisible: false,
  isDeleteModalVisible: false,
  isLoadingDeleteComment: false,
  deleteMessage: null,
  deleteError: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    openCommentsModal: (state) => {
      state.isCommentsModalVisible = true;
    },
    closeCommentsModal: (state) => {
      state.isCommentsModalVisible = false;
    },
    openDeleteModal: (state, { payload }) => {
      state.isDeleteModalVisible = true;
      state.deleteCommentData = payload;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalVisible = false;
      state.deleteCommentData = null;
    },
    clearDeleteResponse: (state) => {
      state.deleteMessage = null;
    },
    clearDeleteError: (state) => {
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state) => {
      state.isLoadingComments = true;
    });
    builder.addCase(getComments.fulfilled, (state, { payload }) => {
      state.isLoadingComments = false;
      state.comments = payload;
    });
    builder.addCase(getComments.rejected, (state, { payload }) => {
      state.isLoadingComments = false;
      state.error = payload?.message;
    });

    builder.addCase(createComment.pending, (state) => {
      state.isLoadingComments = true;
    });
    builder.addCase(createComment.fulfilled, (state, { payload }) => {
      state.isLoadingComments = false;
      state.comments = [...state.comments, payload];
    });
    builder.addCase(createComment.rejected, (state, { payload }) => {
      state.isLoadingComments = false;
      state.error = payload?.message;
    });

    builder.addCase(deleteComment.pending, (state) => {
      state.isLoadingDeleteComment = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
      state.isLoadingDeleteComment = false;
      state.deleteMessage = payload.message;
      state.comments = state.comments.filter(
        ({ _id }) => _id !== state.deleteCommentData?.commentId
      );
      state.isDeleteModalVisible = false;
      state.deleteCommentData = null;
    });
    builder.addCase(deleteComment.rejected, (state, { payload }) => {
      state.isLoadingDeleteComment = false;
      state.deleteError = payload?.message;
      state.isDeleteModalVisible = false;
    });
  },
});

export const {
  openDeleteModal,
  closeDeleteModal,
  clearDeleteError,
  clearDeleteResponse,
  openCommentsModal,
  closeCommentsModal,
} = commentSlice.actions;
