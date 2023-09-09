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
import { closeNewPostForm, setEditPost, updateUserPost } from "src/store/post";
import { AppDispatch } from "src/store/types";
import { PostForm } from ".";
import { Post } from "src/interfaces";

export const PostFormModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isNewPostFormVisible, editPost } = useTypedSelector(
    ({ post }) => post
  );
  const { user } = useTypedSelector(({ auth }) => auth);

  const onCloseModal = () => {
    dispatch(closeNewPostForm());
    if (editPost) {
      dispatch(updateUserPost(editPost));
      dispatch(setEditPost(null));
    }
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
          @{user?.username}
        </ModalHeader>
        <ModalBody maxHeight="800px" overflow="auto">
          <PostForm defaultValues={editPost as Post} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
