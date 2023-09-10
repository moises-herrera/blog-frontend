export interface Comment {
  /** Comment id. */
  _id: string;

  /** Comment content. */
  content: string;

  /** Post id. */
  post: string;

  /** User id. */
  user: string;
}
