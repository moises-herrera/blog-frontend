import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { peopleApi } from "src/api";
import { getQueryStringFromObject } from "src/helpers";
import {
  CreatePost,
  GetLikes,
  PaginatedResponse,
  Post,
  PostInfo,
  QueryParams,
  StandardResponse,
  UpdatePost,
  User,
} from "src/interfaces";
import { updateFile, uploadFile } from "src/shared/services";
import { AsyncThunkConfig } from "src/store/types";

/**
 * Get posts.
 *
 * @param queryParams The query params.
 * @returns
 */
const getPosts = async (
  queryParams: QueryParams
): Promise<PaginatedResponse<PostInfo>> => {
  const queryString = getQueryStringFromObject(queryParams || {});
  const { data } = await peopleApi.get<PaginatedResponse<PostInfo>>(
    `/post?${queryString}`
  );

  return data;
};

/**
 * Get posts following list.
 *
 * @returns A thunk that dispatches an action.
 */
export const getPostsFollowing = createAsyncThunk<
  PaginatedResponse<PostInfo>,
  QueryParams,
  AsyncThunkConfig
>("getPostsFollowing", async (queryParams, { rejectWithValue }) => {
  try {
    const posts = await getPosts({ following: true, ...queryParams });
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
  PaginatedResponse<PostInfo>,
  QueryParams,
  AsyncThunkConfig
>("getPostsSuggested", async (queryParams, { rejectWithValue }) => {
  try {
    const posts = await getPosts({ suggested: true, ...queryParams });
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
 *
 * @param userId The user id.
 * @returns A thunk that dispatches an action.
 */
export const getUserPosts = createAsyncThunk<
  PaginatedResponse<PostInfo>,
  QueryParams,
  AsyncThunkConfig
>("getUserPosts", async (queryParams, { rejectWithValue }) => {
  try {
    const posts = await getPosts(queryParams);
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
 * Search posts.
 *
 * @param queryParams The query params.
 * @returns A thunk that dispatches an action.
 */
export const searchPosts = createAsyncThunk<
  PaginatedResponse<PostInfo>,
  QueryParams,
  AsyncThunkConfig
>("searchPosts", async (queryParams, { rejectWithValue }) => {
  try {
    const posts = await getPosts(queryParams);
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
  CreatePost,
  AsyncThunkConfig
>("createPost", async (postData, { rejectWithValue }) => {
  try {
    const postFile = postData.fileUploaded;
    let fileUrl = "";

    if (postFile) {
      fileUrl = await uploadFile("posts", postFile);
    }

    const { data } = await peopleApi.post<StandardResponse<Post>>("/post", {
      ...postData,
      image: fileUrl,
    });

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
    const postFile = postData.fileUploaded;
    let fileUrl = postData.image;

    if (postFile) {
      fileUrl = !postData.image
        ? await uploadFile("posts", postFile)
        : await updateFile("posts", postFile, postData.image);
    }

    const { data } = await peopleApi.put<StandardResponse<Post>>(
      `/post/${id}`,
      {
        ...postData,
        image: fileUrl,
      }
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
 * Delete a post.
 *
 * @param updatePostData The post data.
 * @returns A thunk that dispatches an action.
 */
export const deletePost = createAsyncThunk<
  StandardResponse,
  string,
  AsyncThunkConfig
>("deletePost", async (id, { rejectWithValue }) => {
  try {
    const { data } = await peopleApi.delete<StandardResponse>(`/post/${id}`);

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
 * Get users who liked a post.
 *
 * @param id The post id.
 * @param queryParams The query params.
 */
export const getPostLikes = createAsyncThunk<
  PaginatedResponse<User>,
  GetLikes,
  AsyncThunkConfig
>("getPostLikes", async ({ id, queryParams }, { rejectWithValue }) => {
  try {
    const queryString = getQueryStringFromObject(queryParams || {});
    const { data } = await peopleApi.get<PaginatedResponse<User>>(
      `/post/${id}/like?${queryString}`
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
