import { AxiosError } from "axios";
import { blogApi } from "src/api";
import { SendEmail, StandardResponse } from "src/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "src/store/types";

/**
 * Start send confirm email.
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
    const { data } = await blogApi.post<StandardResponse>(
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
