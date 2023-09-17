import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormControlContainer,
  ModalContainForm,
  NavLink,
} from "src/shared/components";
import { SignUpSchema, SignUpSchemaType } from "src/auth/validations";
import { ModalData } from "src/interfaces";
import { useDispatch } from "react-redux";
import { clearErrorMessage, registerUser } from "src/store/auth";
import { useCallback, useEffect, useState } from "react";
import { useMessageToast } from "src/hooks";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";

export const CreateAccountForm = ({ isOpen, onClose }: ModalData) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, errorMessage } = useTypedSelector(({ auth }) => auth);
  const [isvisible, setIsVisible] = useState(false);
  const onChangeVisible = () => {
    setIsVisible(!isvisible);
  };
  const { displayError } = useMessageToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });

  const clearError = useCallback(() => {
    dispatch(clearErrorMessage());
  }, [dispatch]);

  useEffect(() => {
    if (errorMessage) {
      displayError(errorMessage);
      clearError();
    }
  }, [errorMessage, displayError, clearError]);

  const onSubmitForm: SubmitHandler<SignUpSchemaType> = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <ModalContainForm
      isOpen={isOpen}
      onClose={onClose}
      title={"Da vida a tus ideas y comparte tu pasion con el mundo."}
    >
      <form onSubmit={handleSubmit(onSubmitForm)} className="auth-form">
        <FormControlContainer fieldError={errors.firstName}>
          <Input placeholder="Nombre" type="text" {...register("firstName")} />
        </FormControlContainer>
        <FormControlContainer fieldError={errors.lastName}>
          <Input placeholder="Apellido" type="text" {...register("lastName")} />
        </FormControlContainer>
        <FormControlContainer fieldError={errors.username}>
          <Input placeholder="Usuario" type="text" {...register("username")} />
        </FormControlContainer>
        <FormControlContainer fieldError={errors.email}>
          <Input placeholder="Correo" type="email" {...register("email")} />
        </FormControlContainer>
        <FormControlContainer fieldError={errors.password}>
          <InputGroup>
            <Input
              placeholder="Contraseña"
              type={isvisible ? "text" : "password"}
              {...register("password")}
            />
            <InputRightElement>
              <button onClick={onChangeVisible}>
                {!isvisible ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </button>
            </InputRightElement>
          </InputGroup>
        </FormControlContainer>
        <FormControlContainer fieldError={errors.confirmPassword}>
          <InputGroup>
            <Input
              placeholder="Confirmar contraseña"
              type={isvisible ? "text" : "password"}
              {...register("password")}
              {...register("confirmPassword")}
            />
            <InputRightElement>
              <button onClick={onChangeVisible}>
                {!isvisible ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </button>
            </InputRightElement>
          </InputGroup>
        </FormControlContainer>
        <Button type="submit" variant="form" isLoading={status === "checking"}>
          Crear cuenta
        </Button>
        <div className="auth-link">
          <NavLink
            path="/auth/forgot-password"
            label="¿Olvidaste tu contraseña?"
            className="!w-full"
          />
        </div>

        <div className="auth-link">
          <hr />

          <p className="w-full mt-2">
            ¿Ya tienes una cuenta?
            <NavLink
              path="/auth/login"
              label="Iniciar sesión"
              className="!w-full justify-center"
            />
          </p>
        </div>
      </form>
    </ModalContainForm>
  );
};
