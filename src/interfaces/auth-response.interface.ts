import { User } from ".";

/**
 * The response of the authentication.
 */
export interface AuthResponse {
  /** User data. */
  user: User;

  /** The access token. */
  accessToken: string;
}
