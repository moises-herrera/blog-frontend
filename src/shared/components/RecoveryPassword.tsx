import { ModalContainForm } from "./ModalContainForm";
import { FormControl, InputGroup } from "@chakra-ui/react";
import { ButtonComponent } from "./ButtonComponent";
import { InputComponent } from "./InputComponent";
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
      <div>
        <FormControl>
          <InputGroup className="flex flex-col items-center">
            <InputComponent placeholder="Correo" type="email" />
          </InputGroup>
          <ButtonComponent title={"Siguiente"} />
        </FormControl>
      </div>
    </ModalContainForm>
  );
};
