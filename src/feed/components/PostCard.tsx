import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { getDateFormattedFromString } from 'src/helpers';
import { PostInfo } from 'src/interfaces';

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
    <Card
      width="528px"
      maxHeight={730}
      backgroundColor="#D3D3D3"
      borderRadius={20}
    >
      <CardHeader className="flex items-center space-x-2">
        <Avatar name="Dan Abrahmov" src={user.avatar} />
        <Heading size="xs">@{user.username}</Heading>
        <Button
          backgroundColor="#FF5050"
          textColor="white"
          fontSize="12px"
          fontWeight="500"
          width="64px"
          height="26px"
          borderRadius={10}
        >
          Seguir
        </Button>
      </CardHeader>

      <CardBody>
        <Box className="flex justify-center mb-5">
          <Image src={image} alt={title} borderRadius={20} />
        </Box>

        <div className="flex justify-between text-[#7B7B7B] text-sm">
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

        <CardFooter className="flex w-full justify-center">
          <ButtonGroup spacing="55">
            <div className="space-x-2">
              <Button>
                <i className="fa-regular fa-comment"></i>
              </Button>
              <span>{comments.length}</span>
            </div>
            <div className="space-x-2">
              <Button>
                <i className="fa-regular fa-heart"></i>
              </Button>
              <span>{likes.length}</span>
            </div>
          </ButtonGroup>
        </CardFooter>
      </CardBody>
    </Card>
  );
};
