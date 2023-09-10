export interface Comment {
  _id?: string;
  /** Comment content. */
  content: string;

  /** Post id. */
  post: string;

  user: string;
}
