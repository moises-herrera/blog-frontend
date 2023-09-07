import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { blogApi } from "src/api";
import { UpdateUser, User } from "src/interfaces";
import { AsyncThunkConfig } from "src/store/types";

/**
 * Update a user.
 *
 * @param userData The user data to update.
 * @returns A thunk that dispatches an action.
 */
export const updateUser = createAsyncThunk<User, UpdateUser, AsyncThunkConfig>(
  "updateUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const { data } = await blogApi.put<User>(`/user/${id}`, userData);

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
