import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useMessageToast } from "src/hooks";
import { useTypedSelector } from "src/store";
import {
  clearErrorMessage,
  clearSuccessMessage,
  closeDeleteModal,
  deletePost,
} from "src/store/post";
import { AppDispatch } from "src/store/types";

export const DeletePostModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    isDeleteModalVisible,
    deletePostId,
    isLoadingDeletePost,
    successMessage,
    errorMessage,
  } = useTypedSelector(({ post }) => post);
  const cancelRef = useRef(null);
  const { displaySuccessMessage, displayError } = useMessageToast();

  const onDelete = () => {
    dispatch(deletePost(deletePostId as string));
    onClose();
  };

  const onClose = () => {
    dispatch(closeDeleteModal());
  };

  const clearSuccess = useCallback(() => {
    dispatch(clearSuccessMessage());
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearErrorMessage());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      displaySuccessMessage(successMessage, 5000, clearSuccess);
    } else if (errorMessage) {
      displayError(errorMessage, 5000, clearError);
    }
  }, [
    successMessage,
    errorMessage,
    displaySuccessMessage,
    displayError,
    clearSuccess,
    clearError,
  ]);

  return (
    <AlertDialog
      isOpen={isDeleteModalVisible}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Eliminar publicación
          </AlertDialogHeader>

          <AlertDialogBody>
            ¿Estás seguro de que quieres eliminar esta publicación?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={onDelete}
              ml={3}
              isLoading={isLoadingDeletePost}
            >
              Eliminar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
