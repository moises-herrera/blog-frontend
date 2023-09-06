import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface FormControlContainerProps {
  fieldError: FieldError | undefined;
  children: React.ReactNode;
}

export const FormControlContainer = ({
  fieldError,
  children,
}: FormControlContainerProps) => {
  return (
    <FormControl isInvalid={!!fieldError}>
      {children}
      <FormErrorMessage>{fieldError && fieldError.message}</FormErrorMessage>
    </FormControl>
  );
};
