import { createSlice } from "@reduxjs/toolkit";
import { EmailState } from "src/interfaces";

const initialState: EmailState = {
  notification: "",
  isLoading: false,
  error: "",
};

export const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    onSendEmail: (state) => {
      state.isLoading = true;
    },
    onSendEmailSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.notification = payload;
    },
    onSendEmailError: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { onSendEmail, onSendEmailSuccess, onSendEmailError } =
  emailSlice.actions;
