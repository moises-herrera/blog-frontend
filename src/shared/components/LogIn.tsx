import { ModalContainForm } from "./ModalContainForm";
import { FormControl } from "@chakra-ui/react";
import { ButtonComponent } from "./ButtonComponent";
import { InputComponent } from "./InputComponent";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LogIn = ({ isOpen, onClose }: Props) => {
  return (
    <ModalContainForm
      isOpen={isOpen}
      onClose={onClose}
      title={"Iniciar sesión"}
    >
      <FormControl>
        <InputComponent placeholder="Correo" type="email" />
      </FormControl>
      <FormControl>
        <InputComponent placeholder="Contraseña" type="password" />
      </FormControl>
      <ButtonComponent title={"Iniciar sesión"} />
      <div className="text-center font-medium text-[16px] text-[#E0E0E0] mt-4">
        <a href="#">¿Olvidaste tu contraseña?</a>
      </div>
    </ModalContainForm>
  );
};
