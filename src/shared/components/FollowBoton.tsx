import { Button } from "@chakra-ui/react";

interface Props {
  title: string;
}
export const FollowBoton = ({ title }: Props) => {
  return (
    <>
      <Button
        backgroundColor={"#FF5050"}
        size={"xs"}
        paddingX={"15px"}
        textColor={"#E0E0E0"}
        _hover={{ bg: "#FF5050" }}
        rounded={"2xl"}
      >
        {title}
      </Button>
    </>
  );
};
