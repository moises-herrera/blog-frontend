import { UserComment } from ".";

/**
 * Represents the information of a comment.
 */
export interface CommentInfo {
  /** Comment content. */
  content: string;

  /** Post id. */
  post: string;

  user: UserComment;
}
