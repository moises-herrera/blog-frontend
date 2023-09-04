import {
  Box,
  Button,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { PostCardContainer } from '.';

export const PostForm = () => {
  return (
    <PostCardContainer>
      <CardHeader display="flex items-center">
        <button>
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>
        <Heading size="xs" marginX="auto">
          @username
        </Heading>
      </CardHeader>
      <CardBody>
        <Box className="flex justify-center mb-5">
          <Image
            src=""
            alt="Post image"
            fallbackSrc="src/assets/images/upload-image.png"
            borderRadius={20}
          />
        </Box>

        <form className="flex flex-col gap-4">
          <FormControl>
            <FormLabel textColor="#7B7B7B">Tema</FormLabel>
            <Input backgroundColor="white" />
          </FormControl>

          <FormControl>
            <FormLabel textColor="#7B7B7B">Título</FormLabel>
            <Input backgroundColor="white" />
          </FormControl>

          <FormControl>
            <FormLabel textColor="#7B7B7B">Descripción</FormLabel>
            <Textarea backgroundColor="white" rows={6} />
          </FormControl>

          <Button
            type="submit"
            width={117}
            borderRadius={10}
            marginX="auto"
            textColor="#E0E0E0"
            colorScheme="primary"
          >
            Publicar
          </Button>
        </form>
      </CardBody>
    </PostCardContainer>
  );
};
