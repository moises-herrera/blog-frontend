/**
 * Represents the information needed to change a user's password.
 */
export interface ChangePassword {
  /** The user id. */
  userId: string;

  /** The token. */
  token: string;

  /** The new password. */
  password: string;
}
