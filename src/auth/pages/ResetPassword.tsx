import { Input, Button } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ModalContainForm, FormControlContainer } from "src/shared/components";
import { AppDispatch } from "src/store/types";
import {
  ResetPasswordSchema,
  ResetPasswordSchemaType,
} from "src/auth/validations";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getQueryParams } from "src/helpers";
import {
  changePassword,
  clearErrorMessage,
  clearSuccessMessage,
} from "src/store/auth";
import { useTypedSelector } from "src/store";
import { useCallback, useEffect } from "react";
import { useMessageToast } from "src/hooks";

export const ResetPassword = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { userId, token } = getQueryParams(search);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, successMessage, errorMessage } = useTypedSelector(
    ({ auth }) => auth
  );
  const { displaySuccessMessage, displayError } = useMessageToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const clearSuccess = useCallback(() => {
    dispatch(clearSuccessMessage());
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearErrorMessage());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      displaySuccessMessage(successMessage);
      clearSuccess();
      navigate("/");
    } else if (errorMessage) {
      displayError(errorMessage);
      clearError();
    }
  }, [
    successMessage,
    errorMessage,
    displaySuccessMessage,
    displayError,
    navigate,
    clearSuccess,
    clearError,
  ]);

  const onSubmitForm: SubmitHandler<ResetPasswordSchemaType> = (data) => {
    dispatch(changePassword({ userId, token, ...data }));
  };

  if (!userId || !token) return <Navigate to="/" />;

  return (
    <ModalContainForm
      isOpen={true}
      onClose={() => {}}
      title={"Cambiar contraseña"}
      displayImage={false}
    >
      <form onSubmit={handleSubmit(onSubmitForm)} className="auth-form">
        <FormControlContainer fieldError={errors.password}>
          <Input
            placeholder="Contraseña"
            type="password"
            {...register("password")}
          />
        </FormControlContainer>
        <FormControlContainer fieldError={errors.confirmPassword}>
          <Input
            placeholder="Confirmar contraseña"
            type="password"
            {...register("confirmPassword")}
          />
        </FormControlContainer>
        <Button type="submit" variant="form" isLoading={isLoading}>
          Enviar
        </Button>
      </form>
    </ModalContainForm>
  );
};
