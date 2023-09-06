import { Button, Input } from "@chakra-ui/react";
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
import { registerUser } from "src/store/auth";
import { useEffect } from "react";
import { useMessageToast } from "src/hooks";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";

export const CreateAccountForm = ({ isOpen, onClose }: ModalData) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, errorMessage } = useTypedSelector(({ auth }) => auth);
  const { displayError } = useMessageToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });

  useEffect(() => {
    if (errorMessage) {
      displayError(errorMessage);
    }
  }, [errorMessage, displayError]);

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
        <Button type="submit" variant="form" isLoading={status === "checking"}>
          Crear cuenta
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
