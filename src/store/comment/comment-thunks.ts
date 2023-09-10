import { Comment, CommentInfo, StandardResponse } from "src/interfaces";
import { AsyncThunkConfig } from "../types";
import { blogApi } from "src/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getComments = createAsyncThunk<
  CommentInfo[],
  string,
  AsyncThunkConfig
>("getComments", async (id, { rejectWithValue }) => {
  try {
    const respons = await blogApi.get<CommentInfo[]>(`/comment?postId=${id}`);
    return respons.data;
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

export const createComment = createAsyncThunk<
  Comment,
  Partial<Comment>,
  AsyncThunkConfig
>("createComment", async (postData, { rejectWithValue }) => {
  try {
    const { data } = await blogApi.post<Comment>("/comment", postData);

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

export const deleteComment = createAsyncThunk<
  StandardResponse,
  string,
  AsyncThunkConfig
>("deleteComment", async (id, { rejectWithValue }) => {
  try {
    const respons = await blogApi.delete<StandardResponse>(`/comment/${id}`);
    return respons.data;
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
