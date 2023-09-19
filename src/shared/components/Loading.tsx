import { Spinner } from "@chakra-ui/react";

interface LoadingProps {
  displayText?: boolean;
  text?: string;
  textClass?: string;
  size?: string;
}

export const Loading = ({
  displayText = true,
  text = "Cargando",
  textClass = "",
  size = "100px",
}: LoadingProps) => {
  return (
    <div className="flex flex-col w-full h-full gap-4 justify-center items-center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="accent.500"
        w={size}
        h={size}
      />
      {displayText && (
        <p className={`text-lg ${textClass || "text-white"}`}>{text}</p>
      )}
    </div>
  );
};
