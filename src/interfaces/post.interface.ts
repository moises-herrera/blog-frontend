import { FileStored } from ".";

/**
 * Represents the information of a post.
 */
export interface Post {
  /** Post id. */
  _id: string;

  /** Post title. */
  title: string;

  /** Post files. */
  files: FileStored[];

  /** Topic. */
  topic: string;

  /** Description. */
  description: string;

  /** User id of the author. */
  userId: string;

  /** Comments. */
  comments: string[];

  /** Likes. */
  likes: string[];

  /** Date of creation. */
  createdAt: Date;

  /** Whether the post is anonymous. */
  isAnonymous: boolean;
}
