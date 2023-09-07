import { Box, Image, Input, Button } from "@chakra-ui/react";
import { useRef } from "react";

//New imports
import { useTypedSelector } from "src/store";
import { SettingSchema, SettingSchemaType } from "src/settings/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormControlContainer } from "src/shared/components";
import avatarPlaceholder from "src/assets/images/avatar-placeholder.png";

export const SettingForm = () => {
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);
  const onUploadImage = (): void => {
    profileImageInputRef.current?.click();
  };
  //Gabriel
  const { user } = useTypedSelector(({ auth }) => auth);
  const formDefaultValues = {
    ...user,
    password: "",
  };
  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SettingSchemaType>({
    defaultValues: formDefaultValues,
    resolver: zodResolver(SettingSchema),
  });

  const onSubmitForm: SubmitHandler<SettingSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full h-screen bg-secondary-200 text-primary-500">
      <div className="flex flex-col items-center justify-center h-screen">
        <Box>
          <Image
            content="center"
            borderRadius="full"
            boxSize="200px"
            alt="avatar"
            cursor="pointer"
            onClick={onUploadImage}
            src={user?.avatar || avatarPlaceholder}
          />
          <Input
            onChange={({ target: { files } }) => setValue("avatar", files?.[0])}
            className="hidden"
            type="file"
            accept="image/png,image/jpg,image/jpeg"
            ref={profileImageInputRef}
          />
        </Box>
        <div className="flex justify-center w-full mt-5">
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="flex flex-col w-full gap-10 px-12 lg:w-1/2 lg:px-0"
          >
            <FormControlContainer fieldError={errors.firstName}>
              <Input
                type="text"
                placeholder="Nombre"
                variant="settings"
                {...register("firstName")}
              />
            </FormControlContainer>
            <FormControlContainer fieldError={errors.lastName}>
              <Input
                type="text"
                placeholder="Apellido"
                variant="settings"
                {...register("lastName")}
              />
            </FormControlContainer>
            <FormControlContainer fieldError={errors.username}>
              <Input
                type="text"
                placeholder="Usuario"
                variant="settings"
                {...register("username")}
              />
            </FormControlContainer>
            <FormControlContainer fieldError={errors.email}>
              <Input
                type="text"
                placeholder="Correo"
                variant="settings"
                {...register("email")}
              />
            </FormControlContainer>
            <FormControlContainer fieldError={errors.password}>
              <Input
                type="password"
                placeholder="Contraseña"
                variant="settings"
                {...register("password")}
              />
            </FormControlContainer>
            <div className="flex justify-center space-x-8">
              <Button type="button" variant="form">
                Cancelar
              </Button>

              <Button type="submit" variant="form">
                Guardar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
