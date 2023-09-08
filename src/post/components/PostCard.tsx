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
import { FollowButton } from "src/shared/components";
import { useTypedSelector } from "src/store";

export const PostCard = ({
  title,
  topic,
  image,
  description,
  user,
  comments,
  likes,
  createdAt,
}: PostInfo) => {
  const { user: currentUser } = useTypedSelector(({ auth }) => auth);

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
        <button>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
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
