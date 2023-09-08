import { createSlice } from "@reduxjs/toolkit";
import { PostState } from "src/interfaces";
import {
  createPost,
  getPostsFollowing,
  getPostsSuggested,
  getUserPosts,
  updatePost,
} from ".";

const initialState: PostState = {
  postFollowingList: [],
  isLoadingFollowing: false,
  postSuggestedList: [],
  isLoadingSuggested: false,
  userPosts: [],
  isLoadingUserPosts: false,
  isLoadingPostForm: false,
  isNewPostFormVisible: false,
  successMessage: null,
  errorMessage: null,
  editPost: null,
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
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
    setEditPost: (state, { payload }) => {
      state.editPost = payload;
    },
    updateUserPost: (state, { payload }) => {
      state.userPosts = state.userPosts.map((post) =>
        post._id === payload.id ? payload : post
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPostsFollowing.pending, (state) => {
      state.isLoadingFollowing = true;
    });
    builder.addCase(getPostsFollowing.fulfilled, (state, { payload }) => {
      state.postFollowingList = payload;
      state.isLoadingFollowing = false;
    });
    builder.addCase(getPostsFollowing.rejected, (state, { payload }) => {
      state.isLoadingFollowing = false;
      state.errorMessage = payload?.message;
    });

    builder.addCase(getPostsSuggested.pending, (state) => {
      state.isLoadingSuggested = true;
    });
    builder.addCase(getPostsSuggested.fulfilled, (state, { payload }) => {
      state.postSuggestedList = payload;
      state.isLoadingSuggested = false;
    });
    builder.addCase(getPostsSuggested.rejected, (state, { payload }) => {
      state.isLoadingSuggested = false;
      state.errorMessage = payload?.message;
    });

    builder.addCase(getUserPosts.pending, (state) => {
      state.isLoadingUserPosts = true;
    });
    builder.addCase(getUserPosts.fulfilled, (state, { payload }) => {
      state.userPosts = payload;
      state.isLoadingUserPosts = false;
    });
    builder.addCase(getUserPosts.rejected, (state, { payload }) => {
      state.isLoadingUserPosts = false;
      state.errorMessage = payload?.message;
    });

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

    builder.addCase(updatePost.pending, (state) => {
      state.isLoadingPostForm = true;
    });
    builder.addCase(updatePost.fulfilled, (state, { payload }) => {
      state.isLoadingPostForm = false;
      state.editPost = payload.data;
      state.successMessage = payload.message;
    });
    builder.addCase(updatePost.rejected, (state, { payload }) => {
      state.isLoadingPostForm = false;
      state.errorMessage = payload?.message;
    });
  },
});

export const {
  openNewPostForm,
  closeNewPostForm,
  toggleNewPostFormVisibility,
  clearSuccessMessage,
  clearErrorMessage,
  setEditPost,
  updateUserPost,
} = postSlice.actions;
