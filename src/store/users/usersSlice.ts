import { createSlice } from "@reduxjs/toolkit";
import { UsersState } from "src/interfaces";
import { getUsers } from ".";

const initialState: UsersState = {
  list: [],
  isLoading: false,
  error: "",
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
      state.isLoading = true;
      state.error = payload?.message;
    });
  },
});
