import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { peopleApi } from "src/api";
import { Notification, PaginatedResponse } from "src/interfaces";
import { AsyncThunkConfig } from "src/store/types";

/**
 * Get notifications.
 *
 * @returns A thunk that dispatches an action.
 */
export const getNotifications = createAsyncThunk<
  PaginatedResponse<Notification>,
  void,
  AsyncThunkConfig
>("getNotifications", async (_, { rejectWithValue }) => {
  try {
    const { data } = await peopleApi.get<PaginatedResponse<Notification>>(
      "/notification"
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
