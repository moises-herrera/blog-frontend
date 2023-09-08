import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { blogApi } from "src/api";
import { StandardResponse } from "src/interfaces";

interface Props {
  userId: string;
  hasFollower: boolean;
}

export const FollowButton = ({ userId, hasFollower }: Props) => {
  const [hasFollowerState, setHasFollowerState] = useState<boolean>(hasFollower);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const text = hasFollowerState ? "No seguir" : "Seguir";
  const requestPath = hasFollower
    ? `/user/${userId}/unfollow`
    : `/user/${userId}/follow`;

  const onClickButton = async () => {
    setIsLoading(true);

    await blogApi.post<StandardResponse>(requestPath);

    setIsLoading(false);
    setHasFollowerState(!hasFollowerState);
  };

  return (
    <Button
      onClick={onClickButton}
      backgroundColor={"#FF5050"}
      size={"xs"}
      paddingX={"15px"}
      textColor={"#E0E0E0"}
      _hover={{ bg: "#FF5050" }}
      rounded={"2xl"}
      isLoading={isLoading}
    >
      {text}
    </Button>
  );
};
