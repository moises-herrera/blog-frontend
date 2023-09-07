import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "src/interfaces";
import { loginUser, registerUser, validateAccessToken } from ".";
import { updateUser } from "./user-thunks";

const initialState: AuthState = {
  user: null,
  status: "not-authenticated",
  errorMessage: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = null;
      state.errorMessage = null;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = null;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = null;
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.status = "checking";
      state.user = null;
      state.errorMessage = null;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = null;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = null;
      state.errorMessage = payload?.message;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.status = "checking";
      state.user = null;
      state.errorMessage = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = null;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = null;
      state.errorMessage = payload?.message;
    });

    builder.addCase(validateAccessToken.pending, (state) => {
      state.status = "checking";
      state.user = null;
      state.errorMessage = null;
    });
    builder.addCase(validateAccessToken.fulfilled, (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = null;
    });
    builder.addCase(validateAccessToken.rejected, (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = null;
      state.errorMessage = payload?.message;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.errorMessage = null;
    });
    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload?.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;
