import { createSlice } from "@reduxjs/toolkit";
import { PostState } from "src/interfaces";
import {
  createPost,
  deletePost,
  getPostsFollowing,
  getPostsSuggested,
  getUserPosts,
  searchPosts,
  updatePost,
} from ".";

const initialState: PostState = {
  postFollowingList: [],
  isLoadingFollowing: false,
  postSuggestedList: [],
  isLoadingSuggested: false,
  userPosts: [],
  isLoadingUserPosts: false,
  searchPosts: [],
  isLoadingSearchPosts: false,
  isLoadingPostForm: false,
  isNewPostFormVisible: false,
  successMessage: null,
  errorMessage: null,
  editPost: null,
  isDeleteModalVisible: false,
  deletePostId: null,
  isLoadingDeletePost: false,
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
        post._id === payload._id ? payload : post
      );
    },
    setUserPosts: (state, { payload }) => {
      state.userPosts = payload;
    },
    openDeleteModal: (state, { payload }) => {
      state.isDeleteModalVisible = true;
      state.deletePostId = payload;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalVisible = false;
      state.deletePostId = null;
    },
    clearDeleteResponse: (state) => {
      state.deleteMessage = null;
    },
    clearDeleteErrorResponse: (state) => {
      state.deleteError = null;
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

    builder.addCase(searchPosts.pending, (state) => {
      state.isLoadingSearchPosts = true;
    });
    builder.addCase(searchPosts.fulfilled, (state, { payload }) => {
      state.searchPosts = payload;
      state.isLoadingSearchPosts = false;
    });
    builder.addCase(searchPosts.rejected, (state, { payload }) => {
      state.isLoadingSearchPosts = false;
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
      state.userPosts = state.userPosts.map((post) =>
        post._id === payload.data?._id
          ? {
              ...payload.data,
              user: post.user,
            }
          : post
      );
      state.successMessage = payload.message;
    });
    builder.addCase(updatePost.rejected, (state, { payload }) => {
      state.isLoadingPostForm = false;
      state.errorMessage = payload?.message;
    });

    builder.addCase(deletePost.pending, (state) => {
      state.isLoadingDeletePost = true;
    });
    builder.addCase(deletePost.fulfilled, (state, { payload }) => {
      state.isLoadingDeletePost = false;
      state.deleteMessage = payload.message;
      state.userPosts = state.userPosts.filter(
        (post) => post._id !== state.deletePostId
      );
      state.isDeleteModalVisible = false;
      state.deletePostId = null;
    });
    builder.addCase(deletePost.rejected, (state, { payload }) => {
      state.isLoadingDeletePost = false;
      state.deleteError = payload?.message;
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
  openDeleteModal,
  closeDeleteModal,
  clearDeleteResponse,
  clearDeleteErrorResponse,
  setUserPosts,
} = postSlice.actions;
