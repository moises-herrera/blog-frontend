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
  clearDeleteErrorResponse,
  clearDeleteResponse,
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
    deleteMessage,
    deleteError,
  } = useTypedSelector(({ post }) => post);
  const cancelRef = useRef(null);
  const { displaySuccessMessage, displayError } = useMessageToast();

  const onDelete = () => {
    dispatch(deletePost(deletePostId as string));
  };

  const onClose = () => {
    dispatch(closeDeleteModal());
  };

  const clearSuccess = useCallback(() => {
    dispatch(clearDeleteResponse());
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearDeleteErrorResponse());
  }, [dispatch]);

  useEffect(() => {
    if (deleteMessage) {
      displaySuccessMessage(deleteMessage, 5000, clearSuccess);
    } else if (deleteError) {
      displayError(deleteError, 5000, clearError);
    }
  }, [
    deleteMessage,
    deleteError,
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
