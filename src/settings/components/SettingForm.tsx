import { Box, Image, Input, Button } from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { useTypedSelector } from "src/store";
import { SettingSchema, SettingSchemaType } from "src/settings/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormControlContainer } from "src/shared/components";
import avatarPlaceholder from "src/assets/images/avatar-placeholder.png";
import { updateUser } from "src/store/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { getFormDataFromObject, convertImageToBase64 } from "src/helpers";
import { useMessageToast } from "src/hooks";

export const SettingForm = () => {
  const { user, errorMessage, successMessage, isLoading } = useTypedSelector(
    ({ auth }) => auth
  );

  const { displaySuccessMessage, displayError } = useMessageToast();

  const [userAvatar, setUserAvatar] = useState<string | ArrayBuffer | null>(
    (user?.avatar as string) || null
  );

  const dispatch = useDispatch<AppDispatch>();

  const profileImageInputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImage = (): void => {
    profileImageInputRef.current?.click();
  };

  const formDefaultValues = {
    ...user,
    password: "",
  };
  const onCancelChanges = () => {
    reset(formDefaultValues);
    setUserAvatar(user?.avatar || null);
  };

  const onUploadAvatar = (files: FileList | null) => {
    const avatarFile = files?.[0];
    setValue("avatar", avatarFile);
    if (avatarFile) {
      convertImageToBase64(avatarFile, setUserAvatar);
    }
  };

  const {
    reset,
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SettingSchemaType>({
    defaultValues: formDefaultValues,
    resolver: zodResolver(SettingSchema),
  });

  const onSubmitForm: SubmitHandler<SettingSchemaType> = (data) => {
    const userData = getFormDataFromObject(data);
    dispatch(
      updateUser({
        id: user?._id as string,
        userData: userData,
      })
    );
  };
  useEffect(() => {
    if (successMessage) {
      displaySuccessMessage(successMessage);
    } else if (errorMessage) {
      displayError(errorMessage);
    }
  }, [errorMessage, displayError, displaySuccessMessage, successMessage]);

  useEffect(() => {
    document.title = "Configuración";
  }, []);

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
            src={(userAvatar as string) || avatarPlaceholder}
          />
          <Input
            onChange={({ target: { files } }) => onUploadAvatar(files)}
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
              <Button type="button" variant="form" onClick={onCancelChanges}>
                Cancelar
              </Button>

              <Button type="submit" variant="form" isLoading={isLoading}>
                Guardar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
