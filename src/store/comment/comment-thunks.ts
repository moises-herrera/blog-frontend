import { UserComment } from "src/interfaces";
import { AsyncThunkConfig } from "../types";
import { blogApi } from "src/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getComments = createAsyncThunk<
  UserComment[],
  string,
  AsyncThunkConfig
>("getComments", async (id, { rejectWithValue }) => {
  try {
    const respons = await blogApi.get<UserComment[]>(`/comment?postId=${id}`);
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
