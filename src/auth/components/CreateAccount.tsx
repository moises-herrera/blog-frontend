import { ModalContainForm } from "../../shared/components/ModalContainForm";
import { FormControl } from "@chakra-ui/react";
import { ButtonComponent } from "../../shared/components/ButtonComponent";
import { InputComponent } from "../../shared/components/InputComponent";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateAccount = ({ isOpen, onClose }: Props) => {
  return (
    <ModalContainForm
      isOpen={isOpen}
      onClose={onClose}
      title={"Da vida a tus ideas y comparte tu pasion con el mundo."}
    >
      <FormControl>
        <InputComponent placeholder="Nombre" type="text" />
      </FormControl>
      <FormControl>
        <InputComponent placeholder="Apellido" type="text" />
      </FormControl>
      <FormControl>
        <InputComponent placeholder="Usuario" type="text" />
      </FormControl>
      <FormControl>
        <InputComponent placeholder="Correo" type="email" />
      </FormControl>
      <FormControl>
        <InputComponent placeholder="Contraseña" type="password" />
      </FormControl>
      <FormControl>
        <InputComponent placeholder="Confirmar contraseña" type="password" />
      </FormControl>
      <ButtonComponent title={"Crear cuenta"} />
      <div className="text-center font-medium text-[16px] text-[#E0E0E0] mt-4">
        <a href="#">¿Olvidaste tu contraseña?</a>
      </div>
    </ModalContainForm>
  );
};
