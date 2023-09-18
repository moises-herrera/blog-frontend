import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ChatData,
  CreateChat,
  Message,
  PaginatedResponse,
  QueryParams,
  RequestData,
  SendMessage,
  StandardResponse,
} from "src/interfaces";
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

/**
 * Create chat.
 *
 * @param chatData Chat data.
 * @returns Chat data.
 */
export const createChat = createAsyncThunk<
  StandardResponse<ChatData>,
  CreateChat,
  AsyncThunkConfig
>("createChat", async (chatData, { rejectWithValue }) => {
  try {
    const { data } = await peopleApi.post<StandardResponse<ChatData>>(
      "/conversation",
      chatData
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
 * Get messages.
 *
 * @param id Chat id.
 * @param queryParams Query params.
 * @returns Messages.
 */
export const getMessages = createAsyncThunk<
  PaginatedResponse<Message>,
  RequestData,
  AsyncThunkConfig
>("getMessages", async ({ id, queryParams }, { rejectWithValue }) => {
  try {
    const queryString = getQueryStringFromObject(queryParams);
    const { data } = await peopleApi.get<PaginatedResponse<Message>>(
      `/conversation/${id}/messages?${queryString}`
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
 * Send message.
 *
 * @param id Chat id.
 * @param message Message data.
 */
export const sendMessage = createAsyncThunk<
  StandardResponse<Message>,
  SendMessage,
  AsyncThunkConfig
>("sendMessage", async ({ id, message }, { rejectWithValue }) => {
  try {
    const { data } = await peopleApi.post<StandardResponse<Message>>(
      `/conversation/${id}/messages`,
      message
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
