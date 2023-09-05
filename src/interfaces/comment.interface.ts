/**
 * Represents the information of a comment.
 */
export interface Comment {
  /** Comment content. */
  content: string;

  /** User id. */
  userId: string;

  /** Post id. */
  postId: string;
}