import { Role } from ".";

/**
 * Represents the information of a user.
 */
export interface User {
  /** User id. */
  _id: string;

  /** First name. */
  firstName: string;

  /** Last name. */
  lastName: string;

  /** User avatar. */
  avatar?: string;

  /** User email. */
  email: string;

  /** User password. */
  password: string;

  /** Username. */
  username: string;

  /** Role. */
  role: Role;

  /** If the email is verified. */
  isEmailVerified: boolean;

  /** If the account is verified. */
  isAccountVerified: boolean;

  /** User's followers. */
  followers: string[];
}
