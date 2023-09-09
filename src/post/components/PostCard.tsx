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
  hasFollower,
} from "src/helpers";
import { PostInfo } from "src/interfaces";
import { PostCardContainer } from ".";
import postImage from "src/assets/images/upload-image.png";
import { FollowButton, SettingsMenu } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";
import { useDispatch } from "react-redux";
import { openDeleteModal, openNewPostForm, setEditPost } from "src/store/post";
import { Link } from "react-router-dom";

export const PostCard = ({
  _id,
  title,
  topic,
  image,
  description,
  user,
  comments,
  likes,
  createdAt,
}: PostInfo) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user: currentUser } = useTypedSelector(({ auth }) => auth);

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
    dispatch(openDeleteModal(_id as string));
  };

  return (
    <PostCardContainer>
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-8">
          <Link to={`/profile/${user.username}`}>
            <div className="flex items-center space-x-2">
              <Avatar name={getFullName(user)} src={user.avatar} />
              <Heading size="xs">@{user.username}</Heading>
            </div>
          </Link>
          {currentUser?._id !== user._id && (
            <FollowButton
              userId={user._id}
              hasFollower={hasFollower(user, currentUser?._id as string)}
            />
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
        <Box className="flex justify-center mb-5">
          <Image src={image || postImage} alt={title} borderRadius={20} />
        </Box>

        <div className="flex justify-between text-secondary-300 text-sm">
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

      <CardFooter className="flex w-full justify-center">
        <ButtonGroup className="space-x-36">
          <div className="space-x-2">
            <button>
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
    </PostCardContainer>
  );
};
