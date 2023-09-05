import { Input, useBreakpointValue } from "@chakra-ui/react";

interface Props {
  placeholder: string;
  type: string;
}

export const InputComponent = ({ placeholder, type }: Props) => {
  const inputSize = useBreakpointValue({ base: "80%", lg: "30%" });
  const paddingb = useBreakpointValue({ base: "20px", lg: "30px" });
  return (
    <Input
      type={type}
      placeholder={placeholder}
      textColor={"#E0E0E0"}
      width={inputSize}
      marginBottom={paddingb}
    />
  );
};
