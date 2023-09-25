import { CreatePost } from ".";

/**
 * Update post data.
 */
export interface UpdatePost {
  /** Post id. */
  id: string;

  /** Post data. */
  postData: CreatePost;
}
