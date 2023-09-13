/**
 * Represents the information of a user in a comment.
 */
export interface UserComment {
  /** User id. */
  _id: string;

  /** First name. */
  firstName: string;

  /** Last name. */
  lastName: string;

  /** Username. */
  username: string;

  /** Avatar. */
  avatar: string;

  /** If is an account verified. */
  isAccountVerified: boolean;

  /** If is a founder. */
  isFounder: boolean;
}
