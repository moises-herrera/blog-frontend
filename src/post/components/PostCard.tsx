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
  useDisclosure,
} from "@chakra-ui/react";
import { getDateFormattedFromString, getFullName } from "src/helpers";
import { PostInfo, User } from "src/interfaces";
import { PostCardContainer } from ".";
import { FollowButton, SettingsMenu } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";
import { useDispatch } from "react-redux";
import { openDeleteModal, openNewPostForm, setEditPost } from "src/store/post";
import { CommentsModal } from "src/shared/components";
import { Link } from "react-router-dom";
import avatarPlaceholder from "src/assets/images/avatar-placeholder.png";

export const PostCard = (data: PostInfo) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      })
    );
    dispatch(openNewPostForm());
  };

  const onClickDelete = () => {
    dispatch(openDeleteModal(_id));
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
              <Heading size="xs">@{user.username}</Heading>
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
        {image && (
          <Box className="flex justify-center mb-5">
            <Image src={image} alt={title} borderRadius={20} />
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
            <button onClick={onOpen}>
              <i className="fa-regular fa-comment"></i>
            </button>
            <span>{comments.length}</span>
          </div>
          <div className="space-x-2">
            <button>
              <i className="fa-regular fa-heart"></i>
            </button>
            <span>{likes.length}</span>
          </div>
        </ButtonGroup>
      </CardFooter>

      {isOpen && (
        <CommentsModal
          onClose={onClose}
          isOpen={isOpen}
          infoPost={data}
          currentUserId={currentUser?._id || ""}
        />
      )}
    </PostCardContainer>
  );
};
