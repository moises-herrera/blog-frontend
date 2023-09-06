import { FormControl } from "@chakra-ui/react";
import { ModalData } from "src/interfaces";
import {
  ModalContainForm,
  ButtonComponent,
  InputComponent,
} from "src/shared/components";

export const RecoveryPassword = ({ isOpen, onClose }: ModalData) => {
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
