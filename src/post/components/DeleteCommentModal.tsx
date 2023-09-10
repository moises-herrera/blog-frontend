import { useDispatch } from "react-redux";
import { ConfirmMessage } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { closeDeleteModal, deleteComment } from "src/store/comment";
import { AppDispatch } from "src/store/types";

export const DeleteCommentModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isDeleteModalVisible, deleteCommentId, isLoadingDeleteComment } =
    useTypedSelector(({ comment }) => comment);

  const onDelete = () => {
    dispatch(deleteComment(deleteCommentId as string));
  };

  const onClose = () => {
    dispatch(closeDeleteModal());
  };

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
