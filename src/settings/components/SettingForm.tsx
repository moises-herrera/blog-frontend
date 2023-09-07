import { Box, Image, Input, Button } from "@chakra-ui/react";
import { useRef } from "react";

//New imports
import { useTypedSelector } from "src/store";
import { SettingSchema, SettingSchemaType } from "src/settings/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormControlContainer } from "src/shared/components";
import { User } from "src/interfaces";

export const SettingForm = () => {
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);
  const onUploadImage = (): void => {
    profileImageInputRef.current?.click();
  };
  //Gabriel
  const { user } = useTypedSelector(({ auth }) => auth);
  const { password, ...defaultValues } = user as User;
  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SettingSchemaType>({
    defaultValues: defaultValues,
    resolver: zodResolver(SettingSchema),
  });

  const onSubmitForm: SubmitHandler<SettingSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full h-screen bg-[#D3D3D3] text-[#2F2F2F]">
      <div className="flex flex-col items-center justify-center h-screen">
        <Box>
          <Image
            content="center"
            borderRadius="full"
            boxSize="200px"
            alt="Dan Abramov"
            cursor="pointer"
            onClick={onUploadImage}
            src={""}
          />
          <Input
            onChange={({ target: { files } }) => setValue("avatar", files?.[0])}
            className="hidden"
            type="file"
            accept="image/png,image/jpg, image/jpeg"
            ref={profileImageInputRef}
          />
        </Box>
        <div className="flex justify-center w-full mt-5">
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="flex flex-col w-full gap-10 px-5 lg:w-1/2 lg:px-0"
          >
            <FormControlContainer fieldError={errors.firstName}>
              <Input
                type="text"
                defaultValue={defaultValues.firstName}
                placeholder="Nombre"
                variant="settings"
                {...register("firstName")}
              />
            </FormControlContainer>
            <FormControlContainer fieldError={errors.lastName}>
              <Input
                type="text"
                defaultValue={defaultValues.lastName}
                placeholder="Apellido"
                variant="settings"
                {...register("lastName")}
              />
            </FormControlContainer>
            <FormControlContainer fieldError={errors.username}>
              <Input
                type="text"
                defaultValue={defaultValues.username}
                placeholder="Usuario"
                variant="settings"
                {...register("username")}
              />
            </FormControlContainer>
            <FormControlContainer fieldError={errors.email}>
              <Input
                type="text"
                defaultValue={defaultValues.email}
                placeholder="Correo"
                variant="settings"
                {...register("email")}
              />
            </FormControlContainer>
            <div className="flex">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
