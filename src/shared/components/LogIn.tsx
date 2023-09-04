import { ModalContainForm } from "./ModalContainForm";
import { FormControl, InputGroup } from "@chakra-ui/react";
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
      <div>
        <FormControl>
          <InputGroup className="flex flex-col items-center">
            <InputComponent placeholder="Correo" type="email" />
            <InputComponent placeholder="Contraseña" type="password" />
          </InputGroup>
          <ButtonComponent title={"Iniciar sesión"} />
        </FormControl>
        <div className="text-center font-medium text-[16px] text-[#E0E0E0] mt-4">
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </ModalContainForm>
  );
};
