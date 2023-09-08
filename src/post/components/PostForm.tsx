import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useRef } from "react";
import "./PostForm.css";

export const PostForm = () => {
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImage = (): void => {
    profileImageInputRef.current?.click();
  };

  return (
    <div className="post-form-container">
      <Box className="flex justify-center mb-5">
        <Image
          src=""
          alt="Post image"
          fallbackSrc="src/assets/images/upload-image.png"
          borderRadius={20}
          onClick={onUploadImage}
          cursor="pointer"
          className="w-[400px]"
        />
        <Input
          className="hidden"
          type="file"
          accept="image/png,image/jpg,image/jpeg"
          ref={profileImageInputRef}
        />
      </Box>

      <form className="w-full flex flex-col gap-4">
        <FormControl>
          <FormLabel textColor="secondary.300">Tema</FormLabel>
          <Input backgroundColor="white" />
        </FormControl>

        <FormControl>
          <FormLabel textColor="secondary.300">Título</FormLabel>
          <Input backgroundColor="white" />
        </FormControl>

        <FormControl>
          <FormLabel textColor="secondary.300">Descripción</FormLabel>
          <Textarea backgroundColor="white" rows={6} resize="none" />
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
    </div>
  );
};
