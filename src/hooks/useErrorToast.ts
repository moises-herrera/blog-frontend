import { useToast } from "@chakra-ui/react";

export const useErrorToast = () => {
  const toast = useToast();

  const displayError = (message: string, duration = 5000): void => {
    toast({
      title: "Error",
      description: message,
      status: "error",
      duration,
      isClosable: true,
    });
  };

  return { displayError };
};
