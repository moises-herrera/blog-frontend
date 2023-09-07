import { Box, Image, Input } from "@chakra-ui/react";
import { ButtonComponent } from "src/shared/components";
import { useRef } from "react";

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
          <form className="flex flex-col w-full gap-10 px-5 lg:w-1/2 lg:px-0">
            <Input value="Gabriel" placeholder="Nombre" variant="settings" />
            <Input value="Oquendo" placeholder="Apellido" variant="settings" />
            <Input
              value="@Oquendo_Gabriel"
              placeholder="Usuario"
              variant="settings"
            />
            <Input
              value="oquendogabrielq8@gmail.com"
              placeholder="Correo"
              variant="settings"
            />
            <div className="flex">
              <ButtonComponent title="Cancelar" />
              <ButtonComponent title="Guardar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
