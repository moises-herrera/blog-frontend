import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChatData, PaginatedResponse, QueryParams } from "src/interfaces";
import { AsyncThunkConfig } from "src/store/types";
import { AxiosError } from "axios";
import { peopleApi } from "src/api";
import { getQueryStringFromObject } from "src/helpers";

/**
 * Get chats list.
 *
 * @param queryParams Query params.
 * @returns Chats list.
 */
export const getChatsList = createAsyncThunk<
  PaginatedResponse<ChatData>,
  QueryParams,
  AsyncThunkConfig
>("getChatsList", async (queryParams, { rejectWithValue }) => {
  try {
    const queryString = getQueryStringFromObject(queryParams);
    const { data } = await peopleApi.get<PaginatedResponse<ChatData>>(
      `/conversation?${queryString}`
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
