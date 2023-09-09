import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "src/interfaces";
import { AsyncThunkConfig } from "src/store/types";
import { AxiosError } from "axios";
import { blogApi } from "src/api";

/**
 * Get users.
 *
 * @param username The username.
 * @returns A promise of users.
 */
const getUsers = async (username?: string) => {
  const { data } = await blogApi.get<User[]>(`/user?username=${username}`);
  return data;
};

/**
 * Get all users.
 *
 * @param username The username to search.
 * @returns A thunk that dispatches an action.
 */
export const getAllUsers = createAsyncThunk<
  User[],
  string | undefined,
  AsyncThunkConfig
>("getUsers", async (username = "", { rejectWithValue }) => {
  try {
    const data = await getUsers(username);

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
 * Get a user.
 *
 * @param id The username.
 * @returns A thunk that dispatches an action.
 */
export const getUser = createAsyncThunk<User, string, AsyncThunkConfig>(
  "getUser",
  async (username, { rejectWithValue }) => {
    try {
      const [user] = await getUsers(username);
      return user;
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
