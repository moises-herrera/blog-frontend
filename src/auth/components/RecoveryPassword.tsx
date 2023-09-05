import { FormControl } from "@chakra-ui/react";
import {
  ModalContainForm,
  ButtonComponent,
  InputComponent,
} from "src/shared/components";
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
