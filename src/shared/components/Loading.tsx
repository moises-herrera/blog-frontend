import { Spinner } from "@chakra-ui/react";

interface LoadingProps {
  text?: string;
  textClass?: string;
}

export const Loading = ({
  text = "Cargando",
  textClass = "",
}: LoadingProps) => {
  return (
    <div className="flex flex-col w-full h-full gap-4 justify-center items-center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="accent.500"
        w="100px"
        h="100px"
      />
      <p className={`text-lg ${textClass || "text-white"}`}>{text}</p>
    </div>
  );
};
