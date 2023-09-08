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
export const getUsers = createAsyncThunk<
  User[],
  string | void,
  AsyncThunkConfig
>("getUsers", async (username = "", { rejectWithValue }) => {
  try {
    const { data } = await blogApi.get<User[]>(`/user?username=${username}`);

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
 * Get all followers.
 *
 * @param id The user id.
 * @returns A thunk that dispatches an action.
 */
export const getFollowers = createAsyncThunk<User[], string, AsyncThunkConfig>(
  "getFollowers",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await blogApi.get<User[]>(`/user/${id}/followers`);

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

/**
 * Get the accounts that the user follows.
 *
 * @param id The user id.
 * @returns A thunk that dispatches an action.
 */
export const getFollowing = createAsyncThunk<User[], string, AsyncThunkConfig>(
  "getFollowing",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await blogApi.get<User[]>(`/user/${id}/following`);

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
