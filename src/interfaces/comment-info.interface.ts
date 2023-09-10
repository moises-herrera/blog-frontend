import { UserComment } from ".";

/**
 * Represents the information of a comment.
 */
export interface CommentInfo {
  /** Comment id. */
  _id: string;

  /** Comment content. */
  content: string;

  /** Post id. */
  post: string;

  user: UserComment;
}
