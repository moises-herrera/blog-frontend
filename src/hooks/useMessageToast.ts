import { useToast } from "@chakra-ui/react";

export const useMessageToast = () => {
  const toast = useToast();

  const displaySuccessMessage = (message: string, duration = 5000): void => {
    toast({
      title: "Mensaje",
      description: message,
      status: "success",
      duration,
      isClosable: true,
    });
  };

  const displayError = (message: string, duration = 5000): void => {
    toast({
      title: "Error",
      description: message,
      status: "error",
      duration,
      isClosable: true,
    });
  };

  return { displaySuccessMessage, displayError };
};
