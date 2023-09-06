/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthResponse, User, UserAuth } from "src/interfaces";
import { onChecking, onLogin, onLogout } from ".";
import { blogApi } from "src/api";
import { AxiosError } from "axios";
import { getToken, removeToken, setToken } from "src/helpers";

/**
 * Start register a user.
 *
 * @param user The user to register.
 * @returns A thunk that dispatches an action.
 */
export const startRegisterUser =
  (user: Partial<User>) => async (dispatch: any) => {
    dispatch(onChecking());

    try {
      const { data } = await blogApi.post<AuthResponse>("/auth/register", user);

      setToken(data.accessToken);

      dispatch(
        onLogin({
          user: data.user,
        })
      );
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Ha ocurrido un error al intentar registrarse.";

      dispatch(onLogout(message));
    }
  };

/**
 * Start login a user.
 *
 * @param user The user to login.
 * @returns A thunk that dispatches an action.
 */
export const startLoginUser = (user: UserAuth) => async (dispatch: any) => {
  dispatch(onChecking());

  try {
    const { data } = await blogApi.post<AuthResponse>("/auth/login", user);

    setToken(data.accessToken);

    dispatch(
      onLogin({
        user: data.user,
      })
    );
  } catch (error) {
    const message =
      error instanceof AxiosError
        ? error.response?.data.message
        : "Ha ocurrido un error al iniciar sesión.";

    dispatch(onLogout(message));
  }
};

/**
 * Validate the access token.
 *
 * @returns A thunk that dispatches an action.
 */
export const validateAccessToken = () => async (dispatch: any) => {
  const token = getToken();

  if (!token) return dispatch(onLogout("La sesión ha expirado."));

  try {
    const { data } = await blogApi.get<AuthResponse>("/auth/renew-token");

    setToken(data.accessToken);

    dispatch(
      onLogin({
        user: data.user,
      })
    );
  } catch (error) {
    const message =
      error instanceof AxiosError
        ? error.response?.data.message
        : "Ha ocurrido un error.";

    dispatch(
      onLogout({
        error: message,
      })
    );
  }
};

/**
 * Start logout a user.
 *
 * @returns A thunk that dispatches an action.
 */
export const startLogoutUser = () => async (dispatch: any) => {
  removeToken();
  dispatch(onLogout(null));
};
