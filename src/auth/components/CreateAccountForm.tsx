import { Button, Input, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormControlContainer,
  ModalContainForm,
  NavLink,
} from "src/shared/components";
import { SignUpSchema, SignUpSchemaType } from "src/auth/validations";
import { ModalData } from "src/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { startRegisterUser } from "src/store/auth";
import { useEffect } from "react";

export const CreateAccountForm = ({ isOpen, onClose }: ModalData) => {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector(({ auth }) => auth);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });

  useEffect(() => {
    if (errorMessage) {
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  });

  const onSubmitForm: SubmitHandler<SignUpSchemaType> = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(startRegisterUser(data) as any);
  };

  return (
    <ModalContainForm
      isOpen={isOpen}
      onClose={onClose}
      title={"Da vida a tus ideas y comparte tu pasion con el mundo."}
    >
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="flex flex-col w-[70%] lg:w-[30%] mx-auto items-center gap-5"
      >
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
        <Button type="submit" variant="form">
          Crear cuenta
        </Button>
        <div className="text-center font-medium text-[16px] text-secondary-100 mt-4">
          <NavLink path="/auth" label="¿Olvidaste tu contraseña?" />
        </div>
      </form>
    </ModalContainForm>
  );
};
