import { ModalContainForm } from "../../shared/components/ModalContainForm";
import { FormControl } from "@chakra-ui/react";
import { ButtonComponent } from "../../shared/components/ButtonComponent";
import { InputComponent } from "../../shared/components/InputComponent";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const RecoveryPassword = ({ isOpen, onClose }: Props) => {
  return (
    <ModalContainForm
      isOpen={isOpen}
      onClose={onClose}
      title={"Recuperar contraseña"}
    >
      <FormControl>
        <InputComponent placeholder="Correo" type="email" />
      </FormControl>
      <ButtonComponent title={"Siguiente"} />
    </ModalContainForm>
  );
};
