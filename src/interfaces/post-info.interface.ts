import { Post, User } from '.';

/**
 * Represents the post information extended with the user information.
 */
export interface PostInfo extends Post {
  /** User information. */
  user: User;
}
