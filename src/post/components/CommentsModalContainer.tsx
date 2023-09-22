import { closeCommentsModal } from "src/store/comment";
import { CommentsModal, DeleteCommentModal } from ".";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { useTypedSelector } from "src/store";
import { clearPostInfoActive } from "src/store/post";

export const CommentsModalContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isCommentsModalVisible } = useTypedSelector(({ comment }) => comment);
  const { postInfoActive } = useTypedSelector(({ post }) => post);

  const onClose = () => {
    dispatch(closeCommentsModal());
    dispatch(clearPostInfoActive());
  };

  return (
    <>
      {isCommentsModalVisible && postInfoActive && (
        <>
          <CommentsModal
            isOpen={isCommentsModalVisible}
            onClose={onClose}
            infoPost={postInfoActive}
          />
          <DeleteCommentModal />
        </>
      )}
    </>
  );
};
