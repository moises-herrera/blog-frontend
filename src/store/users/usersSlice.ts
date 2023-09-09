import { createSlice } from "@reduxjs/toolkit";
import { UsersState } from "src/interfaces";
import { getFollowers, getFollowing, getUser, getAllUsers } from ".";

const initialState: UsersState = {
  list: [],
  isLoading: false,
  error: "",
  followers: [],
  followersLoading: false,
  following: [],
  followingLoading: false,
  userProfile: null,
  userProfileLoading: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllUsers.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.message;
    });

    builder.addCase(getFollowers.pending, (state) => {
      state.followersLoading = true;
    });
    builder.addCase(getFollowers.fulfilled, (state, { payload }) => {
      state.followers = payload;
      state.followersLoading = false;
    });
    builder.addCase(getFollowers.rejected, (state, { payload }) => {
      state.followersLoading = false;
      state.error = payload?.message;
    });

    builder.addCase(getFollowing.pending, (state) => {
      state.followingLoading = true;
    });
    builder.addCase(getFollowing.fulfilled, (state, { payload }) => {
      state.following = payload;
      state.followingLoading = false;
    });
    builder.addCase(getFollowing.rejected, (state, { payload }) => {
      state.followingLoading = false;
      state.error = payload?.message;
    });

    builder.addCase(getUser.pending, (state) => {
      state.userProfileLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.userProfile = payload;
      state.userProfileLoading = false;
    });
    builder.addCase(getUser.rejected, (state, { payload }) => {
      state.userProfileLoading = false;
      state.error = payload?.message;
    });
  },
});
