import { useTypedSelector } from "src/store";
import { AuthLoading } from "src/auth/components";
import { useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getQueryParams } from "src/helpers";
import { useMessageToast } from "src/hooks";
import { AppDispatch } from "src/store/types";
import { useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";
import { confirmEmail } from "src/store/auth";
import mailBox from "src/assets/images/mailbox.svg";

export const ConfirmEmail = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { userId, token } = getQueryParams(search);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, successMessage, errorMessage } = useTypedSelector(
    ({ auth }) => auth
  );
  const { displaySuccessMessage, displayError } = useMessageToast();

  useEffect(() => {
    if (successMessage) {
      displaySuccessMessage(successMessage);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else if (errorMessage) {
      displayError(errorMessage);
    }
  }, [
    successMessage,
    errorMessage,
    displaySuccessMessage,
    displayError,
    navigate,
  ]);

  useEffect(() => {
    dispatch(confirmEmail({ userId, token }));
  }, []);

  if (!userId || !token) return <Navigate to="/" />;

  if (isLoading) return <AuthLoading />;

  return (
    <section className="w-full h-screen bg-primary-500 p-28 flex flex-col items-center justify-center">
      <div className="w-fit h-fit bg-white p-14 rounded-lg">
        <Box className="flex items-center justify-center">
          <Image src={mailBox} alt="mailbox" className="w-[550px]" />
        </Box>

        <p className="text-center text-lg mt-8">
          Tu correo ha sido confirmado, ahora puedes iniciar sesión en tu cuenta
        </p>
      </div>
    </section>
  );
};
