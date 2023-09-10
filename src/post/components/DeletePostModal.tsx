import { useCallback, useEffect } from "react";
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
import { ConfirmMessage } from "src/shared/components";

export const DeletePostModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    isDeleteModalVisible,
    deletePostId,
    isLoadingDeletePost,
    deleteMessage,
    deleteError,
  } = useTypedSelector(({ post }) => post);
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
      displaySuccessMessage(deleteMessage);
      clearSuccess();
    } else if (deleteError) {
      displayError(deleteError);
      clearError();
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
    <ConfirmMessage
      title="Eliminar publicación"
      message="¿Estás seguro de que quieres eliminar esta publicación?"
      confirmText="Eliminar"
      isOpen={isDeleteModalVisible}
      onClose={onClose}
      onConfirm={onDelete}
      isLoading={isLoadingDeletePost}
    />
  );
};
