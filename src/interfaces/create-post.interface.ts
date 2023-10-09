import { FileStored, Post } from ".";

/**
 * Create post data.
 */
export interface CreatePost extends Partial<Post> {
  /** Post file. */
  fileUploaded?: FileStored | null;
}
