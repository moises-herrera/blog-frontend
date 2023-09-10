import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMessageToast } from "src/hooks";
import { ConfirmMessage } from "src/shared/components";
import { useTypedSelector } from "src/store";
import {
  clearDeleteResponse,
  closeDeleteModal,
  deleteComment,
} from "src/store/comment";
import { removeComment } from "src/store/post";
import { AppDispatch } from "src/store/types";

export const DeleteCommentModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    isDeleteModalVisible,
    deleteCommentData,
    isLoadingDeleteComment,
    deleteMessage,
    deleteError,
  } = useTypedSelector(({ comment }) => comment);
  const { displaySuccessMessage, displayError } = useMessageToast();

  const onDelete = () => {
    if (deleteCommentData) {
      dispatch(deleteComment(deleteCommentData.commentId));
      dispatch(removeComment(deleteCommentData));
    }
  };

  const onClose = () => {
    dispatch(closeDeleteModal());
  };

  const clearSuccess = useCallback(() => {
    dispatch(clearDeleteResponse());
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearDeleteResponse());
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
      title="Eliminar comentario"
      message="¿Estás seguro de que quieres eliminar este comentario?"
      confirmText="Eliminar"
      isOpen={isDeleteModalVisible}
      onClose={onClose}
      onConfirm={onDelete}
      isLoading={isLoadingDeleteComment}
    />
  );
};
