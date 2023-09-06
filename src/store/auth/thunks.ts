import { AuthResponse, User, UserAuth } from "src/interfaces";
import { blogApi } from "src/api";
import { AxiosError } from "axios";
import { getToken, setToken } from "src/helpers";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "src/store/types";
import { sendConfirmEmail } from "src/store/email";

/**
 * Start register a user.
 *
 * @param user The user to register.
 * @returns A thunk that dispatches an action.
 */
export const registerUser = createAsyncThunk<
  User,
  Partial<User>,
  AsyncThunkConfig
>(
  "registerUser",
  async (user: Partial<User>, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await blogApi.post<AuthResponse>("/auth/register", user);

      setToken(data.accessToken);

      dispatch(
        sendConfirmEmail({
          recipient: data.user.email,
        })
      );

      return data.user;
    } catch (error) {
      const message: string =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Ha ocurrido un error al intentar registrarse.";

      return rejectWithValue({
        message,
      });
    }
  }
);

/**
 * Start login a user.
 *
 * @param user The user credentials to login.
 * @returns A thunk that dispatches an action.
 */
export const loginUser = createAsyncThunk<User, UserAuth, AsyncThunkConfig>(
  "loginUser",
  async (user: UserAuth, { rejectWithValue }) => {
    try {
      const { data } = await blogApi.post<AuthResponse>("/auth/login", user);

      setToken(data.accessToken);

      return data.user;
    } catch (error) {
      const message: string =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Ha ocurrido un error al iniciar sesión.";

      return rejectWithValue({
        message,
      });
    }
  }
);

/**
 * Validate the access token.
 *
 * @returns A thunk that dispatches an action.
 */
export const validateAccessToken = createAsyncThunk<
  User,
  void,
  AsyncThunkConfig
>("renewToken", async (_, { rejectWithValue }) => {
  const token = getToken();

  if (!token) {
    return rejectWithValue({
      message: "La sesión ha expirado.",
    });
  }

  try {
    const { data } = await blogApi.get<AuthResponse>("/auth/renew-token");

    setToken(data.accessToken);

    return data.user;
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
