import { Post } from ".";

/**
 * Create post data.
 */
export interface CreatePost extends Partial<Post> {
  /** Post file. */
  fileUploaded?: File | null;
}
