import { useToast } from "@chakra-ui/react";

export const useMessageToast = () => {
  const toast = useToast();

  const displaySuccessMessage = (
    message: string,
    duration = 5000,
    onCloseComplete?: () => void
  ): void => {
    toast({
      title: "Mensaje",
      description: message,
      status: "success",
      duration,
      isClosable: true,
      onCloseComplete,
    });
  };

  const displayError = (
    message: string,
    duration = 5000,
    onCloseComplete?: () => void
  ): void => {
    toast({
      title: "Error",
      description: message,
      status: "error",
      duration,
      isClosable: true,
      onCloseComplete,
    });
  };

  return { displaySuccessMessage, displayError };
};
