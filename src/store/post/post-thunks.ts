import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { blogApi } from "src/api";
import { StandardResponse } from "src/interfaces";
import { AsyncThunkConfig } from "src/store/types";

/**
 * Create a new post.
 *
 * @param postData The post data.
 * @returns A thunk that dispatches an action.
 */
export const createPost = createAsyncThunk<
  StandardResponse,
  FormData,
  AsyncThunkConfig
>("createPost", async (postData, { rejectWithValue }) => {
  try {
    await blogApi.post("/post", postData);

    const data: StandardResponse = {
      message: "Post creado correctamente.",
    };

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
