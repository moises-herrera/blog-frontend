import { createSlice } from "@reduxjs/toolkit";
import { UsersState } from "src/interfaces";
import { getFollowers, getFollowing, getUsers } from ".";

const initialState: UsersState = {
  list: [],
  isLoading: false,
  error: "",
  followers: [],
  followersLoading: false,
  following: [],
  followingLoading: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getUsers.rejected, (state, { payload }) => {
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
  },
});
