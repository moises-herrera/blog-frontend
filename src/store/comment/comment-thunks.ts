import { Comment, CommentInfo, StandardResponse } from "src/interfaces";
import { AsyncThunkConfig } from "src/store/types";
import { peopleApi } from "src/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { addComment } from "../post";

export const getComments = createAsyncThunk<
  CommentInfo[],
  string,
  AsyncThunkConfig
>("getComments", async (id, { rejectWithValue }) => {
  try {
    const { data } = await peopleApi.get<CommentInfo[]>(`/comment?postId=${id}`);
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

export const createComment = createAsyncThunk<
  CommentInfo,
  Partial<Comment>,
  AsyncThunkConfig
>("createComment", async (postData, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await peopleApi.post<CommentInfo>("/comment", postData);
    dispatch(addComment({ postId: data.post, commentId: data._id }));

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
    const { data } = await peopleApi.delete<StandardResponse>(`/comment/${id}`);
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
