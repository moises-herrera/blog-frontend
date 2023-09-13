import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { blogApi } from "src/api";
import { hasFollower } from "src/helpers";
import { StandardResponse, User } from "src/interfaces";
import { useTypedSelector } from "src/store";
import { setUserPosts } from "src/store/post";
import { AppDispatch } from "src/store/types";
import { addFollowing, removeFollowing } from "src/store/users";

interface Props {
  user: User;
  currentUser: User;
}

export const FollowButton = ({ user, currentUser }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userProfile } = useTypedSelector(({ users }) => users);
  const { userPosts } = useTypedSelector(({ post }) => post);
  const [hasFollowerState, setHasFollowerState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const text = hasFollowerState ? "No seguir" : "Seguir";
  const requestPath = hasFollowerState
    ? `/user/${user._id}/unfollow`
    : `/user/${user._id}/follow`;

  useEffect(() => {
    setHasFollowerState(hasFollower(user, currentUser._id));
  }, [user, currentUser._id]);

  const onClickButton = async () => {
    setIsLoading(true);

    await blogApi.post<StandardResponse>(requestPath);

    setIsLoading(false);
    setHasFollowerState(!hasFollowerState);

    dispatch(
      hasFollowerState
        ? removeFollowing({
            user,
            currentUser,
          })
        : addFollowing({
            user,
            currentUser,
          })
    );

    if (userProfile?._id) {
      const newUserPosts = userPosts.map((post) => {
        if (post.user._id === user._id) {
          return {
            ...post,
            user: {
              ...post.user,
              followers: hasFollowerState
                ? post.user.followers.filter((id) => id !== currentUser._id)
                : [...post.user.followers, currentUser],
            },
          };
        }

        return post;
      });

      dispatch(setUserPosts(newUserPosts));
    }
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
