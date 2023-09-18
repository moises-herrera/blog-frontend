import { AxiosError } from "axios";
import { peopleApi } from "src/api";
import { SendEmail, StandardResponse } from "src/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "src/store/types";

/**
 * Send confirm email.
 *
 * @param emailData The email data.
 * @returns A thunk that dispatches an action.
 */
export const sendConfirmEmail = createAsyncThunk<
  StandardResponse,
  SendEmail,
  AsyncThunkConfig
>("sendConfirmEmail", async (emailData, { rejectWithValue }) => {
  try {
    const { data } = await peopleApi.post<StandardResponse>(
      "/email/confirm-email",
      emailData
    );

    return data;
  } catch (error) {
    const message =
      error instanceof AxiosError
        ? error.response?.data.message
        : "Ha ocurrido un error.";

    return rejectWithValue({
      message,
    });
  }
});

/**
 * Send forgot password email.
 *
 * @param emailData The email data.
 * @returns A thunk that dispatches an action.
 */
export const sendForgotPasswordEmail = createAsyncThunk<
  StandardResponse,
  SendEmail,
  AsyncThunkConfig
>("sendForgotPasswordEmail", async (emailData, { rejectWithValue }) => {
  try {
    const { data } = await peopleApi.post<StandardResponse>(
      "/email/forgot-password",
      emailData
    );

    return data;
  } catch (error) {
    const message =
      error instanceof AxiosError
        ? error.response?.data.message
        : "Ha ocurrido un error.";

    return rejectWithValue({
      message,
    });
  }
});
