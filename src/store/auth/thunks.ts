/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, UserAuth } from "src/interfaces";
import { onChecking, onLogin, onLogout } from ".";
import { blogApi } from "src/api";
import { AxiosError } from "axios";

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
      const { data } = await blogApi.post("/auth/register", user);

      dispatch(
        onLogin({
          user: data,
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
    const { data } = await blogApi.post("/auth/login", user);

    dispatch(
      onLogin({
        user: data,
      })
    );
  } catch (error) {
    dispatch(
      onLogout({
        error: (error as any).response.data.message,
      })
    );
  }
};
