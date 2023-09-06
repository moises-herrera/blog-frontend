import { Button, Input } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalData } from "src/interfaces";
import {
  ModalContainForm,
  FormControlContainer,
  NavLink,
} from "src/shared/components";
import { LoginSchema, LoginSchemaType } from "../validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTypedSelector } from "src/store";
import { useMessageToast } from "src/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { loginUser } from "src/store/auth";

export const LoginForm = ({ isOpen, onClose }: ModalData) => {
  const dispatch = useDispatch<AppDispatch>();
  const { errorMessage } = useTypedSelector(({ auth }) => auth);
  const { displayError } = useMessageToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    if (errorMessage) {
      displayError(errorMessage);
    }
  }, [errorMessage, displayError]);

  const onSubmitForm: SubmitHandler<LoginSchemaType> = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <ModalContainForm
      isOpen={isOpen}
      onClose={onClose}
      title={"Iniciar sesión"}
    >
      <form onSubmit={handleSubmit(onSubmitForm)} className="auth-form">
        <FormControlContainer fieldError={errors.email}>
          <Input placeholder="Correo" type="email" {...register("email")} />
        </FormControlContainer>
        <FormControlContainer fieldError={errors.password}>
          <Input
            placeholder="Contraseña"
            type="password"
            {...register("password")}
          />
        </FormControlContainer>
        <Button type="submit" variant="form">
          Iniciar sesión
        </Button>
        <div className="forgot-password-link">
          <NavLink
            path="/auth/forgot-password"
            label="¿Olvidaste tu contraseña?"
            className="!w-full"
          />
        </div>
      </form>
    </ModalContainForm>
  );
};
