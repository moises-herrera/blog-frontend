import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ChangePassword, StandardResponse } from "src/interfaces";
import { AsyncThunkConfig } from "src/store/types";

const { VITE_API_URL } = import.meta.env;

/**
 * Change user password.
 *
 * @param password The new password.
 * @returns A thunk that dispatches an action.
 */
export const changePassword = createAsyncThunk<
  StandardResponse,
  ChangePassword,
  AsyncThunkConfig
>(
  "changePassword",
  async ({ userId, token, password }, { rejectWithValue }) => {
    try {
      const body = {
        password,
      };
      const { data } = await axios.post<StandardResponse>(
        `${VITE_API_URL}/user/${userId}/password`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
  }
);
