import { Box, Image, Input } from "@chakra-ui/react";
import { ButtonComponent } from "src/shared/components";
import { useRef } from "react";
import { InputSetting } from ".";

export const SettingForm = () => {
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);
  const onUploadImage = (): void => {
    profileImageInputRef.current?.click();
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
            src="https://bit.ly/dan-abramov"
          />
          <Input
            className="hidden"
            type="file"
            accept="image/png,image/jpg, image/jpeg"
            ref={profileImageInputRef}
          />
        </Box>
        <div className="flex justify-center w-full mt-5">
          <form className="w-full px-5 lg:w-1/2 lg:px-0">
            <InputSetting value="Gabriel" label="Nombre" />
            <InputSetting value="Oquendo" label="Apellido" />
            <InputSetting value="@Oquendo_Gabriel" label="Usuario" />
            <InputSetting value="oquendogabrielq8@gmail.com" label="Correo" />
            <div className="lg:flex">
              <ButtonComponent title="Cancelar" />
              <ButtonComponent title="Guardar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
