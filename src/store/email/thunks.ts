import { AxiosError } from "axios";
import { blogApi } from "src/api";
import { onSendEmail, onSendEmailError, onSendEmailSuccess } from ".";
import { SendEmail, StandardResponse } from "src/interfaces";

/**
 * Start send confirm email.
 *
 * @param emailData The email data.
 * @returns A thunk that dispatches an action.
 */
export const startSendConfirmEmail =
  (emailData: SendEmail) => async (dispatch: any) => {
    dispatch(onSendEmail());

    try {
      const { data } = await blogApi.post<StandardResponse>(
        "/email/confirm-email",
        emailData
      );

      dispatch(onSendEmailSuccess(data.message));
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Ha ocurrido un error.";

      dispatch(onSendEmailError(message));
    }
  };
