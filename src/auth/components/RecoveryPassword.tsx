import { Button, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalData } from "src/interfaces";
import { FormControlContainer, ModalContainForm } from "src/shared/components";
import {
  ForgotPasswordSchema,
  ForgotPasswordSchemaType,
} from "src/auth/validations";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { sendForgotPasswordEmail } from "src/store/email";
import { useTypedSelector } from "src/store";

export const RecoveryPassword = ({ isOpen, onClose }: ModalData) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useTypedSelector(({ email }) => email);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmitForm: SubmitHandler<ForgotPasswordSchemaType> = ({ email }) => {
    dispatch(sendForgotPasswordEmail({ recipient: email }));
  };

  return (
    <ModalContainForm
      isOpen={isOpen}
      onClose={onClose}
      title={"Recuperar contraseña"}
    >
      <form onSubmit={handleSubmit(onSubmitForm)} className="auth-form">
        <FormControlContainer fieldError={errors.email}>
          <Input placeholder="Correo" type="email" {...register("email")} />
        </FormControlContainer>
        <Button type="submit" variant="form" isLoading={isLoading}>
          Confirmar
        </Button>
      </form>
    </ModalContainForm>
  );
};
