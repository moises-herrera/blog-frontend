import {
  Avatar,
  Box,
  ButtonGroup,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  getDateFormattedFromString,
  getFullName,
  postHasLike,
} from "src/helpers";
import { PostInfo, User } from "src/interfaces";
import { PostCardContainer } from ".";
import { FollowButton, SettingsMenu, Username } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";
import { useDispatch } from "react-redux";
import {
  openDeleteModal,
  openNewPostForm,
  setEditPost,
  setPostInfoActive,
} from "src/store/post";
import { Link } from "react-router-dom";
import avatarPlaceholder from "src/assets/images/avatar-placeholder.png";
import { LikeButton } from ".";
import { openCommentsModal } from "src/store/comment";
import { openLikesModal } from "src/store/ui";

export const PostCard = (data: PostInfo) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user: currentUser } = useTypedSelector(({ auth }) => auth);
  const {
    _id,
    title,
    topic,
    image,
    description,
    user,
    comments,
    likes,
    createdAt,
    files,
  } = data;

  const onClickUpdate = () => {
    dispatch(
      setEditPost({
        _id,
        title,
        topic,
        image,
        description,
        user: user._id,
        files,
      })
    );
    dispatch(openNewPostForm());
  };

  const onOpenCommentsModal = () => {
    dispatch(openCommentsModal());
    dispatch(setPostInfoActive(data));
  };

  const onOpenLikesModal = () => {
    dispatch(openLikesModal());
    dispatch(setPostInfoActive(data));
  };

  const onClickDelete = () => {
    dispatch(openDeleteModal(data));
  };

  return (
    <PostCardContainer>
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-8">
          <Link to={`/profile/${user.username}`}>
            <div className="flex items-center space-x-2">
              <Avatar
                name={getFullName(user)}
                src={user.avatar || avatarPlaceholder}
              />
              <Heading size="xs" width="70%" isTruncated>
                <Username
                  username={user.username}
                  isFounder={user.isFounder}
                  isAccountVerified={user.isAccountVerified}
                />
              </Heading>
            </div>
          </Link>
          {currentUser?._id !== user._id && (
            <FollowButton user={user} currentUser={currentUser as User} />
          )}
        </div>
        {currentUser?._id === user._id && (
          <SettingsMenu
            onClickUpdate={onClickUpdate}
            onClickDelete={onClickDelete}
          />
        )}
      </CardHeader>

      <CardBody>
        {files?.length && (
          <Box className="flex justify-center mb-5">
            {files[0].type.includes("image") ? (
              <Image src={files[0].url} alt={title} borderRadius={20} />
            ) : (
              <video src={files[0].url} controls />
            )}
          </Box>
        )}

        <div className="flex justify-between text-sm text-secondary-300">
          <span>#{topic}</span>
          <span>{getDateFormattedFromString(createdAt)}</span>
        </div>

        <Stack marginTop={2}>
          <Heading
            size="md"
            textAlign="center"
            fontWeight="semibold"
            isTruncated
          >
            {title}
          </Heading>
          <Text maxHeight="200px" noOfLines={6} textAlign="justify">
            {description}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter className="flex justify-center w-full">
        <ButtonGroup className="space-x-36">
          <div className="space-x-2">
            <button onClick={onOpenCommentsModal}>
              <i className="fa-regular fa-comment"></i>
            </button>
            <span>{comments.length}</span>
          </div>
          <div className="space-x-2">
            <LikeButton
              postId={_id}
              userId={currentUser?._id as string}
              userLiked={postHasLike(likes, currentUser?._id as string)}
            />
            <button onClick={onOpenLikesModal} disabled={likes.length === 0}>
              <span>{likes.length}</span>
            </button>
          </div>
        </ButtonGroup>
      </CardFooter>
    </PostCardContainer>
  );
};
