import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "src/store";
import { closeNewPostForm } from "src/store/post";
import { AppDispatch } from "src/store/types";
import { PostForm } from ".";

export const PostFormModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isNewPostFormVisible } = useTypedSelector(({ post }) => post);

  const onCloseModal = () => {
    dispatch(closeNewPostForm());
  };

  return (
    <Modal
      size="md"
      isOpen={isNewPostFormVisible}
      onClose={onCloseModal}
      isCentered
    >
      <ModalOverlay width="100vw" height="100vh" />
      <ModalContent
        backgroundColor="secondary.200"
        borderRadius={20}
        minWidth="min-content"
      >
        <ModalCloseButton />
        <ModalHeader fontSize="16px" textAlign="center">
          @username
        </ModalHeader>
        <ModalBody padding="0">
          <PostForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
