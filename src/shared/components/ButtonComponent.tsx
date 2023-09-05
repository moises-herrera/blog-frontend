import { Button } from "@chakra-ui/react";

interface Props {
  title: string;
  onOpen?: () => void;
}

export const ButtonComponent = ({ title, onOpen }: Props) => {
  return (
    <div className="w-full text-center">
      <Button
        onClick={onOpen}
        className="text-[20px] font-medium mb-2"
        _hover={{ bg: "#FF5050" }}
        textColor={"#E0E0E0"}
        background={"#FF5050"}
        rounded={"20px"}
        size="md"
        color={"#E0E0E0"}
        paddingX={"60px"}
        paddingY={"5px"}
      >
        {title}
      </Button>
    </div>
  );
};
