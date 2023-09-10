import {
  Box,
  Button,
  FormLabel,
  Image,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import "./PostForm.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { PostSchema, PostSchemaType } from "../validations";
import { FormControlContainer } from "src/shared/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { useTypedSelector } from "src/store";
import {
  clearErrorMessage,
  clearSuccessMessage,
  createPost,
  updatePost,
} from "src/store/post";
import { useMessageToast } from "src/hooks";
import { convertImageToBase64, getFormDataFromObject } from "src/helpers";
import postImagePlaceholder from "src/assets/images/upload-image.png";
import { Post } from "src/interfaces";

interface PostFormProps {
  defaultValues?: Post;
}

export const PostForm = ({ defaultValues }: PostFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoadingPostForm, successMessage, errorMessage } = useTypedSelector(
    ({ post }) => post
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
    defaultValues,
  });
  const { displaySuccessMessage, displayError } = useMessageToast();
  const [imageFile, setImageFile] = useState<ArrayBuffer | string | null>(null);
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);

  const clearSuccess = useCallback(() => {
    dispatch(clearSuccessMessage());
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearErrorMessage());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      displaySuccessMessage(successMessage);
      clearSuccess();
    } else if (errorMessage) {
      displayError(errorMessage);
      clearError();
    }
  }, [
    successMessage,
    errorMessage,
    displaySuccessMessage,
    displayError,
    clearSuccess,
    clearError,
  ]);

  const onClickImage = (): void => {
    profileImageInputRef.current?.click();
  };

  const onUploadPostImage = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = files?.[0];
    setValue("image", imageFile);
    if (imageFile) {
      convertImageToBase64(imageFile, setImageFile);
    }
  };

  const onSubmitForm: SubmitHandler<PostSchemaType> = (data) => {
    const formData = getFormDataFromObject(data);

    if (!defaultValues?._id) {
      dispatch(createPost(formData));
    } else {
      dispatch(
        updatePost({
          id: defaultValues._id,
          postData: formData,
        })
      );
    }
  };

  return (
    <div className="post-form-container">
      <Box className="flex justify-center mb-5">
        <Image
          src={(imageFile as string) || postImagePlaceholder}
          alt="Post image"
          borderRadius={20}
          onClick={onClickImage}
          cursor="pointer"
          className="w-[400px]"
        />
        <Input
          className="hidden"
          type="file"
          accept="image/png,image/jpg,image/jpeg"
          ref={profileImageInputRef}
          onChange={onUploadPostImage}
        />
      </Box>

      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="w-full flex flex-col gap-3 pb-4"
      >
        <FormControlContainer fieldError={errors.topic}>
          <FormLabel textColor="secondary.300">Tema</FormLabel>
          <Input autoComplete="off" backgroundColor="white" {...register("topic")} />
        </FormControlContainer>

        <FormControlContainer fieldError={errors.title}>
          <FormLabel textColor="secondary.300">Título</FormLabel>
          <Input backgroundColor="white" {...register("title")} />
        </FormControlContainer>

        <FormControlContainer fieldError={errors.description}>
          <FormLabel textColor="secondary.300">Descripción</FormLabel>
          <Textarea
            backgroundColor="white"
            rows={6}
            resize="none"
            {...register("description")}
          />
        </FormControlContainer>

        <Button
          type="submit"
          marginX="auto"
          variant="form"
          isLoading={isLoadingPostForm}
        >
          Publicar
        </Button>
      </form>
    </div>
  );
};
