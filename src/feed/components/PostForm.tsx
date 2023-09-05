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
import { useRef } from 'react';

export const PostForm = () => {
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImage = (): void => {
    profileImageInputRef.current?.click();
  };

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
            onClick={onUploadImage}
            cursor="pointer"
          />
          <Input
            className="hidden"
            type="file"
            accept="image/png,image/jpg,image/jpeg"
            ref={profileImageInputRef}
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
            variant="brand"
          >
            Publicar
          </Button>
        </form>
      </CardBody>
    </PostCardContainer>
  );
};
