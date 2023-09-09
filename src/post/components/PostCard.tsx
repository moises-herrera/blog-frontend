import {
  Avatar,
  Box,
  ButtonGroup,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  getDateFormattedFromString,
  getFullName,
  hasFollower,
} from "src/helpers";
import { PostInfo } from "src/interfaces";
import { PostCardContainer } from ".";
import postImage from "src/assets/images/upload-image.png";
import { FollowButton } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";
import { useDispatch } from "react-redux";
import { openDeleteModal, openNewPostForm, setEditPost } from "src/store/post";
import { CommentsModal } from "src/shared/components";

export const PostCard = (data: PostInfo) => {
  console.log(data);
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
    dispatch(openDeleteModal(_id as string));
  };

  return (
    <PostCardContainer>
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center space-x-2">
            <Avatar name={getFullName(user)} src={user.avatar} />
            <Heading size="xs">@{user.username}</Heading>
          </div>
          <FollowButton
            userId={user._id}
            hasFollower={hasFollower(user, currentUser?._id as string)}
          />
        </div>
        {currentUser?._id === user._id && (
          <Menu>
            <MenuButton>
              <i className="text-xl fa-solid fa-ellipsis-vertical"></i>
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={onClickUpdate}
                icon={<i className="fa-solid fa-pen-to-square"></i>}
              >
                Editar
              </MenuItem>
              <MenuItem
                onClick={onClickDelete}
                icon={<i className="fa-solid fa-trash"></i>}
              >
                Eliminar
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </CardHeader>

      <CardBody>
        <Box className="flex justify-center mb-5">
          <Image src={image || postImage} alt={title} borderRadius={20} />
        </Box>

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
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <CommentsModal
        onClose={onClose}
        isOpen={isOpen}
        infoPost={data}
        currentUserId={currentUser?._id ? currentUser._id : ""}
      />
    </PostCardContainer>
  );
};
