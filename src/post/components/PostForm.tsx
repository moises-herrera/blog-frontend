import { Button, FormLabel, Image, Input, Textarea } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
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
import { CreatePost, FileStored, Post } from "src/interfaces";
import { useDropzone } from "react-dropzone";
import uploadImage from "src/assets/images/upload-image.png";
import { PostFileItem } from ".";

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
  } = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
    defaultValues,
  });
  const { displaySuccessMessage, displayError } = useMessageToast();
  const [files, setFiles] = useState<FileStored[]>(defaultValues?.files || []);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          url: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".jpg", ".jpeg", ".png"],
      "video/mp4": [".mp4", ".webm", ".ogg"],
    },
    maxFiles: 1,
  });

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

  const onSubmitForm: SubmitHandler<PostSchemaType> = async (data) => {
    const postData: CreatePost = {
      ...data,
      fileUploaded: files.length > 0 ? files[0] : null,
    };

    if (!defaultValues?._id) {
      dispatch(createPost(postData));
    } else {
      dispatch(
        updatePost({
          id: defaultValues._id,
          postData: postData,
        })
      );
    }
  };

  const onRemoveFile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    event.stopPropagation();

    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return (
    <div className="post-form-container">
      <div className="relative flex justify-center mb-5">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {files.length === 0 && (
            <Image
              src={uploadImage}
              className="cursor-pointer"
              alt="Post image"
            />
          )}
          {files.map((file, index) => (
            <PostFileItem
              key={index}
              file={file}
              index={index}
              onRemoveFile={onRemoveFile}
            />
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="w-full flex flex-col gap-3 pb-4"
      >
        <FormControlContainer fieldError={errors.topic}>
          <FormLabel textColor="secondary.300">Tema</FormLabel>
          <Input
            autoComplete="off"
            backgroundColor="white"
            {...register("topic")}
          />
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
          {defaultValues?._id ? "Guardar" : "Publicar"}
        </Button>
      </form>
    </div>
  );
};
