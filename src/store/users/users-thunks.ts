import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "src/interfaces";
import { AsyncThunkConfig } from "../types";
import { AxiosError } from "axios";
import { blogApi } from "src/api";

/**
 * Get all users.
 *
 * @returns A thunk that dispatches an action.
 */
export const getUsers = createAsyncThunk<User[], void, AsyncThunkConfig>(
  "getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await blogApi.get<User[]>("/user");

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
