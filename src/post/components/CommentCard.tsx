import { Avatar } from "@chakra-ui/react";
import { useTypedSelector } from "src/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { SettingsMenu, Username } from "src/shared/components";
import { closeCommentsModal, openDeleteModal } from "src/store/comment";
import avatarPlaceholder from "src/assets/images/avatar-placeholder.png";
import { useNavigate } from "react-router-dom";

interface Props {
  commentId: string;
  username: string;
  content: string;
  avatar: string;
  postId: string;
  postAuthorId: string;
  commentAuthorId: string;
  isFounder: boolean;
  isAccountVerified: boolean;
}

export const CommentCard = ({
  commentId,
  username,
  content,
  avatar,
  postId,
  postAuthorId,
  commentAuthorId,
  isFounder,
  isAccountVerified,
}: Props) => {
  const navigate = useNavigate();
  const { user: currentUser } = useTypedSelector(({ auth }) => auth);
  const dispatch = useDispatch<AppDispatch>();
  const hasPermissions = currentUser?._id === commentAuthorId;
  const isOwner = currentUser?._id === postAuthorId;

  const onNavigateToProfile = () => {
    navigate(`/profile/${username}`);
    dispatch(closeCommentsModal());
  };

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
        <Avatar
          size="md"
          src={avatar || avatarPlaceholder}
          onClick={onNavigateToProfile}
          className="cursor-pointer"
        />
      </div>
      <div className="flex flex-col w-full text-white">
        <div className="w-full grid grid-cols-4 pr-4">
          <div className="col-span-3">
            <p
              onClick={onNavigateToProfile}
              className="font-bold text-[16px] cursor-pointer truncate"
            >
              <Username
                username={username}
                isFounder={isFounder}
                isAccountVerified={isAccountVerified}
              />
            </p>
          </div>
          {(hasPermissions || isOwner) && (
            <div className="justify-self-end">
              <SettingsMenu
                variant="dark"
                canUpdate={false}
                canDelete={hasPermissions || isOwner}
                onClickUpdate={() => {}}
                onClickDelete={onClickDelete}
              />
            </div>
          )}
        </div>
        <p className="pr-3 text-[14px]">{content}</p>
      </div>
    </div>
  );
};
