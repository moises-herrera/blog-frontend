import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "src/interfaces";
import { confirmEmail, loginUser, registerUser, validateAccessToken } from ".";
import { changePassword } from "src/store/auth";

const initialState: AuthState = {
  user: null,
  status: "checking",
  successMessage: null,
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

    builder.addCase(changePassword.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    });
    builder.addCase(changePassword.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.successMessage = payload.message;
      state.errorMessage = null;
    });
    builder.addCase(changePassword.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload?.message;
    });

    builder.addCase(confirmEmail.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    });
    builder.addCase(confirmEmail.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.successMessage = payload.message;
      state.errorMessage = null;
    });
    builder.addCase(confirmEmail.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload?.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;
