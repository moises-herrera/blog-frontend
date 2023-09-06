import { Button } from "@chakra-ui/react";

interface Props {
  title: string;
  onClick?: () => void;
}

export const ButtonComponent = ({ title, onClick }: Props) => {
  return (
    <div className="w-full text-center">
      <Button onClick={onClick} variant="form">
        {title}
      </Button>
    </div>
  );
};
