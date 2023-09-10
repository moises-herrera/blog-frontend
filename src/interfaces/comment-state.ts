import { CommentInfo } from ".";

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

  /** Whether the delete modal is visible. */
  isDeleteModalVisible: boolean;

  /** The comment id to delete. */
  deleteCommentId?: string | null;

  /** Whether the delete comment is loading. */
  isLoadingDeleteComment: boolean;
}
