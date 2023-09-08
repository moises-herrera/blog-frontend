import { Spinner } from "@chakra-ui/react";

export const AuthLoading = () => {
  return (
    <section className="flex flex-col gap-4 w-full h-screen bg-primary-500 justify-center items-center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="accent.500"
        w="100px"
        h="100px"
      />
      <p className="text-lg text-white">Cargando</p>
    </section>
  );
};
