import { CommentInfo, DeleteComment, PostInfo } from ".";

/**
 * Comment state in the Redux store.
 */
export interface CommentState {
  /** Comments list. */
  comments: CommentInfo[];

  /** Loading state. */
  isLoadingComments: boolean;

  /** Error message. */
  error?: string | null;

  /** Success message. */
  successMessage?: string | null;

  /** Whether the comments modal is visible. */
  isCommentsModalVisible: boolean;

  /** The post info. */
  postInfo?: PostInfo | null;

  /** Whether the delete modal is visible. */
  isDeleteModalVisible: boolean;

  /** The comment to delete. */
  deleteCommentData?: DeleteComment | null;

  /** Whether the delete comment is loading. */
  isLoadingDeleteComment: boolean;

  /** Delete message. */
  deleteMessage?: string | null;

  /** Delete error message. */
  deleteError?: string | null;
}
