import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetFollowers,
  PaginatedResponse,
  QueryParams,
  User,
} from "src/interfaces";
import { AsyncThunkConfig } from "src/store/types";
import { AxiosError } from "axios";
import { peopleApi } from "src/api";
import { getQueryStringFromObject } from "src/helpers";

/**
 * Get users.
 *
 * @param queryParams The query params.
 * @returns A promise of users.
 */
const getUsers = async (
  queryParams?: QueryParams
): Promise<PaginatedResponse<User>> => {
  const queryString = getQueryStringFromObject(queryParams || {});
  const { data } = await peopleApi.get<PaginatedResponse<User>>(
    `/user?${queryString}`
  );
  return data;
};

/**
 * Get all users.
 *
 * @param queryParams The query params.
 * @returns A thunk that dispatches an action.
 */
export const getAllUsers = createAsyncThunk<
  PaginatedResponse<User>,
  QueryParams | undefined,
  AsyncThunkConfig
>("getUsers", async (queryParams, { rejectWithValue }) => {
  try {
    const data = await getUsers(queryParams);

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
 * @param username The username.
 * @returns A thunk that dispatches an action.
 */
export const getUser = createAsyncThunk<User, string, AsyncThunkConfig>(
  "getUser",
  async (username, { rejectWithValue }) => {
    try {
      const { data } = await peopleApi.get<User>(`/user/${username}`);
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
 * Get all followers.
 *
 * @param id The user id.
 * @returns A thunk that dispatches an action.
 */
export const getFollowers = createAsyncThunk<
  User[],
  GetFollowers,
  AsyncThunkConfig
>("getFollowers", async ({ id, username }, { rejectWithValue }) => {
  try {
    const { data } = await peopleApi.get<User[]>(
      `/user/${id}/followers?username=${username}`
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
 * Get the accounts that the user follows.
 *
 * @param id The user id.
 * @returns A thunk that dispatches an action.
 */
export const getFollowing = createAsyncThunk<
  User[],
  GetFollowers,
  AsyncThunkConfig
>("getFollowing", async ({ id, username }, { rejectWithValue }) => {
  try {
    const { data } = await peopleApi.get<User[]>(
      `/user/${id}/following?username=${username}`
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
