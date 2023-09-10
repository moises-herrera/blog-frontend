import { useState } from "react";
import { useDispatch } from "react-redux";
import { blogApi } from "src/api";
import { addLike, removeLike } from "src/store/post";
import { AppDispatch } from "src/store/types";

interface LikeButtonProps {
  postId: string;
  userId: string;
  userLiked: boolean;
}

export const LikeButton = ({ postId, userId, userLiked }: LikeButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const requestPath = !userLiked
    ? `/post/${postId}/like`
    : `/post/${postId}/unlike`;

  const onClickLike = async () => {
    setIsLoading(true);

    await blogApi.post(requestPath);

    setIsLoading(false);

    dispatch(
      !userLiked ? addLike({ postId, userId }) : removeLike({ postId, userId })
    );
  };

  return (
    <button
      onClick={onClickLike}
      disabled={isLoading}
      className={isLoading ? "opacity-60" : ""}
    >
      <i
        className={`${
          !userLiked ? "fa-regular text-black" : "fa-solid text-red-500"
        } fa-heart`}
      ></i>
    </button>
  );
};
