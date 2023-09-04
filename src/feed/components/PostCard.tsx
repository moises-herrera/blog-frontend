import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { getDateFormattedFromString, getFullName } from 'src/helpers';
import { PostInfo } from 'src/interfaces';
import { PostCardContainer } from '.';

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
  return (
    <PostCardContainer>
      <CardHeader className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Avatar name={getFullName(user)} src={user.avatar} />
          <Heading size="xs">@{user.username}</Heading>
          <Button
            colorScheme="primary"
            textColor="white"
            fontSize="12px"
            fontWeight="500"
            width="64px"
            height="26px"
            borderRadius={10}
          >
            Seguir
          </Button>
        </div>
        <button>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </CardHeader>

      <CardBody>
        <Box className="flex justify-center mb-5">
          <Image src={image} alt={title} borderRadius={20} />
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
          <Text maxHeight="200px" noOfLines={6}>
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
