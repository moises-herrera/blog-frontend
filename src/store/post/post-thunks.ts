import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { blogApi } from "src/api";
import { getQueryStringFromObject } from "src/helpers";
import {
  Post,
  PostInfo,
  StandardObject,
  StandardResponse,
  UpdatePost,
} from "src/interfaces";
import { AsyncThunkConfig } from "src/store/types";

/**
 * Get posts.
 *
 * @param filter The filter.
 * @returns
 */
const getPosts = async (filter: StandardObject) => {
  const query = getQueryStringFromObject(filter);
  const { data } = await blogApi.get<PostInfo[]>(`/post?${query}`);

  return data;
};

/**
 * Get posts following list.
 *
 * @returns A thunk that dispatches an action.
 */
export const getPostsFollowing = createAsyncThunk<
  PostInfo[],
  void,
  AsyncThunkConfig
>("getPostsFollowing", async (_, { rejectWithValue }) => {
  try {
    const posts = await getPosts({ following: "true" });
    return posts;
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
 * Get posts suggested list.
 * @returns A thunk that dispatches an action.
 */
export const getPostsSuggested = createAsyncThunk<
  PostInfo[],
  void,
  AsyncThunkConfig
>("getPostsSuggested", async (_, { rejectWithValue }) => {
  try {
    const posts = await getPosts({ suggested: "true" });
    return posts;
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
 * Get user's posts list.
 * @returns A thunk that dispatches an action.
 */
export const getUserPosts = createAsyncThunk<
  PostInfo[],
  string,
  AsyncThunkConfig
>("getUserPosts", async (userId, { rejectWithValue }) => {
  try {
    const posts = await getPosts({ userId });
    return posts;
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
