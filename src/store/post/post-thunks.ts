import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { blogApi } from "src/api";
import { Post, StandardResponse, UpdatePost } from "src/interfaces";
import { AsyncThunkConfig } from "src/store/types";

/**
 * Create a new post.
 *
 * @param postData The post data.
 * @returns A thunk that dispatches an action.
 */
export const createPost = createAsyncThunk<
  StandardResponse<Post>,
  FormData,
  AsyncThunkConfig
>("createPost", async (postData, { rejectWithValue }) => {
  try {
    const { data } = await blogApi.post<StandardResponse<Post>>(
      "/post",
      postData
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
 * Update a post.
 *
 * @param updatePostData The post data.
 * @returns A thunk that dispatches an action.
 */
export const updatePost = createAsyncThunk<
  StandardResponse<Post>,
  UpdatePost,
  AsyncThunkConfig
>("updatePost", async ({ id, postData }, { rejectWithValue }) => {
  try {
    const { data } = await blogApi.put<StandardResponse<Post>>(
      `/post/${id}`,
      postData
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
