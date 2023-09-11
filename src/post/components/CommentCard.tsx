import { Avatar } from "@chakra-ui/react";
import { useTypedSelector } from "src/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { SettingsMenu } from "src/shared/components";
import { openDeleteModal } from "src/store/comment";
import avatarPlaceholder from "src/assets/images/avatar-placeholder.png";

interface Props {
  commentId: string;
  username: string;
  content: string;
  avatar: string;
  postId: string;
  postAuthorId: string;
  commentAuthorId: string;
}

export const CommentCard = ({
  commentId,
  username,
  content,
  avatar,
  postId,
  postAuthorId,
  commentAuthorId,
}: Props) => {
  const { user: currentUser } = useTypedSelector(({ auth }) => auth);
  const dispatch = useDispatch<AppDispatch>();
  const hasPermissions = currentUser?._id === commentAuthorId;
  const isOwner = currentUser?._id === postAuthorId;

  const onClickDelete = () => {
    dispatch(
      openDeleteModal({
        postId,
        commentId,
      })
    );
  };

  return (
    <div className="flex mb-4">
      <div className="px-4">
        <Avatar size="md" src={avatar || avatarPlaceholder} />
      </div>
      <div className="flex flex-col w-full text-white">
        <div className="flex justify-between w-full pr-4">
          <p className="font-bold text-[16px]">{username}</p>
          <>
            {hasPermissions ||
              (isOwner && (
                <SettingsMenu
                  variant="dark"
                  canUpdate={false}
                  canDelete={hasPermissions || isOwner}
                  onClickUpdate={() => {}}
                  onClickDelete={onClickDelete}
                />
              ))}
          </>
        </div>
        <p className="pr-3 text-[14px]">{content}</p>
      </div>
    </div>
  );
};
